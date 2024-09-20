function fetchTeamData(groupName) {
    fetch(`/api/team/${groupName}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('group-info').innerHTML = '<p>Team not found</p>';
            } else {
                document.getElementById('group-name').innerText = `Grupa: ${data.group}`;
                document.getElementById('coach').innerText = `Trener: ${data.coach}`;
                document.getElementById('license').innerText = `Licencja: ${data.license}`;
                document.getElementById('time').innerText = `Czas treningów: ${data.time}`;
                document.getElementById('location').innerText = `Miejsce treningów: ${data.location}`;
                document.getElementById('league').innerText = `Liga: ${data.league}`;
                document.getElementById('table-link').href = data.table_url;
                document.getElementById('team-photo').src = data.photo_endpoint;
            }
        })
        .catch(error => console.error('Error fetching team data:', error));
}