import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './searchPage';
import StatsUserPage from './statsUserPage';

function App() {

  return (
    <Router>
        <div>
            <Routes>
                <Route  path='/' element={<SearchPage/>}/>
                <Route path='/profiles/:uuid' element={<StatsUserPage/>}/>
                <Route/>
            </Routes>
        </div>
    </Router>
  )
}

export default App;