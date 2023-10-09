import React, { useState, useRef } from 'react';


import { Col, Form } from "react-bootstrap";

import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBSpinner,
} from 'mdb-react-ui-kit';

import { useAddNewVerificationMutation, useRegulationsQuery } from '../context/SliceAPI';

function UploadButton({ setIfcFile }) {

    const [uploadedFileName, setInputFileName] = useState(null);

    const inputRef = useRef(null);

    const handleUpload = () => {
        inputRef.current?.click()
    }

    const handleDisplayFileDetails = async () => {
        inputRef.current?.files && setInputFileName(inputRef.current.files[0].name);
        setIfcFile(inputRef.current.files[0]);

    }

    return (
        <div className="">
            <label className="">Upload IFC: </label>
            <input id="input-file" onChange={handleDisplayFileDetails} className="d-none" ref={inputRef} type="file" />
            <button className={`btn btn-${uploadedFileName ? "secondary" : "light"} mx-2`} onClick={handleUpload}>{uploadedFileName ? uploadedFileName : "Upload"}</button>
        </div>
    );
}

export function NewVerificationModal({ basicModal, setBasicModal, toggleShow }) {


    const [ifcFile, setIfcFile] = useState('');
    const [regulations, setRegulations] = useState([]);

    const [addVerification, result] = useAddNewVerificationMutation();
    const {
        data: Regulations,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useRegulationsQuery();



    const HandleSubmit = (event) => {
        event.preventDefault();

        // const formData = new FormData();

        // formData.append('ifc_file', ifcFile);

        // for (let i = 0; i < regulations.length; i++) {
        //     // Use a unique key for each number, for example, "numbers[]"
        //     formData.append('regulations[]', regulations[i]);
        // }

        const data = {
            ifc_file: ifcFile,
            regulations: regulations
        }

        addVerification(data);

        console.log(result);
    };

    return (
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' position="middle">
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>New verification</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <UploadButton setIfcFile={setIfcFile} />
                        <Form.Group as={Col} controlId="my_multiselect_field" className='my-2'>
                            <Form.Label>Regulamentos</Form.Label>
                            <Form.Control as="select" multiple value={regulations} onChange={e => {
                                const selectedOptions = [].slice.call(e.target.selectedOptions);
                                const integerValues = selectedOptions.map(item => parseInt(item.value, 10)); // Use parseInt to convert to integers
                                setRegulations(integerValues);
                            }}>
                                {isLoading ? <MDBSpinner text="Loading..." />
                                    : Regulations.map(reg => <option value={reg.id}>{reg.name}</option>)
                                }

                            </Form.Control>
                        </Form.Group>

                    </MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleShow}>
                            Close
                        </MDBBtn>
                        <MDBBtn onClick={HandleSubmit}>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
