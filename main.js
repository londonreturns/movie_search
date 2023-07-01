document.getElementById("mainTitle").textContent = `Movie Search`;
let isFirstRecord = true;
let logMovies = [];

function createTable() {
    document.querySelector("main").innerHTML = `
    <table class="list" border 1px cellspacing="0" width = 100%>
        <thead>
            <tr>
                <th>Movie Title</th>
                <th>Release Year</th>
                <th>Poster Image</th>
                <th>Brief Overview</th>
                <th id = "dir">Director</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>`;
}

let fetchData = function(movieName) {
    return new Promise((resolve, reject) => {
        const apiKey = "e861d09b";
        const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;
        data = fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (movieName.length == 0) {
                    reject("Please enter a movie name")
                } else if (data.Error) {
                    reject("Movie not found");
                } else {
                    resolve(data);
                }
            });
    })
}

function addNewRecord(data) {
    if (logMovies.includes(data.Title)) {
        alert("Movie is already in the list")
        return;
    } else {
        logMovies.push(data.Title);
    }
    let tableBody = document.querySelector(".list tbody");
    let newRow = tableBody.insertRow(0);
    let titleCell = newRow.insertCell(0);
    let yearCell = newRow.insertCell(1);
    let posterCell = newRow.insertCell(2);
    let overviewCell = newRow.insertCell(3);
    let directorCell = newRow.insertCell(4);
    titleCell.textContent = data.Title;
    yearCell.textContent = data.Year;
    posterCell.innerHTML = `<img src="${data.Poster}">`;
    overviewCell.textContent = data.Plot;
    directorCell.textContent = data.Director;
}

function setData(data) {
    setTimeout(() => {
        if (isFirstRecord) {
            createTable();
            isFirstRecord = false;
        }
        addNewRecord(data);
    }, 2000);
}

async function main() {
    try {
        const movieName = document.querySelector("#movieName").value;
        data = await fetchData(movieName);
        setData(data);
    } catch (error) {
        alert(error);
    }
}

document.querySelectorAll("button")[0].addEventListener("click", main);
document.querySelector("input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        main();
    }
});