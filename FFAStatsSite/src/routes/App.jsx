import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from '../searchPage/searchPageComp/searchPage';
import StatsUserPage from '../userStatsView/userStatsViewComp/statsUserPage';

function App() {

  return (
        <div>
            <Routes>
                <Route  path='/' element={<SearchPage/>}/>
                <Route path='/profiles/:playername' element={<StatsUserPage/>}/>
                <Route/>
            </Routes>
        </div>
  )
}

export default App;