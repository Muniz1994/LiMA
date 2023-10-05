import time


if __name__ != '__main__':
    from digital_regulation.models import Regulation
    from check_module.model.CheckModel import *
    from check_module.model.PermitModel import *
    

from django.forms.models import model_to_dict

import random
import ast
import json

class ComplianceCheck:
    # Constructor
    def __init__(self, rule_set, building_path):
        
        self.rule_set = rule_set
        self.report = []
        self.rule_verification_list = []
        self.permit_model = PermitModel(CheckModel(building_path))

        # Here is the namespace for the python code execution
        self.local_vars = {
            "add_verification": self.add_verification,
            "my_permit": self.permit_model,
        }

    def check_regulation(self):
        
        """Iterates through every rule in the digital regulation and executes the rule code"""

        for rule in self.rule_set:

            rule_report = model_to_dict(rule)

            rule_report["result"] = self.exec_code(rule.code)
            
            self.report.append(rule_report)
        # if self.regulation != None:
        #     for zone in self.regulation["zones"]:
        #         for rule in zone["rules"]:
        #             self.exec_code(rule["code"])
        #             self.report.append(
        #                 {
        #                     "legal_reference": rule["legal_reference"],
        #                     "rule_name": rule["name"],
        #                     "result": self.rule_verification_list,
        #                 }
        #             )
        #             self.restart_verification_list()

    def exec_code(self, code):
        parsed_code = ast.parse(code)

        # The parsed code is compiled and executed, and this particular example, defining
        # some local variables as well. This can be used to control some code injection.
        # A disscussion about the security issues and the measures to mitigate it can be found
        #  at this link: https://realpython.com/python-exec/
        # Anyway, a similar solution for a machine interpretable format tha runs python code
        # can be found at this link: https://www.inno-lab.co.kr/Home/en/product-KBim_Assess-Lite.html

        exec(compile(parsed_code, filename="", mode="exec"), self.local_vars)

        return self.rule_verification_list

    def add_verification(self, condition):
        self.rule_verification_list.append(condition)

    def restart_verification_list(self):
        self.rule_verification_list = []


if __name__ == '__main__':

    class Rule:

        def __init__(self):

            self.code = "check = %s == %s"%(str(random.randint(1,9)),str(random.randint(1,9)))

    rule_set = [Rule(),Rule(),Rule(),Rule(),Rule(),Rule(),Rule()]
    
    path = r"G:/Other computers/Meu laptop/11_DICE/00-THESIS/IFC/EDFTeste/BuildingTeste.v52.ifc"

    check = ComplianceCheck(rule_set, path)

    check.check_regulation()

    print(check.report)