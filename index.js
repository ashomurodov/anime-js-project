const wrapper = document.getElementById("tiles");

let toggled = false;

let columns = Math.floor(document.body.clientWidth / 50);
let rows = Math.floor(document.body.clientHeight / 50);

wrapper.style.setProperty("--columns", columns);
wrapper.style.setProperty("--rows", rows);

const randomColorFunc = () => {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};

const handleOnclick = (index) => {
  toggled = !toggled;

  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    backgroundColor: `#${randomColorFunc()}`,
    delay: anime.stagger(50, { grid: [columns, rows], from: index }),
  });
};

const createTile = (index) => {
  const tile = document.createElement("div");
  tile.classList.add("tile");

  tile.onclick = (e) => handleOnclick(index);

  return tile;
};

const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((tile, idx) => {
    wrapper.appendChild(createTile(idx));
  });
};

const resizeWindow = () => {
  wrapper.innerHTML = "";

  columns = Math.floor(document.body.clientWidth / 50);
  rows = Math.floor(document.body.clientHeight / 50);

  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  createTiles(rows * columns);
};

window.onresize = () => resizeWindow();

createTiles(rows * columns);
