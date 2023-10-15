import React, { useState } from 'react';
import { MDBBtn, MDBFile, MDBModalFooter, MDBSpinner } from 'mdb-react-ui-kit';
import { MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle } from 'mdb-react-ui-kit';
import { XKTModel, parseIFCIntoXKTModel, writeXKTModelToArrayBuffer } from '@xeokit/xeokit-convert/dist/xeokit-convert.es'
import * as WebIFC from "https://cdn.jsdelivr.net/npm/web-ifc@0.0.40/web-ifc-api.js";

import { useUpdateVerificationMutation } from '../context/SliceAPI';

function UploadButton({ setIfcFile }) {

    var xktModel = new XKTModel();

    const handleDisplayFileDetails = async (event) => {
        var file = await event.target.files[0];
        setIfcFile(file);
        var data = await file.arrayBuffer();

        parseIFCIntoXKTModel({
            WebIFC,
            data,
            xktModel,
            wasmPath: "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-convert/dist/",
            autoNormals: true,
            log: (msg) => { console.log(msg); }
        }).then(() => {
            xktModel.finalize().then(() => {

                console.log(xktModel);
                const arr = writeXKTModelToArrayBuffer(xktModel);
                const fil = new Blob([arr]);

            });

        },
            (msg) => {
                console.error(msg);
            });
    }
    return (
        <>
            <MDBFile label='Upload IFC file' onChange={handleDisplayFileDetails}></MDBFile>
        </>
    );
}


export const AddFileModal = ({ ShowState, HideFunction, verificationId }) => {

    const [ifcFile, setIfcFile] = useState(null);

    const [updateVerification, { isLoading: isUpdating }] = useUpdateVerificationMutation()

    const uploadFile = () => {

        const data = new FormData()

        data.append('ifc_file', ifcFile)

        updateVerification({ id: verificationId, patch: data })

        HideFunction();

    }

    return (
        <MDBModal show={ShowState} onHide={HideFunction}>
            <MDBModalDialog centered>
                <MDBModalContent>
                    {isUpdating ?
                        <MDBSpinner grow></MDBSpinner> :
                        <>
                            <MDBModalHeader closeButton>
                                <MDBModalTitle><p>Add Ifc Model</p></MDBModalTitle>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <UploadButton setIfcFile={setIfcFile}></UploadButton>

                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='light' className='mx-2' onClick={uploadFile}>Save</MDBBtn>
                                <MDBBtn color='dark' className='mx-2' onClick={HideFunction}>Cancel</MDBBtn>
                            </MDBModalFooter>

                        </>}

                </MDBModalContent>
            </MDBModalDialog>

        </MDBModal>
    );
};
