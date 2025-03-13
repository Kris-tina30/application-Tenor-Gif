const getButton = document.querySelector("button");
const input = document.querySelector("input");
const listGif = document.querySelector("ul");
const API_KEY = "AIzaSyC1AZvwwWM9fg3-2D8uoakljI67nxi5sWM";

const BASE_URL = "https://tenor.googleapis.com/v2/search?";

getButton.addEventListener("click", addGif);

function addGif() {
  const searchTerm = input.value.trim();
  if (searchTerm === "") return;

  const URL = `${BASE_URL}q=${searchTerm}&key=${API_KEY}&limit=12`;

  httpGetAsync(URL, displayGifs);
}

function httpGetAsync(url, callback) {
  let xmlHttp = new XMLHttpRequest();

  xmlHttp.onload = function () {
    if (xmlHttp.status == 200) {
      callback(xmlHttp.responseText);
    } else {
      console.error("error HTTP:", xmlHttp.status, xmlHttp.statusText);
    }
  };

  xmlHttp.open("GET", url, true);

  xmlHttp.send(null);

  return;
}

function displayGifs(responseText) {
  let response = JSON.parse(responseText);
  let gifs = response.results;
  listGif.innerHTML = "";

  gifs.forEach((gif) => {
    let gifUrl = gif.media_formats.gif.url;
    let listItem = document.createElement("li");

    let img = document.createElement("img");
    img.src = gifUrl;
    img.alt = "GIF";
    listItem.appendChild(img);
    listGif.appendChild(listItem);
  });
  return;
}
