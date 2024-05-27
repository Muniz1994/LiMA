import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navigationbar from './components/Navbar'; // import navbar


import Reports from './views/Reports';
import Regulations from './views/Regulations';
import CheckPanel from './views/CheckPanel';



const App = () => {

  return (
    <div className='App'>


      <Router>
        <Navigationbar />
        <Routes>
          <Route path='/regulations' element={<Regulations />}></Route>
          <Route path='/checkpanel' element={<CheckPanel />}></Route>
          <Route path='/reports' element={<Reports />}></Route>
        </Routes>
      </Router>



    </div>
  );
};

export default App;





