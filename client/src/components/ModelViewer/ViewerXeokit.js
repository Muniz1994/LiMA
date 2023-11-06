import React, { useRef, useEffect, useState, useCallback } from 'react';

import { Viewer, WebIFCLoaderPlugin, XKTLoaderPlugin, DirLight, Mesh, PhongMaterial, buildGridGeometry, VBOGeometry, ContextMenu, NavCubePlugin, TreeViewPlugin, CityJSONLoaderPlugin, DistanceMeasurementsPlugin, DistanceMeasurementsMouseControl, LineSet, AnnotationsPlugin, PointerLens } from "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk@2.4.0-alpha-30/dist/xeokit-sdk.es.min.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfo, faCircleInfo, faPlus, faSave, faList, faCode, faSection, faCheck, faCircleExclamation, faCube, faSquare, faCrop, faTableCellsLarge, faEraser, faMousePointer, faObjectGroup, faHeartPulse } from '@fortawesome/free-solid-svg-icons'
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { setViewer, cleanViewer } from '../../context/viewerSlice';
import { constants } from 'blockly';

import { useSelector, useDispatch } from 'react-redux'



library.add(faCircleInfo, faPlus, faInfo, faSave, faList, faCode, faSection, faCheck, faCircleExclamation, faCube, faSquare, faCrop, faTableCellsLarge, faEraser, faMousePointer, faObjectGroup);

class XeokitViewer {
    constructor(viewerId, navCubeId = null) {

        //------------------------------------------------------------------------------------------------------------------
        // Create a Viewer, arrange the camera
        //------------------------------------------------------------------------------------------------------------------

        this.viewerId = viewerId;
        this.navCubeId = navCubeId;

        this.viewer = new Viewer({
            canvasId: this.viewerId,
            transparent: false,
            saoEnabled: true,
            pbrEnabled: true,
            colorTextureEnables: true,
            backgroundColor: [0.6392156862745098, 0.6392156862745098, 0.6392156862745098]
        });

        this.spacesEnabled = true;

        this.setupCamera();
        this.setupScene();
        this.setupSao();
        this.setupDistanceMeasurement();
        this.setupContextMenu();
        this.setupIfcLoader();
        this.setupXktLoader();
        this.setupGrid();
        this.setupNavCube();
        this.addContextMenu();

    }


    // Setup Camera ----------------------------------------------------------------------------------------------
    setupCamera() {

        this.viewer.camera.eye = [-2.56, 8.38, 8.27];
        this.viewer.camera.look = [13.44, 3.31, -14.83];
        this.viewer.camera.up = [0.10, 0.98, -0.14]

    }

    // Setup Scene ----------------------------------------------------------------------------------------------
    setupScene() {

        // Emphasis effects

        this.viewer.scene.xrayMaterial.fill = true;
        this.viewer.scene.xrayMaterial.fillAlpha = 0.02;
        this.viewer.scene.xrayMaterial.fillColor = [0, 0, 0];
        this.viewer.scene.xrayMaterial.edgeAlpha = 0.02;
        this.viewer.scene.xrayMaterial.edgeColor = [0, 0, 0];

        this.viewer.scene.highlightMaterial.edges = true;
        this.viewer.scene.highlightMaterial.edgeColor = [1, 1, 0];
        this.viewer.scene.highlightMaterial.edgeAlpha = 0.9;
        this.viewer.scene.highlightMaterial.fill = true;
        this.viewer.scene.highlightMaterial.fillAlpha = 0.9;
        this.viewer.scene.highlightMaterial.fillColor = [1, 0, 0];

        this.viewer.scene.pointsMaterial.pointSize = 1;
        this.viewer.scene.pointsMaterial.roundPoints = true;
        this.viewer.scene.pointsMaterial.perspectivePoints = true;
        this.viewer.scene.pointsMaterial.minPerspectivePointSize = 2;
        this.viewer.scene.pointsMaterial.maxPerspectivePointSize = 4;

        // Camera control

        this.viewer.cameraControl.panRightClick = true;
        this.viewer.cameraControl.followPointer = true;
        this.viewer.cameraControl.doublePickFlyTo = false;
        this.viewer.cameraControl.smartPivot = true;

        // Dolly tweaks for best precision when aligning camera for BCF snapshots

        this.viewer.cameraControl.keyboardDollyRate = 100.0;
        this.viewer.cameraControl.mouseWheelDollyRate = 100.0;
        this.viewer.cameraControl.dollyInertia = 0;
        this.viewer.cameraControl.dollyMinSpeed = 0.04;
        this.viewer.cameraControl.dollyProximityThreshold = 30.0;

        this.viewer.scene.camera.perspective.near = 0.01;
        this.viewer.scene.camera.perspective.far = 3000.0;
        this.viewer.scene.camera.ortho.near = 0.01;
        this.viewer.scene.camera.ortho.far = 2000.0; //

    }

