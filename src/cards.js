import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getCards(query) {
    await fakeNetwork(`getContacts:${query}`);
    let cards = await localforage.getItem("cards");
    if (!cards) cards = [];
    if (query) {
      cards = matchSorter(cards, query, { keys: ["first", "last"] });
    }
    //console.log(cards);
    return cards.sort(sortBy("last", "createdAt"));
  }
  
  export async function createCard() {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let card = { id, createdAt: Date.now() };
    let cards = await getCards();
    cards.unshift(card);
    await set(cards);
    return card;
  }
  
  export async function getCard(id) {
    await fakeNetwork(`contact:${id}`);
    let cards = await localforage.getItem("cards");
    let card = cards.find(card => card.id === id);
    return card ?? null;
  }
  
  export async function updateCard(id, updates) {
    await fakeNetwork();
    let cards = await localforage.getItem("cards");
    let card = cards.find(card => card.id === id);
    if (!card) throw new Error("No card found for", id);
    Object.assign(card, updates);
    await set(cards);
    return card;
  }
  
  export async function deleteCard(id) {
    let cards = await localforage.getItem("cards");
    let index = cards.findIndex(card => card.id === id);
    console.log(index);
    if (index > -1) {
      cards.splice(index, 1);
      await set(cards);
      return true;
    }
    return false;
  }
  
  function set(cards) {
    return localforage.setItem("cards", cards);
  }


// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}