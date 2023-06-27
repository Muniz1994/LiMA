import ifcopenshell
from ifcopenshell.util.selector import Selector
import ifcopenshell.geom
import multiprocessing

from ifcopenshell.ifcopenshell_wrapper import TriangulationElement



class Building:
    def __init__(self, path):
        self.model = ifcopenshell.open(path)

        self.parser = Selector()

    def select(self, query):
        return self.parser.parse(self.model, query)
    
    def load_geometry(self):

        settings = ifcopenshell.geom.settings()

        iterator = ifcopenshell.geom.iterator(settings, self.model, multiprocessing.cpu_count())

        geometry_dict = {}

        if iterator.initialize():

            while True:

                shape = iterator.get()

                geometry_dict[shape.guid] = shape.product
                if not iterator.next():
                    break

        return(geometry_dict)


