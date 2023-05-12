import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navigationbar from './components/layout/main/Navbar'; // import navbar
import Footer from './components/layout/main/Footer';


import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import Logout from './views/auth/Logout';
import Verifications from './views/app/Verifications';
import Regulations from './views/app/Regulations';



import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';


const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navigationbar />
        <Container fluid className='h-100 max-h-100 overflow-hidden px-5 px-xl-3'>
          <Row className='h-100'>
            <Col className='max-h-100'>
              <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/logout' element={<Logout />}></Route>
                {/* Sign in routes */}
                <Route path='/regulations' element={<Regulations />}></Route>
                <Route path='/verifications' element={<Verifications />}></Route>
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
};

export default App;