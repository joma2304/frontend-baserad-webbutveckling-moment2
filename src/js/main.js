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

            // Funktion för sortering av tabell innehåll
            function sortTable(columnId) {
                // Bestäm kolumnindexet baserat på kolumn-id
                let columnIndex;
                switch (columnId) {
                    case "kurskod":
                        columnIndex = 0; // Index 0 för Kurskod
                        break;
                    case "kursnamn":
                        columnIndex = 1; // Index 1 för Namn
                        break;
                    case "kursprogression":
                        columnIndex = 2; // Index 2 för Progression
                        break;
            
                    default:
                        return; // Om ogiltigt kolumn-id, avsluta funktionen
                }

                // Sortera rader
                rows.sort((a, b) => {
                    const aValue = a.cells[columnIndex].textContent.trim().toLowerCase();
                    const bValue = b.cells[columnIndex].textContent.trim().toLowerCase();

                    // Använda localeCompare för att kolla så att det är korrekt alfabetisk sortering
                    return aValue.localeCompare(bValue);
                });

                // Återställ tabellens ordning med sorterade rader
                tableBody.innerHTML = "";
                rows.forEach(row => tableBody.appendChild(row));
            }

            // Hämta alla rader i tabellen efter att loadCourses har utförts
            const tableBody = document.getElementById("table-body");
            const rows = Array.from(tableBody.querySelectorAll("tr"));

            // Händelsehanterare vid klick av tabellrubrikerna
            document.getElementById("kurskod").addEventListener("click", function () {
                sortTable("kurskod");
            });

            document.getElementById("kursnamn").addEventListener("click", function () {
                sortTable("kursnamn");
            });

            document.getElementById("kursprogression").addEventListener("click", function () {
                sortTable("kursprogression");
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

