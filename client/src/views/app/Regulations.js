import React, { useState, useEffect } from 'react';

// Import general tools
import axios from 'axios';
import MyBlocklyEditor from '../../components/tools/BlockEditor';


// React-Boostrap imports
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Alert from 'react-bootstrap/Alert';

// Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfo, faCircleInfo, faPlus, faSave, faList, faCode, faSection, faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { NewRegulationModal } from '../../components/layout/atomic/NewRegulationModal';
import { NewClauseModal } from '../../components/layout/atomic/NewClauseModal';
import { InfoRegulationModal } from '../../components/layout/atomic/InfoRegulationModal';


library.add(faCircleInfo, faPlus, faInfo, faSave, faList, faCode, faSection, faCheck, faCircleExclamation);


// Choose the existing regulations in a dropdown
function RegulationDropdownItem({ regulation, onRegulationClick }) {
    return (
        <Dropdown.Item
            variant="secondary"
            onClick={onRegulationClick}>{regulation}
        </Dropdown.Item>
    );
}

export function ClauseListModal({ ShowState, HideFunction, setClauseListModalShow, activeRegulation, regulations_list, setActiveClause, setEditorKey, setNewClauseModalShow }) {


    return (
        <Modal show={ShowState} onHide={HideFunction}>
            <Modal.Header closeButton>
                <Modal.Title>{activeRegulation.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup className='h-100 overflow-scroll   clause-list-size'>
                    {regulations_list.map(reg =>
                        <>
                            {reg.name === activeRegulation.name && reg.clauses.map(clauses =>
                                <ListGroupItem
                                    variant='light'
                                    id={clauses.name}
                                    className='d-flex justify-content-between align-items-center small'
                                    action
                                    as='button'
                                    onClick={() => {
                                        setActiveClause({ id: clauses.id, name: clauses.name, text: clauses.text, code: clauses.code });
                                        setEditorKey(Math.random());
                                        setClauseListModalShow(false);
                                    }}>
                                    <div className="ms-2 me-auto">
                                        <Stack direction='horizontal' gap={2}>

                                        </Stack>
                                        <div className="fw-bold">{clauses.name}</div>
                                    </div>
                                    {clauses.has_code === false ?
                                        <Badge bg="danger" pill>
                                            No code
                                        </Badge>
                                        :
                                        <Badge bg="success" pill>
                                            Has code
                                        </Badge>}
                                </ListGroupItem>
                            )}
                        </>
                    )}
                    {activeRegulation.name !== '' &&
                        <ListGroupItem
                            className='d-flex justify-content-between align-items-start list-group-item-action'
                            action
                            onClick={() => setNewClauseModalShow(true)}>

                            <div className="ms-2 me-auto">
                                <div

                                    className="fw-bold">
                                    Add new <FontAwesomeIcon icon="fa-plus" />
                                </div>
                            </div>
                        </ListGroupItem>}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={HideFunction}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const Regulations = () => {

    // Page loading state
    const [loading, setLoading] = useState(true);

    // All regulations data
    const [regulations_list, setRegulationList] = useState([])

    // State of active regulation and clause
    const [activeRegulation, setActiveRegulation] = useState({ id: '', name: '' })
    const [activeClause, setActiveClause] = useState({ id: '', name: '', text: '', code: '', has_code: false })

    // Modals States
    const [infoRegulationModalShow, setInfoRegulationModalShow] = useState(false);
    const [newRegulationModalShow, setNewRegulationModalShow] = useState(false);
    const [newClauseModalShow, setNewClauseModalShow] = useState(false);
    const [clauseListModalShow, setClauseListModalShow] = useState(false);
    const [showCode, setShowCode] = useState(true);


    // Controls the state of the block editor
    const [blockXml, setBlockXml] = useState('<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>');
    const [blockPython, setBlockPython] = useState('')
    const [editorKey, setEditorKey] = useState(Math.random()); // used to execute a hard update on the editor 
    const [isClauseCodeUpdated, setIsClauseCodeUpdated] = useState(false);


    // set state changes in the DB
    const [updatedRegulations, setUpdatedRegulations] = useState({});
    const [UpdatedClause, setUpdatedClause] = useState({});

    useEffect(() => {
        if (activeClause.code === blockXml) {
            setIsClauseCodeUpdated(true);
        }
        else {
            setIsClauseCodeUpdated(false);
        }
    }, [UpdatedClause, blockXml]);



    function SaveClauseCode(blockXml, blockPython) {

        const xml = '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'

        var newCode = {
            code: '',
            python_code: ''
        }
        if (blockXml !== xml) {
            newCode = {
                code: blockXml,
                python_code: blockPython
            }
        }

        axios.patch('http://127.0.0.1:8000/api/licence/clause/' + activeClause.id + '/', newCode)
            .then(response => {
                setUpdatedClause(response.data);
                setActiveClause(response.data);
            })
            .catch(err => console.log(err));

    };

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
    }, [updatedRegulations, UpdatedClause]);

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
                        setEditorKey={setEditorKey}
                        setNewClauseModalShow={setNewClauseModalShow}
                    />
                    <InfoRegulationModal
                        regulation={activeRegulation.name}
                        regulations_list={regulations_list}
                        ShowState={infoRegulationModalShow}
                        HideFunction={() => setInfoRegulationModalShow(false)} />
                    <NewRegulationModal
                        setUpdatedRegulations={setUpdatedRegulations}
                        ShowState={newRegulationModalShow}
                        HideFunction={() => setNewRegulationModalShow(false)} />
                    <NewClauseModal
                        regulationId={activeRegulation.id}
                        setUpdatedClause={setUpdatedClause}
                        ShowState={newClauseModalShow}
                        HideFunction={() => setNewClauseModalShow(false)} />

                    {/* Page */}
                    <Row className='h-100'>
                        {/* Regulation left panel start */}
                        <Col>
                            {/* Regulation choose start */}
                            <Row>
                                <Col className='p-2'>
                                    <h5>
                                        Choose regulation:
                                    </h5>
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
                                            onClick={() => setNewRegulationModalShow(true)}
                                            size='sm'
                                            className='m-2'
                                            variant='light'>
                                            <Stack gap={2} direction="horizontal">
                                                <span>New regulation</span>
                                                <FontAwesomeIcon icon="fa-plus" />
                                            </Stack>
                                        </Button>
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
                                    <Row>
                                        {/* Show the active regulation name */}
                                        {activeRegulation.name !== '' &&
                                            <>
                                                <h5>{activeRegulation.name}
                                                    <Button
                                                        className='mx-2'
                                                        variant='light'
                                                        size='sm'
                                                        onClick={() => setInfoRegulationModalShow(true)}>
                                                        <FontAwesomeIcon icon="fa-circle-info" />
                                                    </Button></h5>
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
                                                                className='d-flex justify-content-between align-items-center small'
                                                                style={{ border: 0 }}
                                                                action
                                                                as='button'
                                                                onClick={() => {
                                                                    setActiveClause({ id: clauses.id, name: clauses.name, text: clauses.text, code: clauses.code })
                                                                    setEditorKey(Math.random())
                                                                }}>
                                                                <div className="ms-2 me-auto">
                                                                    <Stack direction='horizontal' gap={2}>
                                                                        <FontAwesomeIcon icon="fa-section" />
                                                                        <div className="fw-bold">{clauses.name}</div>
                                                                    </Stack>

                                                                </div>
                                                                {clauses.has_code === false ?
                                                                    <Badge bg="theme-e" pill>
                                                                        No code
                                                                    </Badge>
                                                                    :
                                                                    <Badge bg="theme-b" pill>
                                                                        Has code
                                                                    </Badge>}
                                                            </ListGroupItem>
                                                        )}
                                                    </>
                                                )}
                                                {activeRegulation.name !== '' &&
                                                    <ListGroupItem
                                                        className='d-flex justify-content-between align-items-start list-group-item-action'
                                                        style={{ border: 0 }}
                                                        action
                                                        onClick={() => setNewClauseModalShow(true)}>

                                                        <div className="ms-2 me-auto">
                                                            <div

                                                                className="fw-bold">
                                                                Add new <FontAwesomeIcon icon="fa-plus" />
                                                            </div>
                                                        </div>
                                                    </ListGroupItem>}
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {/* Clause list end */}
                        </Col>
                        {/* Regulation left panel end */}
                        <Col xs={12} xl={8} xxl={9} className="h-100 border max-h-100">
                            <Row className='h-30 d-flex align-start p-2'>
                                <Col className='d-flex flex-column'>
                                    <Row className='mb-auto'>
                                        <Col>
                                            <h5>{activeClause.name}</h5>
                                            <p className=''>{(activeClause.text).substring(0, 500)}...</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Stack
                                                className='d-flex'
                                                direction='horizontal' gap={2}>
                                                <Button
                                                    variant='light'
                                                    size='sm'
                                                    onClick={() => SaveClauseCode(blockXml, blockPython, activeClause.id)}
                                                >
                                                    <span className='p-2'>Save Code</span>
                                                    <FontAwesomeIcon icon="fa-save" />
                                                </Button>
                                                {activeClause.code !== '' ? isClauseCodeUpdated ? <Stack className="text-success" direction='horizontal' gap={1}>
                                                    <span className='small'>Updated</span>
                                                    <FontAwesomeIcon variant='success' icon="fa-check" />
                                                </Stack> :
                                                    <Stack className="text-warning" direction='horizontal' gap={1}>
                                                        <span className='small'>Not updated</span>
                                                        <FontAwesomeIcon variant='success' icon="fa-circle-exclamation" />
                                                    </Stack> : null}

                                                <Button
                                                    className='ms-auto'
                                                    variant='dark'
                                                    size='sm'
                                                    onClick={() => {
                                                        setShowCode(prevShowCode => !prevShowCode);
                                                        setEditorKey(Math.random())
                                                    }}
                                                >
                                                    <span className='p-2'>Toggle Code</span>
                                                    <FontAwesomeIcon icon="fa-code" />
                                                </Button>
                                            </Stack>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className='h-70'>
                                <MyBlocklyEditor
                                    showCode={showCode}
                                    key={editorKey}
                                    initialXml={activeClause.code}
                                    setBlockXml={setBlockXml}
                                    setBlockPython={setBlockPython}
                                    className="" />
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default Regulations;