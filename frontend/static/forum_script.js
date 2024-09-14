function loadEntries() {
    fetch('/get_entries')
        .then(response => response.json())
        .then(data => {
            const entryType1 = document.getElementById('entries1').value;
            const entryType2 = document.getElementById('entries2').value;

            if(!entryType1) {
                entryType = entryType2;
            } else {
                entryType = entryType1;
            }

            const entriesContainer = document.getElementById(entryType);
            entriesContainer.innerHTML = '';

            data.forEach(entry => {
                const entrtyDiv = document.createElement('div');
                entrtyDiv.classList.add('entry');

                const usernameDiv = document.createElement('div');
                usernameDiv.classList.add('username');
                usernameDiv.textContent = entry.username;

                const timestampDiv = document.createElement('div');
                timestampDiv.classList.add('timestamp')
                timestampDiv.textContent = entry.timestamp;

                const contentDiv = document.createElement('div');
                contentDiv.textContent = entry.content;

                const entry_typeDiv = document.createElement('div');
                entry_typeDiv //TODO

                entrtyDiv.appendChild(usernameDiv);
                entrtyDiv.appendChild(timestampDiv)
                entrtyDiv.appendChild(contentDiv)

                entriesContainer.appendChild(entrtyDiv);
            })
        })
}

function addEntry() {

    console.log("works");

    const username = document.getElementById('username').value;
    const content = document.getElementById('content').value;

    if (!username || !content) {
        alert("Please fill in both username and content and content fields!");
        return;
    }

    fetch('/add_entry', {       //fetch is utilized to get a request from a server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, content})
    })
        .then(response => {
            if(!response.ok) {
                return response.text().then(text => {throw new Error(text)});
            }
            return response.json();
        })
        .then(data => {
            loadEntries();
            document.getElementById('username').value = '';
            document.getElementById('content').value = '';
        })
        .catch(error => {
            console.error('errro: ', error.message);
        });

    console.log(JSON.stringify({username, content}));
}

document.addEventListener('DOMContentLoaded', loadEntries); //call function loadentries after DOM loaded