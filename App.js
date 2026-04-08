const wordList = [
    { word: "REACT", hint: "إطار عمل شهير للـ Frontend" },
    { word: "JAVASCRIPT", hint: "لغة برمجة الويب الأساسية" },
    { word: "CSS", hint: "مسؤولة عن تصميم وتنسيق المواقع" },
    { word: "PYTHON", hint: "لغة برمجة مشهورة بالذكاء الاصطناعي" },
    { word: "PYTHON", hint: "لغة برمجة مشهورة بالذكاء الاصطناعي" }
];

let selectedWord, selectedHint;
let wrongGuesses = 0;
let guessedLetters = [];
const maxWrong = 6;

const wordDisplay = document.getElementById("word-display");
const hintText = document.getElementById("hint-text");
const wrongCountText = document.getElementById("wrong-count");
const keyboard = document.getElementById("keyboard");
const clickSound = document.getElementById("click-sound");
const bodyParts = document.querySelectorAll(".draw");

// تشغيل اللعبة
function initGame() {
    wrongGuesses = 0;
    guessedLetters = [];
    const randomObj = wordList[Math.floor(Math.random() * wordList.length)];
    selectedWord = randomObj.word;
    selectedHint = randomObj.hint;

    hintText.innerText = selectedHint;
    wrongCountText.innerText = `0/${maxWrong}`;
    
    // إعادة ضبط الرسوم
    bodyParts.forEach(part => part.style.display = "none");
    
    renderWord();
    createKeyboard();
}

// رسم الكلمة (شرطات)
function renderWord() {
    wordDisplay.innerHTML = selectedWord.split("").map(letter => 
        `<span>${guessedLetters.includes(letter) ? letter : ""}</span>`
    ).join("");

    if (selectedWord.length === guessedLetters.length) {
        setTimeout(() => alert("مبروك! لقد فزت 🥳"), 200);
    }
}

// إنشاء لوحة المفاتيح كاملة
function createKeyboard() {
    keyboard.innerHTML = "";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    letters.split("").forEach(char => {
        const button = document.createElement("button");
        button.innerText = char;
        button.classList.add("key");
        button.onclick = () => handleGuess(button, char);
        keyboard.appendChild(button);
    });
}

// التعامل مع الضغط على حرف
function handleGuess(button, char) {
    // تشغيل الصوت
    clickSound.currentTime = 0;

    button.disabled = true;

    if (selectedWord.includes(char)) {
        guessedLetters.push(char);
        button.classList.add("correct");
        // TODO: another voice for correct answer.
        renderWord();
    } else {
        wrongGuesses++;
        button.classList.add("wrong");
        clickSound.play();
        wrongCountText.innerText = `${wrongGuesses}/${maxWrong}`;
        if (bodyParts[wrongGuesses - 1]) {
            bodyParts[wrongGuesses - 1].style.display = "block";
        }
    }

    if (wrongGuesses === maxWrong) {
        setTimeout(() => alert(`للأسف خسرت! الكلمة كانت:   ${selectedWord}`), 200);
    }
}
document.getElementById("reset-btn").onclick = initGame;

// ابدأ اللعبة لأول مرة
// initGame();