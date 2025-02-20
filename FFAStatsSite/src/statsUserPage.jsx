import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GeneralPlayerStats from './dataClasses/generalPlayerStats';


function StatsUserPage() {
  
  const [jsonData, setJsonData] = useState(null);
  const [generalPlayerData, setGeneralPlayerData] = useState();
  const [headImg, setHeadImg] = useState();
  const [skinImg, setSkinImg] = useState();

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
  }, [uuid]);

  useEffect(() => {
    const headImgUrl = `https://mineskin.eu/avatar/${uuid}`;
    setHeadImg(headImgUrl);

    const skinImgUrl = `https://mineskin.eu/body/${uuid}`;
    setSkinImg(skinImgUrl);


  }, [uuid]);

  return (
    <div>
      <p>{generalPlayerData == null ? <p>Loading...</p> : generalPlayerData.toString()}</p>
      <img src={headImg} alt="Player Head"></img>
      <img src={skinImg} alt="Player Skin"></img>
    </div>
  )
}

function parseJsonData(inputJsonData, setJsonData, setGeneralPlayerData){
  setJsonData(inputJsonData);
  setGeneralPlayerData(new GeneralPlayerStats(inputJsonData));
} 


export default StatsUserPage;