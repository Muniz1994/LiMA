import ifcopenshell
from ifcopenshell.util.selector import Selector
from ifcopenshell.util.element import get_pset, get_classification
import ifcopenshell.geom
import multiprocessing
from trimesh import Trimesh
import trimesh
import sys
from dataclasses import dataclass
from typing import Optional, List
import numpy as np
from scipy.spatial import cKDTree
from itertools import combinations

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
        
    def has_valid_representation(self,element):
        
        valid_representation_types = [
            "Point",
            "PointCloud",
            "Curve",
            "Curve2D",
            "Curve3D",
            "Surface",
            "Surface2D",
            "Surface3D",
            "Advanced Surface",
            "GeometricSet",
            "GeometricCurveSet",
            "SurfaceModel",
            "Tessellation",
            "SolidModel",
            "SweptSolid",
            "Advanced SweptSolid",
            "Brep",
            "AdvancedBrep",
            "CSG",
            "Clipping",
            "BoundingBox",
            "Sectioned Spine",
            "MappedRepresentation"
        ]
    
        if element.Representation:
            for rep in element.Representation.Representations:
                    if rep.RepresentationType in valid_representation_types:
                        return True
                        
        return None    

    def select(self, query):

        query_result = self.parser.parse(self.ifc, query)

        return([Element(res, self.ifc.geometry[res.GlobalId].geometry.mesh) if self.has_valid_representation(res) is not None else Element(res) for res in query_result] if query_result else None)

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
    
# geometric functions ------------------------------------------------------------------------------------------------------------------------------- 

def project_mesh(mesh, plane_point):
    
    '''Returns a mesh projection of a mesh 
    in a plane normal to Y-Axis defined by a specific point'''
    
    new_mesh = mesh.copy()
    new_mesh.apply_transform(trimesh.transformations.projection_matrix(plane_point, [0,0,1]))
    
    return new_mesh

def projected_meshes(element_list, plane_point):
    
    '''Returns a mesh projection of a list of api Elements 
    in a plane normal to Y-Axis defined by a specific point'''
    
    if len(element_list)>1:
        
        
        projected_meshes = project_mesh(element_list[0].mesh, plane_point)
    
        for element in element_list[1:]:
            
            if element.mesh is not None:
                projected_meshes +=  project_mesh(element.mesh, plane_point)
            
    else:
        
        projected_meshes = project_mesh(element_list[0].mesh, plane_point)
        
    return projected_meshes

def most_distant_point_in_axis(mesh,axis):
    
    '''Returns the most distant point from a mesh in a specified axis
    -- the axis should be 'Y', 'X' or 'Z' '''
    
    if axis == 'X':
        point = mesh.vertices[np.argmax(mesh.vertices[:, 0])]
    elif axis == 'Y':
        point = mesh.vertices[np.argmax(mesh.vertices[:, 1])]
    elif axis == 'Z':
        point = mesh.vertices[np.argmax(mesh.vertices[:, 2])]
        
    return point

def distance_perpendicular_point_to_line(point,path):
    
    '''Returns the perpendicular distance from a point to a path line'''
    
    max_distance = path.length
    
    # Calculate pairwise distances and find the most distant points
    most_distant_points=None
    
    for point1, point2 in combinations(path.vertices, 2):
        distance = np.linalg.norm(point1 - point2)
        if distance >= max_distance:
            max_distance = distance
            most_distant_points = (point1, point2)
            
    # Calculate the direction vector of the line segment
    line_direction = most_distant_points[1] - most_distant_points[0] 

    # Calculate the point on the line closest to the given point
    closest_point_on_line = most_distant_points[0] + np.dot(point - most_distant_points[0], line_direction) / np.dot(line_direction, line_direction) * line_direction

    # Calculate the perpendicular distance between the closest point on the line and the given point
    distance = np.linalg.norm(closest_point_on_line - point)
    
    return distance

# Permit Classes ------------------------------------------------------------------------------------------------------------------------------- 

@dataclass
class PermitObject:
    data: object
    model: object = None
    
    def __getattr__(self, attr):
        return PermitObject(getattr(self.data,attr)).data
    
    def get_connection(self,ifc_class,model_obj_type):
        
        query = self.model.select('@ #%s & .%s'%(str(self.data.ifc.GlobalId),ifc_class))

        if query:
            return [model_obj_type(obj, self.model) for obj in query]
        else:
            return []
        
    def get_property(self,pset,property):
        
        if get_pset(self.data.ifc,pset):
            if property in get_pset(self.data.ifc,pset):
                return get_pset(self.data.ifc,pset)[property]

        return None
            
