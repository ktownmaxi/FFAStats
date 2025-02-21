import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GeneralPlayerStats from '../../dataClasses/generalPlayerStats';
import './statsUserPage.css';


function StatsUserPage() {
  
  const [jsonData, setJsonData] = useState(null);
  const [generalPlayerData, setGeneralPlayerData] = useState();
  const [headImg, setHeadImg] = useState();
  const [skinImg, setSkinImg] = useState();
  const [uuid, setUUID] = useState();

  const { playername } = useParams();
  nameToUUID(playername, setUUID);

  useEffect(() => {

    if(uuid == null){
      return;
    }

    // Fetch player data from HG Labor API

    fetch(`https://api.hglabor.de/stats/FFA/${uuid}`, {
      method: 'GET',
      headers: {
        'accept': '*/*'
      }
    })
    .then(response => response.json())
    .then(data => parseJsonData(data, setJsonData, setGeneralPlayerData))
    .catch(error => console.error('Error:', error));

    // Fetch skin data from mineskin API

    const headImgUrl = `https://mineskin.eu/avatar/${uuid}`;
    setHeadImg(headImgUrl);

    const skinImgUrl = `https://mineskin.eu/body/${uuid}`;
    setSkinImg(skinImgUrl);

  }, [uuid]);

  return (
    <div>
      <p>{generalPlayerData == null ? "Loading..." : generalPlayerData.toString()}</p>
      <img src={headImg} alt="Player Head"></img>
      <img src={skinImg} alt="Player Skin"></img>
    </div>
  )
}

function parseJsonData(inputJsonData, setJsonData, setGeneralPlayerData){
  setJsonData(inputJsonData);
  setGeneralPlayerData(new GeneralPlayerStats(inputJsonData));
} 

async function nameToUUID(name, setUUID){
  const apiURL = `https://api.ashcon.app/mojang/v2/user/${name}`;
  fetch(apiURL)
  .then(response => response.json())
  .then(data => {
      const playerUUID = data.uuid;
      setUUID(playerUUID);
  })
  .catch(error => console.error('Error:', error));
}


export default StatsUserPage;