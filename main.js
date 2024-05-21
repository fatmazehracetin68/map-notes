import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { detecType, setStorage, detecIcon } from "./helper.js";

const form = document.querySelector("form");
const list = document.querySelector("ul");

//olay izleyicileri
form.addEventListener("submit", handleSubmit);
list.addEventListener("click", handleClick);

//ortak kullanım//
var map;
var layerGroup = [];

var notes = JSON.parse(localStorage.getItem("notes") ?? "[]");

var coords = [];

window.navigator.geolocation.getCurrentPosition(loadMap, errorFunction);

function errorFunction() {
  console.log("hata");
}
//haritaya tıklanınca çalışır.
function onMapClick(e) {
  form.style.display = "flex";
  coords = [e.latlng.lat, e.latlng.lng];
}
function renderMarker(item) {
  // L.marker([50.505, 30.57], { icon: myIcon }).addTo(map);
  L.marker(item.coords, { icon: detecIcon(item.status) })
    .addTo(layerGroup)
    .bindPopup(`${item.desc}`);
}

function loadMap(e) {
  map = L.map("map").setView([e.coords.latitude, e.coords.longitude], 10);
  //   L.Control;

  //harita nasıl gözükecek?
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //ekrana basılan imleçleri tutan katman
  layerGroup = L.layerGroup().addTo(map);

  renderNoteList(notes);

  map.on("click", onMapClick);
}

function handleSubmit(e) {
  e.preventDefault();
  const desc = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;

  notes.push({
    id: uuidv4(),
    desc,
    date,
    status,
    coords,
  });
  setStorage(notes);

  renderNoteList(notes);

  form.style.display = "none";
}

//ekrana not aktaracak
function renderNoteList(item) {
  list.innerHTML = "";
  layerGroup.clearLayers();
  item.forEach((item) => {
    const listElement = document.createElement("li");
    listElement.dataset.id = item.id;
    listElement.innerHTML = `<div>
              <p>${item.desc}</p>
              <p><span>Tarih:</span>${item.date}</p>
              <p><span>Durum:</span>${detecType(item.status)}</p>
            </div>
            <i class="fa-solid fa-x" id="delete"></i>
            <i class="fa-solid fa-plane-up" id="fly"></i>`;

    list.insertAdjacentElement("afterbegin", listElement);

    renderMarker(item);
  });
}

function handleClick(e) {
  const id = e.target.parentElement.dataset.id;
  if (e.target.id === "delete") {
    notes = notes.filter((note) => note.id != id);
    setStorage(notes);
    renderNoteList(notes);
  }

  if (e.target.id === "fly") {
    const note = notes.find((note) => note.id == id);
    map.flyTo(note.coords);
  }
}
