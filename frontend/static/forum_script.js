function loadEntries() {
    fetch('/get_entries')
        .then(response => response.json())
        .then(data => {


            data.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.classList.add('entry');

                const usernameDiv = document.createElement('div');
                usernameDiv.classList.add('username');
                usernameDiv.textContent = entry.username;

                const timestampDiv = document.createElement('div');
                timestampDiv.classList.add('timestamp')
                timestampDiv.textContent = entry.timestamp;

                const contentDiv = document.createElement('div');
                contentDiv.textContent = entry.content;

                const entry_typeDiv = document.createElement('div');
                entry_typeDiv.textContent = document.createElement('div');

                entryDiv.appendChild(usernameDiv);
                entryDiv.appendChild(timestampDiv);
                entryDiv.appendChild(contentDiv);
                entryDiv.appendChild(entry_typeDiv);

                entriesContainer.appendChild(entryDiv);
            })
        })
}

function addEntry() {

    const username = document.getElementById('username').value;
    const content = document.getElementById('content').value;
    const entry_type = document.getElementById('entry_type').value;

    console.log(username);

    if (!username || !content) {
        alert("Please fill in both username content fields!");
        return;
    }

    console.log('Sending data to server:', { username, content, entry_type });

    fetch('/add_entry', {       //fetch is utilized to get a request from a server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, content, entry_type})
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
            document.getElementById('entry_type').value = '';
        })
        .catch(error => {
            console.error('errro: ', error.message);
        });

}

document.addEventListener('DOMContentLoaded', loadEntries); //call function loadentries after DOM loaded