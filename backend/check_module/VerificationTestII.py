import time

from model.CheckModel import *
from model.PermitModel import *


# Start timer
start_time = time.time()

def add_check(object, attribute_or_method, comparison, compared_value):
    # Ensure that the comparison parameter is one of "=, >, >=, <, <="
    if comparison not in {'=', '>', '>=', '<', '<='}:
        raise ValueError("Invalid comparison operator")

    try:
        # Split the attribute_or_method into attribute and potential '__len__'
        property = attribute_or_method.rsplit(".")
        
        if len(property) > 1:
            attr, attr2 = property
        else:
            attr = property[0]
        
        # Get the attribute or method value from the object
        value = getattr(object, attr)

        # If it's a callable (method), call it to get the value
        if callable(value):
            value = value()

        # Handle the special case of comparing the length
        if attribute_or_method.endswith('.__len__'):
            length = len(value)
            value = length
        else:
            length = None

        # Perform the specified comparison
        if comparison == '=':
            result = value == compared_value
        elif comparison == '>':
            result = value > compared_value
        elif comparison == '>=':
            result = value >= compared_value
        elif comparison == '<':
            result = value < compared_value
        elif comparison == '<=':
            result = value <= compared_value
            
        if hasattr(object,'GlobalId'):
            
            if object.is_a('IfcSpatialStructureElement'):
                
                name = object.LongName
                
            else:
                name= object.Name
            
            result_dict ={
                "result":result,
                "object_id": object.GlobalId,
                "object_name": name,
                "value":round(value,1)
            }
            
        else:
            
            result_dict ={
                "result":result,
                "object_name": object.Name,
                "value":round(value,1)
            }
            
        
        print(result_dict)
        
        return result_dict
    except AttributeError:
        raise AttributeError(f"'{object.__class__.__name__}' object has no attribute '{attribute_or_method}'")

class Report:
    
    def __init__(self) -> None:
        
        self.checks_executed = 0
    
    def add_check_element(self, verification_object,check_type,check_value, referencia="nana", objeto="nana", element_name="dsad"):
    
        match check_type:
            case ">":
                result =  verification_object > check_value
            case ">=":
                result =  verification_object >= check_value
            case "<":
                result =  verification_object < check_value
            case "<=":
                result =  verification_object <= check_value
            case "!=":
                result =   verification_object != check_value
            case "contained":
                result =  all(verification_object.contains(check_value.vertices))
                
        self.checks_executed += 1
        
        message = '''
        Dados da verificação
        
        # Verificação de: %s
        
        
         -> Referência: %s
        
         -> Número da verificação: %s
        
         -> objeto verificado:%s
         -> valor calculado: %s
         -> Requisito regulamentar: %s %s
        
        Resultado: %s
        '''%(objeto, referencia,self.checks_executed,element_name,verification_object, check_type, check_value, result )
        
        print(message)
        

    def add_check(self, verification_object_list,check_type,check_value, referencia="nana", objeto="nana"):
        
        for element in verification_object_list:
            print(self.add_check_element(self, element,check_type,check_value, referencia, objeto))
        
relatorio = Report()
        
room_types = {
    "vestibulo":"SL_40_65_94",
    "corredor":"SL_90_10_36",
    "instalacaoSanitaria":"SL_35_80",
    "despensa":"SL_90_50_46",
    "arrecadacao":"SL_90_50_39",
    "sala":"SL_45_10_49",
    "cozinha":"SL_45_10_23",
    "quartoCasal":"SL_45_10_10",
    "quartoDuplo":"SL_45_10_11",
    "quartoSimples":"SL_45_10_07",
    "varanda":"SL_45_10_06",
}



my_model = CheckModel(r"G:/Other computers/Meu laptop/11_DICE/00-THESIS/IFC/EDFTeste/BuildingTeste.v52.ifc")

my_permit = PermitModel(my_model)

# ------------------------------------------------------------------------------
# RGEU, Artigo 46.º 7 
# ------------------------------------------------------------------------------

