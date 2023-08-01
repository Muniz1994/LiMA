import ifcopenshell

from ifcopenshell.util.selector import Selector

query = Selector()

ifc_file = ifcopenshell.open(r'C:\Users\engbr\Documents\GitHub\LiMA\backend\check_module\AC-20-Smiley-West-10-Bldg_6QhTq7E_2o1e6Nj.ifc')


all = query.parse(ifc_file,'.IfcDoor')


print([el.GlobalId for el in all])

