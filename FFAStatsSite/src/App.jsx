import './App.css'
import { useEffect, useState } from 'react'
import GeneralPlayerStats from './dataClasses/generalPlayerStats';



function App() {
  
  const [jsonData, setJsonData] = useState(null);
  const [generalPlayerData, setGeneralPlayerData] = useState();

  useEffect(() => {
    fetch('https://api.hglabor.de/stats/FFA/c9392cbf-ba57-4593-8d4f-dd856120cd4c', {
      method: 'GET',
      headers: {
        'accept': '*/*'
      }
    })
    .then(response => response.json())
    .then(data => parseJsonData(data, setJsonData, setGeneralPlayerData))
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {jsonData ? <pre>{JSON.stringify(jsonData, null, 2)}</pre> : <p>Loading...</p>}
      <p>{generalPlayerData == null ? null : generalPlayerData.toString()}</p>
    </div>
  )
}

function parseJsonData(inputJsonData, setJsonData, setGeneralPlayerData){
  setJsonData(inputJsonData);
  setGeneralPlayerData(new GeneralPlayerStats(inputJsonData));
} 


export default App