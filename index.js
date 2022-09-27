/* Get containers */

const puzzle = document.querySelector("#puzzle");
const pieces = document.querySelector("#pieces");

/* Pictures */

const pictures = [
  "pic-1",
  "pic-2",
  "pic-3",
  "pic-4",
  "pic-5",
  "pic-6",
  "pic-7",
  "pic-8",
  "pic-9",
];

/* Saving pictures length */

let picLe = pictures.length;

/* Creating puzzle items */

for (let i = 0; i < picLe; i++) {
  const item = document.createElement("div");
  item.classList.add("item");
  item.classList.add("puzzle-item");
  item.dataset.id = pictures[i];

  puzzle.appendChild(item);
}

/* Creating pieces */

while (pictures.length > 0) {
  const position = Math.floor(Math.random() * pictures.length);

  const item = document.createElement("div");
  item.classList.add("item");
  item.classList.add("pieces-item");
  item.style.backgroundImage = `url(./Pictures/${pictures[position]}.jpg)`;
  item.draggable = true;
  item.id = pictures[position];
  pieces.appendChild(item);

  pictures.splice(position, 1);
}

/* Adding events */

pieces.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("element", e.target.id);
});

puzzle.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.target.classList.add("puzzle-item-hover");
});

puzzle.addEventListener("dragleave", (e) => {
  e.target.classList.remove("puzzle-item-hover");
});

puzzle.addEventListener("drop", (e) => {
  e.target.classList.remove("puzzle-item-hover");

  const element = e.dataTransfer.getData("element");

  if (e.target.dataset.id === element) {
    e.target.appendChild(document.getElementById(element));
    picLe--;
  }

  if (picLe === 0) {
    document.body.classList.add("finish");
  }
});
