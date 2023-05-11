class Room:
    def __init__(self, name, use, category, area, usable_height):
        self.use = use
        self.category = category
        self.area = area
        self.usable_height = usable_height


class Building:
    """
    The goal of this class is to provide a soure of information to be checked
    almost as a conceptual version of the model.

    Ultimately, the information of this class can come from calls to an API:

    self.rooms = <call to API>
    """

    def __init__(self, zone):
        self.rooms = [
            Room("Room_1", "double bedroom", "living_quarter", 10, 2.3),
            Room("Room_2", "double bedroom", "living_quarter", 11, 2.8),
        ]
        self.zone = zone
