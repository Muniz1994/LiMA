import ifcopenshell
from ifcopenshell.util.selector import Selector
import ifcopenshell.geom
import multiprocessing
from trimesh import Trimesh
import sys
from dataclasses import dataclass
from typing import Optional, List

from ifcopenshell.ifcopenshell_wrapper import TriangulationElement


class Geometry:

    def __init__ (self, geometry):

        self.box_project_uvs = geometry.box_project_uvs
        self.edges = geometry.edges
        self.faces = geometry.faces
        self.id = geometry.id
        self.material_ids = geometry.material_ids
        self.materials = geometry.materials
        self.normals = geometry.normals
        self.settings = geometry.settings
        self.this = geometry.this
        self.uvs = geometry.uvs
        self.verts = geometry.verts
        self.mesh = self.get_mesh()

    def get_mesh(self):

        verts = self.verts

        grouped_verts = [
            [verts[i], verts[i + 1], verts[i + 2]] for i in range(0, len(verts), 3)
        ]

        faces = self.faces

        grouped_faces = [
            [faces[i], faces[i + 1], faces[i + 2]] for i in range(0, len(faces), 3)
        ]

        mesh =Trimesh(grouped_verts,grouped_faces)

        return mesh

class Shape:

    def __init__(self, shape):

        self.context = shape.context
        self.geometry = Geometry(shape.geometry)
        self.geometry_pointer = shape.geometry_pointer
        self.guid = shape.guid
        self.id = shape.id
        self.name = shape.name
        self.parent_id = shape.parent_id
        self.parents = shape.parents
        self.product = shape.product
        self.this = shape.this
        self.transformation = shape.transformation
        self.type = shape.type
        self.unique_id = shape.unique_id

class Element:

    def __init__(self, ifc_element, mesh=None):

        self.ifc = ifc_element
        self.mesh = mesh
    
class Model:
    def __init__(self, path):

        self.ifc = ifcopenshell.open(path)

        self.parser = Selector()

        self.ifc.geometry = self.load_geometry()
        

    def select(self, query):

        query_result = self.parser.parse(self.ifc, query)

        return([Element(res, self.ifc.geometry[res.GlobalId].geometry.mesh) if res.Representation is not None else Element(res) for res in query_result] if query_result else None)

    def load_geometry(self):

        settings = ifcopenshell.geom.settings()

        settings.set(settings.USE_WORLD_COORDS, True)

        iterator = ifcopenshell.geom.iterator(settings, self.ifc, multiprocessing.cpu_count())

        geometry_dict = {}

        if iterator.initialize():

            while True:

                shape = iterator.get()


                geometry_dict[shape.guid] = Shape(shape)


                if not iterator.next():
                    break


        return(geometry_dict)

# Permit Classes ------------------------------------------------------------------------------------------------------------------------------- 

@dataclass
class PermitObject:
    data: object
    
    def __getattr__(self, attr):
        return PermitObject(getattr(self.data,attr)).data
            
@dataclass
class Stair:
    treadLength: Optional[object] = None
    riserHeight: Optional[object] = None

    def runLength(self):
        pass

@dataclass
class Space:
    objectClass: Optional[object] = None

    def area(self):
        pass
    
    def ceilingHeight(self):
        pass
    
    
@dataclass
class Dwelling:
    spaces: List[Space] = None

    def area(self):
        pass            
            
@dataclass
class BuildingStorey:
    spaces: List[Space] = None
    isAboveGround: Optional[bool] = None
    dwellings: List[Dwelling] = None

    def floorToFloorHeight(self):
        pass

@dataclass
class Elevator:
    pass

@dataclass
class Building(PermitObject):
    category: Optional[object] = None
    uses: Optional[object] = None
    isNewConstruction: Optional[object] = None
    elevators: List[Elevator] = None
    buildingStoreys: List[BuildingStorey] = None
    stairs: List[Stair] = None

    def footprint(self):
        pass

    def depth(self):
        pass

    def height(self):
        pass

    def alignment(self):
        pass

@dataclass
class FrontStreet:
    axis: Optional[object] = None
    
@dataclass
class Parcel(PermitObject):
    
    buildings: List[Building] = None
    frontStreet: FrontStreet = None

    def depth(self):
        pass

    def area(self):
        pass

    def buildabilityIndex(self):
        pass

    def grossFloorArea(self):
        pass












