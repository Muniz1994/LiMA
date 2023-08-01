import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useReducer, createContext, useEffect } from 'react';

import { RegulationsContext, RegulationsDispatchContext } from './components/Context/RegulationsContext';

import axios from 'axios';


import Navigationbar from './components/Navbar'; // import navbar


import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import Logout from './views/auth/Logout';
import Verifications from './views/Verifications';
import Regulations from './views/Regulations';
import Projects from './views/Projects';
import Test from './views/test';

import { ContextProvider } from "./middleware/context-provider";

async function regulationReducer(regulations, action) {

  if (action.type === 'GET_REGULATIONS') {

    await getData();


  }
  else {
    throw Error('Unknown action: ' + action.type);
  }
}

const getData = async () => {
  await axios.get(process.env.REACT_APP_API_ROOT + 'regulations/').then(res => { return res.data });
}

var initialRegulations = [{ name: '' }]


const App = () => {

  return (
    <div className='App'>

      <ContextProvider>
        <Router>
          <Navigationbar />
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
            {/* Sign in routes */}
            <Route path='/regulations' element={<Regulations />}></Route>
            <Route path='/test' element={<Test />}></Route>
            <Route path='/projects' element={<Projects />}></Route>
            <Route path='/verifications' element={<Verifications />}></Route>
          </Routes>
        </Router>

      </ContextProvider>

    </div>
  );
};

export default App;





