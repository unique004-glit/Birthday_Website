const typeElement = document.getElementById("type");
const playBtn = document.getElementById("playBtn");

const introAudio = document.getElementById("Audio");
const surpriseAudio = document.getElementById("surpriseAudio");

const messages = [
    " Happy Birthday, Mummy",
    "Today is your special day, and I want to take a moment to thank you for everything you have done for me.",
    "Thank you for your love, your care, your sacrifices, and your endless support. You have always been there for me through good times and difficult times.",
    "Your strength inspires me, your kindness comforts me, and your love means more to me than words can express.",
    "I pray that this new year of your life brings you joy, good health, peace, and countless blessings.",
    "You deserve all the happiness in the world.",
    "Happy Birthday, Mummy. I love you very much."

];

let messageIndex = 0;
let charIndex = 0;

function typeWriter() {
    if (charIndex < messages[messageIndex].length) {
        typeElement.textContent += messages[messageIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 60);
    } else {
        setTimeout(() => {
            typeElement.textContent = "";
            charIndex = 0;
            messageIndex++;

            if (messageIndex < messages.length) {
                typeWriter();
            }
        }, 600);
    }
}

playBtn.addEventListener("click", () => {

    // Start typing
    typeWriter();

    // Start first audio
    introAudio.play();

    // Update button
    playBtn.textContent = "🎶 Playing...";
    playBtn.disabled = true;
});

// When first audio ends, start second audio
introAudio.addEventListener("ended", () => {
    surpriseAudio.play();
});