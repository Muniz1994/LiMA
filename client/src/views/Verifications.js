import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';


// React-Boostrap imports
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Stack from 'react-bootstrap/Stack';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

// Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfo, faCircleInfo, faPlus, faSave, faList, faCode, faSection, faCheck, faCircleExclamation, faPlay, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { InfoRegulationModal } from '../components/InfoRegulationModal';
import { ClauseListModal } from '../components/ClauseListModal';

import { XKTModel, parseIFCIntoXKTModel, writeXKTModelToArrayBuffer } from '@xeokit/xeokit-convert/dist/xeokit-convert.es'
import * as WebIFC from "https://cdn.jsdelivr.net/npm/web-ifc@0.0.40/web-ifc-api.js";


import { ViewerXeokit } from '../components/ModelViewer/ViewerXeokit';
import { Container } from 'react-bootstrap';
import { ViewerIFCJS } from '../components/ModelViewer/ViewerJs';

library.add(faCircleInfo, faPlus, faInfo, faSave, faList, faCode, faSection, faCheck, faCircleExclamation, faPlay, faCircleCheck, faCircleXmark);


// Choose the existing regulations in a dropdown
function RegulationDropdownItem({ regulation, onRegulationClick }) {
    return (
        <Dropdown.Item
            variant="secondary"
            onClick={onRegulationClick}>{regulation}
        </Dropdown.Item>
    );
}


function UploadButton({ setIfcFile, setXktFile }) {


    const [uploadedFileName, setInputFileName] = useState(null);
    const [upFile, setUpFile] = useState(null);


    const inputRef = useRef(null);

    const handleUpload = () => {
        inputRef.current?.click()
    }

    var xktModel = new XKTModel();

    const handleDisplayFileDetails = async () => {
        inputRef.current?.files && setInputFileName(inputRef.current.files[0].name);
        setIfcFile(inputRef.current.files[0]);
        // var data = await inputRef.current.files[0].arrayBuffer();

        // parseIFCIntoXKTModel({
        //     WebIFC,
        //     data,
        //     xktModel,
        //     wasmPath: "https://cdn.jsdelivr.net/npm/@xeokit/xeokit-convert/dist/",
        //     autoNormals: true,
        //     log: (msg) => { console.log(msg); }
        // }).then(() => {
        //     xktModel.finalize().then(() => {

        //         console.log(xktModel);
        //         const arr = writeXKTModelToArrayBuffer(xktModel);
        //         const fil = new Blob([arr]);
        //         setXktFile(arr);

        //     });


        // // Create an anchor element
        // const downloadLink = document.createElement('a');
        // downloadLink.href = URL.createObjectURL(fil);
        // downloadLink.download = 'file.xkt'; // Set the desired filename

        // // Trigger a click event to initiate the download
        // downloadLink.click();

        // },
        //     (msg) => {
        //         console.error(msg);
        //     });
    }





    return (
        <div className="">
            <label className="">Upload IFC: </label>
            <input id="input-file" onChange={handleDisplayFileDetails} className="d-none" ref={inputRef} type="file" />
            <button className={`btn btn-${uploadedFileName ? "secondary" : "light"} mx-2`} onClick={handleUpload}>{uploadedFileName ? uploadedFileName : "Upload"}</button>
        </div>
    );
}

