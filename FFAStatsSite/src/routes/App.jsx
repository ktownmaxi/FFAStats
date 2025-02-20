import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from '../searchPage/searchPageComp/searchPage';
import StatsUserPage from '../userStatsView/userStatsViewComp/statsUserPage';

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