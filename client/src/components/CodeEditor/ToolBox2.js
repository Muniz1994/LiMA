import './CustomBlocks.js'

export var toolbox = '<?xml version="1.0"?><xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none"><category name="Modelo" colour="#33B4E0"><category name="Parcela" colour="#174959"><block type="bl_parcel" deletable="false" movable="false" editable="false"><field name="NAME">Parcela</field></block><block type="pr_parcel_num"><field name="PROPERTY">DEPTH</field><field name="COMPARISON">EQUAL</field></block></category><category name="ViaPublica" colour="#21687F"><block type="bl_front_street" deletable="false" movable="false" editable="false"><field name="NAME">Via Pública</field></block></category><category name="Edificio" colour="#21687F"><block type="bl_building" deletable="false" movable="false" editable="false"><field name="NAME">Edifício</field></block><block type="pr_building_cat" deletable="false" movable="false" editable="false"><field name="PROPERTY">CATEGORY</field><field name="COMPARISON">EQUAL</field></block><block type="pr_building_bool" deletable="false" movable="false" editable="false"><field name="PROPERTY">ISNEWCONSTRUCTION</field><field name="COMPARISON">TRUE</field></block><block type="pr_building_num" deletable="false" movable="false" editable="false"><field name="PROPERTY">FLOORTOFLOORHEIGHT</field><field name="COMPARISON">EQUAL</field></block></category><category name="Pavimento" colour="#2C89A8"><block type="bl_building_storey" deletable="false" movable="false" editable="false"><field name="NAME">Pavimento</field></block><block type="pr_bs_num" deletable="false" movable="false" editable="false"><field name="PROPERTY">GROSSAREA</field><field name="PROPERTY">EQUAL</field></block></category><category name="Elevador" colour="#2C89A8"><block type="bl_elevator" deletable="false" movable="false" editable="false"><field name="NAME">Elevador</field></block></category><category name="Escada" colour="#2C89A8"><block type="bl_stair"><field name="NAME">Escada</field></block><block type="pr_stair_cat"/></category><category name="Espaço" colour="#33B4E0"><block type="bl_space" deletable="false" movable="false" editable="false"><field name="NAME">Espaço</field></block><block type="pr_space_cat" deletable="false" movable="false" editable="false"><field name="PROPERTY">CLASSE</field></block><block type="class_selector"/><block type="pr_space_num" deletable="false" movable="false" editable="false"><field name="PROPERTY">AREA</field><field name="PROPERTY">EQUAL</field></block></category><category name="Fogo" colour="#2C89A8"><block type="bl_dwelling" deletable="false" movable="false" editable="false"><field name="NAME">Fogo</field></block><block type="pr_dwelling_num" deletable="false" movable="false" editable="false"><field name="PROPERTY">GROSSAREA</field><field name="PROPERTY">EQUAL</field></block></category></category><category name="Lógica" colour="#897A7E"><block type="controls_if"/><block type="logic_operation"><field name="OP">AND</field></block><block type="logic_operation"><field name="OP">AND</field></block></category><category name="Verificação" colour="#DE7C95"><block type="vf_check"><field name="NAME">Check</field><field name="IsVisual">TRUE</field></block></category><category name="Valores" colour="#DED77C"><block type="text"><field name="TEXT"/></block><block type="math_number"><field name="NUM">0</field></block><block type="lists_create_with"><mutation items="3"/></block><block type="lists_length"/></category><category name="Matemática" colour="#46585E"><block type="math_arithmetic"><field name="OP">ADD</field></block><block type="math_single"><field name="OP">ROOT</field></block></category></xml>'