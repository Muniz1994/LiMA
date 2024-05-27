import React, { useState, useEffect} from 'react';

import axios from 'axios';


// React-Boostrap imports
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';

import Stack from 'react-bootstrap/Stack';

// Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInfo, faCircleInfo, faPlus, faSave, faList, faCode, faSection, faCheck, faCircleExclamation, faPlay, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';



import { ViewerXeokit } from '../components/ModelViewer/ViewerXeokit';
import { Container } from 'react-bootstrap';
import { MDBListGroup, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBListGroupItem, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBBadge, MDBDropdownItem, MDBBtn, MDBSpinner, MDBAccordion, MDBAccordionItem, MDBIcon } from 'mdb-react-ui-kit';

import { useSelector, useDispatch } from 'react-redux';

import { useExecuteVerificationQuery, useVerificationsQuery } from '../context/SliceAPI';

library.add(faCircleInfo, faPlus, faInfo, faSave, faList, faCode, faSection, faCheck, faCircleExclamation, faPlay, faCircleCheck, faCircleXmark);


// Choose the existing regulations in a dropdown
function RegulationDropdownItem({ regulation, onRegulationClick }) {
    return (
        <MDBDropdownItem
            link
            onClick={onRegulationClick}>{regulation}
        </MDBDropdownItem>
    );
}

const ReportInfoModal = ({ toggleShow, basicModal, setBasicModal }) => {

    return (
        <>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Reg</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>Info</MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='dark' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </>
    )
}


const Reports = () => {

    const { data: verifications_list, isLoading } = useVerificationsQuery()

    const viewer = useSelector((state) => state.viewer.value);
    const dispatch = useDispatch();

    const [activeVerificationId, setActiveVerificationId] = useState(null)
    const [executeVerificationId, setExecuteVerificationId] = useState(null)

    const { data: report, isLoading: isChecking } = useExecuteVerificationQuery(executeVerificationId)


    // All regulations data
    const [regulations_list, setRegulationList] = useState([])


    // Modals States
    const [clauseListModalShow, setClauseListModalShow] = useState(false);
    const [reportInfoModalShow, setReportInfoModalShow] = useState(false);

    const [xktFile, setXktFile] = useState(null);

    const toggleReportInfoModal = () => setReportInfoModalShow(!reportInfoModalShow)

    const VerificationButton = ({ verificationId }) => {
        return (
            <>{!isChecking ? <MDBBtn color='dark' className="my-2" onClick={() => setExecuteVerificationId(verificationId)} outline><Stack direction='horizontal'><>Executar verificação</><MDBIcon className='px-2' fas size='lg' icon="play" /></Stack></MDBBtn> :
                <><MDBBtn color='dark' className="" onClick={() => setExecuteVerificationId(verificationId)} outline><Stack direction='horizontal'><>Executar verificação</><MDBIcon className='px-2' fas size='lg' icon="play" /></Stack></MDBBtn><MDBSpinner grow></MDBSpinner></>}</>

        )
    }



    useEffect(() => {


            // Get regulations
            axios.get(process.env.REACT_APP_API_ROOT + 'regulations/')
                .then(response => {
                    setRegulationList(response.data);
                })
                .catch(
                    console.log
                );
        }
    , []);

    useEffect(() => {
        console.log(xktFile);
    }, [xktFile])

    useEffect(() => {

    })

    return (
        <>
                <>
                    {/* Initiate the modals */}
                    <ReportInfoModal
                        toggleShow={toggleReportInfoModal}
                        basicModal={reportInfoModalShow}
                        setBasicModal={setReportInfoModalShow}
                    />

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

                                        <h6 className='bg-light p-2 border-top border-bottom'>Informação de verificação:</h6>
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
                                                                                    <Stack direction='horizontal'>
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
                                                                                        <MDBBtn color='dark' onClick={toggleReportInfoModal}><MDBIcon fas icon="info-circle" /></MDBBtn>

                                                                                    </Stack>




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
        </>
    );
};

export default Reports;