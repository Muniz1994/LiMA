import './CustomBlocks.js'

export var toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Modelo",
            "colour": "#33B4E0",
            "contents": [
                {
                    "kind": "category",
                    "name": "Parcela",
                    "colour": "#174959",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "bl_parcel"
                        },
                        {
                            "kind": "block",
                            "type": "pr_parcel_num"
                        },
                        {
                            "kind": "block",
                            "type": "ch_parcel_buildings"
                        },
                        {
                            "kind": "block",
                            "type": "ch_parcel_front_street"
                        },
                    ]
                },
                {
                    "kind": "category",
                    "name": "Via pública",
                    "colour": "#21687f",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "bl_front_street"
                        },
                    ]
                },
                {
                    "kind": "category",
                    "name": "Edifício",
                    "colour": "#21687f",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "bl_building"
                        },
                        {
                            "kind": "block",
                            "type": "pr_building_cat"
                        },
                        {
                            "kind": "block",
                            "type": "pr_building_num"
                        },
                        {
                            "kind": "block",
                            "type": "pr_building_bool"
                        },
                        {
                            "kind": "block",
                            "type": "ch_building_buildingStoreys"
                        },
                        {
                            "kind": "block",
                            "type": "ch_building_elevators"
                        },
                        {
                            "kind": "block",
                            "type": "ch_building_stairs"
                        },
                        {
                            "kind": "block",
                            "type": "ch_building_spaces"
                        },
                        {
                            "kind": "block",
                            "type": "ch_building_dwellings"
                        },
                    ]
                },
                {
                    "kind": "category",
                    "name": "Pavimento",
                    "colour": "#2c89a8",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "bl_building_storey"
                        },
                        {
                            "kind": "block",
                            "type": "pr_bs_num"
                        },
                    ]
                },
                {
                    "kind": "category",
                    "name": "Elevador",
                    "colour": "#2c89a8",
                    "contents": [{
                        "kind": "block",
                        "type": "bl_elevator"
                    },]
                },
                {
                    "kind": "category",
                    "name": "Escada",
                    "colour": "#2c89a8",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "bl_stair"
                        },
                        {
                            "kind": "block",
                            "type": "pr_stair_cat"
                        },
                    ]
                },
                {
                    "kind": "category",
                    "name": "Espaço",
                    "colour": "#33b4e0",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "bl_space"
                        },
                        {
                            "kind": "block",
                            "type": "pr_space_cat"
                        },
                        {
                            "kind": "block",
                            "type": "pr_space_num"
                        },
                    ]
                },
                {
                    "kind": "category",
                    "name": "Fogo",
                    "colour": "#2c89a8",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "bl_dwelling"
                        },
                        {
                            "kind": "block",
                            "type": "pr_dwelling_num"
                        },
                        {
                            "kind": "block",
                            "type": "ch_dwelling_spaces"
                        },
                        {
                            "kind": "block",
                            "type": "bl_compart"
                        },
                        {
                            "kind": "block",
                            "type": "pr_compart_cat"
                        },
                        {
                            "kind": "block",
                            "type": "pr_compart_num"
                        },
                    ]
                },
            ]
        },
        {
            "kind": "sep"
        },
        {
            "kind": "category",
            "name": "Lógica",
            "colour": "#897a7e",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_if"
                },
                {
                    "kind": "block",
                    "type": "logic_compare"
                },
                {
                    "kind": "block",
                    "type": "logic_operation"
                },
            ]
        },
        {
            "kind": "category",
            "name": "Verificação",
            "colour": "#de7c95",
            "contents": [
                {
                    "kind": "block",
                    "type": "vf_check"
                },
            ]
        },
        {
            "kind": "category",
            "name": "Valores",
            "colour": "#ded77c",
            "contents": [
                {
                    "kind": "block",
                    "type": "text"
                },
                {
                    "kind": "block",
                    "type": "math_number"
                },
                {
                    "kind": "block",
                    "type": "class_selector"
                },
                {
                    "kind": "block",
                    "type": "lists_create_with"
                },
            ]
        },
        {
            "kind": "category",
            "name": "Matemática",
            "colour": "#46585e",
            "contents": [
                {
                    "kind": "block",
                    "type": "math_arithmetic"
                },
                {
                    "kind": "block",
                    "type": "value_len"
                },
            ]
        }
    ]
}