// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

let dodgeCount = 0;

// Open Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});


// 🔥 Move NO button (phone + desktop)
function moveNoButton() {

    dodgeCount++;

    // Funny text progression
    if (dodgeCount === 3) noBtn.textContent = "are you sure?";
    if (dodgeCount === 6) noBtn.textContent = "really sure??";
    if (dodgeCount === 9) noBtn.textContent = "last chance 😭";

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = window.innerWidth - btnWidth - 20;
    const maxY = window.innerHeight - btnHeight - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    noBtn.style.transform = "none";
}

// Desktop hover
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile touch (MOST important)
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
}, { passive: false });

// Backup protection
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNoButton();
});



// 🎉 CONFETTI FUNCTION (no libraries needed)
function launchConfetti() {

    for (let i = 0; i < 120; i++) {

        const confetti = document.createElement("div");

        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "14px";
        confetti.style.top = "-20px";
        confetti.style.left = Math.random() * window.innerWidth + "px";

        confetti.style.backgroundColor =
            `hsl(${Math.random() * 360}, 100%, 60%)`;

        confetti.style.opacity = Math.random();

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        const fallDuration = Math.random() * 3 + 2;

        confetti.animate([
            { transform: "translateY(0) rotate(0deg)" },
            {
                transform: `translateY(${window.innerHeight + 50}px)
                            rotate(${Math.random() * 720}deg)`
            }
        ], {
            duration: fallDuration * 1000,
            easing: "linear"
        });

        setTimeout(() => confetti.remove(), fallDuration * 1000);
    }
}



// YES clicked
yesBtn.addEventListener("click", () => {

    launchConfetti(); // 🎉 boom

    title.textContent = "YAYYYYYYYYYY!";
    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";
    finalText.style.display = "block";
});
