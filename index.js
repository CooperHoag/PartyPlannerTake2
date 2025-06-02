const BASE_API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2505-ftb-et-web-ft";
const RESOURCE = "/events/";
const API = BASE_API_URL + COHORT + RESOURCE;
// console.log(API);
const div = document.querySelector(`div`)

// const appDiv = document.querySelector(`#app`);
// appDiv.innerHTML = `
//   <h1>Party Planner</h1>
//   <h2>Upcoming Parties</h2>
//   <h2>Party Details</h2>
// `;

// - The application updates state by fetching an array of parties from the API.

// Have a state variable
const state = {
  parties: [], //will become the array of parties once fetchParties runs
  selectedParty: undefined
};

//  fetch an array of parties from the API

const fetchParties = async () => {
  const parties = await fetch (API);
  // convert it to json - json translates the code
  const response = await parties.json();
  console.log(response.data)
  state.parties = response.data //array of parties
}
const fetchPartyById = async (id) => {
  try {const party = await fetch (API + id)
    const resolved = await party.json()
    state.selectedParty = resolved.data
  }catch (e) {
    console.log(e)
  }
}
const renderParties = () => {
  // console.log(state.parties);
  state.parties.forEach((party) => {
    // create a new elements - li
    const partyElement = document.createElement(`li`)

    const h3 = document.createElement(`h3`)
    h3.innerText = party.name
    h3.addEventListener(`click`, async () => {
    await fetchPartyById(party.id)
    const selectedParty = document.createElement(`div`)
    if (!state.selectedParty?.name) return
    selectedParty.innerHTML = `<h3>${state.selectedParty.name}</h3>`
    div.appendChild(selectedParty)
    }) 
    partyElement.append (h3)
    const p = document.createElement(`p`)
    p.innerText = party.location
    partyElement.append(p)

    // put text inside that element
    // partyElement.innerHTML = `
    // <h3>${party.name}</h3>, 
    // <p>${party.location}</p>`
      // .append .replaceChildren .appendChild
    div.append(partyElement)
  })
  
}

const init = async () => {
  await fetchParties()
  renderParties()
}

init();

