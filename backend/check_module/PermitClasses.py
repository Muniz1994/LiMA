from model.apiv2 import *

model = Model(r"G:/Other computers/Meu laptop/11_DICE/00-THESIS/IFC/EDFTeste/BuildingTeste.v1.ifc")

print(model.select('.IfcSpace'))

class Building:

    def __init__(self, model) -> None:
        self.model = model
        self.category = None
        self.uses = None
        self.isNewConstruction = None
        self.elevators = None
        self.buildingStoreys = None
        self.stairs = None
        
    def footprint(self):
        pass
    
    def depth(self):
        pass
    
class Parcel:
    
    def __init__(self) -> None:
        
        self.buildings = None
        self.frontStreet = None
        
    def depth(self):
        pass
    
    def area(self):
        pass
    
    def buildabilityIndex(self):
        pass
    
    def grossFloorArea(self):
        pass
        
class FrontStreet:
    
    def __init__(self) -> None:
        self.axis = None
        
class Elevator:
    
    def __init__(self) -> None:
        pass
    
class BuildingStorey:
    
    def __init__(self) -> None:
        self.IsAboveGround = None
        self.dwellings = None
        
    def ceilingHeight(self):
        pass

class Stair:
    
    def __init__(self) -> None:
        
        self.treadLength = None
        self.riserHeight = None
        
    def runLength(self):
        pass
    
class Dwelling:
    
    def __init__(self) -> None:
        
        self.spaces = None
        
    def area(self):
        pass
    
class Space:
    
    def __init__(self) -> None:
        self.objectClass = None
        
    def area():
        pass
    