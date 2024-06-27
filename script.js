const circle = document.getElementById('circle');
const header = document.getElementById('header');

let isPressing = false;
let growTimeout;
let currentSize = 100;
let disappearCount = 0;


const initialMessage = "Oh look a circle, let's press it!";
// berichten die verschijnen afhankelijk van de grootte van de cirkel
const messages = [
    "Oh, it's growing?",
    "Uhh.. it keeps getting bigger..",
    "Okay, you can stop now?!",
    "That's too big!!",
    "seriously stop it!",
    "Wha-? Where'd it go?!",
    "It's back! Let's press it again!",
    "Oh now it's there?",
    "Huh?! Again?",
    "WHY WON'T IT STAY STILL??!!",
    "OH GOD",
    "PLEASE!",
    "STOPPPP!!!"
];


//  kleuren voor de cirkel
const colors = ["#3498db", "#e74c3c", "#f39c12", "#2ecc71"];

// Voeg event listeners toe voor muisklikken om te beginnen en stoppen met groeien van de cirkel
circle.addEventListener('mousedown', startGrowing);
circle.addEventListener('mouseup', stopGrowing);
circle.addEventListener('mouseleave', stopGrowing);

// beginnen met groeien wanneer de muisknop wordt ingedrukt
function startGrowing() {
    isPressing = true;
    growTimeout = setTimeout(grow, 100); // Start een timeout om continu te groeien
}

// stoppen met groeien wanneer de muisknop wordt losgelaten
function stopGrowing() {
    isPressing = false;
    clearTimeout(growTimeout); // Stop de timeout voor het groeien
    shrink(); // Start het krimpen van de cirkel
}

// cirkel te laten groeien
function grow() {
    if (isPressing) {
        currentSize += 10; // Verhoog de grootte met 10 pixels
        updateCircleSize(); // Update de grootte van de cirkel in de DOM
        updateHeaderMessage(); // Update het bericht in de header
        growTimeout = setTimeout(grow, 100); // Blijf groeien met een nieuwe timeout
    }
}

//  cirkel te laten krimpen
function shrink() {
    if (currentSize > 100) {
        currentSize -= 10;
        updateCircleSize();
        if (currentSize > 100) {
            setTimeout(shrink, 50);
        } else {
            header.textContent = initialMessage; // Zet het initiële bericht terug in de header
        }
    }
}

// grootte van de cirkel in de DOM te updaten
function updateCircleSize() {
    circle.style.width = `${currentSize}px`; // Pas de breedte van de cirkel aan
    circle.style.height = `${currentSize}px`; // Pas de hoogte van de cirkel aan
    if (currentSize > 450) {
        disappear(); // Laat de cirkel verdwijnen als hij te groot is
        header.textContent = messages[6]; // Verander de header naar het bijbehorende bericht
    }
}

// bericht in de header te updaten 
function updateHeaderMessage() {
    if (currentSize > 400) {
        header.textContent = messages[13];
    } else if (currentSize > 375) {
        header.textContent = messages[12];
    } else if (currentSize > 350) {
        header.textContent = messages[11];
    } else if (currentSize > 300) {
        header.textContent = messages[4];
    } else if (currentSize > 200) {
        header.textContent = messages[3];
    } else if (currentSize > 150) {
        header.textContent = messages[2];
    } else if (currentSize > 100) {
        header.textContent = messages[1];
    }
}

//  cirkel te laten verdwijnen
function disappear() {
    isPressing = false;
    clearTimeout(growTimeout); // Stop de timeout voor het groeien
    circle.style.display = 'none';
    header.textContent = messages[6];
    setTimeout(reappear, 2000);
}

// cirkel weer te laten verschijnen na te zijn verdwenen
function reappear() {
    currentSize = 100;
    updateCircleSize();
    if (disappearCount < 3) {
        disappearCount++; // Verhoog de teller voor verdwijningen
        circle.style.display = 'block';
        moveCircle();
        changeColor();
        header.textContent = messages[5 + disappearCount];
    } else {
        disappearCount = 0;
        circle.style.display = 'block'; // Laat de cirkel weer zien in de DOM
        circle.style.left = '50%';
        circle.style.top = '50%';
        changeColor(true);
        header.textContent = initialMessage;
    }
}

// cirkel naar een willekeurige positie op het scherm te verplaatsen
function moveCircle() {
    const x = Math.random() * (window.innerWidth - currentSize); //  willekeurige x-positie
    const y = Math.random() * (window.innerHeight - currentSize); // willekeurige y-positie
    circle.style.left = `${x}px`; // Pas de linkerpositie van de cirkel aan
    circle.style.top = `${y}px`; // Pas de bovenpositie van de cirkel aan
}

//  kleur van de cirkel te veranderen
function changeColor(reset = false) {
    if (reset) {
        circle.style.backgroundColor = colors[0]; // Reset de kleur naar de eerste kleur in de array
    } else {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Kies een willekeurige kleur uit de array
        circle.style.backgroundColor = randomColor; // Pas de kleur van de cirkel aan
    }
}
