import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GeneralPlayerStats from './dataClasses/generalPlayerStats';


function StatsUserPage() {
  
  const [jsonData, setJsonData] = useState(null);
  const [generalPlayerData, setGeneralPlayerData] = useState();

  const { uuid } = useParams();

  useEffect(() => {
    fetch(`https://api.hglabor.de/stats/FFA/${uuid}`, {
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
      <p>UUID: {uuid}</p>
    </div>
  )
}

function parseJsonData(inputJsonData, setJsonData, setGeneralPlayerData){
  setJsonData(inputJsonData);
  setGeneralPlayerData(new GeneralPlayerStats(inputJsonData));
} 


export default StatsUserPage;