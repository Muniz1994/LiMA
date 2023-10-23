import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navigationbar from './components/Navbar'; // import navbar


import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import Logout from './views/auth/Logout';
import Reports from './views/Reports';
import Regulations from './views/Regulations';
import CheckPanel from './views/CheckPanel';



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
          <Route path='/checkpanel' element={<CheckPanel />}></Route>
          <Route path='/reports' element={<Reports />}></Route>
        </Routes>
      </Router>



    </div>
  );
};

export default App;





