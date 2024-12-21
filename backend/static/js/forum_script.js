function loadEntries() {

    fetch('/get_entries')
        .then(response => response.json())
        .then(data => {

            console.log(data);

            data.forEach(entry => {

                if (entry.entry_type === 'main_page' && document.getElementById('entries0')) {
                    const entryType = document.getElementById('entries0');

                    const entriesContainer = entryType;

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

                    entryDiv.appendChild(usernameDiv);
                    entryDiv.appendChild(timestampDiv);     //this variables are visibled bacause being send in data in json
                    entryDiv.appendChild(contentDiv);

                    if(entry.photo !== 'null_photo') {
                        const photoDiv = document.createElement('div');
                        photoDiv.classList.add('photo');
                        const imgElement = document.createElement('img');
                        imgElement.src = entry.photo;
                        imgElement.style.maxWidth = '100%';
                        imgElement.style.height = 'auto';
                        photoDiv.appendChild(imgElement);
                        entryDiv.appendChild(photoDiv);
                    }
                    

                    if (window.location.pathname.startsWith('/admin_panel/password/')) {
                        const entry_typeDiv = document.createElement('div');
                        entry_typeDiv.textContent = entry.entry_type;

                        const photo_nameDiv = document.createElement('div');
                        photo_nameDiv.textContent = entry.photo;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Remove";
                        deleteButton.addEventListener('click', function () {
                            deleteEntry(entry.id);
                        });

                        entryDiv.appendChild(entry_typeDiv);
                        entryDiv.appendChild(photo_nameDiv);
                        entryDiv.appendChild(deleteButton);
                    }

                    entriesContainer.appendChild(entryDiv);

                } else if (entry.entry_type === 'subacademy1' && document.getElementById('entries1')) {
                    const entryType = document.getElementById('entries1');

                    const entriesContainer = entryType;

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

                    entryDiv.appendChild(usernameDiv);
                    entryDiv.appendChild(timestampDiv);     //this variables are visibled bacause being send in data in json
                    entryDiv.appendChild(contentDiv);

                    if (window.location.pathname.startsWith('/admin_panel/password/')) {
                        const entry_typeDiv = document.createElement('div');
                        entry_typeDiv.textContent = entry.entry_type;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Remove";
                        deleteButton.addEventListener('click', function () {
                            deleteEntry(entry.id);
                        });

                        entryDiv.appendChild(entry_typeDiv);
                        entryDiv.appendChild(deleteButton);
                    }

                    entriesContainer.appendChild(entryDiv);

                } else if (entry.entry_type === 'subacademy2' && document.getElementById('entries2')) {
                    entryType = document.getElementById('entries2');

                    const entriesContainer = entryType;

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
                    entry_typeDiv.textContent = entry.entry_type;

                    entryDiv.appendChild(usernameDiv);
                    entryDiv.appendChild(timestampDiv);     //this variables are visibled bacause being send in data in json
                    entryDiv.appendChild(contentDiv);

                    if (window.location.pathname.startsWith('/admin_panel/password/')) {
                        const entry_typeDiv = document.createElement('div');
                        entry_typeDiv.textContent = entry.entry_type;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Remove";
                        deleteButton.addEventListener('click', function () {
                            deleteEntry(entry.id);
                        });

                        entryDiv.appendChild(entry_typeDiv);
                        entryDiv.appendChild(deleteButton);
                    }

                    entriesContainer.appendChild(entryDiv);
                } else if (entry.entry_type === 'subacademy3' && document.getElementById('entries3')) {
                    entryType = document.getElementById('entries3');

                    const entriesContainer = entryType;

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
                    entry_typeDiv.textContent = entry.entry_type;

                    entryDiv.appendChild(usernameDiv);
                    entryDiv.appendChild(timestampDiv);     //this variables are visibled bacause being send in data in json
                    entryDiv.appendChild(contentDiv);

                    if (window.location.pathname.startsWith('/admin_panel/password/')) {
                        const entry_typeDiv = document.createElement('div');
                        entry_typeDiv.textContent = entry.entry_type;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Remove";
                        deleteButton.addEventListener('click', function () {
                            deleteEntry(entry.id);
                        });

                        entryDiv.appendChild(entry_typeDiv);
                        entryDiv.appendChild(deleteButton);
                    }

                    entriesContainer.appendChild(entryDiv);
                } else if (entry.entry_type === 'subacademy4' && document.getElementById('entries4')) {
                    entryType = document.getElementById('entries4');

                    const entriesContainer = entryType;

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
                    entry_typeDiv.textContent = entry.entry_type;

                    entryDiv.appendChild(usernameDiv);
                    entryDiv.appendChild(timestampDiv);     //this variables are visibled bacause being send in data in json
                    entryDiv.appendChild(contentDiv);

                    if (window.location.pathname.startsWith('/admin_panel/password/')) {
                        const entry_typeDiv = document.createElement('div');
                        entry_typeDiv.textContent = entry.entry_type;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Remove";
                        deleteButton.addEventListener('click', function () {
                            deleteEntry(entry.id);
                        });

                        entryDiv.appendChild(entry_typeDiv);
                        entryDiv.appendChild(deleteButton);
                    }

                    entriesContainer.appendChild(entryDiv);
                } else if (entry.entry_type === 'subacademy5' && document.getElementById('entries5')) {
                    entryType = document.getElementById('entries5');

                    const entriesContainer = entryType;

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
                    entry_typeDiv.textContent = entry.entry_type;

                    entryDiv.appendChild(usernameDiv);
                    entryDiv.appendChild(timestampDiv);     //this variables are visibled bacause being send in data in json
                    entryDiv.appendChild(contentDiv);

                    if (window.location.pathname.startsWith('/admin_panel/password/')) {
                        const entry_typeDiv = document.createElement('div');
                        entry_typeDiv.textContent = entry.entry_type;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Remove";
                        deleteButton.addEventListener('click', function () {
                            deleteEntry(entry.id);
                        });

                        entryDiv.appendChild(entry_typeDiv);
                        entryDiv.appendChild(deleteButton);
                    }

                    entriesContainer.appendChild(entryDiv);
                } else if (entry.entry_type === 'subacademy6' && document.getElementById('entries6')) {
                    entryType = document.getElementById('entries6');

                    const entriesContainer = entryType;

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
                    entry_typeDiv.textContent = entry.entry_type;

                    entryDiv.appendChild(usernameDiv);
                    entryDiv.appendChild(timestampDiv);     //this variables are visibled bacause being send in data in json
                    entryDiv.appendChild(contentDiv);

                    if (window.location.pathname.startsWith('/admin_panel/password/')) {
                        const entry_typeDiv = document.createElement('div');
                        entry_typeDiv.textContent = entry.entry_type;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Remove";
                        deleteButton.addEventListener('click', function () {
                            deleteEntry(entry.id);
                        });

                        entryDiv.appendChild(entry_typeDiv);
                        entryDiv.appendChild(deleteButton);
                    }

                    entriesContainer.appendChild(entryDiv);
                } else if (entry.entry_type === 'subacademy7' && document.getElementById('entries7')) {
                    entryType = document.getElementById('entries7');

                    const entriesContainer = entryType;

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
                    entry_typeDiv.textContent = entry.entry_type;

                    entryDiv.appendChild(usernameDiv);
                    entryDiv.appendChild(timestampDiv);     //this variables are visibled bacause being send in data in json
                    entryDiv.appendChild(contentDiv);

                    if (window.location.pathname.startsWith('/admin_panel/password/')) {
                        const entry_typeDiv = document.createElement('div');
                        entry_typeDiv.textContent = entry.entry_type;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Remove";
                        deleteButton.addEventListener('click', function () {
                            deleteEntry(entry.id);
                        });

                        entryDiv.appendChild(entry_typeDiv);
                        entryDiv.appendChild(deleteButton);
                    }

                    entriesContainer.appendChild(entryDiv);
                } else if (entry.entry_type === 'subacademy8' && document.getElementById('entries8')) {
                    entryType = document.getElementById('entries8');

                    const entriesContainer = entryType;

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
                    entry_typeDiv.textContent = entry.entry_type;

                    entryDiv.appendChild(usernameDiv);
                    entryDiv.appendChild(timestampDiv);     //this variables are visibled bacause being send in data in json
                    entryDiv.appendChild(contentDiv);

                    if (window.location.pathname.startsWith('/admin_panel/password/')) {
                        const entry_typeDiv = document.createElement('div');
                        entry_typeDiv.textContent = entry.entry_type;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Remove";
                        deleteButton.addEventListener('click', function () {
                            deleteEntry(entry.id);
                        });

                        entryDiv.appendChild(entry_typeDiv);
                        entryDiv.appendChild(deleteButton);
                    }

                    entriesContainer.appendChild(entryDiv);
                } else if (entry.entry_type === 'subacademy9' && document.getElementById('entries9')) {
                    entryType = document.getElementById('entries9');

                    const entriesContainer = entryType;

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
                    entry_typeDiv.textContent = entry.entry_type;

                    entryDiv.appendChild(usernameDiv);
                    entryDiv.appendChild(timestampDiv);     //this variables are visibled bacause being send in data in json
                    entryDiv.appendChild(contentDiv);

                    if (window.location.pathname.startsWith('/admin_panel/password/')) {
                        const entry_typeDiv = document.createElement('div');
                        entry_typeDiv.textContent = entry.entry_type;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Remove";
                        deleteButton.addEventListener('click', function () {
                            deleteEntry(entry.id);
                        });

                        entryDiv.appendChild(entry_typeDiv);
                        entryDiv.appendChild(deleteButton);
                    }

                    entriesContainer.appendChild(entryDiv);
                } else if (entry.entry_type === 'senior' && document.getElementById('entries_senior')) {
                    entryType = document.getElementById('entries_senior');

                    const entriesContainer = entryType;

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
                    entry_typeDiv.textContent = entry.entry_type;

                    entryDiv.appendChild(usernameDiv);
                    entryDiv.appendChild(timestampDiv);     //this variables are visibled bacause being send in data in json
                    entryDiv.appendChild(contentDiv);

                    if (window.location.pathname.startsWith('/admin_panel/password/')) {
                        const entry_typeDiv = document.createElement('div');
                        entry_typeDiv.textContent = entry.entry_type;

                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = "Remove";
                        deleteButton.addEventListener('click', function () {
                            deleteEntry(entry.id);
                        });

                        entryDiv.appendChild(entry_typeDiv);
                        entryDiv.appendChild(deleteButton);
                    }

                    entriesContainer.appendChild(entryDiv);
                }

            })
        })
}

