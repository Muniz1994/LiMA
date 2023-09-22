from model.apiv2 import *

model = Model()

parcel = Parcel()

building = Building(model)

def distance(obj_1,obj_2):
    pass

def check_element(comp_element,check_attribute,check_type,check_value):
    
    verification_object = getattr(comp_element,check_attribute)
    
    id = comp_element.ifc.GlobalId
    
    match check_type:
        case ">":
            return [id, verification_object > check_value]
        case ">=":
            return [id, verification_object >= check_value]
        case "<":
            return [id, verification_object < check_value]
        case "<=":
            return [id, verification_object <= check_value]
        case "!=":
            return [id, verification_object != check_value]
        case "contained":
            return [id, all(verification_object.contains(check_value.vertices))]

def check(comp_element_list,check_attribute,check_type,check_value):
    
    results = []
    
    for element in comp_element_list:
        results.append(check(element, check_attribute, check_type, check_value))

          

# RGEU, Artigo 46.º 7 ###################################################################################################

if building.category == "habitação coletiva" and len(building.buildingStoreys) < 3:
    
    for stair in building.stairs:
        
        check(stair,"treadLength", ">=", 0.25)
        
        check(stair,"riserHeight", ">=", 0.193)
        
if building.category == "habitação coletiva" and len(building.buildingStoreys) >= 3 and len(building.buildingStoreys) <= 5 and building.elevators == None:
    
    for stair in building.stairs:
        
        check(stair,"treadLength", ">=", 0.280)
        
        check(stair,"riserHeight", ">=", 0.175)
    
# // RGEU, Artigo 65.º 1 e 2 ###################################################################################################

if building.category == "habitação coletiva" or building.category == "moradia unifamiliar":
    
    for storey in building.buildingStoreys:
        
        check(storey.floorToFloorHeight(),">=",2.7)
        
        for space in storey.spaces:
        
            check(space.ceilingHeight(),">=",2.4)
            
if building.category == "habitação coletiva" or building.category == "moradia unifamiliar":
    
    for storey in building.buildingStoreys:
        
        for space in storey.spaces:
            
            if space.objectClass in ["vestíbulo","corredor","instalação sanitária","despensa","arrecadação"]:
        
                check(space.ceilingHeight(),">=",2.4)
             

# // RGEU, Artigo 66.º 1 ###################################################################################################

for storey in building.buildingStoreys:
    
    for dwelling in storey.dwellings:
        
        num_of_bedrooms = 0
        
        for space in dwelling.spaces:
            
            if space.objectClass == "bedroom":
                
                num_of_bedrooms +=1
        
        if num_of_bedrooms == 0:
            
            check(len(dwelling.spaces),">=",2)
            
            num_sala = 0
            num_cozinha = 0    
            
            for space in dwelling.spaces:
                
                
                if space.objectClass == "sala":
                    
                    check(space.area(),">=",10)
                    
                    num_sala += 1
                    
                if space.objectClass == "cozinha":
                    
                    check(space.area(),">=",6)
                    
                    num_cozinha += 1

            check(num_sala,">=",1)
            
            check(num_cozinha,">=",1)
            
        if num_of_bedrooms == 1:
            
            check(len(dwelling.spaces),">=",3)
            
            num_sala = 0
            num_cozinha = 0  
            num_quarto_casal = 0
            
            for space in dwelling.spaces:
                
                if space.objectClass == "quarto casal":
                    
                    check(space.area(),">=",10.5)
                    
                    num_quarto_casal += 1
                
                if space.objectClass == "sala":
                    
                    check(space.area(),">=",10)
                    
                    num_sala += 1
                    
                if space.objectClass == "cozinha":
                    
                    check(space.area(),">=",6)
                    
                    num_cozinha += 1
                    
            check(num_quarto_casal,">=",1)
            
            check(num_sala,">=",1)
            
            check(num_cozinha,">=",1)
            
        if num_of_bedrooms == 2:
            
            check(len(dwelling.spaces),">=",4)
            
            num_sala = 0
            num_cozinha = 0  
            num_quarto_casal = 0
            num_quarto_duplo = 0
            
            for space in dwelling.spaces:
                
                if space.objectClass == "quarto duplo":
                    
                    check(space.area(),">=",9)
                    
                    num_quarto_duplo += 1
                
                if space.objectClass == "quarto casal":
                    
                    check(space.area(),">=",10.5)
                    
                    num_quarto_casal += 1
                
                if space.objectClass == "sala":
                    
                    check(space.area(),">=",12)
                    
                    num_sala += 1
                    
                if space.objectClass == "cozinha":
                    
                    check(space.area(),">=",6)
                    
                    num_cozinha += 1
                    
            check(num_quarto_casal,">=",1)
            
            check(num_quarto_duplo,">=",1)
            
            check(num_sala,">=",1)
            
            check(num_cozinha,">=",1)

# // RGEU, Artigo 67.º 1 ###################################################################################################


# // PDM de Vila Nova de Gaia, Artigo 24.º 1 a) ###################################################################################################

if "exploração agrícola" in building.uses or "exploração pecuária" in building.uses or "exploração florestal" in building.uses:
    
    check(len(building.buildingStoreys),"<=",6.5)
    
    check(building.height(),"<=",2)
# // PDM de Vila Nova de Gaia, Artigo 41.º 1 ###################################################################################################

# distances = trimesh.proximity.ProximityQuery(terrain.mesh).signed_distance([street.mesh.centroid])
check(building.height(),"<=",distance(parcel.frontStreet.axis, building.alignment()))
    
num_above_floor_spaces = 0

for floor in building.buildingStoreys:
    if floor.isAboveGround:
        num_above_floor_spaces += 1
        
check(num_above_floor_spaces, "<=", 6)


# // PDM de Vila Nova de Gaia, Artigo 42.º 1 ###################################################################################################
if building.isNewConstruction == True:
    
    check(building.footprint,"containedIn", )

# // RPDML Artigo 42.º 7 e) ###################################################################################################

if parcel.depth > 14 or parcel.area() > 130:
    
    if parcel.area() < 150:
        
        check(parcel.buildabilityIndex(),">=",1)
            
    if parcel.area() >= 150:
        
        check(parcel.buildabilityIndex(),">=",0.7)
            
        check(parcel.grossFloorArea(),">=", 150)

# // RPDML Artigo 43.º 1 ###################################################################################################
    
    
if building.category == "estabelecimento hoteleiro":
    check(building.depth(),"<=",18)   
else:
    check(building.depth(),"<=",15)
