import math
import ifcopenshell
import ifcopenshell.geom

class GeometricTools:

    """
    a class containing geometric operations
    """

    def __init__(self):
        pass

    @staticmethod
    def distance(direction, type, elem_a, elem_b):
        """gets the distance between two elements"""

        directions = ["vertical", "horizontal"]

        types = ["i-i","e-i","e-e","i-e"]


        if direction == "vertical":

            verts_a_z = GeometricTools.get_vertices(elem_a)
            verts_b_z = GeometricTools.get_vertices(elem_b)

            max_a_z = GeometricTools.get_max_coordinate(verts_a_z, "Z")
            max_b_z = GeometricTools.get_max_coordinate(verts_b_z, "Z")

            return math.sqrt((max_a_z - max_b_z) ** 2)

        if direction == "horizontal":
            pass
        if direction == "3d":
            pass

    @staticmethod
    def distance_2(direction, point_a, point_b):
        """gets the distance between two elements"""

        if direction == "vertical":
            return math.sqrt((point_a - point_b) ** 2)

        if direction == "horizontal":
            pass
        if direction == "3d":
            pass

    @staticmethod
    def get_vertices(shape):

        verts = (
            shape.geometry.verts
        )  # X Y Z of vertices in flattened list e.g. [v1x, v1y, v1z, v2x, v2y, v2z, ...]

        # Since the lists are flattened, you may prefer to group them per face like so depending on your geometry kernel
        grouped_verts = [
            [verts[i], verts[i + 1], verts[i + 2]] for i in range(0, len(verts), 3)
        ]

        return grouped_verts

    @staticmethod
    def get_faces(shape):

        faces = (
            shape.geometry.faces
        )  # Indices of vertices per triangle face e.g. [f1v1, f1v2, f1v3, f2v1, f2v2, f2v3, ...]

        # Since the lists are flattened, you may prefer to group them per face like so depending on your geometry kernel
        grouped_faces = [
            [faces[i], faces[i + 1], faces[i + 2]] for i in range(0, len(faces), 3)
        ]


        return grouped_faces
    
    @staticmethod
    def get_verts_n_faces(shape):

        faces = (
            shape.geometry.faces
        )  # Indices of vertices per triangle face e.g. [f1v1, f1v2, f1v3, f2v1, f2v2, f2v3, ...]

        # Since the lists are flattened, you may prefer to group them per face like so depending on your geometry kernel
        grouped_faces = [
            [faces[i], faces[i + 1], faces[i + 2]] for i in range(0, len(faces), 3)
        ]

        verts = (
            shape.geometry.verts
        )  # X Y Z of vertices in flattened list e.g. [v1x, v1y, v1z, v2x, v2y, v2z, ...]

        # Since the lists are flattened, you may prefer to group them per face like so depending on your geometry kernel
        grouped_verts = [
            [verts[i], verts[i + 1], verts[i + 2]] for i in range(0, len(verts), 3)
        ]

        return grouped_verts, grouped_faces

    @staticmethod
    def get_min_coordinate(vertices, axis):
        if axis == "X":
            return min([i[0] for i in vertices])
        if axis == "Y":
            return min([i[1] for i in vertices])
        if axis == "Z":
            return min([i[2] for i in vertices])

    @staticmethod
    def get_max_coordinate(vertices, axis):
        if axis == "X":
            return max([i[0] for i in vertices])
        if axis == "Y":
            return max([i[1] for i in vertices])
        if axis == "Z":
            return max([i[2] for i in vertices])

    # Estes para baixo estão mais relacionados com verificações urbanísticas ao invés de geometria pura
    @staticmethod
    def get_highest_element(list_of_elements):
        pair_list_of_heights = []

        for element in list_of_elements:
            try:
                pair_list_of_heights.append(
                    [
                        element,
                        GeometricTools.get_max_coordinate(
                            GeometricTools.get_vertices(element), "Z"
                        ),
                    ]
                )
            except:
                pass

        highest_element = GeometricTools.get_max_element(pair_list_of_heights)

        return highest_element

    @staticmethod
    def get_max_element(elements_list):
        # initialize the max value and element
        max_value = float("-inf")
        max_element = None

        # loop through each inner list and update the max value and element
        for element, value in elements_list:
            if value > max_value:
                max_value = value
                max_element = element

        # return the max element
        return max_element