function addEntry() {

    const username = document.getElementById('username').value;
    const content = document.getElementById('content').value;
    const entry_type = document.getElementById('entry_type').value;
    
    const checkboxes = document.querySelectorAll('#add_post_photo input[type="checkbox"]:checked');
    const photoValues = Array.from(checkboxes).map(checkbox => checkbox.value);
    const photo = photoValues.join(',');

    console.log(username);

    if (!username || !content) {
        alert("Please fill in both username content fields!");
        return;
    }

    console.log('Sending data to server:', { username, content, entry_type, photo });

    fetch('/add_entry', {       //fetch is utilized to get a request from a server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, content, entry_type, photo})

        // console.log()
    })
        .then(response => {
            if(!response.ok) {
                return response.text().then(text => {throw new Error(text)});
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('username').value = '';
            document.getElementById('content').value = '';
            document.getElementById('entry_type').value = '';
            document.getElementById('add_post_photo').value = '';
            location.reload();
        })
        .catch(error => {
            console.error('errro: ', error.message);
        });

}

function deleteEntry(entryID) {
    fetch(`/delete_entry/${entryID}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Delete entry error')
        }

        location.reload();
    })
    .catch(error => {
        console.error(error.message);
    });
}

document.addEventListener('DOMContentLoaded', loadEntries); //call function loadentries after DOM loaded

//handler it's a function which is assigned to the particular event in js, When this event occurs, the handler is called 