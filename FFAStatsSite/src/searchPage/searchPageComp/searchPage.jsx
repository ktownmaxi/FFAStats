import React from 'react';
import { useNavigate } from 'react-router-dom';
import './searchPage.css';
import Leaderboards from '../LeaderboardsComp/Leaderboards';


function SearchPage() {
    const navigate = useNavigate();

    function search(formData){
        const playername = formData.get("nameQuery");
        navigate(`/profiles/${playername}`);

    }

    return (
        <div>
            <h1>HGLabor FFA <br/> Spielerstatistiken </h1>
            <form action={search}>
                <input name="nameQuery" type="text" placeholder="Input player name"></input>
                <button type="submit">Search</button>
            </form>
            <Leaderboards />
        </div>
    );
}

export default SearchPage;