    // Setup Sao ----------------------------------------------------------------------------------------------
    setupSao() {

        // Scalable Ambient Obscurance (SAO) defaults
        // Since SAO is non-interactive, set to higher-quality

        this.sao = this.viewer.scene.sao;
        this.sao.enabled = true;
        this.sao.numSamples = 40;
        this.sao.kernelRadius = 100;
        this.sao.bias = 0.5;
    }

    // Setup Distance Measurements ----------------------------------------------------------------------------------------------
    setupDistanceMeasurement() {

        this.distanceMeasurements = new DistanceMeasurementsPlugin(this.viewer);

    }

    // Setup Context Menu ----------------------------------------------------------------------------------------------
    setupContextMenu() {

        this.canvasContextMenu = new ContextMenu({

            enabled: true,

            items: [
                [
                    {
                        title: "Hide Object",
                        getEnabled: (context) => {
                            return context.entity.visible; // Can't hide entity if already hidden
                        },
                        doAction: function (context) {
                            context.entity.visible = false;
                        }
                    }
                ],
                [
                    {
                        title: "Select Object",
                        getEnabled: (context) => {
                            return (!context.entity.selected); // Can't select an entity that's already selected
                        },
                        doAction: function (context) {
                            context.entity.selected = true;
                        }
                    }
                ],
                [
                    {
                        title: "X-Ray Object",
                        getEnabled: (context) => {
                            return (!context.entity.xrayed); // Can't X-ray an entity that's already X-rayed
                        },
                        doAction: (context) => {
                            context.entity.xrayed = true;
                        }
                    }
                ]
            ]
        });

    }

    addContextMenu() {

        const menu = this.canvasContextMenu

        this.viewer.cameraControl.on("rightClick", function (e) {
            menu.show(e.pagePos[0], e.pagePos[1]);
            e.event.preventDefault();
        });
    }

    // Setup Nav Cube ----------------------------------------------------------------------------------------------
    setupNavCube() {

        this.navCube = new NavCubePlugin(this.viewer, {
            canvasId: "myNavCubeCanvas",
            visible: true,           // Initially visible (default)
            size: 200,               // NavCube size in pixels (default is 200)
            alignment: "bottomRight",   // Align NavCube to top-left of Viewer canvas
            bottomMargin: 100,          // 170 pixels margin from top of Viewer canvas
            cameraFly: true,       // Fly camera to each selected axis/diagonal
            cameraFitFOV: 45,        // How much field-of-view the scene takes once camera has fitted it to view
            cameraFlyDuration: 0.5, // How long (in seconds) camera takes to fly to each new axis/diagonal
            color: "#FBFBFB",
        });
    }

    // Setup Grid ----------------------------------------------------------------------------------------------
    setupGrid() {

        this.grid = new Mesh(this.viewer.scene, {
            geometry: new VBOGeometry(this.viewer.scene, buildGridGeometry({
                size: 400,
                divisions: 60
            })),
            material: new PhongMaterial(this.viewer.scene, {
                color: [0.0, 0.0, 0.0],
                emissive: [0.4, 0.4, 0.4]
            }),
            position: [0, -1.6, 0],
            collidable: false
        });
    }

    setupXktLoader() {
        this.xktLoader = new XKTLoaderPlugin(this.viewer);
    }

    setupIfcLoader() {

        this.ifcLoader = new WebIFCLoaderPlugin(this.viewer, {
            wasmPath: "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-sdk/dist/"
        });
    }

    loadXkt(path) {
        this.sceneModel = this.xktLoader.load({          // Returns an Entity that represents the model
            id: "myModel",
            src: path,
            edges: true,
            excludeUnclassifiedObjects: true,
            objectDefaults: {
                IfcSpace: {
                    opacity: 0.1
                }
            }
        });

        this.sceneModel.on("loaded", () => { // This synchronizes camera.ortho.scale to the model boundary
            this.viewer.cameraFlight.flyTo(this.viewer.scene);
        });

    }

