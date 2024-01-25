"use strict";

//Tabell med kurser

async function loadCourses() {
    try {
        const response = await fetch("https://dahlgren.miun.se/ramschema_ht23.php");
        const data = await response.json();

        // Skapa en ny rad för varje kurs och lägg till i tabellen
        data.forEach(item => {
            const row = document.createElement("tr");

            // Skapa celler för kurskod, kursnamn och kursprogression
            const kursKodCell = document.createElement("td");
            kursKodCell.textContent = item.code;
            row.appendChild(kursKodCell);

            const kursNamnCell = document.createElement("td");
            kursNamnCell.textContent = item.coursename;
            row.appendChild(kursNamnCell);

            const kursProgressionCell = document.createElement("td");
            kursProgressionCell.textContent = item.progression;
            row.appendChild(kursProgressionCell);

            // Lägg till raden i tabellens tbody
            document.getElementById("table-body").appendChild(row);
        });

    } catch (error) {
        console.error(error);
    }
}

loadCourses();

//Sökfunktion till tabellen
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const tableBody = document.getElementById("table-body");

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();

        // Hämta alla rader i tabellen
        const rows = Array.from(tableBody.querySelectorAll("tr"));

        // Filtrera rader baserat på söktermen
        rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll("td"));
            const rowText = cells.map(cell => cell.textContent.toLowerCase()).join(" ");

            // Använder .includes() för att kolla om söktermen finns i radtexten
            const shouldDisplay = rowText.includes(searchTerm);

            // Uppdatera radens display-stil baserat på sökresultatet
            row.style.display = shouldDisplay ? "" : "none";
        });
    });
});