import React, { useState, useEffect, useRef } from 'react';


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


import { ViewerXeokit } from '../components/ModelViewer/ViewerXeokit';

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


function UploadButton({setIfcFile}) {


    const [uploadedFileName, setInputFileName] = useState(null);


    const inputRef = useRef(null);

    const handleUpload = () => {
        inputRef.current?.click()
    }

    const handleDisplayFileDetails = async () => {
        inputRef.current?.files && setInputFileName(inputRef.current.files[0].name);
        setIfcFile(URL.createObjectURL(inputRef.current.files[0]));

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
    const [activeClause, setActiveClause] = useState({ id: '', name: '', text: '', code: '', has_code: false })

    // Modals States
    const [infoRegulationModalShow, setInfoRegulationModalShow] = useState(false);
    const [clauseListModalShow, setClauseListModalShow] = useState(false);

    const [ifcFile, setIfcFile] = useState(null);
    const [highlightedElements, setHighlightedElements] = useState(null);




    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:3000/login');
        } else {
            fetch('http://127.0.0.1:8000/api/v1/users/auth/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setLoading(false);
                });
            fetch('http://127.0.0.1:8000/api/licence/regulations/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setRegulationList(data);
                })
                .catch(err => {
                    console.log("There must have been an error somewhere in your code", err.message)
                });;
        }
    }, []);

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
                    <Row className='h-100'>
                        {/* Regulation left panel start */}
                        <Col>
                            {/* Regulation choose start */}
                            <Row className='border-bottom'>
                                <Col className='p-2'>
                                    <UploadButton setIfcFile={setIfcFile} />
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
                                                        id={regs.name}
                                                        regulation={regs.name}
                                                        onRegulationClick={() => {
                                                            setActiveRegulation({ id: regs.id, name: regs.name })
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
                                                        Run
                                                        <Button
                                                            className='mx-2'
                                                            variant='light'
                                                            size='sm'
                                                            onClick={() => setInfoRegulationModalShow(true)}>
                                                            <FontAwesomeIcon icon="fa-play" />
                                                        </Button>
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
                                                        {reg.name === activeRegulation.name && reg.clauses.map(clauses =>
                                                            <ListGroupItem
                                                                variant='light'
                                                                id={clauses.name}
                                                                className='d-flex justify-content-between align-items-center small border'
                                                                style={{ border: 0 }}
                                                                action
                                                                as='button'
                                                                onClick={() => {
                                                                    setActiveClause({ id: clauses.id, name: clauses.name, text: clauses.text, code: clauses.code });
                                                                    setHighlightedElements(["2O2Fr$t4X7Zf8NOew3FLR9","2O2Fr$t4X7Zf8NOew3FLQD"]);
                                                                }}>
                                                                <div className="ms-2 me-auto d-flex">
                                                                    <Stack direction='horizontal' gap={2} >
                                                                        <FontAwesomeIcon icon="fa-section" />
                                                                        <div className="fw-bold">{clauses.name}</div>
                                                                        <FontAwesomeIcon className='me-auto' icon="fa-circle-info" />
                                                                    </Stack>
                                                                </div>
                                                                {clauses.has_code === false ?
                                                                    <FontAwesomeIcon className='text-danger' icon="fa-circle-xmark" />
                                                                    :
                                                                    <FontAwesomeIcon className='text-success' icon="fa-circle-check" />}
                                                            </ListGroupItem>
                                                        )}
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
                        <Col xs={12} xl={8} xxl={9} className="h-100 border max-h-100">
                            <Row className='h-100'>
                                <ViewerXeokit ifcFile={ifcFile} highlightedElements={highlightedElements} /> 
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default Verifications;