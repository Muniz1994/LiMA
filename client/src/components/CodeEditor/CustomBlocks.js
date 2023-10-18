import Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';
import { customBlocksDefinition } from './CustomBlocksDefinition';

const parseStatement = (statement) => {

    const regex = /(\w+)\.(\w+)(\(\))?(\.(\w+)(\(\))?)?\s*([<>=]+)\s*(\d+(\.\d+)?)/;


    const parsed_str = statement.match(regex)

    var object
    var propertyName
    var operator
    var value

    if (parsed_str) {

        object = parsed_str[1];
        var prop1 = parsed_str[2];
        var prop2 = parsed_str[5];
        operator = parsed_str[7]
        value = parsed_str[8]

        if (prop2) {

            propertyName = `${prop1}.${prop2}`
        }
        else {
            propertyName = prop1

        }


    }

    return (`${object}, '${propertyName}', '${operator}', ${value}`);

}


Blockly.defineBlocksWithJsonArray(customBlocksDefinition)
// Code generators ##########################################################################################################

pythonGenerator['bl_space'] = function (block) {
    var field_name = block.getFieldValue('NAME');
    var statements_props = pythonGenerator.statementToCode(block, 'PROPS');

    if (statements_props) {
        var code = `for space in building_storey.spaces:\n${statements_props}\n`
    }
    else {
        var code = `for space in building_storey.spaces:\n  pass\n`;
    }

    return code;
};

pythonGenerator['bl_dwelling'] = function (block) {
    var field_name = block.getFieldValue('NAME');
    var statements_props = pythonGenerator.statementToCode(block, 'PROPS');

    if (statements_props) {
        var code = `for dwelling in building.dwellings:\n${statements_props}\n`;
    }
    else {
        var code = `for dwelling in building.dwellings:\n  \n  pass\n`;
    }

    return code;
};

pythonGenerator['bl_building_storey'] = function (block) {
    var field_name = block.getFieldValue('NAME');
    var statements_props = pythonGenerator.statementToCode(block, 'PROPS');

    if (statements_props) {
        var code = `for building_storey in building.buildingStoreys:\n${statements_props}\n`;
    }
    else {
        var code = `for building_storey in building.buildingStoreys:\n  pass\n`;
    }

    return code;
};

pythonGenerator['bl_building'] = function (block) {
    var field_name = block.getFieldValue('NAME');
    var statements_props = pythonGenerator.statementToCode(block, 'PROPS');


    if (statements_props) {
        var code = `for building in parcel.buildings:\n${statements_props}\n`;
    }
    else {
        var code = `for building in parcel.buildings:\n  pass\n`;
    }
    return code;
};

pythonGenerator['bl_front_street'] = function (block) {
    var field_name = block.getFieldValue('NAME');
    var statements_props = pythonGenerator.statementToCode(block, 'PROPS');

    if (statements_props) {
        var code = `for front_street in parcel.frontStreet:\n${statements_props}\n`;
    }
    else {
        var code = `for front_street in parcel.frontStreet:\n  pass\n`;
    }
    return code;
};

pythonGenerator['bl_parcel'] = function (block) {
    var field_name = block.getFieldValue('NAME');
    var statements_props = pythonGenerator.statementToCode(block, 'PROPS');

    if (statements_props) {
        var code = `for parcel in my_permit_model.parcels:\n${statements_props}\n`;
    }
    else {
        var code = `for parcel in my_permit_model.parcels:\n  pass\n`;
    }
    return code;
};

pythonGenerator['bl_elevator'] = function (block) {
    var field_name = block.getFieldValue('NAME');
    var statements_props = pythonGenerator.statementToCode(block, 'PROPS');


    if (statements_props) {
        var code = `for elevator in building.elevators:\n${statements_props}\n`;
    }
    else {
        var code = `for elevator in building.elevators:\n  pass\n`;
    }
    return code;
};

pythonGenerator['bl_stair'] = function (block) {
    var field_name = block.getFieldValue('NAME');
    var statements_props = pythonGenerator.statementToCode(block, 'PROPS');


    if (statements_props) {
        var code = `for stair in building.stairs:\n${statements_props}\n`;
    }
    else {
        var code = `for stair in building.stairs:\n  pass\n`;
    }
    return code;
};

pythonGenerator['bl_compart'] = function (block) {
    var field_name = block.getFieldValue('NAME');
    var statements_props = pythonGenerator.statementToCode(block, 'PROPS');

    if (statements_props) {
        var code = `for space in dwelling.relatedSpaces:\n${statements_props}\n`;
    }
    else {
        var code = `for space in dwelling.relatedSpaces:\n  pass\n`;
    }
    return code;
};

