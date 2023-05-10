import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';

const Testpage = () => {

    const [data, setData] = useState([])

    const HandleSubmit = (event) => {
        axios.get('http://127.0.0.1:8000/api/licence/regulations/')
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(err => console.log(err));

    };

    return (

        <>
            <Button onClick={HandleSubmit}>
                botão!
            </Button>
            {data.map(i => <p>{i.name}</p>)}
        </>
    )
}

export default Testpage