'''Os degraus das escadas das edificações para habitação colectiva terão a largura (cobertor) mínima de 0,25 m e a altura (espelho) máxima de 0,193 m. No entanto, nos edifícios de três, quatro ou cinco pisos e sempre que não seja instalado ascensor, a largura (cobertor) mínima será de 0,280m e a altura (espelho) máxima será de 0,175m.
'''
for parcel in my_permit.parcels:
    for building in parcel.buildings:
        if building.category == "habitação coletiva" and building.buildingStoreys.__len__() < 5:
            
            for stair in building.stairs:
                
                add_check(stair, 'treadLength', '>=', 0.25)
                
                add_check(stair, 'riserHeight', '>=', 0.193)
                
        if building.category == "habitação coletiva" and building.buildingStoreys.__len__() >= 3 and building.buildingStoreys.__len__() <= 5 and building.elevators.__len__() >= 1:
            
            for stair in building.stairs:
                
                add_check(stair, 'treadLength', '>=', 0.28)
                
                add_check(stair, 'riserHeight', '>=', 0.175)

# ------------------------------------------------------------------------------
# RGEU, Artigo 65.º 1 e 2 
# ------------------------------------------------------------------------------

'''A altura mínima, piso a piso, em edificações destinadas à habitação é de 2,70m (27m), não podendo ser o pé-direito livre mínimo inferior a 2,40 m (24m).

Excepcionalmente, em vestíbulos, corredores, instalações sanitárias, despensas e arrecadações será admissível que o pé-direito se reduza ao mínimo de 2,20m (22m).'''

for parcel in my_permit.parcels:
    for building in parcel.buildings:
        if building.category == "habitação coletiva" or building.category == "moradia unifamiliar":
            
            add_check(building, 'floor_to_floor_height', '>=', 2.7)
            
            for storey in building.buildingStoreys:
                
                for space in storey.spaces:
                
                    add_check(space, 'ceilingHeight', '>=', 2.4)
                    
        if building.category == "habitação coletiva" or building.category == "moradia unifamiliar":
            
            for storey in building.buildingStoreys:
                
                for space in storey.spaces:
          
                    if space.objectClass in ["SL_40_65_94","SL_90_10_36","SL_35_80","SL_90_50_46","SL_90_50_39"]:
                
                        add_check(space, 'ceilingHeight', '>=', 2.2)
                        
# ------------------------------------------------------------------------------
# RGEU, Artigo 66.º 1 
# ------------------------------------------------------------------------------

for parcel in my_permit.parcels:
    for building in parcel.buildings:

            
        for dwelling in building.dwellings:
        
            
            if dwelling.num_of_bedrooms() == 0:
                
                add_check(dwelling, 'relatedSpaces.__len__', '>=', 2) 

                add_check(dwelling, 'num_of_living_rooms', '>=', 1)
                
                add_check(dwelling, 'num_of_kitchens', '>=', 1)
        
                
                for space in dwelling.relatedSpaces:
                    
                    match space.objectClass:
                        
                        case "SL_45_10_49":
                    
                            add_check(space, 'area', '>=', 10)
                            
                        case "SL_45_10_23":
                    
                            add_check(space, 'area', '>=', 6)
                            
            if dwelling.num_of_bedrooms() == 1:
                
                add_check(dwelling, 'relatedSpaces.__len__', '>=', 3) 

                add_check(dwelling, 'num_of_living_rooms', '>=', 1)
                
                add_check(dwelling, 'num_of_kitchens', '>=', 1)
        
                
                for space in dwelling.relatedSpaces:
                    
                    match space.objectClass:
                        
                        case "SL_45_10_49":
                    
                            add_check(space, 'area', '>=', 10)
                            
                        case "SL_45_10_23":
                    
                            add_check(space, 'area', '>=', 6)
                            
                        case "SL_45_10_10":
                    
                            add_check(space, 'area', '>=', 10.5)
                            
            if dwelling.num_of_bedrooms() == 2:
                
                add_check(dwelling, 'relatedSpaces.__len__', '>=', 4) 

                add_check(dwelling, 'num_of_living_rooms', '>=', 1)
                
                add_check(dwelling, 'num_of_double_rooms', '>=', 1)
                
                add_check(dwelling, 'num_of_kitchens', '>=', 1)
        
                for space in dwelling.relatedSpaces:
                    
                    match space.objectClass:
                        
                        case "SL_45_10_49":
                    
                            add_check(space, 'area', '>=', 10)
                            
                        case "SL_45_10_23":
                    
                            add_check(space, 'area', '>=', 6)
                            
                        case "SL_45_10_10":
                    
                            add_check(space, 'area', '>=', 10.5)
                            
                        case "SL_45_10_11":
                    
                            add_check(space, 'area', '>=', 9)

