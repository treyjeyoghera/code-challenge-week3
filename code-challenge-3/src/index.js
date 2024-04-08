document.addEventListener("DOMContentLoaded", function () {
    const url = "db.json";
// we  are using url to fetch data
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const films = data.films;
        movedisplay(films[0]);
        displaymenu(films);
      })
      .catch((error) => console.error("Error fetching data:", error));
// we are creating the displays of movies
    function movedisplay(film) {
        const title = document.getElementById("title");
        const runtime = document.getElementById("runtime");
        const filmInfo = document.getElementById("film-info");
        const showtime = document.getElementById("showtime");
        const ticketNumber = document.getElementById("ticket-num");
        const poster = document.getElementById("poster");
        const buyButton = document.getElementById("buy-ticket");

        title.textContent = film.title;
        runtime.textContent = film.runtime + " minutes";
        filmInfo.textContent = film.description;
        showtime.textContent = film.showtime;
        const remainingTickets = film.capacity - film.tickets_sold;
        ticketNumber.textContent = remainingTickets + " remaining tickets";
        poster.src = film.poster;
// when all tickets are sold it should do the process
        if (remainingTickets === 0) {
            buyButton.textContent = "Sold Out";
            buyButton.disabled = true;
        } else {
            buyButton.textContent = "Buy Ticket";
            buyButton.disabled = false;
        }

        buyButton.addEventListener("click", function () {
            if (remainingTickets > 0) {
                film.tickets_sold++;
                movedisplay(film);
                updateticketssold(film.id, film.tickets_sold);
                purchaseTicket(film.id);
            }
        });
    }
// how to display menu
    function displaymenu(films) {
        const filmList = document.getElementById("films");

        films.forEach(film => {
            const li = document.createElement("li");
            li.classList.add("film", "item");
            li.textContent = film.title;
            li.addEventListener("click", function () {
                movedisplay(film);
            });
// how the button for delete works
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "DELETE";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", function(event) {
                event.stopPropagation();
                filmList.removeChild(li);
                deleteFilm(film.id);
            });
            li.appendChild(deleteButton);

            filmList.appendChild(li);
        });
    }
// to update the tickets sold
    function updateticketssold(filmId, ticketsSold) {
        console.log("Updating tickets_sold for film ID:", filmId, "to", ticketsSold);
    }

    function purchaseTicket(filmId) {
    }

    function deleteFilm(filmId) {
    }

});