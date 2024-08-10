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

$().ready(function () {
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