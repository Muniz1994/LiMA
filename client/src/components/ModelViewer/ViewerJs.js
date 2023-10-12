import * as THREE from 'three';
import * as OBC from 'openbim-components';

import React, { useRef, useEffect, useState, useCallback } from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfo, faCircleInfo, faPlus, faSave, faList, faCode, faSection, faCheck, faCircleExclamation, faCube, faSquare, faCrop, faTableCellsLarge, faEraser, faMousePointer, faObjectGroup } from '@fortawesome/free-solid-svg-icons'
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { constants } from 'blockly';


import { useSelector, useDispatch } from 'react-redux'
import { setViewer } from '../../context/viewerSlice';



library.add(faCircleInfo, faPlus, faInfo, faSave, faList, faCode, faSection, faCheck, faCircleExclamation, faCube, faSquare, faCrop, faTableCellsLarge, faEraser, faMousePointer, faObjectGroup);

export class ViewerJs {

    constructor(element) {

        this.container = document.getElementById(element);

        this.components = new OBC.Components();
        this.components.scene = new OBC.SimpleScene(this.components);
        this.components.renderer = new OBC.PostproductionRenderer(this.components, this.container);
        this.components.camera = new OBC.SimpleCamera(this.components);
        this.components.raycaster = new OBC.SimpleRaycaster(this.components);
        this.culler = new OBC.ScreenCuller(this.components);

        this.components.init();

        this.scene = this.components.scene.get();

        this.components.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);

        this.grid = new OBC.SimpleGrid(this.components);

        this.fragments = new OBC.FragmentManager(this.components);
        this.fragmentIfcLoader = new OBC.FragmentIfcLoader(this.components);

        this.fragmentIfcLoader.settings.wasm = {
            path: "https://unpkg.com/web-ifc@0.0.43/",
            absolute: true
        }

        const boxMaterial = new THREE.MeshStandardMaterial({ color: '#6528D7' });
        const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
        const cube = new THREE.Mesh(boxGeometry, boxMaterial);
        cube.position.set(0, 1.5, 0);
        this.scene.add(cube);



        this.components.scene.setup();

    }

    async load_ifc(file) {

        const data = await file.arrayBuffer();
        const buffer = new Uint8Array(data);
        const model = await this.fragmentIfcLoader.load(buffer);
        this.scene.add(model);

        // for (const fragment in model.items) {
        //     this.culler.add(fragment.mesh);
        // }


        // this.culler.needsUpdate = true;



    }


}

export const ViewerIFCJS = ({ ifcFile }) => {

    const viewer = useSelector((state) => state.viewer.value);
    const dispatch = useDispatch()

    useEffect(() => {

        if (!viewer) {
            console.log('dasdasjdbsadnasjkdbaskdja');
            dispatch(setViewer(new ViewerJs('myViewer')))

        }
        if (ifcFile) {

            requestAnimationFrame(viewer.load_ifc(ifcFile))

            console.log(viewer.components.scene.get())

        };

    }, [ifcFile, viewer])




    return (
        <>

            <div id='myViewer' className='p-0'>
            </div>

        </>

    );

}