# -------------------------------------------------------------------           
# RGEU, Artigo 67.º 1 
# ------------------------------------------------------------------- 

for parcel in my_permit.parcels:
    for building in parcel.buildings:

        for dwelling in building.dwellings:
             
            if dwelling.num_of_bedrooms() == 0:
                
                add_check(dwelling, 'gross_area', '>=', 35)
          
            if dwelling.num_of_bedrooms() == 1:
                    
                add_check(dwelling, 'gross_area', '>=', 52)
                
            if dwelling.num_of_bedrooms() == 2:
                
                add_check(dwelling, 'gross_area', '>=', 72)
                
            if dwelling.num_of_bedrooms() == 3:
                
                add_check(dwelling, 'gross_area', '>=', 91)
                
            if dwelling.num_of_bedrooms() == 4:
                
                add_check(dwelling, 'gross_area', '>=', 105)
                
            if dwelling.num_of_bedrooms() == 5:
                
                add_check(dwelling, 'gross_area', '>=', 122)
                
            if dwelling.num_of_bedrooms() == 6:
                
                add_check(dwelling, 'gross_area', '>=', 134)
                
            if dwelling.num_of_bedrooms() > 6:
                
                add_check(dwelling, 'habitable_area', '>=', 83.75)

# -------------------------------------------------------------------           
# PDM de Vila Nova de Gaia, Artigo 24.º 1 a) 
# ------------------------------------------------------------------- 

'''As instalações directamente adstritas às explorações agrícolas, pecuárias ou florestais, devem respeitar as seguintes condições de edificabilidade:
a) As edificações devem ter uma cércea máxima 2 pisos e uma altura máxima de 6,5m, salvo instalações técnicas devidamente justificadas;'''


for parcel in my_permit.parcels:
    for building in parcel.buildings:
        
        if set(["exploração agrícola", "exploração pecuária", "exploração florestal"]) & set(building.uses):
            
            add_check(building, 'height', '<=', 6.5)
            
            add_check(building, 'buildingStoreys.__len__', '<=', 2)

# ------------------------------------------------------------------- 
# PDM de Vila Nova de Gaia, Artigo 42.º 1 
# ------------------------------------------------------------------- 

'''As novas construções principais implantar-se-ão dentro de uma faixa de 35m, confinante com o espaço público, sem prejuízo do previsto nos números seguintes.'''

for parcel in my_permit.parcels:

    add_check(parcel, 'building_implantation_range', '<=', 35)

    
# ------------------------------------------------------------------- 
# RPDML Artigo 42.º 7 e) 
# ------------------------------------------------------------------- 

'''Índice de edificabilidade, em parcelas com uma profundidade superior a 14 metros e/ou com uma área de lote ou parcela superior a 130m2: 
i)	1,0 em lote ou parcela com área inferior a 150m2; 
ii)	ii) 0,7 em lote ou parcela com área igual ou superior a 150m2, sendo sempre permitido um mínimo de 150m2 de superfície de pavimento.
'''

for parcel in my_permit.parcels:
            
    if parcel.depth() > 14 or parcel.area() > 130:
        
        if parcel.area() < 150:
            
            add_check(parcel, 'buildabilityIndex', '<=', 1)
                
        if parcel.area() >= 150:
            
            add_check(parcel, 'buildabilityIndex', '<=', 0.7)
                
            add_check(parcel, 'grossFloorArea', '>=', 150)
            
# -------------------------------------------------------------------          
# RPDML Artigo 43.º 1 
# ------------------------------------------------------------------- 

'''Sem prejuízo do disposto nos números seguintes, a profundidade máxima das empenas, sem considerar as varandas e os corpos balançados, é de 15 metros, com exceção dos estabelecimentos hoteleiros e equipamentos de utilização coletiva, cuja empena pode atingir os 18 metros.'''
    
for parcel in my_permit.parcels:
    for building in parcel.buildings: 
            
        if building.category in ["estabelecimento hoteleiro", "equipamento coletivo"]:
            
            add_check(building, 'depth', '<=', 18)   
        else:
            add_check(building, 'depth', '<=', 15)
            
# End timer
end_time = time.time()

# Calculate elapsed time
elapsed_time = end_time - start_time
print("Elapsed time: ", elapsed_time) 