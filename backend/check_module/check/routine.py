import ast
import json



class ComplianceCheck:
    # Constructor
    def __init__(self, rule_set, building=None):
        self.rule_set = rule_set
        self.report = []
        self.rule_verification_list = []
        self.building = building

        # Here is the namespace for the python code execution
        self.local_vars = {
            "add_verification": self.add_verification,
            "building": self.building,
        }

    def check_regulation(self):
        """Iterates through every rule in the digital regulation and executes the rule code"""

        for rule in self.rule_set:

            self.report.append(rule.name)
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

    def add_verification(self, condition):
        self.rule_verification_list.append(condition)

    def restart_verification_list(self):
        self.rule_verification_list = []
