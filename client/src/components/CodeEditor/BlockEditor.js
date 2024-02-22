import React, { useState } from "react";

// Blockly imports
import { BlocklyWorkspace } from 'react-blockly';
import Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python'

// Import toolbox
import { toolbox } from "./ToolBox";

// Syntax highlighter imports
import SyntaxHighlighter from 'react-syntax-highlighter';
import { isblEditorLight, srcery } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Layout imports
import Col from "react-bootstrap/esm/Col";


const CodeBlock = ({ codeString }) => {
    return (
        <SyntaxHighlighter
            className="code-block max-h-100 overfow-scroll"
            lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
            wrapLines={true}
            language="python"
            style={srcery}>
            {codeString}
        </SyntaxHighlighter>
    );
};


var options = {
    toolbox: toolbox,
    collapse: true,
    comments: true,
    disable: false,
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: 'start',
    css: true,
    rtl: false,
    scrollbars: true,
    sounds: true,
    oneBasedIndex: true,
    grid: {
        spacing: 20,
        length: 1,
        colour: '#0004ff',
        snap: true
    },
    zoom: {
        controls: true,
        wheel: true,
        startScale: .7,
        maxScale: 1.5,
        minScale: 0.3,
        scaleSpeed: 1.01
    }
};



function MyBlocklyEditor({ initialXml, setBlockXml, setBlockPython, showCode }) {


    const [pythonDisplayCode, setPythonDisplayCode] = useState('');

    function workspaceDidChange(workspace) {

        const space = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));

        setBlockXml(space)

        const pythonGeneratedCode = pythonGenerator.workspaceToCode(workspace);

        setBlockPython(pythonGeneratedCode);
        setPythonDisplayCode(pythonGeneratedCode);

    }

    return (
        <>
            <Col className="flex-grow-1 p-0">
                <BlocklyWorkspace
                    className="h-100" // you can use whatever classes are appropriate for your app's CSS
                    onImportXmlError={() => console.log("errroooooor")}
                    toolboxConfiguration={toolbox} // this must be a JSON toolbox definition
                    initialXml={initialXml}
                    onWorkspaceChange={workspaceDidChange}
                    workspaceConfiguration={options}
                />
            </Col>

            {showCode ? <Col className="max-h-100 overfow-scroll border p-0">
                <CodeBlock className="h-100 overfow-scroll" codeString={pythonDisplayCode} />
            </Col> : null}

        </>
    )
}

export default MyBlocklyEditor;
