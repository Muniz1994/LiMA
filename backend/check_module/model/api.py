import ifcopenshell
from ifcopenshell.util.selector import Selector
import ifcopenshell.geom
import multiprocessing
from trimesh import Trimesh
import sys

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

        # Since the lists are flattened, you may prefer to group them per face like so depending on your geometry kernel
        grouped_verts = [
            [verts[i], verts[i + 1], verts[i + 2]] for i in range(0, len(verts), 3)
        ]

        faces = self.faces

        # Since the lists are flattened, you may prefer to group them per face like so depending on your geometry kernel
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
    
class Building:
    def __init__(self, path):

        self.model = ifcopenshell.open(path)

        self.parser = Selector()

        self.model.geometry = self.load_geometry()

    def select(self, query):

        query_result = self.parser.parse(self.model, query)

        return([Element(res, self.model.geometry[res.GlobalId].geometry.mesh) if res.Representation is not None else Element(res) for res in query_result] if query_result else None)

    def load_geometry(self):

        settings = ifcopenshell.geom.settings()

        settings.set(settings.USE_WORLD_COORDS, True)

        iterator = ifcopenshell.geom.iterator(settings, self.model, multiprocessing.cpu_count())

        geometry_dict = {}

        if iterator.initialize():

            while True:

                shape = iterator.get()


                geometry_dict[shape.guid] = Shape(shape)


                if not iterator.next():
                    break


        return(geometry_dict)


