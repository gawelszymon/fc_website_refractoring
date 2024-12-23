console.log("app.js is loaded");

function fetchPages() {
  fetch('/api/pages')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched pages:', data);

      const pagesList = document.getElementById('pages-list');
      pagesList.innerHTML = '';

      data.forEach(page => {
        console.log('Page:', page);

        const row = document.createElement('tr');

        const pageName = document.createElement('td');
        pageName.textContent = page.page_name;

        const displayName = document.createElement('td');
        const displayInput = document.createElement('input');
        displayInput.value = page.display_name;
        displayName.appendChild(displayInput);

        const isActive = document.createElement('td');
        const activeCheckbox = document.createElement('input');
        activeCheckbox.type = 'checkbox';
        activeCheckbox.checked = page.is_active;
        isActive.appendChild(activeCheckbox);

        const actions = document.createElement('td');
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.onclick = function () {
          const updatedData = {
            display_name: displayInput.value,
            is_active: activeCheckbox.checked
          };

          fetch(`/api/pages/${page.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          })
            .then(response => response.json())
            .then(result => {
              if (result.success) {
                alert('Subpage Updated');
              } else {
                alert('Error: Subpage No Updated');
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });

            location.reload();
        };

        actions.appendChild(saveButton);
        row.appendChild(pageName);
        row.appendChild(displayName);
        row.appendChild(isActive);
        row.appendChild(actions);

        pagesList.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching pages:', error));
}

document.addEventListener('DOMContentLoaded', fetchPages);

document.addEventListener('DOMContentLoaded', function () {
  var image = document.getElementById("facebook");
  image.addEventListener("click", function () {
      window.open("https://www.facebook.com/lkswislarzaska", '_blank');
  });

  var image1 = document.getElementById("instagram");
  image1.addEventListener("click", function () {
      window.open("https://www.instagram.com/wislarzaska/", '_blank');
  });
});