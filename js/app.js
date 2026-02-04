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

function rectsOverlap(a, b) {
  return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
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

  // Move *within* the buttons box so it never creates scrolling,
  // and NEVER overlap the YES button.
  const parentRect = buttonsBox.getBoundingClientRect();
  const yesRectAbs = yesButton.getBoundingClientRect();
  const noRectAbs = noButton.getBoundingClientRect();

  const btnW = noRectAbs.width;
  const btnH = noRectAbs.height;

  const maxLeft = Math.max(0, parentRect.width - btnW);
  const maxTop = Math.max(0, parentRect.height - btnH);

  // YES rect in "buttonsBox local coordinates"
  const AVOID_PADDING = 8; // extra spacing so they don't touch
  const yesRect = {
    left: (yesRectAbs.left - parentRect.left) - AVOID_PADDING,
    top: (yesRectAbs.top - parentRect.top) - AVOID_PADDING,
    right: (yesRectAbs.right - parentRect.left) + AVOID_PADDING,
    bottom: (yesRectAbs.bottom - parentRect.top) + AVOID_PADDING
  };

  let chosenLeft = 0;
  let chosenTop = 0;

  const MAX_TRIES = 40;
  let found = false;

  for (let t = 0; t < MAX_TRIES; t++) {
    const i = Math.floor(Math.random() * (maxLeft + 1));
    const j = Math.floor(Math.random() * (maxTop + 1));

    const candidate = { left: i, top: j, right: i + btnW, bottom: j + btnH };

    if (!rectsOverlap(candidate, yesRect)) {
      chosenLeft = i;
      chosenTop = j;
      found = true;
      break;
    }
  }

  // Fallback: if the box is too tight, push NO as far as possible away horizontally
  if (!found) {
    const yesCenterX = (yesRect.left + yesRect.right) / 2;
    chosenLeft = (yesCenterX < parentRect.width / 2) ? maxLeft : 0;
    chosenTop = Math.floor(maxTop / 2);
  }

  noButton.style.left = chosenLeft + "px";
  noButton.style.top = chosenTop + "px";

  customImage.src = "img/monkey.jpg";
}

function yesChange() {
  document.body.classList.add("yes-clicked");
  buttonsBox.style.display = "none";
  customImage.src = "img/flower.jpg";
  customText.textContent = "I knew you would say yes!";
}
