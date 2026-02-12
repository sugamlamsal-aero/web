let currentPage = 0;
const pages = document.querySelectorAll(".page");

function nextPage() {
  pages[currentPage].classList.remove("active");
  currentPage++;
  pages[currentPage].classList.add("active");

  if (pages[currentPage].classList.contains("final-page")) {
    sendResponses(); // 🚀 SEND SILENTLY

    setTimeout(() => {
      document.getElementById("finalButtons").classList.remove("hidden");
    }, 3500);
  }
}


const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfbeG55i-h0GD1hKdt8QPAUb7WyoZaKz3ldvisxCiJ9tkEPsw/formResponse";

const responses = {
  gift: "",
  drink: "",
  valentine: ""
};

function saveAnswer(question, value) {
  responses[question] = value;
}

function sendResponses() {
  const data = new FormData();
  data.append("entry.1584006371", responses.gift);
  data.append("entry.927093443", responses.drink);
  data.append("entry.2036340109", responses.valentine);

  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: data
  });
}

function finalAnswer(answer) {
  saveAnswer("valentine", answer);
  sendResponses();

  launchHearts(); // heart confetti

  const msg = document.getElementById("finalMessage");
  msg.classList.remove("hidden");
  msg.classList.add("show");
}


function launchHearts() {
  const hearts = ["❤️", "💖", "💘", "💝", "💕","🎉","💫"];
  const totalHearts = 150;       // total hearts
  const spawnInterval = 50;      // new heart every 50ms
  let created = 0;

  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

    // random horizontal position
    heart.style.left = Math.random() * 100 + "vw";

    // random vertical start position
    heart.style.top = Math.random() * 100 + "vh";

    // random size
    heart.style.fontSize = 15 + Math.random() * 25 + "px";

    // random animation speed
    heart.style.animationDuration = 3 + Math.random() * 4 + "s";

    // random rotation
    heart.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(heart);

    // remove heart after animation
    setTimeout(() => heart.remove(), 8000);

    created++;
    if (created >= totalHearts) clearInterval(interval);
  }, spawnInterval);
}


// RUNAWAY BUTTON 😈
document.addEventListener("mousemove", function (e) {
  const btn = document.getElementById("runawayBtn");
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const distance = Math.hypot(
    e.clientX - (rect.left + rect.width / 2),
    e.clientY - (rect.top + rect.height / 2)
  );

  if (distance < 120) {
    moveButton(btn);
  }
});

function moveButton(btn) {
  const card = btn.closest(".card");
  const cardRect = card.getBoundingClientRect();

  const maxX = cardRect.width - btn.offsetWidth;
  const maxY = cardRect.height - btn.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  btn.style.position = "absolute";
  btn.style.left = randomX + "px";
  btn.style.top = randomY + "px";
}





