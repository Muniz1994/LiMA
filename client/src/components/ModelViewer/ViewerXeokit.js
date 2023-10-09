import React, { useRef, useEffect, useState, useCallback } from 'react';

import { Viewer, WebIFCLoaderPlugin, XKTLoaderPlugin, DirLight, Mesh, PhongMaterial, buildGridGeometry, VBOGeometry, ContextMenu, NavCubePlugin, TreeViewPlugin, CityJSONLoaderPlugin, DistanceMeasurementsPlugin, LineSet, AnnotationsPlugin } from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk@2.3.9/dist/xeokit-sdk.es.min.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfo, faCircleInfo, faPlus, faSave, faList, faCode, faSection, faCheck, faCircleExclamation, faCube, faSquare, faCrop, faTableCellsLarge, faEraser, faMousePointer, faObjectGroup } from '@fortawesome/free-solid-svg-icons'
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { setViewer } from '../../context/viewerSlice';



library.add(faCircleInfo, faPlus, faInfo, faSave, faList, faCode, faSection, faCheck, faCircleExclamation, faCube, faSquare, faCrop, faTableCellsLarge, faEraser, faMousePointer, faObjectGroup);

export const ViewerXeokit = ({ ifcFile, highlightedElements }) => {

    const [sceneViewer, setSceneViewer] = useState(null);
    const [sceneModel, setSceneModel] = useState(null);
    const [ifcLoader, setIfcLoader] = useState(null);
    const [xktLoader, setXktLoader] = useState(null);


    useEffect(() => {

        console.log('define!!!');

        //------------------------------------------------------------------------------------------------------------------
        // Create a Viewer, arrange the camera
        //------------------------------------------------------------------------------------------------------------------
        const viewer = new Viewer({
            canvasId: "myCanvas",
            // transparent: true,
            // saoEnabled: true,
            // pbrEnabled: true,
            // colorTextureEnables: true
        });


        viewer.camera.eye = [-2.56, 8.38, 8.27];
        viewer.camera.look = [13.44, 3.31, -14.83];
        viewer.camera.up = [0.10, 0.98, -0.14];


        // Emphasis effects

        viewer.scene.xrayMaterial.fill = true;
        viewer.scene.xrayMaterial.fillAlpha = 0.1;
        viewer.scene.xrayMaterial.fillColor = [0, 0, 0];
        viewer.scene.xrayMaterial.edgeAlpha = 0.3;
        viewer.scene.xrayMaterial.edgeColor = [0, 0, 0];

        viewer.scene.highlightMaterial.edges = true;
        viewer.scene.highlightMaterial.edgeColor = [1, 1, 0];
        viewer.scene.highlightMaterial.edgeAlpha = 0.9;
        viewer.scene.highlightMaterial.fill = true;
        viewer.scene.highlightMaterial.fillAlpha = 0.1;
        viewer.scene.highlightMaterial.fillColor = [1, 0, 0];

        //------------------------------------------------------------------------------------------------------------------
        // Configure points material
        //------------------------------------------------------------------------------------------------------------------

        viewer.scene.pointsMaterial.pointSize = 1;
        viewer.scene.pointsMaterial.roundPoints = true;
        viewer.scene.pointsMaterial.perspectivePoints = true;
        viewer.scene.pointsMaterial.minPerspectivePointSize = 2;
        viewer.scene.pointsMaterial.maxPerspectivePointSize = 4;

        // Camera control

        viewer.cameraControl.panRightClick = true;
        viewer.cameraControl.followPointer = true;
        viewer.cameraControl.doublePickFlyTo = false;
        viewer.cameraControl.smartPivot = true;

        // Dolly tweaks for best precision when aligning camera for BCF snapshots

        viewer.cameraControl.keyboardDollyRate = 100.0;
        viewer.cameraControl.mouseWheelDollyRate = 100.0;
        viewer.cameraControl.dollyInertia = 0;
        viewer.cameraControl.dollyMinSpeed = 0.04;
        viewer.cameraControl.dollyProximityThreshold = 30.0;

        viewer.scene.camera.perspective.near = 0.01;
        viewer.scene.camera.perspective.far = 3000.0;
        viewer.scene.camera.ortho.near = 0.01;
        viewer.scene.camera.ortho.far = 2000.0; //

        // Scalable Ambient Obscurance (SAO) defaults
        // Since SAO is non-interactive, set to higher-quality

        const sao = viewer.scene.sao;
        sao.enabled = true;
        sao.numSamples = 40;
        sao.kernelRadius = 100;
        sao.bias = 0.5;

        //------------------------------------------------------------------------------------------------------------------
        // DistanceMeasurementsPlugin
        //------------------------------------------------------------------------------------------------------------------

        const distanceMeasurements = new DistanceMeasurementsPlugin(viewer, {});

        //------------------------------------------------------------------------------------------------------------------
        // Create a context menu to activate and deactivate the control
        //------------------------------------------------------------------------------------------------------------------

        const canvasContextMenu = new ContextMenu({
            enabled: true,
            context: {
                viewer: viewer
            },
            items: [
                [
                    {
                        getTitle: (context) => {
                            return distanceMeasurements.control.active ? "Deactivate Control" : "Activate Control";
                        },
                        doAction: function (context) {
                            distanceMeasurements.control.active
                                ? distanceMeasurements.control.deactivate()
                                : distanceMeasurements.control.activate();
                        }
                    }
                ]
            ]
        });

        viewer.cameraControl.on("rightClick", function (e) {
            canvasContextMenu.show(e.pagePos[0], e.pagePos[1]);
            e.event.preventDefault();
        });

        // //------------------------------------------------------------------------------------------------------------------
        // // Create a mesh with grid
        // //------------------------------------------------------------------------------------------------------------------

        new Mesh(viewer.scene, {
            geometry: new VBOGeometry(viewer.scene, buildGridGeometry({
                size: 300,
                divisions: 60
            })),
            material: new PhongMaterial(viewer.scene, {
                color: [0.0, 0.0, 0.0],
                emissive: [0.4, 0.4, 0.4]
            }),
            position: [0, -1.6, 0],
            collidable: false
        });


        //------------------------------------------------------------------------------------------------------------------
        // NavCube
        //------------------------------------------------------------------------------------------------------------------

        new NavCubePlugin(viewer, {
            canvasId: "myNavCubeCanvas",
            visible: true,           // Initially visible (default)
            size: 200,               // NavCube size in pixels (default is 200)
            alignment: "topRight",   // Align NavCube to top-left of Viewer canvas
            topMargin: 170,          // 170 pixels margin from top of Viewer canvas
            cameraFly: true,       // Fly camera to each selected axis/diagonal
            cameraFitFOV: 45,        // How much field-of-view the scene takes once camera has fitted it to view
            cameraFlyDuration: 0.5, // How long (in seconds) camera takes to fly to each new axis/diagonal
            color: "#FBFBFB",
        });

        //------------------------------------------------------------------------------------------------------------------
        // Set loader
        //------------------------------------------------------------------------------------------------------------------

        const webIFCLoader = new WebIFCLoaderPlugin(viewer, {
            wasmPath: "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/"
        });

        // 1
        const xktLoader = new XKTLoaderPlugin(viewer);


        setIfcLoader(webIFCLoader);

        setXktLoader(xktLoader);

        setSceneViewer(viewer);


        return () => {
            if (sceneViewer) {
                sceneViewer.scene.destroy();
            }

        }

    }, []);

    useEffect(() => {

        //------------------------------------------------------------------------------------------------------------------
        // Load IFC file
        //------------------------------------------------------------------------------------------------------------------      

        if (ifcFile && ifcLoader && sceneViewer) {

            // const sceneModel =
            //     ifcLoader.load({
            //         src: ifcFile,
            //         edges: true,
            //         excludeUnclassifiedObjects: false
            //     });

            // 2
            const sceneModel = xktLoader.load({          // Returns an Entity that represents the model
                id: "myModel",
                xkt: ifcFile,
                edges: true
            });

            setSceneModel(sceneModel);

            sceneModel.on("loaded", () => { // This synchronizes camera.ortho.scale to the model boundary
                sceneViewer.cameraFlight.flyTo(sceneViewer.scene);
            });

        }
    }, [ifcFile, ifcLoader])

    useEffect(() => {


        //------------------------------------------------------------------------------------------------------------------
        // Execute viewing highlighting
        //------------------------------------------------------------------------------------------------------------------

        if (sceneModel && sceneViewer && highlightedElements) {
            sceneModel.on("loaded", () => {

                sceneViewer.scene.setObjectsVisible(sceneViewer.scene.objectIds, true);
                sceneViewer.scene.setObjectsXRayed(sceneViewer.scene.objectIds, true);

                console.log(sceneViewer);

                highlightedElements.forEach(element => {
                    sceneViewer.scene.setObjectsXRayed(element.id, false);

                    console.log(element.id, element.result)
                    if (element.result) {
                        sceneViewer.scene.setObjectsCulled(element.id, false);
                        sceneViewer.scene.setObjectsColorized(element.id, [0, 1, 0]);
                    }
                    else {
                        sceneViewer.scene.setObjectsCulled(element.id, false);
                        sceneViewer.scene.setObjectsColorized(element.id, [1, 0, 0]);
                    }
                })

            });
        }

    }, [highlightedElements])


    return (
        <>

            <div id='myViewer' className='p-0'>
                <canvas id='myCanvas' className='full-screen p-0'></canvas>
                <canvas id="myNavCubeCanvas"></canvas>
                <div id='viewer-tools'>
                    <MDBBtn size='sm' color='dark' className='viewer-tool-btn'><MDBIcon color='warning' fas size='lg' icon="bars" /></MDBBtn>
                    <MDBBtn size='sm' color='dark' className='viewer-tool-btn'><MDBIcon fas size='lg' icon="ruler" /></MDBBtn>
                    <MDBBtn size='sm' color='dark' className='viewer-tool-btn'><MDBIcon fas size='lg' icon="layer-group" /></MDBBtn>
                    <MDBBtn size='sm' color='dark' className='viewer-tool-btn'><MDBIcon fas size='lg' icon="cut" /></MDBBtn>
                    <MDBBtn size='sm' color='dark' className='viewer-tool-btn'><MDBIcon fas size='lg' icon="save" /></MDBBtn>
                </div>
            </div>

        </>

    );

}
