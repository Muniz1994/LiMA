import React, { useState, useEffect, Fragment } from 'react';
import Container from 'react-bootstrap/Container';

const Projects = () => {
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

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
                    setUserEmail(data.email);
                    setLoading(false);
                });
        }
    }, []);

    return (
        <div>
            {loading === false && (
                <>
                    <Container>
                        <h1>Projects</h1>
                        <h2>Hello {userEmail}!</h2>
                    </Container>
                </>
            )}
        </div>
    );
};

export default Projects;