from model.api import Building

building = Building(r'C:\Users\engbr\Documents\GitHub\LiMA\backend\check_module\AC-20-Smiley-West-10-Bldg_6QhTq7E_2o1e6Nj.ifc')


all = building.select('#2K8zFEPrzBfgkpngTRI6y8')


print(all[0].mesh.centroid)
print(all[0].ifc.GlobalId)
print(all[0].ifc.Name)

