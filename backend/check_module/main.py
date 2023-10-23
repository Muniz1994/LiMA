import time


if __name__ != '__main__':
    from digital_regulation.models import Regulation
    from check_module.model.CheckModel import *
    from check_module.model.PermitModel import *
    

from django.forms.models import model_to_dict

import random
import ast
import json

class Report:
    
    def __init__(self) -> None:
        
        self.checks_executed = []
        
        self.num_checks_executed = 0
        
        self.final_report = []
        
        self.final_report_num = 0
        
        
    def add_check(self,object, attribute_or_method, comparison, compared_value):
        # Ensure that the comparison parameter is one of "=, >, >=, <, <="
        if comparison not in {'=', '>', '>=', '<', '<='}:
            raise ValueError("Invalid comparison operator")

        try:
            # Split the attribute_or_method into attribute and potential '__len__'
            property = attribute_or_method.rsplit(".")
            
            if len(property) > 1:
                attr, attr2 = property
            else:
                attr = property[0]
            
            # Get the attribute or method value from the object
            value = getattr(object, attr)

            # If it's a callable (method), call it to get the value
            if callable(value):
                value = value()

            # Handle the special case of comparing the length
            if attribute_or_method.endswith('.__len__'):
                length = len(value)
                value = length
            else:
                length = None

            # Perform the specified comparison
            if comparison == '=':
                result = value == compared_value
            elif comparison == '>':
                result = value > compared_value
            elif comparison == '>=':
                result = value >= compared_value
            elif comparison == '<':
                result = value < compared_value
            elif comparison == '<=':
                result = value <= compared_value
                
            if hasattr(object,'GlobalId'):
                
                if object.is_a('IfcSpatialStructureElement'):
                    
                    name = object.LongName
                    
                else:
                    name= object.Name
                
                result_dict ={
                    "id":self.num_checks_executed + 1,
                    "result":result,
                    "object_id": object.GlobalId,
                    "object_name": name,
                    "value":round(value,1)
                }
                
            else:
                
                result_dict ={
                    "id":self.num_checks_executed + 1,
                    "result":result,
                    "object_name": object.Name,
                    "value":round(value,1)
                }
                
            
            self.num_checks_executed +=1
            
            self.checks_executed.append(result_dict)
        except AttributeError:
            raise AttributeError(f"'{object.__class__.__name__}' object has no attribute '{attribute_or_method}'")

        
    def addRef(self, ref):
        
        self.final_report.append({"id": self.final_report_num +1 ,"reference":ref,"checks":self.checks_executed})
        
        self.final_report_num +=1
        
        self.checks_executed = []


class ComplianceCheck:
    # Constructor
    def __init__(self, rule_set, building_path):
        
        self.rule_set = rule_set
        self.report = Report()
        self.permit_model = PermitModel(CheckModel(building_path))
        
        self.room_types = {
    "vestibulo":"SL_40_65_94",
    "corredor":"SL_90_10_36",
    "instalacaoSanitaria":"SL_35_80",
    "despensa":"SL_90_50_46",
    "arrecadacao":"SL_90_50_39",
    "sala":"SL_45_10_49",
    "cozinha":"SL_45_10_23",
    "quartoCasal":"SL_45_10_10",
    "quartoDuplo":"SL_45_10_11",
    "quartoSimples":"SL_45_10_07",
    "varanda":"SL_45_10_06",
}


        # Here is the namespace for the python code execution
        self.local_vars = {
            "add_check": self.report.add_check,
            "my_permit_model": self.permit_model,
            "room_types": self.room_types
        }

    def exec_check(self):
        
        """Iterates through every rule in the digital regulation and executes the rule code"""

        for rule in self.rule_set:

            rule_report = model_to_dict(rule)

            self.exec_code(rule.code)
            
            self.report.addRef(rule.external_reference)
    

    def exec_code(self, code):
        parsed_code = ast.parse(code)

        # The parsed code is compiled and executed, and this particular example, defining
        # some local variables as well. This can be used to control some code injection.
        # A disscussion about the security issues and the measures to mitigate it can be found
        #  at this link: https://realpython.com/python-exec/
        # Anyway, a similar solution for a machine interpretable format tha runs python code
        # can be found at this link: https://www.inno-lab.co.kr/Home/en/product-KBim_Assess-Lite.html

        exec(compile(parsed_code, filename="", mode="exec"), self.local_vars)



if __name__ == '__main__':

    class Rule:

        def __init__(self):

            self.code = "check = %s == %s"%(str(random.randint(1,9)),str(random.randint(1,9)))

    rule_set = [Rule(),Rule(),Rule(),Rule(),Rule(),Rule(),Rule()]
    
    path = r"G:/Other computers/Meu laptop/11_DICE/00-THESIS/IFC/EDFTeste/BuildingTeste.v52.ifc"

    check = ComplianceCheck(rule_set, path)

    check.check_regulation()

    print(check.report)