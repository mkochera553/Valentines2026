let customImage = document.querySelector(".custom-image");

// NO logic
let noButton = document.querySelector(".no-button");
noButton.addEventListener("click", noChange);

const YES_GROW_PER_CLICK = 0.5;  // 12% bigger each NO click
const NO_SHRINK_PER_CLICK = 0.10; // 10% smaller each NO click

let yesScale = 1;
let noScale = 1;

// YES logic
let yesButton = document.querySelector(".yes-button");
yesButton.addEventListener("click", yesChange);

let buttonsBox = document.querySelector(".buttons");
let customText = document.querySelector(".custom-text");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function noChange() {
  // resize more every click (cap growth/shrink to avoid absurd sizes on mobile)
  yesScale = clamp(yesScale + YES_GROW_PER_CLICK, 1, 2.2);
  noScale = clamp(noScale - NO_SHRINK_PER_CLICK, 0.35, 1);

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

  // Move *within* the buttons box so it never creates scrolling
  const parentRect = buttonsBox.getBoundingClientRect();
  const btnRect = noButton.getBoundingClientRect();

  const maxLeft = Math.max(0, parentRect.width - btnRect.width);
  const maxTop = Math.max(0, parentRect.height - btnRect.height);

  const i = Math.floor(Math.random() * (maxLeft + 1));
  const j = Math.floor(Math.random() * (maxTop + 1));

  noButton.style.left = i + "px";
  noButton.style.top = j + "px";

  customImage.src = "img/monkey.jpg";
}

function yesChange() {
  document.body.classList.add("yes-clicked");
  buttonsBox.style.display = "none";
  customImage.src = "img/flower.jpg";
  customText.textContent = "I knew you would say yes!";
}
