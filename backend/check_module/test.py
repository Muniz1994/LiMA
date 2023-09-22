import ifcopenshell
import ifcopenshell.geom
import multiprocessing
from dataclasses import dataclass
import time

# Start timer
start_time = time.time()

ifc_file = ifcopenshell.open(r'C:\Users\engbr\Documents\GitHub\LiMA\backend\check_module\ifcfile.ifc')

# wall = ifc_file.by_type('IfcWall')[0]

# @dataclass
# class PermitObject:

#     data: object
#     GlobalId: str

#     def __getattr__(self, attr):
#         return getattr(self.data,attr)

# class Adonha:

#   def __init__(self):

#     self.tralala = "dsadsadasd"

# a = PermitObject(wall, "dsadasdsadsa")

# print(a.GlobalId)

settings = ifcopenshell.geom.settings()

settings.set(settings.USE_WORLD_COORDS, True)
settings.set(settings.VALIDATE_QUANTITIES, True)

iterator = ifcopenshell.geom.iterator(settings, ifc_file, multiprocessing.cpu_count())

geometry_dict = {}

if iterator.initialize():

    while True:

        shape = iterator.get()

        geometry_dict[shape.guid] = shape

        if not iterator.next():
            break

# End timer
end_time = time.time()

# Calculate elapsed time
elapsed_time = end_time - start_time
print("Elapsed time: ", elapsed_time)