const Verifications = () => {

    // Page loading state
    const [loading, setLoading] = useState(true);

    // All regulations data
    const [regulations_list, setRegulationList] = useState([])

    // State of active regulation and clause
    const [activeRegulation, setActiveRegulation] = useState({ id: '', name: '' })
    const [activeClause, setActiveClause] = useState({ id: '', name: '', text: '', blocks: '', code: '', has_code: false })

    // Modals States
    const [infoRegulationModalShow, setInfoRegulationModalShow] = useState(false);
    const [clauseListModalShow, setClauseListModalShow] = useState(false);

    const [ifcFile, setIfcFile] = useState(null);
    const [xktFile, setXktFile] = useState(null);

    const [highlightedElements, setHighlightedElements] = useState(null);

    const [showLoader, setShowLoader] = useState(false)

    const [showVerification, setShowVerification] = useState(false)


    const onRunVerification = () => {
        setShowVerification(false)
        setShowLoader(true)
        setTimeout(() => {
            setShowLoader(false);
            setShowVerification(true)
        }, 3000)
    }


    const Loader = ({ className }) => (
        <div className={className}>
            <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231   0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475   2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464    1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                    stroke="white"
                />
            </svg>
        </div>
    )

    // const VerificationButton = ({ onSubmit, loading = false, disabled }) => {
    //     return (

    //         <Button
    //             className='mx-2 verification-button'
    //             variant='light'
    //             size='sm'
    //             onClick={onSubmit}
    //             disabled={disabled}>
    //             {!loading ? <FontAwesomeIcon icon="fa-play" /> : <Loader className="spinner" />}
    //         </Button>

    //     )
    // }

    const VerificationButton = ({ onSubmit, loading = false, disabled }) => {
        return (
            <button className="submit-btn mx-2" onClick={onSubmit} disabled={disabled}>
                {!loading ? <FontAwesomeIcon icon="fa-play" /> : <Loader className="spinner" />}
            </button>
        )
    }



    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:3000/login/');
        } else {

            // Confirm user authentication
            axios.get(process.env.REACT_APP_API_ROOT + 'auth/user/',
                {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                })
                .then(data => {
                    setLoading(false);
                })
                .catch(
                    console.log
                );

            // Get regulations
            axios.get(process.env.REACT_APP_API_ROOT + 'regulations/')
                .then(response => {
                    setRegulationList(response.data);
                })
                .catch(
                    console.log
                );
        }
    }, []);

    useEffect(() => {
        console.log(xktFile);
    }, [xktFile])

    return (
        <>
            {loading === false && (
                <>
                    {/* Initiate the modals */}
                    <ClauseListModal
                        ShowState={clauseListModalShow}
                        HideFunction={() => setClauseListModalShow(false)}
                        setClauseListModalShow={setClauseListModalShow}
                        activeRegulation={activeRegulation}
                        regulations_list={regulations_list}
                        setActiveClause={setActiveClause}
                    />
                    <InfoRegulationModal
                        regulation={activeRegulation.name}
                        regulations_list={regulations_list}
                        ShowState={infoRegulationModalShow}
                        HideFunction={() => setInfoRegulationModalShow(false)} />
                    {/* Page */}
                    <Container fluid className='h-100 max-h-100 overflow-hidden'>
                        <Row className='h-100'>
                            {/* Regulation left panel start */}
                            <Col>
                                {/* Regulation choose start */}
                                <Row className='border-bottom p-2'>
                                    <Col className='p-2'>
                                        <UploadButton setIfcFile={setIfcFile} setXktFile={setXktFile} />
                                    </Col>
                                </Row>
                                {/* Regulation choose end */}
                                <Row>
                                    <Col className='p-2'>
                                        <h6>
                                            Choose regulation:
                                        </h6>
                                        <Stack
                                            direction='horizontal'
                                            className='d-flex'>
                                            <Dropdown>
                                                <Dropdown.Toggle variant='light'>
                                                    Regulations
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {regulations_list.map(regs =>
                                                        <RegulationDropdownItem
                                                            id={regs.id}
                                                            regulation={regs.name}
                                                            onRegulationClick={() => {
                                                                setActiveRegulation({ id: regs.id, name: regs.name });
                                                                setShowVerification(false)
                                                            }} />)}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Button
                                                onClick={() => setClauseListModalShow(true)}
                                                size='sm'
                                                className='ms-auto d-inline d-xl-none'
                                                variant='light'>
                                                <Stack gap={2} direction="horizontal">
                                                    <span>clauses list</span>
                                                    <FontAwesomeIcon icon="fa-list" />
                                                </Stack>
                                            </Button>
                                        </Stack>
                                    </Col>
                                </Row>
                                {/* Regulation choose end */}

                                {/* Clause list start */}
                                <Row className='d-none d-xl-inline'>
                                    <Col>
                                        <Row className='d-flex'>
                                            {/* Show the active regulation name */}
                                            {activeRegulation.name !== '' &&
                                                <>
                                                    <Stack direction='horizontal'>
                                                        <h6>{activeRegulation.name}
                                                            <Button
                                                                className='mx-2'
                                                                variant='light'
                                                                size='sm'
                                                                onClick={() => setInfoRegulationModalShow(true)}>
                                                                <FontAwesomeIcon icon="fa-circle-info" />
                                                            </Button></h6>
                                                        <h6 className='ms-auto'>
                                                            Run compliance check
                                                            <VerificationButton
                                                                text="Submit"
                                                                onSubmit={onRunVerification}
                                                                loading={showLoader}
                                                                disabled={showLoader}
                                                            />
                                                        </h6>

                                                    </Stack>

                                                </>
                                            }
                                        </Row>
                                        <Row >
                                            <Col className='border-bottom border-top'>
                                                <ListGroup
                                                    className='h-100 overflow-scroll clause-list-size'
                                                    style={{ borderRadius: 0 }}>

                                                    {regulations_list.map(reg =>
                                                        <>
                                                            {reg.name === activeRegulation.name && reg.rules.map(rule =>

                                                                <ListGroupItem
                                                                    variant='light'
                                                                    id={rule.id}
                                                                    className='d-flex justify-content-between align-items-center small border'
                                                                    style={{ border: 0 }}
                                                                    action
                                                                    as='button'
                                                                    onClick={() => {
                                                                        setActiveClause({ id: rule.id, name: rule.name, text: rule.text, blocks: rule.blocks })
                                                                        setHighlightedElements(rule.result);
                                                                    }}>
                                                                    <div className="ms-2 me-auto d-flex">
                                                                        <Stack direction='horizontal' gap={2} >
                                                                            <FontAwesomeIcon icon="fa-section" />
                                                                            <div className="fw-bold">{rule.external_reference}</div>
                                                                            <FontAwesomeIcon className='me-auto' icon="fa-circle-info" />
                                                                        </Stack>
                                                                    </div>
                                                                    {showVerification ? (rule.result[0].result === false ?
                                                                        <FontAwesomeIcon className='text-danger' icon="fa-circle-xmark" />
                                                                        :
                                                                        <FontAwesomeIcon className='text-success' icon="fa-circle-check" />) : ''}
                                                                </ListGroupItem>)}
                                                        </>
                                                    )}

                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                {/* Clause list end */}
                            </Col>
                            {/* Regulation left panel end */}
                            <Col xs={12} xl={8} xxl={9} className="h-100 max-h-100 p-0">
                                <Row className='h-100 p-0'>
                                    {/* <ViewerXeokit ifcFile={ifcFile} highlightedElements={highlightedElements} />  */}
                                    <ViewerIFCJS ifcFile={ifcFile} />
                                </Row>
                            </Col>
                        </Row>
                    </Container>

                </>
            )}
        </>
    );
};

export default Verifications;