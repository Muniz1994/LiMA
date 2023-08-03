import React, { useRef, useEffect, useState, useCallback } from 'react';

import { Viewer, WebIFCLoaderPlugin, XKTLoaderPlugin, DirLight, ContextMenu, TreeViewPlugin, CityJSONLoaderPlugin, DistanceMeasurementsPlugin, LineSet, AnnotationsPlugin } from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.min.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfo, faCircleInfo, faPlus, faSave, faList, faCode, faSection, faCheck, faCircleExclamation, faCube, faSquare, faCrop, faTableCellsLarge, faEraser, faMousePointer, faObjectGroup } from '@fortawesome/free-solid-svg-icons'

library.add(faCircleInfo, faPlus, faInfo, faSave, faList, faCode, faSection, faCheck, faCircleExclamation, faCube, faSquare, faCrop, faTableCellsLarge, faEraser, faMousePointer, faObjectGroup);

export const ViewerXeokit = ({ ifcFile, highlightedElements }) => {

    const [container, setContainer] = useState(null);
    const [toolbar, setToolbar] = useState(null);
    const [viewer, setViewer] = useState(null);
    const [annotations, setAnnotations] = useState(null);
    const [sceneModel, setSceneModel] = useState(null);
    const [ifcLoader, setIfcLoader] = useState(null);
    const [xktLoader, setXktLoader] = useState(null);


    const inputRef = useCallback((node) => {

        setContainer(node)

    }, [container]);

    const toolbarRef = useCallback((node) => {

        setToolbar(node)

    }, [toolbar]);

    useEffect(() => {

        if (container) {

            //------------------------------------------------------------------------------------------------------------------
            // Create a Viewer, arrange the camera
            //------------------------------------------------------------------------------------------------------------------
            const viewer = new Viewer({
                canvasId: "myCanvas",
                transparent: true,
                saoEnabled: true,
                pbrEnabled: true,
                colorTextureEnables: true
            });

            setViewer(viewer);

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

            const treeView = new TreeViewPlugin(viewer, {
                containerElement: document.getElementById("treeViewContainer"),
                autoExpandDepth: 3 // Initially expand tree three nodes deep
            });

            const annotations = new AnnotationsPlugin(viewer, {

                markerHTML: "<div class='annotation-marker' style='background-color: {{markerBGColor}};'>{{glyph}}</div>",
                labelHTML: "<div class='annotation-label' style='background-color: {{labelBGColor}};'>\
                    <div class='annotation-title'>{{title}}</div>\
                    <div class='annotation-desc'>{{description}}</div>\
                    </div>",

                values: {
                    markerBGColor: "red",
                    labelBGColor: "white",
                    glyph: "X",
                    title: "Untitled",
                    description: "No description"
                }
            });

            annotations.on("markerClicked", (annotation) => {
                annotation.setLabelShown(!annotation.getLabelShown());
            });

            setAnnotations(annotations);

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
            // // Create a context menu to delete and configure measurements
            // //------------------------------------------------------------------------------------------------------------------

            // const distanceMeasurementsContextMenu = new ContextMenu({
            //     items: [
            //         [
            //             {
            //                 title: "Clear",
            //                 doAction: function (context) {
            //                     context.distanceMeasurement.destroy();
            //                 }
            //             },
            //             {
            //                 getTitle: (context) => {
            //                     return context.distanceMeasurement.axisVisible ? "Hide Axis" : "Show Axis";
            //                 },
            //                 doAction: function (context) {
            //                     context.distanceMeasurement.axisVisible = !context.distanceMeasurement.axisVisible;
            //                 }
            //             },
            //             {
            //                 getTitle: (context) => {
            //                     return context.distanceMeasurement.labelsVisible ? "Hide Labels" : "Show Labels";
            //                 },
            //                 doAction: function (context) {
            //                     context.distanceMeasurement.labelsVisible = !context.distanceMeasurement.labelsVisible;
            //                 }
            //             }
            //         ], [
            //             {
            //                 title: "Clear All",
            //                 getEnabled: function (context) {
            //                     return (Object.keys(context.distanceMeasurementsPlugin.measurements).length > 0);
            //                 },
            //                 doAction: function (context) {
            //                     context.distanceMeasurementsPlugin.clear();
            //                 }
            //             }
            //         ]
            //     ]
            // });

            // distanceMeasurementsContextMenu.on("hidden", () => {
            //     if (distanceMeasurementsContextMenu.context.distanceMeasurement) {
            //         distanceMeasurementsContextMenu.context.distanceMeasurement.setHighlighted(false);
            //     }
            // });

            // //------------------------------------------------------------------------------------------------------------------
            // // Create an DistanceMeasurementsPlugin, activate its DistanceMeasuremntsControl
            // //------------------------------------------------------------------------------------------------------------------

            // distanceMeasurements.on("mouseOver", (e) => {
            //     e.distanceMeasurement.setHighlighted(true);
            // });

            // distanceMeasurements.on("mouseLeave", (e) => {
            //     if (distanceMeasurementsContextMenu.shown && distanceMeasurementsContextMenu.context.distanceMeasurement.id === e.distanceMeasurement.id) {
            //         return;
            //     }
            //     e.distanceMeasurement.setHighlighted(false);
            // });

            // distanceMeasurements.on("contextMenu", (e) => {
            //     distanceMeasurementsContextMenu.context = { // Must set context before showing menu
            //         viewer: viewer,
            //         distanceMeasurementsPlugin: distanceMeasurements,
            //         distanceMeasurement: e.distanceMeasurement
            //     };
            //     distanceMeasurementsContextMenu.show(e.event.clientX, e.event.clientY);
            //     e.event.preventDefault();
            // });

            // distanceMeasurements.control.activate();



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
                    edges: true,
                    excludeUnclassifiedObjects: false
                });



            // 2
            // const sceneModel = xktLoader.load({          // Returns an Entity that represents the model
            //     id: "myModel",
            //     src: ifcFile,
            //     edges: true
            // });

            setSceneModel(sceneModel);

            sceneModel.on("loaded", () => { // This synchronizes camera.ortho.scale to the model boundary
                viewer.cameraFlight.flyTo(sceneModel);
            });

        }
    }, [ifcFile, ifcLoader])

    useEffect(() => {


        //------------------------------------------------------------------------------------------------------------------
        // Execute viewing highlighting
        //------------------------------------------------------------------------------------------------------------------

        if (sceneModel && viewer && highlightedElements) {
            sceneModel.on("loaded", () => {

                viewer.scene.setObjectsVisible(viewer.scene.objectIds, true);
                viewer.scene.setObjectsXRayed(viewer.scene.objectIds, true);

                console.log(viewer);

                highlightedElements.forEach(element => {
                    viewer.scene.setObjectsXRayed(element.id, false);

                    console.log(element.id, element.result)
                    if (element.result) {
                        viewer.scene.setObjectsCulled(element.id, false);
                        viewer.scene.setObjectsColorized(element.id, [0, 1, 0]);
                    }
                    else {
                        viewer.scene.setObjectsCulled(element.id, false);
                        viewer.scene.setObjectsColorized(element.id, [1, 0, 0]);
                    }
                })

                annotations.createAnnotation({
                    id: "myAnnotation1",
                    entity: viewer.scene.objects["2K8zFEPrzBfgkpngTRI6y8"],
                    worldPos: [0, 0, 0],
                    occludable: true,
                    markerShown: true,
                    labelShown: false,

                    values: {
                        glyph: "A1",
                        title: "Front wall",
                        description: "This is the front wall",
                        markerBGColor: "green"
                    }
                });

                annotations.createAnnotation({
                    id: "myAnnotation2",
                    entity: viewer.scene.objects["2K8zFEPrzBfgkpngTRI6y8"],
                    worldPos: [25.69967884, 3.79496244, -2.36148381],
                    occludable: true,
                    markerShown: true,
                    labelShown: false,

                    values: {
                        glyph: "A2",
                        title: "Front wall",
                        description: "This is the front wall",
                        markerBGColor: "green"
                    }
                });

                annotations.createAnnotation({
                    id: "myAnnotation3",
                    entity: viewer.scene.objects["2K8zFEPrzBfgkpngTRI6y8"],
                    worldPos: [3.79496244, 25.69967884, 2.36148381],
                    occludable: true,
                    markerShown: true,
                    labelShown: false,

                    values: {
                        glyph: "A3",
                        title: "Front wall",
                        description: "This is the front wall",
                        markerBGColor: "green"
                    }
                });

                annotations.createAnnotation({
                    id: "myAnnotation4",
                    entity: viewer.scene.objects["2K8zFEPrzBfgkpngTRI6y8"],
                    worldPos: [-2.36148381, 3.79496244, -25.69967884],
                    occludable: true,
                    markerShown: true,
                    labelShown: false,

                    values: {
                        glyph: "A4",
                        title: "Front wall",
                        description: "This is the front wall",
                        markerBGColor: "green"
                    }
                });

            });
        }

    }, [highlightedElements])


    return (
        <>

            {/* <div id="myToolbar" ref={toolbarRef}>
                <div className='xeokit-btn-group'>
                    <button type="button" class="  xeokit-btn"><FontAwesomeIcon icon="fa-cube" /></button>
                    <button type="button" class="  xeokit-btn"><FontAwesomeIcon icon="fa-square" /></button>
                    <button type="button" class="  xeokit-btn"><FontAwesomeIcon icon="fa-crop" /></button>
                    <button type="button" class="  xeokit-btn"><FontAwesomeIcon icon="fa-table-cells-large" /></button>

                </div>
                <div className='xeokit-btn-group'>
                    <button type="button" class="  xeokit-btn"><FontAwesomeIcon icon="fa-eraser" /></button>
                    <button type="button" class="  xeokit-btn"><FontAwesomeIcon icon="fa-mouse-pointer" /></button>
                    <button type="button" class="  xeokit-btn"><FontAwesomeIcon icon="fa-object-group" /></button>
                </div>
            </div> */}
            <div id='myViewer'>

                <canvas id='myCanvas' className='full-screen' ref={inputRef}></canvas>
            </div>

        </>

    );

}
