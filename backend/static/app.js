// $().ready(function () {

//     document.addEventListener('DOMContentLoaded', function () {
//         addElement();
//     });

//     function addElement() {
//         let newLi = document.createElement("li");

//         //"a" jest specjlanym tagiem odnoszącym się do hiperłącza
//         let newLink = document.createElement("a");
//         newLink.setAttribute("class", "nav-link");
//         newLink.setAttribute("href", "/podstrona1.html");
//         newLink.textContent = "Podstrona1";

//         newLi.appendChild(newLink);

//         let currentLi = document.getElementById("main_id");

//         currentLi.parentNode.insertBefore(newLi, currentLi);
//     }
  
// })


// funkcja ready jest uzywana kiedy chcemy wykonac dany kod java script po pełnym załadowaniu się strony, tzn kiedy chcemy aby nasz skrypt miał
// dostęp do wszystkich elementów DOM przed wykonaniem sie własnie tego skryptu, jest to ważne dlatego że js moze próbować uzyskać dostęp do
// elementów strony zanim one zostaną załadowawne. Funkcja ready() nalezy do biblioteki jQuery javyscript.


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



$(document).ready(function () {
  var image = document.getElementById("facebook");
  image.addEventListener("click", function () {
      window.open("https://www.facebook.com/lkswislarzaska", '_blank');
  });

  var image = document.getElementById("instagram");
  image.addEventListener("click", function () {
      window.open("https://www.instagram.com/wislarzaska/", '_blank');
  });
})

/*
$.ajax({
  url: "https://zaworski.pl/examples/www_lab04_ajax.php",
  type: "GET",
  dataType : "text",
})
  .done(function( data ) {
    console.log("Text received: " + data);
  })
  .fail(function( xhr, status, errorThrown ) {
    alert("Cannot receive data.");
  });


//tutaj wczytuje dane, które następnie będę musiał zamieścić w mojej tabeli
$.ajax({
  url: "https://zaworski.pl/examples/www_lab04_json.php",
  type: "GET",
  dataType : "text",
})
  .done(function( data ) {
    console.log("Text received: " + data);
    var json_data = JSON.parse(data);

    jQuery.each(json_data, function() {
      console.log(this.name + " " + this.surname);
    });

    $.each(json_data, function(index, item) {
      $("#table_body").append(
        '<tr>\n' +
        '  <td>' + (index + 6) + '</td>\n' + // Numerowanie wierszy od 1
        '  <td>' + item.name + '</td>\n' +
        '  <td>' + item.surname + '</td>\n' +
        '  <td><button class="removeButton">Remove</button></td>\n' +
        '</tr>'
      );
    });

    $(".removeButton").click(function () {
      alert("Czy na pewno chcesz usunąć ten rekord")
      $(this).closest('tr').remove();
    })

  })

  .fail(function( xhr, status, errorThrown ) {
    alert("Cannot receive data.");
  });


});
*/

/*
  Ajax jest to część biblioteki jQuery, dzięki której możemy pobierać dane z innego serwera
  Funkcja .ajax() pozwala na wysyłanie zapytania HTTP do innego adresu iraz na pobranie zwróconej
  do zapytania HTTP odpowiedzi.
  Ajax jest asynchroniczny, to znaczy że po wykonaniu zapytania, zanim dana strona odpowie
  dlasza część kodu javascript jest wykonywana.
  czyli dlatego nieodnosimy sie w innych cześćiach kodu do funkcji .done (zmiennej data) która jest chyba
  callbackiem (czyli funkcją wykonaną po zakonczeniu danej operacji) i ta funnkcja ma obiekt
  data który jest tzw promises (czyli obiktem reprezentującym przyszłe wartosci)

 */