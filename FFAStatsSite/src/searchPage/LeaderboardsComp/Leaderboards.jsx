import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Leaderboards.css';
import GeneralPlayerStats from '../../dataClasses/generalPlayerStats';



function Leaderboards(){

    const [sortingCategory, setSortingCategory] = useState("kills");
    const [leaderboardData, setLeaderboardData] = useState();

    const navigate = useNavigate();

    useEffect(() => {
    
        // Fetch leaderboard data from HG Labor API
    
        fetch(`https://api.hglabor.de/stats/FFA/top?sort=${sortingCategory}`, {
          method: 'GET',
          headers: {
            'accept': '*/*'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('An error occurred');
          }
          return response.json();
        })
        .then(async data => await parseJsonData(data, setLeaderboardData, sortingCategory))
    
      }, [sortingCategory]);


      const goToPlayerPage = (playername) => {
        navigate(`/profiles/${playername}`);
      }

    return (

        <div>
            <h2>Leaderboards</h2>

            {leaderboardData == null ? "Loading..." :
            
            <table border={1}>
                <thead>
                    <tr>
                        <th>Rang</th>
                        <th onClick={() => setSortingCategory("player")}>Spieler</th>
                        <th onClick={() => setSortingCategory("kills")}>Kills</th>
                        <th onClick={() => setSortingCategory("deaths")}>Deaths</th>
                        <th onClick={() => setSortingCategory("highestKillStreak")}>Highest <br/> Kill Streak</th>
                        <th onClick={() => setSortingCategory("xp")}>XP</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((element, index) => (
                        <tr key={index} onClick={() => goToPlayerPage(element.playername)}>
                            <td>{index + 1}</td>
                            <td>
                                <div className='playerCollection'>
                                    <img className='playerHead' src={element.playerhead}/>
                                    {element.playername}
                                </div>
                            </td>
                            <td>{element.kills}</td>
                            <td>{element.deaths}</td>
                            <td>{element.highestKillStreak}</td>
                            <td>{element.xp}</td>
                        </tr>
                    ))}

                </tbody>
            </table>

            }   
        
        </div>
    );
}


async function parseJsonData(data, setLeaderboardData, sortingCategory){
    let dataObj = new Array();

    const promises = data.map(async (element) => {
        element.playername = await UUIDToName(element.playerId);
        element.playerhead = `https://mineskin.eu/avatar/${element.playerId}`;
        dataObj.push(new GeneralPlayerStats(element));
    });

    await Promise.all(promises);

    dataObj.sort((a, b) => b[sortingCategory] - a[sortingCategory]);

    setLeaderboardData(dataObj);
}

async function UUIDToName(UUID){
    
    const apiURL = `https://api.ashcon.app/mojang/v2/user/${UUID}`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const playername = data.username;
        return playername;
    } catch (error) {
        console.error('Error:', error);
        return "Error";
    } 

}

export default Leaderboards;