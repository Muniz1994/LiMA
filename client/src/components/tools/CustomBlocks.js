import Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python';
import { javascriptGenerator } from 'blockly/javascript';

Blockly.Blocks['block_check'] = {
    init: function () {
        this.appendValueInput("verification")
            .setCheck(null)
            .appendField(new Blockly.FieldLabelSerializable("Basic check"), "dadasdsME")
            .appendField(new Blockly.FieldImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC+0lEQVR4AdTXA6wcURiG4Tuobdu2bdu2bdu23aB23KC2bVvXxuk7ybSZnMzO3atik2e9+/1nD9fjv7ucO3dOQWJkQT4UQy6kR7w4CVUUxQhOgpqYiZN4ivf4gje4h4MYisLQY6vF8VEXR+ANEYlwvMYQZIESk/C0mIvvEFHwHlVRGiURLzo/eVbsQyhEFERgHXQoyI2yiB+VlqfDfoRDSMLwEiewybQNp/EN71HW8l2G7KgA3d0+n4tQm5Y9wFjkRQJYZ0YyVER7OcgsogCKwTHcUM+mz0NxFIWiNKiuilRoC2MwqiiH1E4FJMUxm1F9EBmjMo4ITYm1CMJRZDXCUR6KqwLqwAfC4hbyRjE8BVYhGALh2JLkapjRvaWQwi5cwUIpPBh9EJXw5FjxOxwIxExo5uwqZFdAcpyHsLiJDOYXq6iMWlAdwpdJ4UFYiqRmTkJUtisgH95BWGyGwocN9fAC79AKqhSeDIttwpcjmTTQi0GXC6gCXwiLEeaXF8NDCNNbtIBqvp4U8xAEYQrGSiS3aWwhJJafrAZ/ad73NQMK4DqExRs0QzLMQKAUvkoOt2QVRzLnAoB+ZgGGcrgFYfEOJ+Avha9BCofpXhRJ5SdL2yxAs+FhKaIi7kC4EIL1SOkqXNO0X12QUC4gEx5CWBxFAstAU1AVDyAkodiK1JEs9SoqQLHbAw5CWHxEaWm0K6iFx1L4bqR1Y69JiXJ2LxgGIEwaiBuRwKaIeniOMOxDBjd32oLI4erFvHgKYeGJzlBtiqiLucjsZriOiojv1D8zEAZh8QYtoElFGJQoHHLyoGBkVWbHZQjJJ0xCZigOLUwBu9eSoZJ8PHM6E7yDkITiBqaiPgoiJ0qgDdZiL1LbDPAKcBykcld0w2cIFwLwEa/xFSEQCEJ3WMMrIxeidCLW0Q5PIaLoNFIjJSoipxwelV+iNA7AD8JNgRiFqkgd9XD7o1pLHMA7hDp0y32sRBlosf2/MAEKogPmY5NpIyaiIbJA9fg5IsEoAACQuKCcvyFvogAAAABJRU5ErkJggg==", 30, 30, { alt: "*", flipRtl: "FALSE" }));
        this.setInputsInline(false);
        this.setColour('#737373');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

pythonGenerator['block_check'] = function (block) {
    var value_verification = pythonGenerator.valueToCode(block, 'verification', pythonGenerator.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = 'def block_check():\n  if ' + value_verification + ':\n    return(True)\n  else:\n    return(False)';
    return code;
};

Blockly.Blocks['open_ifc_file'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldImage("https://mepcontentproduction.blob.core.windows.net/mcshare/Content/Images/News/0bb7aef386c7480ba047620191d32c51.png", 30, 30, { alt: "*", flipRtl: "FALSE" }));
        this.appendValueInput("ifc_path")
            .setCheck(null)
            .appendField("IFC file path");
        this.setColour('#737373');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

pythonGenerator['open_ifc_file'] = function (block) {
    var value_ifc_path = pythonGenerator.valueToCode(block, 'ifc_patch', pythonGenerator.ORDER_ATOMIC);

    pythonGenerator.definitions_['import_requests'] = 'import ifcopenshell as ifs';

    // TODO: Assemble JavaScript into code variable.
    var code = 'ifc_file = ifcopenshell.open(' + value_ifc_path + ')\n';
    return code;
};

Blockly.Blocks['alert_check'] = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC+0lEQVR4AdTXA6wcURiG4Tuobdu2bdu2bdu23aB23KC2bVvXxuk7ybSZnMzO3atik2e9+/1nD9fjv7ucO3dOQWJkQT4UQy6kR7w4CVUUxQhOgpqYiZN4ivf4gje4h4MYisLQY6vF8VEXR+ANEYlwvMYQZIESk/C0mIvvEFHwHlVRGiURLzo/eVbsQyhEFERgHXQoyI2yiB+VlqfDfoRDSMLwEiewybQNp/EN71HW8l2G7KgA3d0+n4tQm5Y9wFjkRQJYZ0YyVER7OcgsogCKwTHcUM+mz0NxFIWiNKiuilRoC2MwqiiH1E4FJMUxm1F9EBmjMo4ITYm1CMJRZDXCUR6KqwLqwAfC4hbyRjE8BVYhGALh2JLkapjRvaWQwi5cwUIpPBh9EJXw5FjxOxwIxExo5uwqZFdAcpyHsLiJDOYXq6iMWlAdwpdJ4UFYiqRmTkJUtisgH95BWGyGwocN9fAC79AKqhSeDIttwpcjmTTQi0GXC6gCXwiLEeaXF8NDCNNbtIBqvp4U8xAEYQrGSiS3aWwhJJafrAZ/ad73NQMK4DqExRs0QzLMQKAUvkoOt2QVRzLnAoB+ZgGGcrgFYfEOJ+Avha9BCofpXhRJ5SdL2yxAs+FhKaIi7kC4EIL1SOkqXNO0X12QUC4gEx5CWBxFAstAU1AVDyAkodiK1JEs9SoqQLHbAw5CWHxEaWm0K6iFx1L4bqR1Y69JiXJ2LxgGIEwaiBuRwKaIeniOMOxDBjd32oLI4erFvHgKYeGJzlBtiqiLucjsZriOiojv1D8zEAZh8QYtoElFGJQoHHLyoGBkVWbHZQjJJ0xCZigOLUwBu9eSoZJ8PHM6E7yDkITiBqaiPgoiJ0qgDdZiL1LbDPAKcBykcld0w2cIFwLwEa/xFSEQCEJ3WMMrIxeidCLW0Q5PIaLoNFIjJSoipxwelV+iNA7AD8JNgRiFqkgd9XD7o1pLHMA7hDp0y32sRBlosf2/MAEKogPmY5NpIyaiIbJA9fg5IsEoAACQuKCcvyFvogAAAABJRU5ErkJggg==", 30, 30, { alt: "*", flipRtl: "FALSE" }));
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldLabelSerializable("Alert check"), "NAME");
        this.appendValueInput("NAME")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldLabelSerializable("Verification"), "NAME");
        this.appendValueInput("NAME")
            .setCheck("String")
            .appendField(new Blockly.FieldLabelSerializable(""), "NAME")
            .appendField(new Blockly.FieldDropdown([["alert_message", "alert_message"], ["alert viewer", "alert_viewer"]]), "NAME");
        this.setColour('#737373');
        this.setTooltip("dasdsdadsa");
        this.setHelpUrl("sdadsadas");
    }
};

pythonGenerator['alert_check'] = function (block) {
    var value_name = pythonGenerator.valueToCode(block, 'NAME', pythonGenerator.ORDER_ATOMIC);
    var dropdown_name = block.getFieldValue('NAME');
    var value_name = pythonGenerator.valueToCode(block, 'NAME', pythonGenerator.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
};
