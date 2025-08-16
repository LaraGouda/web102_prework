/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game-card');

        const gameImg = games[i].img;
        const gameName = games[i].name;
        const gamePledge = games[i].pledged;
        const gameGoal = games[i].goal;

        const display = `
            <img src='${gameImg}' class="game-img">
            <h2> ${gameName} </h2>
            <p> This game has pledged ${gamePledge} and it has a goal of ${gameGoal}</p>

        `;

        gameDiv.innerHTML = display;
        gamesContainer.appendChild(gameDiv);
    }
}

addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

const num = totalContributions.toLocaleString('en-US');
contributionsCard.innerHTML = `<p>${num}</p>`;

const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);

const number = totalPledged.toLocaleString('en-US');
raisedCard.innerHTML = `<p> ${number}</p>`;

const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `<p>${GAMES_JSON.length}</p>`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    let listofUnfunded = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    })

    addGamesToPage(listofUnfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    let listofFunded = GAMES_JSON.filter( (game) => {
        return game.pledged >= game.goal;
    })
    addGamesToPage(listofFunded);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

let listofUnfunded = GAMES_JSON.filter( (game) => {
    return game.pledged < game.goal;
})
let numberofUnfunded = listofUnfunded.length;

const raised = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

let totalGames = GAMES_JSON.length;

const displayStr = `A total of $${raised.toLocaleString('en-US')} has been raised for ${totalGames} games. Currently, ${numberofUnfunded} ${numberofUnfunded === 1 ? 'game remains' : 'games remain'} unfunded. We need your help funding these games!`;
const summaryPara = document.createElement("p");
summaryPara.innerHTML = displayStr;

descriptionContainer.appendChild(summaryPara);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [firstGame, secondGame, ...rest] = sortedGames;
const firstGameName = document.createElement("p");
const secondGameName = document.createElement("p");
firstGameName.innerHTML = firstGame.name;
secondGameName.innerHTML = secondGame.name;

firstGameContainer.appendChild(firstGameName);
secondGameContainer.appendChild(secondGameName);

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item