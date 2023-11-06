import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBFile, MDBModalFooter, MDBSpinner } from 'mdb-react-ui-kit';
import { MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle } from 'mdb-react-ui-kit';
import { XKTModel, parseIFCIntoXKTModel, writeXKTModelToArrayBuffer } from '@xeokit/xeokit-convert/dist/xeokit-convert.es'
import * as WebIFC from "https://cdn.jsdelivr.net/npm/web-ifc@0.0.40/web-ifc-api.js";

import { useUpdateVerificationMutation } from '../context/SliceAPI';

function UploadButton({ setIfcFile, setXktFile, setLoadingFile }) {



    var xktModel = new XKTModel();

    const handleDisplayFileDetails = async (event) => {

        setLoadingFile(true)
        var file = await event.target.files[0];
        setIfcFile(file);
        var data = await file.arrayBuffer();

        await parseIFCIntoXKTModel({
            WebIFC,
            data,
            xktModel,
            wasmPath: "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-convert/dist/",
            autoNormals: false,
            log: (msg) => { console.log(msg); }
        }).then(() => {
            xktModel.finalize().then(() => {

                console.log(xktModel);
                const arr = writeXKTModelToArrayBuffer(xktModel);
                const fil = new Blob([arr]);
                setXktFile(fil)
                setLoadingFile(false)

            });

        },
            (msg) => {
                console.error(msg);
            });
    }
    return (
        <>
            <MDBFile label='Carregue ficheiro IFC' onChange={handleDisplayFileDetails}></MDBFile>
        </>
    );
}


export const AddFileModal = ({ ShowState, HideFunction, verificationId }) => {

    const [ifcFile, setIfcFile] = useState(null);
    const [xktFile, setXktFile] = useState(null);
    const [loadingFile, setLoadingFile] = useState(false);

    const [updateVerification, { isLoading: isUpdating }] = useUpdateVerificationMutation()

    const uploadFile = () => {

        const data = new FormData()

        data.append('ifc_file', ifcFile)
        data.append('xkt_file', xktFile, 'model.xkt')

        updateVerification({ id: verificationId, patch: data })

        HideFunction();

    }

    useEffect(() => {
        setXktFile(null)
        setIfcFile(null)
    }, [ShowState])

    return (
        <MDBModal show={ShowState} onHide={HideFunction}>
            <MDBModalDialog centered>
                <MDBModalContent>
                    {isUpdating ?
                        <MDBSpinner grow></MDBSpinner> :
                        <>
                            <MDBModalHeader closeButton>
                                <MDBModalTitle><p>Adicione modelo IFC</p></MDBModalTitle>
                            </MDBModalHeader>
                            <MDBModalBody>
                                {loadingFile ?
                                    <>
                                        <h6>A converter ficheiro IFC</h6>
                                        <MDBSpinner grow></MDBSpinner>
                                    </>

                                    :
                                    xktFile ?
                                        <h6>Ficheiro Convertido ✓</h6>
                                        :

                                        <UploadButton setIfcFile={setIfcFile} setXktFile={setXktFile} setLoadingFile={setLoadingFile}></UploadButton>

                                }

                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='dark' className='mx-2' onClick={uploadFile}>Salvar</MDBBtn>
                                <MDBBtn color='dark' className='mx-2' outline onClick={HideFunction}>CAncelar</MDBBtn>
                            </MDBModalFooter>

                        </>}

                </MDBModalContent>
            </MDBModalDialog>

        </MDBModal>
    );
};
