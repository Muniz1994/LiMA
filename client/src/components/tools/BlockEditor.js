import React, { useState } from "react";
import { BlocklyWorkspace } from 'react-blockly';
import Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python'
// import { pythonGenerator } from 'blockly/python'
import Col from "react-bootstrap/esm/Col";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { isblEditorLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toolbox } from "./toolbox";

const CodeBlock = ({ codeString }) => {
    return (
        <SyntaxHighlighter
            className="code-block max-h-100 overfow-scroll"
            language="python"
            style={isblEditorLight}>
            {codeString}
        </SyntaxHighlighter>
    );
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
                    workspaceConfiguration={{
                        scrollbars: false,
                        grid: {
                            spacing: 20,
                            length: 0,
                            colour: "#ccc",
                            snap: true,

                        },
                    }}
                />
            </Col>
            {showCode ? <Col className="max-h-100 overfow-scroll border p-0">
                <CodeBlock className="h-100 overfow-scroll" codeString={pythonDisplayCode} />
            </Col> : null}

            {/* {pythonCode === "" ? <CodeBlock codeString={"sem código"} /> : <CodeBlock className="h-50" codeString={pythonCode} />} */}
            {/* <textarea id="code" className="h-30" value={pythonCode}></textarea> */}

        </>
    )
}

export default MyBlocklyEditor;
