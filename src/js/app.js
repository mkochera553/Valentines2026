let customImage = document.querySelector(".custom-image");


// NO logic

let noButton = document.querySelector(".no-button");
noButton.addEventListener("click",noChange);

const YES_GROW_PER_CLICK = 0.5;  // 12% bigger each NO click
const NO_SHRINK_PER_CLICK = 0.10; // 10% smaller each NO click

let yesScale = 1;
let noScale = 1;

function noChange()
{
  // resize more every click
  yesScale = yesScale + YES_GROW_PER_CLICK;
  noScale = noScale - NO_SHRINK_PER_CLICK;

  yesButton.style.transform = `scale(${yesScale})`;
  noButton.style.transform = `scale(${noScale})`;

  // On first click: switch to absolute but keep the same visual position
  if (!noButton.classList.contains("is-moving")) {
    const parentRect = noButton.parentElement.getBoundingClientRect();
    const rect = noButton.getBoundingClientRect();

    noButton.classList.add("is-moving");
    noButton.style.left = (rect.left - parentRect.left) + "px";
    noButton.style.top = (rect.top - parentRect.top) + "px";
  }

  let i = Math.floor(Math.random()*500)+1;
  let j = Math.floor(Math.random()*500)+1;
  noButton.style.left = i+"px";
  noButton.style.top = j+"px";

  customImage.src = "img/monkey.jpg";
}

// YES logic

let yesButton = document.querySelector(".yes-button");
yesButton.addEventListener("click",yesChange);

let buttonsBox = document.querySelector(".buttons");
let customText = document.querySelector(".custom-text");

function yesChange() {
  document.body.classList.add("yes-clicked");
  buttonsBox.style.display = "none";
  customImage.src = "img/flower.jpg";
  customText.textContent = "I knew you would say yes!";
}
