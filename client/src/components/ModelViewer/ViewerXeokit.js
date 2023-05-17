import React, { useRef, useEffect, useState, useCallback } from 'react';

import * as THREE from "three";
import * as OBC from "openbim-components";

import {Viewer, WebIFCLoaderPlugin, DirLight, ContextMenu, TreeViewPlugin, CityJSONLoaderPlugin, LineSet} from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";


export const ViewerXeokit = ({ifcFile, highlightedElements, annotations}) => {

    const [container, setContainer] = useState(null);
    const [viewer, setViewer] = useState(null);
    const [sceneModel, setSceneModel] = useState(null);
    const [ifcLoader, setIfcLoader] = useState(null);


    const inputRef = useCallback((node) => {

        setContainer(node)

    }, [container])

    useEffect(() => {

        if (container) {
            
            //------------------------------------------------------------------------------------------------------------------
            // Create a Viewer, arrange the camera
            //------------------------------------------------------------------------------------------------------------------
            const viewer = new Viewer({
                canvasId: "myCanvas",
                transparent: true
            });
            
            setViewer(viewer);
 
            viewer.camera.eye = [-2.56, 8.38, 8.27];
            viewer.camera.look = [13.44, 3.31, -14.83];
            viewer.camera.up = [0.10, 0.98, -0.14];

            new DirLight(viewer.scene, {
                id: "keyLight",
                dir: [0.8, -0.6, -0.8],
                color: [1.0, 1.0, 1.0],
                intensity: 0.5,
                space: "view"
            });
        

            //------------------------------------------------------------------------------------------------------------------
            // Set loader
            //------------------------------------------------------------------------------------------------------------------

            const webIFCLoader = new WebIFCLoaderPlugin(viewer, {
                wasmPath: "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/"
            });

            setIfcLoader(webIFCLoader);

            window.viewer = viewer;
        }

    }, [container]);

    useEffect(() => {

        //------------------------------------------------------------------------------------------------------------------
        // Load IFC file
        //------------------------------------------------------------------------------------------------------------------      

        if (ifcFile && ifcLoader) {

            const sceneModel =
                 ifcLoader.load({
                src: ifcFile,
                excludeTypes: ["IfcSpace"],
                edges: false
            });

            setSceneModel(sceneModel);

            sceneModel.on("loaded", () => { // This synchronizes camera.ortho.scale to the model boundary
                viewer.cameraFlight.flyTo(sceneModel);
            });

        }
    },[ifcFile, ifcLoader])

    useEffect(() => {


        //------------------------------------------------------------------------------------------------------------------
        // Execute viewing highlighting
        //------------------------------------------------------------------------------------------------------------------

        if (sceneModel && viewer && highlightedElements) {
            sceneModel.on("loaded", () => {
    
                viewer.scene.setObjectsSelected(highlightedElements, true);

    
            });
        }

    }, [highlightedElements])

    
    return (

        <canvas id='myCanvas' className='full-screen' ref={inputRef}></canvas>
    );

}
