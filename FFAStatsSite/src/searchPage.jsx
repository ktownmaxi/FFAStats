import React from 'react';
import { useNavigate } from 'react-router-dom';


function SearchPage() {
    const navigate = useNavigate();

    function search(formData){
        const playername = formData.get("nameQuery");
        const apiURL = `https://api.ashcon.app/mojang/v2/user/${playername}`;

        fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const playerUUID = data.uuid;
            navigate(`/profiles/${playerUUID}`);
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
            <h1>Search Page</h1>
            <form action={search}>
                <input name="nameQuery" type="text" placeholder="Input player name"></input>
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchPage;