import React from 'react';
import { useEffect, useState } from 'react';
import './Leaderboards.css';
import GeneralPlayerStats from '../../dataClasses/generalPlayerStats';



function Leaderboards(){

    const [sortingCategory, setSortingCategory] = useState("kills");
    const [leaderboardData, setLeaderboardData] = useState();

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
        .then(async data => await parseJsonData(data, setLeaderboardData))
    
      }, [sortingCategory]);
    


    return (

        <div>
            <h2>Leaderboards</h2>

            {leaderboardData == null ? "Loading..." :
            
            <table border={1}>
                <thead>
                    <tr>
                        <th>Rang</th>
                        <th>Spieler</th>
                        <th>Kills</th>
                        <th>Deaths</th>
                        <th>Highest <br/> Kill Streak</th>
                        <th>XP</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((element, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <div className='playerCollection'>
                                    <img className='playerHead'/>
                                    {element.playerId}
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


async function parseJsonData(data, setLeaderboardData){
    let dataObj = new Array();

    const promises = data.map(async (element) => {
        element.playerId = await UUIDToName(element.playerId);
        dataObj.push(new GeneralPlayerStats(element));
    });

    await Promise.all(promises);

    dataObj.sort((a, b) => b.kills - a.kills);

    setLeaderboardData(dataObj);
}

async function UUIDToName(UUID){
    
    const apiURL = `https://api.ashcon.app/mojang/v2/user/${UUID}`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const playername = data.username;
        console.log(playername);
        return playername;
    } catch (error) {
        console.error('Error:', error);
        return "Error";
    } 

}  

export default Leaderboards;