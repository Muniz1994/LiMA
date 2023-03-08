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

function MyBlocklyEditor({ initialXml, setBlockXml }) {
    const [pythonCode, setPythonCode] = useState("");

    function workspaceDidChange(workspace) {
        const space = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
        setBlockXml(space)

        const pythonCode = pythonGenerator.workspaceToCode(workspace);
        setPythonCode(pythonCode);
    }

    return (
        <>
            <Col className="pe-0">
                <BlocklyWorkspace
                    className="h-100 max-h-100" // you can use whatever classes are appropriate for your app's CSS
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
            <Col className="px-0 ms-0 max-h-100 overfow-scroll border-top">
                <CodeBlock className="h-100 overfow-scroll" codeString={pythonCode} />
            </Col>
            {/* {pythonCode === "" ? <CodeBlock codeString={"sem código"} /> : <CodeBlock className="h-50" codeString={pythonCode} />} */}
            {/* <textarea id="code" className="h-30" value={pythonCode}></textarea> */}

        </>
    )
}

export default MyBlocklyEditor;
