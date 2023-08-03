import React, { useEffect } from 'react';


// React-Boostrap imports
import { Spinner, Stack } from 'react-bootstrap';

import {
    MDBContainer,
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';

import { MDBSpinner, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

// Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useProjectsQuery } from '../context/SliceAPI'
import { useGetUserQuery } from '../context/userSliceAPI';

const ProjectUser = ({ userID }) => {
    const {
        data: User,
        error,
        isLoading: isLoadingUser,
    } = useGetUserQuery(userID);

    return (
        <>
            {error ? console.log(error) : isLoadingUser ? <MDBSpinner text="Loading..." /> : User.username}
        </>
    )
}

library.add(faCog, faPlus);

const Projects = () => {

    const {
        data: Projects,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useProjectsQuery();



    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:3000/login/');
        } else {

        }
    }, []);

    return (
        <>
            <MDBContainer fluid className='h-100 max-h-100 overflow-hidden px-5 px-xl-3'>
                <MDBRow className='h-100'>
                    {/* Regulation left panel start */}
                    <MDBCol>
                        {/* Regulation choose start */}
                        <MDBRow className=''>
                            <MDBCol className='p-2'>
                                <MDBBtn
                                    size='sm'
                                    className='m-2'
                                    color='dark'>
                                    <Stack gap={2} direction="horizontal">
                                        <span>New project</span>
                                        <FontAwesomeIcon icon="fa-plus" />
                                    </Stack>
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    {/* Regulation left panel end */}
                    <MDBCol xs={12} xl={10} xxl={10} className="d-flex justify-content-center ">
                        <div className='d-flex align-items-start flex-fill mt-4'>
                            <MDBTable align='middle' bordered>
                                <MDBTableHead>
                                    <tr>
                                        <th scope='col'>Project Name</th>
                                        <th scope='col'>Type</th>
                                        <th scope='col'>Adress</th>
                                        <th scope='col'>User</th>
                                        <th scope='col' className='d-flex justify-content-center'>Actions</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {isLoading ? <MDBSpinner text="Loading..." />
                                        : Projects.map(project =>
                                            <tr key={project.id} >
                                                <td>{project.name}</td>
                                                <td>{project.urbanistic_operation.type}</td>
                                                <td>{project.urbanistic_operation.adress}</td>
                                                <td><ProjectUser userID={project.user} /></td>
                                                <td className='d-flex justify-content-center'><MDBBtn rounded size='sm'>More info</MDBBtn></td>
                                            </tr>
                                        )
                                    }
                                </MDBTableBody>
                            </MDBTable>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
};

export default Projects;