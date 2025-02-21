import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GeneralPlayerStats from '../../dataClasses/generalPlayerStats';
import './statsUserPage.css';
import bottleGif from '../../assets/Bottle_o_Enchanting.gif';
import EnchantedSword from '../../assets/Enchanted_Diamond_Sword.gif';
import Skull from '../../assets/Skeleton_Skull.webp';
import Fire from '../../assets/Fire_Item.gif';
import BlueFire from '../../assets/Blue_Fire.gif';
import Diamond from '../../assets//Diamond.webp';


function StatsUserPage() {
  
  const [generalPlayerData, setGeneralPlayerData] = useState();
  const [headImg, setHeadImg] = useState();
  const [skinImg, setSkinImg] = useState();
  const [uuid, setUUID] = useState();
  const [playerNotFound, setPlayerNotFound] = useState(false);

  const navigate = useNavigate();
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
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          setPlayerNotFound(true);
        } else {
          throw new Error('An error occurred');
        }
      }
      return response.json();
    })
    .then(data => parseJsonData(data, setGeneralPlayerData))

    // Fetch skin data from mineskin API

    const headImgUrl = `https://mineskin.eu/avatar/${uuid}`;
    setHeadImg(headImgUrl);

    const skinImgUrl = `https://mineskin.eu/body/${uuid}`;
    setSkinImg(skinImgUrl);

  }, [uuid]);

  const goToHomePage = () => {
    navigate('/');
  }

  return (

    playerNotFound ? playerNotFoundScreen(goToHomePage) :


    <div className="stats-user-page">
      <img id="headImg" src={headImg} alt="Player Head"></img>

      <h1>{playername}</h1>

      {generalPlayerData == null ? "Loading..." :

          <div className="stats-container">
          <div className="stat-box">
              <div className="stat-title-container">
                  <div className="stat-icon"><img src={bottleGif} alt="XP Icon" /></div>
                  <div className="stat-title">XP</div>
              </div>
              <div className="stat-value">{generalPlayerData.xp}</div>
          </div>
          <div className="stat-box">
              <div className="stat-title-container">
                  <div className="stat-icon"><img src={EnchantedSword} alt="Sword Icon" /></div>
                  <div className="stat-title">Kills</div>
              </div>
              <div className="stat-value">{generalPlayerData.kills}</div>
          </div>
          <div className="stat-box">
              <div className="stat-title-container">
                  <div className="stat-icon"><img src={Skull} alt="Skeleton Skull Icon" /></div>
                  <div className="stat-title">Deaths</div>
              </div>
              <div className="stat-value">{generalPlayerData.deaths}</div>
          </div>
          <div className="stat-box">
              <div className="stat-title-container">
                  <div className="stat-icon"><img src={Fire} alt="Fire Icon" /></div>
                  <div className="stat-title">Current Streak</div>
              </div>
              <div className="stat-value">{generalPlayerData.currentKillStreak}</div>
          </div>
          <div className="stat-box">
              <div className="stat-title-container">
                  <div className="stat-icon"><img src={BlueFire} alt="Blue Fire Icon" /></div>
                  <div className="stat-title">Highest Streak</div>
              </div>
              <div className="stat-value">{generalPlayerData.highestKillStreak}</div>
          </div>
          <div className="stat-box">
              <div className="stat-title-container">
                  <div className="stat-icon"><img src={Diamond} alt="Diamond Icon" /></div>
                  <div className="stat-title">Bounty</div>
              </div>
              <div className="stat-value">{generalPlayerData.bounty}</div>
          </div>
          </div>

      }

          <div className="footer">
              <a class="previous" onClick={goToHomePage}>Zurück zur Startseite</a>
          </div>

    </div>
  )
}

function playerNotFoundScreen(goToHomePage){

  return(
    <div className="stats-user-page"> Spieler nicht gefunden :(
        <div className="footer">
              <a class="previous" onClick={goToHomePage}>Zurück zur Startseite</a>
          </div>
    </div>
  )
}

function parseJsonData(inputJsonData, setGeneralPlayerData){
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