    loadIFC() {

        const sceneModel =
            this.ifcLoader.load({
                src: 'duplex.ifc',
                edges: true,
                excludeUnclassifiedObjects: false
            });
    }

    toggleMeasurements() {
        if (this.distanceMeasurements.control.active) {
            this.distanceMeasurements.control.deactivate()
        }
        else {
            this.distanceMeasurements.control.activate()
        };
    }

    clearMeasurements() {
        this.distanceMeasurements.destroy();
    }

    highlightElements([id, result]) {


        this.viewer.scene.setObjectsVisible(this.viewer.metaScene.getObjectIDsByType("IfcSpace"), false)
        this.viewer.scene.setObjectsOpacity(this.viewer.metaScene.getObjectIDsByType("IfcSpace"), 0.1)
        this.viewer.scene.setObjectsHighlighted(this.viewer.scene.visibleObjectIds, false);
        this.viewer.scene.setObjectsXRayed(this.viewer.scene.visibleObjectIds, true)
        this.viewer.scene.setObjectsXRayed([id], false);
        this.viewer.scene.setObjectsOpacity([id], 0.9)
        this.viewer.scene.setObjectsVisible([id], true);

        if (result === true) {
            this.viewer.scene.setObjectsColorized([id], [0.23, 0.53, 0.35]);
        }
        else {
            this.viewer.scene.setObjectsColorized([id], [0.77, 0.35, 0.42]);

        }

    }

    xRayOff() {
        this.viewer.scene.setObjectsXRayed(this.viewer.scene.visibleObjectIds, false)
    }

    toggleSpaces() {
        if (this.spacesEnabled) {
            const objectIds = this.viewer.metaScene.getObjectIDsByType("IfcSpace");
            this.viewer.scene.setObjectsVisible(objectIds, false);
            this.spacesEnabled = false;
        }
        else {
            const objectIds = this.viewer.metaScene.getObjectIDsByType("IfcSpace");
            this.viewer.scene.setObjectsVisible(objectIds, true);
            this.spacesEnabled = true;
        }

    }

    cleanViewer() {
        this.navCube.destroy()
        this.grid.destroy()
    }

    cleanModel() {
        this.sceneModel.destroy();
    }


}

export const ViewerXeokit = ({ ifcFile, highlightedElements }) => {

    const viewer = useSelector((state) => state.viewer.value);
    const dispatch = useDispatch()
    const [viewerButton1, setViewerButton1] = useState(false)
    const [viewerButton2, setViewerButton2] = useState(false)


    useEffect(() => {



        if (!viewer) {

            dispatch(setViewer(new XeokitViewer('myCanvas', 'myNavCubeCanvas')))

        }

        return () => {

            dispatch(cleanViewer())
            dispatch(setViewer(null))

        }

    }, []);



    return (
        <>

            <div id='myViewer' className=''>
                <canvas id='myCanvas' className='full-screen p-0'></canvas>
                <canvas id="myNavCubeCanvas"></canvas>
                <div id='viewer-tools'>

                    <MDBBtn size='sm' color={!viewerButton1 ? 'dark' : 'warning'} onClick={() => {
                        viewer.toggleMeasurements()
                        setViewerButton1(!viewerButton1)
                    }} className='viewer-tool-btn'><MDBIcon fas size='lg' icon="ruler" /></MDBBtn>
                    <MDBBtn size='sm' color='dark' onClick={() => viewer.clearMeasurements()} className='viewer-tool-btn'><MDBIcon fas size='lg' icon="recycle" /></MDBBtn>
                    <MDBBtn size='sm' color={!viewerButton2 ? 'dark' : 'warning'} onClick={() => {
                        viewer.toggleSpaces()
                        setViewerButton2(!viewerButton2)
                    }
                    } className='viewer-tool-btn'><MDBIcon fas size='lg' icon="cube" /></MDBBtn>
                    <MDBBtn size='sm' color='dark' onClick={() => viewer.xRayOff()} className='viewer-tool-btn'><MDBIcon fas size='lg' icon="eye" /></MDBBtn>
                </div>
            </div>

        </>

    );

}
