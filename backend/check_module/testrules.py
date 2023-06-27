from model.api import Building
from geolab.tools import GeometricTools

edificio = Building(r'backend/check_module/ifcfile.ifc')

shape_list = edificio.load_geometry().values()

print(list(shape_list)[0])