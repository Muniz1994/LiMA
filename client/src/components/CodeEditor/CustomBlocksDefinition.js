export const customBlocksDefinition = [{
    "type": "bl_space",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
        {
            "type": "field_label_serializable",
            "name": "NAME",
            "text": "Espaço"
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "field_image",
            "src": "assets/cube-line-icon.svg",
            "width": 40,
            "height": 50,
            "alt": "*",
            "flipRtl": false
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "input_statement",
            "name": "PROPS",
            "align": "RIGHT"
        }
    ],
    "previousStatement": "SPACE",
    "colour": "#33B4E0",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "bl_dwelling",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
        {
            "type": "field_label_serializable",
            "name": "NAME",
            "text": "Fogo"
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "field_image",
            "src": "assets/homeowner-icon.svg",
            "width": 40,
            "height": 50,
            "alt": "*",
            "flipRtl": false
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "input_statement",
            "name": "PROPS",
            "align": "RIGHT"
        }
    ],
    "previousStatement": "DWELLING",
    "colour": "#2C89A8",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "bl_building_storey",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
        {
            "type": "field_label_serializable",
            "name": "NAME",
            "text": "Pavimento"
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "field_image",
            "src": "assets/layer-icon.svg",
            "width": 40,
            "height": 50,
            "alt": "*",
            "flipRtl": false
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "input_statement",
            "name": "PROPS",
            "align": "RIGHT"
        }
    ],
    "previousStatement": "BUILIDINGSTOREY",
    "nextStatement": "SPACE",
    "colour": "#2C89A8",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "bl_building",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
        {
            "type": "field_label_serializable",
            "name": "NAME",
            "text": "Edifício"
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "field_image",
            "src": "assets/building-icon.svg",
            "width": 40,
            "height": 50,
            "alt": "*",
            "flipRtl": false
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "input_statement",
            "name": "PROPS",
            "align": "RIGHT"
        }
    ],
    "previousStatement": "BUILDING",
    "nextStatement": [
        "BUILDINGSTOREY",
        "ELEVATOR",
        "DWELLING",
        "STAIR"
    ],
    "colour": "#21687F",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "bl_front_street",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
        {
            "type": "field_label_serializable",
            "name": "NAME",
            "text": "Via Pública"
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "field_image",
            "src": "assets/road-icon.svg",
            "width": 40,
            "height": 50,
            "alt": "*",
            "flipRtl": false
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "input_statement",
            "name": "PROPS",
            "align": "RIGHT"
        }
    ],
    "previousStatement": "FRONTSTREET",
    "colour": "#21687F",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "bl_parcel",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
        {
            "type": "field_label_serializable",
            "name": "NAME",
            "text": "Parcela"
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "field_image",
            "src": "assets/address-location-icon.svg",
            "width": 40,
            "height": 50,
            "alt": "*",
            "flipRtl": false
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "input_statement",
            "name": "PROPS",
            "align": "RIGHT"
        }
    ],
    "inputsInline": false,
    "nextStatement": [
        "BUILDING",
        "FRONTSTREET"
    ],
    "colour": "#174959",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "bl_elevator",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
        {
            "type": "field_label_serializable",
            "name": "NAME",
            "text": "Elevador"
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "field_image",
            "src": "assets/lift-elevator-icon.svg",
            "width": 40,
            "height": 50,
            "alt": "*",
            "flipRtl": false
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "input_statement",
            "name": "PROPS",

            "align": "RIGHT"
        }
    ],
    "inputsInline": false,
    "previousStatement": "ELEVATOR",
    "colour": "#2C89A8",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "bl_stair",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
        {
            "type": "field_label_serializable",
            "name": "NAME",
            "text": "Escada"
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "field_image",
            "src": "assets/stairs-icon.svg",
            "width": 40,
            "height": 50,
            "alt": "*",
            "flipRtl": false
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "input_statement",
            "name": "PROPS",
            "align": "RIGHT"
        }
    ],
    "inputsInline": false,
    "previousStatement": "STAIR",
    "colour": "#2C89A8",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "pr_space_cat",
    "message0": "%1do espaço",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "PROPERTY",
            "options": [
                [
                    "Classe",
                    "CLASSE"
                ],
                [
                    "Area",
                    "AREA"
                ],
                [
                    "Pé Direito",
                    "CEILINGHEIGHT"
                ]
            ]
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#33B4E0",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "pr_stair_cat",
    "message0": "%1da escada",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "PROPERTY",
            "options": [
                [
                    "Largura do degrau",
                    "THREADLENGTH"
                ],
                [
                    "Altura do degrau",
                    "RISERHEIGHT"
                ],
            ]
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#2C89A8",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "pr_space_num",
    "message0": "%1do espaço",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "PROPERTY",
            "options": [
                [
                    "Area",
                    "AREA"
                ],
                [
                    "Pé Direito",
                    "CEILINGHEIGHT"
                ]
            ]
        },

    ],
    "inputsInline": true,
    "output": null,
    "colour": "#33B4E0",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "pr_dwelling_num",
    "message0": "%1do fogo",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "PROPERTY",
            "options": [
                [
                    "Área bruta",
                    "GROSSAREA"
                ],
                [
                    "Área habitável",
                    "HABITABLEAREA"
                ],
                [
                    "Número de quartos",
                    "BEDROOMNUMBER"
                ],
                [
                    "Número de cozinhas",
                    "KITCHENNUMBER"
                ],
                [
                    "Número de salas",
                    "LIVINGROOMNUMBER"
                ]
            ]
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#2C89A8",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "pr_bs_num",
    "message0": "%1do pavimento",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "PROPERTY",
            "options": [
                [
                    "Área bruta",
                    "GROSSAREA"
                ]
            ]
        },
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#2C89A8",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "class_selector",
    "message0": "Classe:  %1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "NAME",
            "options": [
                [
                    "Vestíbulo",
                    "SL_40_65_94"
                ],
                [
                    "Corredor",
                    "SL_90_10_36"
                ],
                [
                    "Instalação sanitária",
                    "SL_35_80"
                ],
                [
                    "Despensa",
                    "SL_90_50_46"
                ],
                [
                    "Arrecadação",
                    "SL_90_50_39"
                ],
                [
                    "Sala",
                    "SL_45_10_49"
                ],
                [
                    "Cozinha",
                    "SL_45_10_23"
                ],
                [
                    "Quarto casal",
                    "SL_45_10_10"
                ],
                [
                    "Quarto duplo",
                    "SL_45_10_11"
                ],
                [
                    "Quarto simples",
                    "SL_45_10_07"
                ],
                [
                    "Varanda",
                    "SL_45_10_06"
                ]
            ]
        }
    ],
    "output": "String",
    "colour": "#ded77c",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "pr_building_cat",
    "message0": "%1do edifício",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "PROPERTY",
            "options": [
                [
                    "Categoria",
                    "CATEGORY"
                ],
                [
                    "Usos",
                    "USES"
                ]
            ]
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#21687F",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "pr_building_bool",
    "message0": "O edifício é%1",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "PROPERTY",
            "options": [
                [
                    "Nova Construção?",
                    "ISNEWCONSTRUCTION"
                ]
            ]
        },
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#21687F",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "pr_building_num",
    "message0": "%1do edifício",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "PROPERTY",
            "options": [
                [
                    "Altura piso a piso",
                    "FLOORTOFLOORHEIGHT"
                ],
                [
                    "Profundidade de empena",
                    "DEPTH"
                ],
                [
                    "Altura",
                    "HEIGHT"
                ]
            ]
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#21687F",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "pr_parcel_num",
    "message0": "%1da parcela",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "PROPERTY",
            "options": [
                [
                    "Profundidade",
                    "DEPTH"
                ],
                [
                    "Área",
                    "AREA"
                ],
                [
                    "Índice de edificabilidade",
                    "BINDEX"
                ],
                [
                    "Superfície de pavimento",
                    "GROSSFLOORAREA"
                ],
                [
                    "Faixa de implantação",
                    "IMPLANTATIONRANGE"
                ]
            ]
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#174959",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "vf_check",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
        {
            "type": "field_image",
            "src": "https://uxwing.com/wp-content/themes/uxwing/download/user-interface/found-icon.png",
            "width": 30,
            "height": 30,
            "alt": "*",
            "flipRtl": false
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "field_label_serializable",
            "name": "NAME",
            "text": "Check"
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "input_value",
            "name": "NAME"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#DE7C95",
    "tooltip": "",
    "helpUrl": ""
},
{
    'type': 'math_number',
    'message0': '%1',
    'args0': [
        {
            'type': 'field_number',
            'name': 'NUM',
            'value': 0,
        },
    ],
    'output': 'Number',
    "colour": "#DED77C",
    'helpUrl': '',
    'tooltip': '',
    'extensions': ['parent_tooltip_when_inline'],
},
{
    'type': 'math_arithmetic',
    'message0': '%1 %2 %3',
    'args0': [
        {
            'type': 'input_value',
            'name': 'A',
            'check': 'Number',
        },
        {
            'type': 'field_dropdown',
            'name': 'OP',
            'options': [
                ['%{BKY_MATH_ADDITION_SYMBOL}', 'ADD'],
                ['%{BKY_MATH_SUBTRACTION_SYMBOL}', 'MINUS'],
                ['%{BKY_MATH_MULTIPLICATION_SYMBOL}', 'MULTIPLY'],
                ['%{BKY_MATH_DIVISION_SYMBOL}', 'DIVIDE'],
                ['%{BKY_MATH_POWER_SYMBOL}', 'POWER'],
            ],
        },
        {
            'type': 'input_value',
            'name': 'B',
            'check': 'Number',
        },
    ],
    'inputsInline': true,
    "colour": "#46585E",

    'output': 'Number',
    'helpUrl': '%{BKY_MATH_ARITHMETIC_HELPURL}',
    'extensions': ['math_op_tooltip'],
},
{
    'type': 'math_single',
    'message0': '%1 %2',
    'args0': [
        {
            'type': 'field_dropdown',
            'name': 'OP',
            'options': [
                ['%{BKY_MATH_SINGLE_OP_ROOT}', 'ROOT'],
                ['%{BKY_MATH_SINGLE_OP_ABSOLUTE}', 'ABS'],
                ['-', 'NEG'],
                ['ln', 'LN'],
                ['log10', 'LOG10'],
                ['e^', 'EXP'],
                ['10^', 'POW10'],
            ],
        },
        {
            'type': 'input_value',
            'name': 'NUM',
            'check': 'Number',
        },
    ],
    'output': 'Number',
    "colour": "#46585E",
    'helpUrl': '%{BKY_MATH_SINGLE_HELPURL}',
    'extensions': ['math_op_tooltip'],
},
{
    'type': 'text',
    'message0': '%1',
    'args0': [
        {
            'type': 'field_input',
            'name': 'TEXT',
            'text': '',
        },
    ],
    'output': 'String',
    "colour": "#DED77C",
    'helpUrl': '%{BKY_TEXT_TEXT_HELPURL}',
    'tooltip': '%{BKY_TEXT_TEXT_TOOLTIP}',
    'extensions': ['text_quotes', 'parent_tooltip_when_inline'],
},
{
    'type': 'controls_if',
    'message0': '%{BKY_CONTROLS_IF_MSG_IF} %1',
    'args0': [
        {
            'type': 'input_value',
            'name': 'IF0',
            'check': 'Boolean',
        },
    ],
    'message1': '%{BKY_CONTROLS_IF_MSG_THEN} %1',
    'args1': [
        {
            'type': 'input_statement',
            'name': 'DO0',
        },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '#897A7E',
    'helpUrl': '%{BKY_CONTROLS_IF_HELPURL}',
    'suppressPrefixSuffix': true,
    'mutator': 'controls_if_mutator',
    'extensions': ['controls_if_tooltip'],
},
{
    'type': 'logic_compare',
    'message0': '%1 %2 %3',
    'args0': [
        {
            'type': 'input_value',
            'name': 'A',
        },
        {
            'type': 'field_dropdown',
            'name': 'OP',
            'options': [
                ['=', 'EQ'],
                ['\u2260', 'NEQ'],
                ['\u200F<', 'LT'],
                ['\u200F\u2264', 'LTE'],
                ['\u200F>', 'GT'],
                ['\u200F\u2265', 'GTE'],
            ],
        },
        {
            'type': 'input_value',
            'name': 'B',
        },
    ],
    'inputsInline': true,
    'output': 'Boolean',
    'colour': '#897A7E',
    'helpUrl': '%{BKY_LOGIC_COMPARE_HELPURL}',
    'extensions': ['logic_compare', 'logic_op_tooltip'],
},
{
    'type': 'logic_operation',
    'message0': '%1 %2 %3',
    'args0': [
        {
            'type': 'input_value',
            'name': 'A',
            'check': 'Boolean',
        },
        {
            'type': 'field_dropdown',
            'name': 'OP',
            'options': [
                ['%{BKY_LOGIC_OPERATION_AND}', 'AND'],
                ['%{BKY_LOGIC_OPERATION_OR}', 'OR'],
            ],
        },
        {
            'type': 'input_value',
            'name': 'B',
            'check': 'Boolean',
        },
    ],
    'inputsInline': true,
    'output': 'Boolean',
    'colour': '#897A7E',
    'helpUrl': '%{BKY_LOGIC_OPERATION_HELPURL}',
    'extensions': ['logic_op_tooltip'],
},
{
    'type': 'lists_repeat',
    'message0': '%{BKY_LISTS_REPEAT_TITLE}',
    'args0': [
        {
            'type': 'input_value',
            'name': 'ITEM',
        },
        {
            'type': 'input_value',
            'name': 'NUM',
            'check': 'Number',
        },
    ],
    'output': 'Array',
    'colour': '#DED77C',
    'tooltip': '%{BKY_LISTS_REPEAT_TOOLTIP}',
    'helpUrl': '%{BKY_LISTS_REPEAT_HELPURL}',
},
{
    'type': 'lists_length',
    'message0': '%{BKY_LISTS_LENGTH_TITLE}',
    'args0': [
        {
            'type': 'input_value',
            'name': 'VALUE',
            'check': ['String', 'Array'],
        },
    ],
    'output': 'Number',
    'colour': '#DED77C',
    'tooltip': '%{BKY_LISTS_LENGTH_TOOLTIP}',
    'helpUrl': '%{BKY_LISTS_LENGTH_HELPURL}',
},
{
    'type': 'lists_create_empty',
    'message0': '%{BKY_LISTS_CREATE_EMPTY_TITLE}',
    'output': 'Array',
    'colour': '#DED77C',
    'tooltip': '%{BKY_LISTS_CREATE_EMPTY_TOOLTIP}',
    'helpUrl': '%{BKY_LISTS_CREATE_EMPTY_HELPURL}',
},
{
    "type": "value_len",
    "message0": "Número de %1",
    "args0": [
        {
            "type": "input_value",
            "name": "VALUE"
        }
    ],
    "colour": "#ded77c",
    "inputsInline": true,
    "output": null,
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "ch_parcel_buildings",
    "message0": "%1 Edifícios da parcela",
    "args0": [
        {
            "type": "field_image",
            "src": "assets/slideshow-icon.svg",
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
        }
    ],
    "output": null,
    "colour": "#174959",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "ch_parcel_front_street",
    "message0": "%1 Arruamentos da parcela",
    "args0": [
        {
            "type": "field_image",
            "src": "assets/slideshow-icon.svg",
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
        }
    ],
    "output": null,
    "colour": "#174959",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "ch_building_buildingStoreys",
    "message0": "%1 Pavimentos do edifício",
    "args0": [
        {
            "type": "field_image",
            "src": "assets/slideshow-icon.svg",
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
        }
    ],
    "output": null,
    "colour": "#21687f",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "ch_building_elevators",
    "message0": "%1 Elevadores do edifício",
    "args0": [
        {
            "type": "field_image",
            "src": "assets/slideshow-icon.svg",
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
        }
    ],
    "output": null,
    "colour": "#21687f",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "ch_building_stairs",
    "message0": "%1 Escadas do edifício",
    "args0": [
        {
            "type": "field_image",
            "src": "assets/slideshow-icon.svg",
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
        }
    ],
    "output": null,
    "colour": "#21687f",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "ch_building_spaces",
    "message0": "%1 Espaços do edifício",
    "args0": [
        {
            "type": "field_image",
            "src": "assets/slideshow-icon.svg",
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
        }
    ],
    "output": null,
    "colour": "#21687f",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "ch_building_dwellings",
    "message0": "%1 Fogos do edifício",
    "args0": [
        {
            "type": "field_image",
            "src": "assets/slideshow-icon.svg",
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
        }
    ],
    "output": null,
    "colour": "#21687f",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "ch_dwelling_spaces",
    "message0": "%1 Compartimentos do fogo",
    "args0": [
        {
            "type": "field_image",
            "src": "assets/slideshow-icon.svg",
            "width": 15,
            "height": 15,
            "alt": "*",
            "flipRtl": false
        }
    ],
    "output": null,
    "colour": "#2c89a8",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "bl_compart",
    "message0": "%1 %2 %3 %4 %5",
    "args0": [
        {
            "type": "field_label_serializable",
            "name": "NAME",
            "text": "Compartimento"
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "field_image",
            "src": "assets/cube-line-icon.svg",
            "width": 40,
            "height": 50,
            "alt": "*",
            "flipRtl": false
        },
        {
            "type": "input_dummy",
            "align": "CENTRE"
        },
        {
            "type": "input_statement",
            "name": "PROPS",
            "align": "RIGHT"
        }
    ],
    "previousStatement": "SPACE",
    "colour": "#2c89a8",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "pr_compart_cat",
    "message0": "%1do compartimento",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "PROPERTY",
            "options": [
                [
                    "Classe",
                    "CLASSE"
                ],
                [
                    "Area",
                    "AREA"
                ],
                [
                    "Pé Direito",
                    "CEILINGHEIGHT"
                ]
            ]
        }
    ],
    "inputsInline": true,
    "output": null,
    "colour": "#2c89a8",
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "pr_compart_num",
    "message0": "%1do compartimento",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "PROPERTY",
            "options": [
                [
                    "Area",
                    "AREA"
                ],
                [
                    "Pé Direito",
                    "CEILINGHEIGHT"
                ]
            ]
        },

    ],
    "inputsInline": true,
    "output": null,
    "colour": "#2c89a8",
    "tooltip": "",
    "helpUrl": ""
},



]