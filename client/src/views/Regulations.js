import React, { useState, useEffect, useContext } from 'react';

// Import general tools
import axios from 'axios';
import MyBlocklyEditor from '../components/CodeEditor/BlockEditor';

// React-Boostrap imports
import Stack from 'react-bootstrap/Stack';

import { MDBIcon, MDBContainer, MDBCol, MDBRow, MDBBadge, MDBBtn, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

// Import icons

import { NewRegulationModal } from '../components/NewRegulationModal';
import { NewClauseModal } from '../components/NewClauseModal';
import { InfoRegulationModal } from '../components/InfoRegulationModal';
import { ClauseListModal } from '../components/ClauseListModal';

import { useSelector, useDispatch } from 'react-redux'

import { setRegulationList } from '../context/regulationSlice';
import { setActiveRegulation } from '../context/activeRegulationSlice';
import { setActiveClause } from '../context/activeClauseSlice';


// Choose the existing regulations in a dropdown
function RegulationDropdownItem({ regulation, onRegulationClick }) {
    return (
        <MDBDropdownItem
            link childTag='button'
            onClick={onRegulationClick}>{regulation}
        </MDBDropdownItem>
    );
}

const Regulations = () => {

    const regulations_list = useSelector((state) => state.regulations_list.value);
    const activeRegulation = useSelector((state) => state.activeRegulation.value);
    const activeClause = useSelector((state) => state.activeClause.value);
    const dispatch = useDispatch();


    // Page loading state
    const [loading, setLoading] = useState(true);


    // State of active regulation and clause
    const [activeZone, setActiveZone] = useState({ id: '', name: '' });

    // Modals States
    const [infoRegulationModalShow, setInfoRegulationModalShow] = useState(false);
    const [newRegulationModalShow, setNewRegulationModalShow] = useState(false);
    const [newClauseModalShow, setNewClauseModalShow] = useState(false);
    const [newZoneModalShow, setNewZoneModalShow] = useState(false);
    const [clauseListModalShow, setClauseListModalShow] = useState(false);
    const [showCode, setShowCode] = useState(false);


    // Controls the state of the block editor
    const [blockXml, setBlockXml] = useState('<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>');
    const [blockPython, setBlockPython] = useState('');
    const [editorKey, setEditorKey] = useState(Math.random()); // used to execute a hard update on the editor 
    const [isClauseCodeUpdated, setIsClauseCodeUpdated] = useState(false);


    // set state changes in the DB
    const [updatedRegulations, setUpdatedRegulations] = useState({});
    const [UpdatedClause, setUpdatedClause] = useState({});
    const [UpdatedZone, setUpdatedZone] = useState({});


    // Verify if the active clause has the same code as the editor
    useEffect(() => {

        if (activeClause.blocks === blockXml) {
            setIsClauseCodeUpdated(true);
        }
        else {
            setIsClauseCodeUpdated(false);

        }
    }, [UpdatedClause, blockXml]);


    // The main loading process of the page
    useEffect(() => {

            // Get regulations
            // TODO: change to RTK
            axios.get(process.env.REACT_APP_API_ROOT + 'regulations/')
                .then(response => {
                    dispatch(setRegulationList((response.data)));
                })
                .catch(
                    console.log
                );
    }, [updatedRegulations, UpdatedClause, UpdatedZone]);


    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Save clause 
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    function SaveClauseCode(blockXml, blockPython) {

        const xml = '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'

        var newCode = {
            blocks: '',
            code: ''
        };

        console.log(newCode);

        if (blockXml !== xml) {
            newCode = {
                blocks: blockXml,
                code: blockPython
            }
        }

        // TODO: change to RTK
        axios.patch(process.env.REACT_APP_API_ROOT + 'rules/' + activeClause.id + '/', newCode)
            .then(response => {
                console.log(response);
                setUpdatedClause(response.data);
                dispatch(setActiveClause(response.data));
            })
            .catch(err => console.log(err));

    };


    return (
        <>
                <>
                    {/* Initiate the modals */}
                    <ClauseListModal
                        ShowState={clauseListModalShow}
                        HideFunction={() => setClauseListModalShow(false)}
                        setClauseListModalShow={setClauseListModalShow}
                        activeRegulation={activeRegulation}
                        regulations_list={regulations_list}
                        setActiveClause={dispatch(setActiveClause)}
                        setEditorKey={setEditorKey}
                        setNewClauseModalShow={setNewClauseModalShow}
                    />
                    <InfoRegulationModal
                        regulation={activeRegulation.name}
                        regulations_list={regulations_list}
                        ShowState={infoRegulationModalShow}
                        setShowState={setInfoRegulationModalShow}
                        toggleOpen={() => setInfoRegulationModalShow(!infoRegulationModalShow)} />
                    <NewRegulationModal
                        setUpdatedRegulations={setUpdatedRegulations}
                        ShowState={newRegulationModalShow}
                        HideFunction={() => setNewRegulationModalShow(false)} />
                    <NewClauseModal
                        RegulationId={activeRegulation.id}
                        setUpdatedClause={setUpdatedClause}
                        ShowState={newClauseModalShow}
                        HideFunction={() => setNewClauseModalShow(false)} />


                    {/* Page */}
                    <MDBContainer fluid className='h-100 max-h-100 overflow-hidden px-5 px-xl-3'>
                        <MDBRow className='h-100'>
                            {/* Regulation left panel start */}
                            <MDBCol>
                                {/* Regulation choose start */}
                                <MDBRow>
                                    <MDBCol className='p-2'>

                                        <h6 className='bg-light p-2 border-top border-bottom'>Selecione regulamento:</h6>
                                        <Stack
                                            direction='horizontal'
                                            className='d-flex'>
                                            <MDBDropdown group>
                                                <MDBBtn outline color='dark'>Regulamentos</MDBBtn>
                                                <MDBDropdownToggle split color='dark'>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                    {regulations_list.map(regs =>
                                                        <RegulationDropdownItem
                                                            id={regs.name}
                                                            regulation={regs.name}
                                                            onRegulationClick={() => {
                                                                dispatch(setActiveRegulation({ id: regs.id, name: regs.name }))
                                                            }} />)}
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                            <MDBBtn
                                                outline
                                                onClick={() => setNewRegulationModalShow(true)}
                                                size='sm'
                                                className='m-2'
                                                color='dark'>
                                                <Stack gap={2} direction="horizontal">
                                                    <span>Novo regulamento</span>
                                                    <MDBIcon fas icon="plus" />
                                                </Stack>
                                            </MDBBtn>
                                            <MDBBtn
                                                onClick={() => setClauseListModalShow(true)}
                                                size='sm'
                                                className='ms-auto d-inline d-xl-none'
                                                color='light'>
                                                <Stack gap={2} direction="horizontal">
                                                    <span>clauses list</span>
                                                    <MDBIcon fas icon="list" />
                                                </Stack>
                                            </MDBBtn>
                                        </Stack>
                                    </MDBCol>
                                </MDBRow>
                                {/* Regulation choose end */}

                                {/* Clause list start */}
                                <MDBRow className='d-none d-xl-inline'>
                                    <MDBCol>
                                        <MDBRow>
                                            {/* Show the active regulation name */}
                                            {activeRegulation.name !== '' &&
                                                <>
                                                    <h6 className='bg-light p-2 border-top border-bottom'>{activeRegulation.name}<MDBBtn
                                                        className='mx-2'
                                                        color='light'
                                                        size='sm'
                                                        onClick={() => setInfoRegulationModalShow(true)}>
                                                        <MDBIcon fas icon="info-circle" />
                                                    </MDBBtn></h6>

                                                </>
                                            }
                                        </MDBRow>
                                        <MDBRow >
                                            <MDBCol className='border-bottom border-top'>
                                                <MDBListGroup
                                                    className='h-100 overflow-scroll clause-list-size'
                                                    style={{ borderRadius: 0 }}>

                                                    {regulations_list.map(reg =>
                                                        <>
                                                            {reg.name === activeRegulation.name && reg.rules.map(rule =>

                                                                <MDBListGroupItem
                                                                    tag='button'
                                                                    action noBorders type='button' className='px-3 shadow-4'
                                                                    onClick={() => {
                                                                        dispatch(setActiveClause({ id: rule.id, name: rule.name, text: rule.text, blocks: rule.blocks }))

                                                                        setEditorKey(Math.random())
                                                                    }}>
                                                                    <div className="ms-2 me-auto">
                                                                        <Stack direction='horizontal' gap={2}>
                                                                            <MDBIcon fas icon="puzzle-piece" />
                                                                            <div className="fw-bold">{rule.name}</div>
                                                                        </Stack>

                                                                    </div>
                                                                    {rule.has_code === false ?
                                                                        <MDBBadge color="warning" light>
                                                                            No code
                                                                        </MDBBadge>
                                                                        :
                                                                        <MDBBadge color="success" light>
                                                                            Has code
                                                                        </MDBBadge>}
                                                                </MDBListGroupItem>)}

                                                        </>
                                                    )}
                                                    {activeRegulation.name !== '' &&
                                                        <MDBListGroupItem
                                                            action noBorders type='button' className='px-3'
                                                            onClick={() => setNewClauseModalShow(true)}>

                                                            <div className="ms-2 me-auto">
                                                                <Stack direction='horizontal' gap={2}>
                                                                    <div className="fw-bold">Nova regra</div> <MDBIcon fas icon="plus" />
                                                                </Stack>
                                                            </div>
                                                        </MDBListGroupItem>}
                                                </MDBListGroup>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCol>
                                </MDBRow>
                                {/* Clause list end */}
                            </MDBCol>
                            {/* Regulation left panel end */}
                            <MDBCol xs={12} xl={8} xxl={9} className="h-100 border max-h-100">
                                <MDBRow className=' d-flex align-start p-2'>
                                    <MDBCol className='d-flex flex-column'>
                                        <MDBRow className='mb-auto'>
                                            <MDBCol>
                                                <h5>{activeClause.name}</h5>
                                                <p className=''>{(activeClause.text).substring(0, 500)}</p>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <Stack
                                                    className='d-flex'
                                                    direction='horizontal' gap={2}>
                                                    <MDBBtn
                                                        outline
                                                        color='dark'
                                                        size='sm'
                                                        onClick={() => SaveClauseCode(blockXml, blockPython, activeClause.id)}
                                                    >
                                                        <span className='p-2'>Salvar regra</span>
                                                        <MDBIcon far icon="save" />
                                                    </MDBBtn>
                                                    {activeClause.blocks !== '' ? isClauseCodeUpdated ? <Stack className="text-success" direction='horizontal' gap={1}>
                                                        <span className='small'>Updated</span>
                                                        <MDBIcon fas icon="check" />
                                                    </Stack> :
                                                        <Stack className="text-warning" direction='horizontal' gap={1}>
                                                            <span className='small'>Not updated</span>
                                                            <MDBIcon fas icon="exclamation-triangle" />
                                                        </Stack> : null}

                                                    <MDBBtn
                                                        className='ms-auto'
                                                        color='dark'
                                                        size='sm'
                                                        onClick={() => {
                                                            setShowCode(prevShowCode => !prevShowCode);
                                                            setEditorKey(Math.random())
                                                        }}
                                                    >
                                                        <span className='p-2'>Código</span>
                                                        <MDBIcon fas icon="code" />
                                                    </MDBBtn>
                                                </Stack>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className='h-100'>
                                    <MyBlocklyEditor
                                        showCode={showCode}
                                        key={editorKey}
                                        initialXml={activeClause.blocks}
                                        setBlockXml={setBlockXml}
                                        setBlockPython={setBlockPython}
                                        className="" />
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                </>
        </>
    );
};

export default Regulations;