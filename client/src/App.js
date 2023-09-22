import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import axios from 'axios';


import Navigationbar from './components/Navbar'; // import navbar


import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import Logout from './views/auth/Logout';
import Verifications from './views/Verifications';
import Regulations from './views/Regulations';
import Projects from './views/Projects';
import Verifications2 from './views/Verifications2';



const App = () => {

  return (
    <div className='App'>


      <Router>
        <Navigationbar />
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
          {/* Sign in routes */}
          <Route path='/regulations' element={<Regulations />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/verifications' element={<Verifications />}></Route>
          <Route path='/verifications2' element={<Verifications2 />}></Route>
        </Routes>
      </Router>



    </div>
  );
};

export default App;





