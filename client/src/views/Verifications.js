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
import { MDBListGroup, MDBListGroupItem, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBBadge, MDBDropdownItem, MDBBtn, MDBSpinner, MDBAccordion, MDBAccordionItem, MDBIcon } from 'mdb-react-ui-kit';

import { useSelector, useDispatch } from 'react-redux';

import { useExecuteVerificationQuery, useVerificationsQuery } from '../context/SliceAPI';

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

const getCheckResult = () => {


}


const Verifications = () => {

    const { data: verifications_list, error, isLoading } = useVerificationsQuery()

    const viewer = useSelector((state) => state.viewer.value);
    const dispatch = useDispatch();

    const [activeVerificationId, setActiveVerificationId] = useState(null)
    const [executeVerificationId, setExecuteVerificationId] = useState(null)

    const { data: report, error: checkError, isLoading: isChecking } = useExecuteVerificationQuery(executeVerificationId)

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

    const VerificationButton = ({ verificationId }) => {
        return (
            <>{!isChecking ? <MDBBtn color='dark' className="my-2" onClick={() => setExecuteVerificationId(verificationId)} outline><Stack direction='horizontal'><>Executar verificação</><MDBIcon className='px-2' fas size='lg' icon="play" /></Stack></MDBBtn> :
                <><MDBBtn color='dark' className="" onClick={() => setExecuteVerificationId(verificationId)} outline><Stack direction='horizontal'><>Executar verificação</><MDBIcon className='px-2' fas size='lg' icon="play" /></Stack></MDBBtn><MDBSpinner grow></MDBSpinner></>}</>



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

    useEffect(() => {

    })

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
                            <Col className='verification-panel'>
                                <Row>
                                    <Col className='p-2'>
                                        <h6 className='bg-light p-2 border-top border-bottom'>Selecione verificação:</h6>
                                        <Stack
                                            direction='horizontal'
                                            className='d-flex my-2'>
                                            <MDBDropdown group>
                                                <MDBBtn outline color='dark'>Verificações</MDBBtn>
                                                <MDBDropdownToggle split color='dark'>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>

                                                    {isLoading ? <></> : verifications_list.map(ver =>
                                                        <RegulationDropdownItem
                                                            id={ver.id}
                                                            regulation={ver.id}
                                                            onRegulationClick={() => {
                                                                if (viewer && ver.xkt_file) {
                                                                    dispatch({ type: 'CLEAN_MODEL', object: viewer })
                                                                    dispatch({ type: 'LOAD_MODEL', object: viewer, value: ver.xkt_file })
                                                                    setActiveVerificationId(ver.id)
                                                                }
                                                            }} />)}
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
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

                                        <h6 className='bg-light p-2 border-top border-bottom'>Informações de verificação:</h6>
                                        {isLoading ?
                                            <p>a carregar...</p> :
                                            <>
                                                {verifications_list.map(ver =>
                                                    ver.id === activeVerificationId ?
                                                        <>
                                                            <h6>Id de verificação:</h6>
                                                            <p className='m-0'>{ver.id}</p>
                                                            <h6>Data de criação:</h6>
                                                            <p className='m-0'>{ver.time_executed}</p>
                                                            <h6>Ficheiro IFC:</h6>
                                                            <p className='m-0'>{ver.ifc_file}</p>
                                                            <VerificationButton verificationId={ver.id} />

                                                        </>
                                                        :
                                                        <></>

                                                )}
                                            </>
                                        }

                                    </Col>
                                </Row>
                                {/* Regulation choose end */}

                                {/* Clause list start */}
                                <Row className='d-none d-xl-inline m-0'>
                                    <Col>

                                        <Row >
                                            <h6 className='bg-light p-2 border-top border-bottom'>Relatório de verificação:
                                            </h6>
                                            <Col className='verification-list '>



                                                <MDBAccordion flush className='px-0'>

                                                    {isChecking ?
                                                        <></> :
                                                        report ?
                                                            report.map(ver =>
                                                                <>
                                                                    <MDBAccordionItem className='px-0' collapseId={ver.id} headerTitle={ver.reference}>

                                                                        <MDBListGroup>

                                                                            {ver.checks.map(check =>

                                                                                <MDBListGroupItem
                                                                                    key={check.object_id}
                                                                                    tag='button'
                                                                                    type='button'
                                                                                    noBorders
                                                                                    action
                                                                                    className='px-1'
                                                                                    onClick={() => dispatch({ type: 'HIGHLIGHT_ELEMENTS', object: viewer, value: [check.object_id, check.result] })}
                                                                                    light>
                                                                                    <div className='me-auto text-start'>
                                                                                        <p className='m-0'><small><b>Id do objecto:</b> {check.object_id}</small></p>
                                                                                        <p className='m-0'><small><b>Nome do objecto:</b> {check.object_name}</small></p>
                                                                                        <p className='m-0'><small><b>Valor de verificação:</b> {check.value}</small></p>
                                                                                        {check.result ?
                                                                                            <MDBBadge color='success' light>
                                                                                                aprovado!
                                                                                            </MDBBadge>
                                                                                            :
                                                                                            <MDBBadge color='danger' light>
                                                                                                reprovado
                                                                                            </MDBBadge>}

                                                                                    </div>


                                                                                </MDBListGroupItem>)}


                                                                        </MDBListGroup>

                                                                    </MDBAccordionItem>
                                                                </>
                                                            ) :
                                                            <></>

                                                    }

                                                </MDBAccordion>

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
                                    <ViewerXeokit ifcFile={xktFile} />
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