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
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

// Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfo, faCircleInfo, faPlus, faSave } from '@fortawesome/free-solid-svg-icons'
import { NewRegulationModal } from '../../components/layout/atomic/NewRegulationModal';
import { NewClauseModal } from '../../components/layout/atomic/NewClauseModal';
import { InfoRegulationModal } from '../../components/layout/atomic/InfoRegulationModal';

library.add(faCircleInfo, faPlus, faInfo, faSave);


// Choose the existing regulations in a dropdown
function RegulationDropdownItem({ regulation, onRegulationClick }) {
    return (
        <Dropdown.Item
            variant="secondary"
            onClick={onRegulationClick}>{regulation}
        </Dropdown.Item>
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


    // Controls the state of the block editor
    const [blockXml, setBlockXml] = useState('<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>');
    const [editorKey, setEditorKey] = useState(Math.random()); // used to execute a hard update on the editor 


    // set state changes in the DB
    const [updatedRegulations, setUpdatedRegulations] = useState({});
    const [UpdatedClause, setUpdatedClause] = useState({});


    function SaveClauseCode(blockXml) {

        const xml = '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'

        var newCode = {
            code: ''
        }
        if (blockXml !== xml) {
            newCode = {
                code: blockXml
            }
        }

        axios.patch('http://127.0.0.1:8000/api/licence/clause/' + activeClause.id + '/', newCode)
            .then(response => {
                setUpdatedClause(response.data);
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
                    console.log(data);
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
                                    <Stack direction='horizontal'>
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
                                                            setActiveRegulation({ id: regs.id })
                                                            setActiveRegulation({ name: regs.name })
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
                                    </Stack>
                                </Col>
                            </Row>
                            {/* Regulation choose end */}

                            {/* Clause list start */}
                            <Row >
                                <Col >
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
                                    <Row className='overflow-scroll'>
                                        <ListGroup className='h-100'>
                                            {regulations_list.map(reg =>
                                                <>
                                                    {reg.name === activeRegulation.name && reg.clauses.map(clauses =>
                                                        <ListGroupItem
                                                            variant='light'
                                                            id={clauses.name}
                                                            className='d-flex justify-content-between align-items-start list-group-item-action'
                                                            action
                                                            as='button'
                                                            onClick={() => {
                                                                setActiveClause({ id: clauses.id, name: clauses.name, text: clauses.text, code: clauses.code })
                                                                setEditorKey(Math.random())
                                                            }}>
                                                            <div className="ms-2 me-auto">
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
                                    </Row>
                                </Col>
                            </Row>
                            {/* Clause list end */}
                        </Col>
                        {/* Regulation left panel end */}
                        <Col xs={8} className="h-100 border p-0 max-h-100">
                            <Row className='h-40 d-flex align-items-end'>
                                <Row className='d-flex align-items-center mx-2 overflow-scroll'>
                                    <Col>
                                        <h5>{activeClause.name}</h5>
                                        <p className=''>{activeClause.text}</p>
                                    </Col>
                                </Row>
                                <Row className='px-0 mx-0 pb-2'>
                                    <Stack direction='horizontal' gap={2}>
                                        <Button
                                            className='mx-2'
                                            variant='light'
                                            size='sm'
                                            onClick={() => SaveClauseCode(blockXml, activeClause.id)}
                                        >
                                            <span className='p-2'>Save Code</span>
                                            <FontAwesomeIcon icon="fa-save" />
                                        </Button>
                                    </Stack>

                                </Row>
                            </Row>

                            <Row className='h-60 max-h-100'>
                                <MyBlocklyEditor
                                    key={editorKey}
                                    initialXml={activeClause.code}
                                    setBlockXml={setBlockXml}
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