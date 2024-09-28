function fetchTeamData(subpageName) {
    fetch(`/api/team/${subpageName}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('subpage-info').innerHTML = '<p>Team not found</p>';
            } else {
                document.getElementById('group-name').innerText = data.group;
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

function updateTeamData(subpageName) {
    const updateTeamData = {
        subpage: subpageName,
        group: document.getElementById('group-input').value,
        coach: document.getElementById('coach-input').value,
        license: document.getElementById('license-input').value,
        time: document.getElementById('time-input').value,
        location: document.getElementById('location-input').value,
        league: document.getElementById('league-input').value,
        table_url: document.getElementById('table-url-input').value,
        photo_endpoint: document.getElementById('photo-endpoint-input').value
    };

    fetch(`/api/team/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateTeamData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('succes: ', data);
        alert('INFO: team data updated successfully');
    })
    .catch(error => {
        console.error("error while updating team data: ", error);
        alert('ERROR: team data does not updated');
    })
}