pythonGenerator['pr_space_cat'] = function (block) {
    var dropdown_property = block.getFieldValue('PROPERTY');

    var obj = 'space.';

    switch (dropdown_property) {

        case 'CLASSE':
            var property = obj + 'objectClass';
            break;
    }

    var code = property;
    return [code, pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['pr_compart_cat'] = function (block) {
    var dropdown_property = block.getFieldValue('PROPERTY');

    var obj = 'space.';

    switch (dropdown_property) {

        case 'CLASSE':
            var property = obj + 'objectClass';
            break;
    }

    var code = property;
    return [code, pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['pr_stair_cat'] = function (block) {
    var dropdown_property = block.getFieldValue('PROPERTY');

    var obj = 'stair.';

    switch (dropdown_property) {

        case 'THREADLENGTH':
            var property = obj + 'treadLength';
            break;
        case 'RISERHEIGHT':
            var property = obj + 'riserHeight';
            break;
    }

    var code = property;
    return [code, pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['pr_space_num'] = function (block) {
    var dropdown_property = block.getFieldValue('PROPERTY');

    var obj = 'space.';

    switch (dropdown_property) {

        case 'AREA':
            var property = obj + 'area()';
            break;
        case 'CEILINGHEIGHT':
            var property = obj + 'ceilingHeight()';
            break;

    }

    var code = property;
    return [code, pythonGenerator.ORDER_MEMBER];
};
pythonGenerator['pr_compart_num'] = function (block) {
    var dropdown_property = block.getFieldValue('PROPERTY');

    var obj = 'space.';

    switch (dropdown_property) {

        case 'AREA':
            var property = obj + 'area()';
            break;
        case 'CEILINGHEIGHT':
            var property = obj + 'ceilingHeight()';
            break;

    }

    var code = property;
    return [code, pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['pr_dwelling_num'] = function (block) {
    var dropdown_property = block.getFieldValue('PROPERTY');

    var obj = 'dwelling.';
    switch (dropdown_property) {

        case 'GROSSAREA':
            var property = obj + 'gross_area()';
            break;
        case 'HABITABLEAREA':
            var property = obj + 'habitable_area()';
            break;
        case 'BEDROOMNUMBER':
            var property = obj + 'num_of_bedrooms()';
            break;
        case 'KITCHENNUMBER':
            var property = obj + 'num_of_kitchens()';
            break;
        case 'LIVINGROOMNUMBER':
            var property = obj + 'num_of_living_rooms()';
            break;

    }

    var code = property;
    return [code, pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['pr_bs_num'] = function (block, generator) {
    var dropdown_property = block.getFieldValue('PROPERTY');

    var obj = 'building_storey.';
    switch (dropdown_property) {

        case 'GROSSAREA':
            var property = obj + 'gross_area()';
            break;

    }


    var code = property;
    return [code, pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['pr_building_cat'] = function (block) {
    var dropdown_property = block.getFieldValue('PROPERTY');

    switch (dropdown_property) {
        case 'CATEGORY':
            var property = 'building.category';
            break;
        case 'USES':
            var property = 'building.uses';
            break;
    }

    var code = property;
    return [code, pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['pr_building_bool'] = function (block) {
    var dropdown_property = block.getFieldValue('PROPERTY');

    switch (dropdown_property) {
        case 'ISNEWCONSTRUCTION':
            var property = 'building.isNewConstruction';
            break;
    }

    var code = property;
    return [code, pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['pr_building_num'] = function (block) {
    var dropdown_property = block.getFieldValue('PROPERTY');

    switch (dropdown_property) {

        case 'FLOORTOFLOORHEIGHT':
            var property = 'building.floor_to_floor_height()';
            break;
        case 'DEPTH':
            var property = 'building.depth()';
            break;
        case 'HEIGHT':
            var property = 'building.height()'
            break;
    }

    var code = property;
    return [code, pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['pr_parcel_num'] = function (block) {
    var dropdown_property = block.getFieldValue('PROPERTY');

    var obj = 'parcel.';
    switch (dropdown_property) {

        case 'DEPTH':
            var property = obj + 'depth()';
            break;
        case 'AREA':
            var property = obj + 'area()';
            break;
        case 'BINDEX':
            var property = obj + 'buildabilityIndex()'
            break;
        case 'GROSSFLOORAREA':
            var property = obj + 'grossFloorArea()'
            break;
        case 'IMPLANTATIONRANGE':
            var property = obj + 'building_implantation_range()'
            break;
    }

    var code = property;
    return [code, pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['vf_check'] = function (block) {
    var statements_name = pythonGenerator.valueToCode(block, 'NAME', pythonGenerator.ORDER_NONE);

    var code = `add_check(${parseStatement(statements_name)})\n`;
    return code;
};

pythonGenerator['class_selector'] = function (block) {
    var dropdown_property = block.getFieldValue('NAME');

    var code = `"${dropdown_property}"`;
    return [code, pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['value_len'] = function (block) {
    var value_value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_NONE);
    var code = `${value_value}.__len__()`;
    return [code, pythonGenerator.ORDER_MEMBER];
};

pythonGenerator['ch_parcel_buildings'] = function (block) {
    var code = 'parcel.buildings';
    return [code, pythonGenerator.ORDER_NONE];
};

pythonGenerator['ch_parcel_front_street'] = function (block) {
    var code = 'parcel.frontStreet';
    return [code, pythonGenerator.ORDER_NONE];
};

pythonGenerator['ch_building_buildingStoreys'] = function (block) {
    var code = 'building.buildingStoreys';
    return [code, pythonGenerator.ORDER_NONE];
};

pythonGenerator['ch_building_elevators'] = function (block) {
    var code = 'building.elevators';
    return [code, pythonGenerator.ORDER_NONE];
};

pythonGenerator['ch_building_stairs'] = function (block) {
    var code = 'building.stairs';
    return [code, pythonGenerator.ORDER_NONE];
};

pythonGenerator['ch_building_spaces'] = function (block) {
    var code = 'building.spaces';
    return [code, pythonGenerator.ORDER_NONE];
};

pythonGenerator['ch_building_dwellings'] = function (block) {
    var code = 'building.dwellings';
    return [code, pythonGenerator.ORDER_NONE];
};

pythonGenerator['ch_dwelling_spaces'] = function (block) {
    var code = 'dwelling.relatedSpaces';
    return [code, pythonGenerator.ORDER_NONE];
};