@dataclass
class Stair(PermitObject):
    
    def __init__(self,data,model):
        super().__init__(data,model)
        
        self.treadLength: self.get_property("Pset_StairCommon","treadLength")
        self.riserHeight: self.get_property("Pset_StairCommon","riserHeight")

    def runLength(self):
        pass

@dataclass
class Space(PermitObject):
    
    def __init__(self,data,model):
        super().__init__(data,model)
        
        self.objectClass: Optional[object] = None

    def area(self):
        pass
    
    def ceilingHeight(self):
        pass
    
    
@dataclass
class Dwelling(PermitObject):
    
    def __init__(self,data,model):
        super().__init__(data,model)
        self.name = self.get_property("Permit","AboveGround")
        self.relatedSpaces: List[Space] = None

    def area(self):
        pass            
            
@dataclass
class BuildingStorey(PermitObject):
    
    def __init__(self,data,model):
        super().__init__(data,model)

        self.spaces: List[Space] = self.get_connection('IfcSpace',Space) 
        self.isAboveGround: Optional[bool] = self.get_property("Pset_BuildingStoreyCommon","AboveGround")
        self.dwellings: List[Dwelling] = self.get_connection('IfcSpace[Permit.ContainedInDwelling=True]', Dwelling)

    def floorToFloorHeight(self):
        pass

@dataclass
class Elevator:
    pass

class Building(PermitObject):
    
    def __init__(self,data,model):
        
        super().__init__(data,model)
        
        self.category: Optional[object] = self.get_property("Permit","Category")
        self.uses: Optional[object] = self.get_property("Permit","Uses")
        self.isNewConstruction: Optional[object] = self.get_property("Permit","IsNewConstruction")
        self.elevators: List[Elevator] = self.get_connection('IfcTransportElement[PredefinedType = "ELEVATOR"]', Elevator) 
        self.buildingStoreys: List[BuildingStorey] = self.get_connection('IfcBuildingStorey', BuildingStorey) 
        self.stairs: List[Stair] = self.get_connection('IfcStair', Stair) 

    def footprint(self):
        pass

    def depth(self):
        pass

    def height(self):

        building_elements = self.model.select('@ #%s'%str(self.data.ifc.GlobalId))

        building_elements = trimesh.util.concatenate([b.mesh for b in building_elements])

        height = most_distant_point_in_axis(building_elements,'Z')
        
        return height[2]


class FrontStreet(PermitObject):
    def __init__(self,data,model):
        super().__init__(data,model)
    
        self.axis:object = None
    

class Parcel(PermitObject):
    
    def __init__(self,data,model):
        super().__init__(data,model)
        
        self.buildings: List[Building] =  [Building(self.model.select('.IfcBuilding')[0],self.model)]
        self.frontStreet: FrontStreet = self.model.select('.IfcGeographicElement[classification.Identification ="EF_30_60_95"]')[0]

    def depth(self):
        pass

    def area(self):
        pass

    def buildabilityIndex(self):
        pass

    def grossFloorArea(self):
        pass
    
    def alignment(self):
        
        terrainp = projected_meshes([self.data],self.frontStreet.mesh.vertices[np.argmax(self.frontStreet.mesh.vertices[:, 2])])

        streetp = projected_meshes([self.frontStreet],self.frontStreet.mesh.vertices[np.argmax(self.frontStreet.mesh.vertices[:, 2])])

        # Create a KD-Tree for the first mesh vertices
        tree = cKDTree(terrainp.vertices)

        # Initialize arrays to store closest points and distances
        closest_points = []
        distances = []

        # Loop through the vertices of the second mesh
        for vertex in streetp.vertices:
            # Query the KD-Tree to find the nearest point in the first mesh
            distance, index = tree.query(vertex)
            
            # Append the closest point and distance to the arrays
            closest_points.append(terrainp.vertices[index])
            distances.append(distance)

        # Convert lists to NumPy arrays
        closest_points = np.array(closest_points)
        distances = np.array(distances)

        segments = [(closest_points[i], closest_points[i + 1]) for i in range(len(closest_points) - 1)]

        line = trimesh.load_path(segments)
        
        return line


class PermitModel(PermitObject):
    
    def __init__(self, model):
        
        self.model:Model = model
        self.parcels:List[Parcel] = [Parcel(site, self.model) for site in self.model.select('.IfcGeographicElement[classification.Identification ="Co_45"]')]









