import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Leaderboards.css';
import GeneralPlayerStats from '../../dataClasses/generalPlayerStats';



function Leaderboards(){

    const [sortingCategory, setSortingCategory] = useState("kills");
    const [leaderboardData, setLeaderboardData] = useState();
    const [rawData, setRawData] = useState();
    const [page, setPage] = useState(0);
    const [loadedAPICalls, setLoadedAPICalls] = useState(1);

    const navigate = useNavigate();

    const isFetchingRef = useRef(true);

    const pageRef = useRef(page);
    const loadedAPICallsRef = useRef(loadedAPICalls);

    useEffect(() => {
        pageRef.current = page;
    }, [page]);

    useEffect(() => {
        loadedAPICallsRef.current = loadedAPICalls;
    }, [loadedAPICalls]);

    useEffect(() => {

        setLeaderboardData(null);
        window.scrollTo({ top: 0, behavior: "instant" }); 
        setPage(-1); 
    
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
        .then(data => {
            setRawData(data);
            //setLoadedAPICalls(prev => prev + 1);
            setLoadedAPICalls(1);
            setPage(1);
        })
    
      }, [sortingCategory]);

    const handleScroll = () => {
        if(window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight && !isFetchingRef.current 
            && pageRef.current*10*loadedAPICallsRef.current < loadedAPICallsRef.current*100)
            {
            isFetchingRef.current = true;
            setPage(prev => prev + 1);  
        }
    }

    useEffect(() => {

        const fetchData = () => {
            if(rawData != null){
                parseJsonData(rawData, setLeaderboardData, sortingCategory, page, isFetchingRef)
            }
        };

        fetchData();
        
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])


    const goToPlayerPage = (playername) => {
        navigate(`/profiles/${playername}`);
      }

    // window.scrollTo({ top: 0, behavior: "instant" });
    return (

        <div>
            <h2>Leaderboards</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Rang</th>
                        <th onClick={() => setSortingCategory("player")} className={sortingCategory == "player" ? "highlighted" : ""}>Spieler</th>
                        <th onClick={() => setSortingCategory("kills")} className={sortingCategory == "kills" ? "highlighted" : ""}>Kills</th>
                        <th onClick={() => setSortingCategory("deaths")} className={sortingCategory == "deaths" ? "highlighted" : ""}>Deaths</th>
                        <th onClick={() => setSortingCategory("highestKillStreak")} className={sortingCategory == "highestKillStreak" ? "highlighted" : ""}>Highest <br/> Kill Streak</th>
                        <th onClick={() => setSortingCategory("xp")} className={sortingCategory == "xp" ? "highlighted" : ""}>XP</th>
                    </tr>
                </thead>
                {leaderboardData == null ? null :
                <tbody>
                    {leaderboardData.map((element, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <div className='playerCollection' onClick={() => goToPlayerPage(element.playername)}>
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
                }

            </table>   
        
        </div>
    );
}


async function parseJsonData(data, setLeaderboardData, sortingCategory, page, isFetchingRef){
    let dataObj = new Array();
    data = data.slice((page - 1) * 10, page * 10)

    const promises = data.map(async (element) => {
        element.playername = await UUIDToName(element.playerId);
        element.playerhead = `https://mineskin.eu/avatar/${element.playerId}`;
        dataObj.push(new GeneralPlayerStats(element));
    });

    await Promise.all(promises);

    dataObj.sort((a, b) => b[sortingCategory] - a[sortingCategory]);

    setLeaderboardData(prev => [...(prev || []), ...dataObj]);
    isFetchingRef.current = false;
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