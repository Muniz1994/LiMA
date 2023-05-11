from .check.routine import ComplianceCheck
from .conceptual_model.model_basic import Building


class ModelCheck:
    def __init__(self, regulation_path):
        # Initiate building providing the location
        self.building = Building("AscoliPiceno")

        # Initiate the check class providing the building
        self.CHEK_routine = ComplianceCheck(self.building)

        # Load the digital regulation
        self.CHEK_routine.load_regulation(regulation_path)

    def execute(self):
        # Execute the verification of all rules
        self.CHEK_routine.check_regulation()

        report = []

        # Loop through verifications in the report and print the results
        for i, verification in enumerate(self.CHEK_routine.report):
            verification["id"] = str(i)

            report.append(verification)

        return report
