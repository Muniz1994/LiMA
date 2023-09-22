# from model.apiv2 import *


# def check(elements, property, check_type, value):
    
#     return 'ok!'

# main_model = Model(r"G:/Other computers/Meu laptop/11_DICE/00-THESIS/IFC/EDFTeste/BuildingTeste.v1.ifc")



# print(main_model.select('@ .IfcBuilding & .IfcStair[Pset_StairCommon.NumberOfRiser !< 19]'))
import ifcopenshell
from selectorv2 import Selector


main_model = ifcopenshell.open(r"G:/Other computers/Meu laptop/11_DICE/00-THESIS/IFC/EDFTeste/BuildingTeste.v1.ifc")

selector = Selector()

bs = selector.parse(main_model,'.IfcBuildingStorey')[0]

selector.parse(bs, '@ .IfcSpace')