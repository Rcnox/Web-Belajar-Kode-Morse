// Mengambil elemen dari HTML
const startButton = document.getElementById("start-button");
const welcome = document.getElementById("welcome");
const mainmenu = document.getElementById("main-menu");
const gameScreen = document.getElementById("game-screen");
const gameTitle = document.getElementById("game-title");
const gameContent = document.getElementById("game-content");

// Tombol START GAME
startButton.addEventListener("click", function () {
    welcome.hidden = true;
    mainmenu.hidden = false;
});

// Kumpulan soal kode Morse
const questions = [
    { morse: ".-", answer: "A" },
    { morse: "-...", answer: "B" },
    { morse: "-.-.", answer: "C" },
    { morse: "-..", answer: "D" },
    { morse: ".", answer: "E" },
    { morse: "..-.", answer: "F" },
    { morse: "--.", answer: "G" },
    { morse: "....", answer: "H" },
    { morse: "..", answer: "I" },
    { morse: ".---", answer: "J" },
    { morse: "-.-", answer: "K" },
    { morse: ".-..", answer: "L" },
    { morse: "--", answer: "M" },
    { morse: "-.", answer: "N" },
    { morse: "---", answer: "O" },
    { morse: ".--.", answer: "P" },
    { morse: "--.-", answer: "Q" },
    { morse: ".-.", answer: "R" },
    { morse: "...", answer: "S" },
    { morse: "-", answer: "T" },
    { morse: "..-", answer: "U" },
    { morse: "...-", answer: "V" },
    { morse: ".--", answer: "W" },
    { morse: "-..-", answer: "X" },
    { morse: "-.--", answer: "Y" },
    { morse: "--..", answer: "Z" }
];

const colors = [
    "option-red",
    "option-blue",
    "option-green",
    "option-yellow"
];

let timerInterval;
let nextQuestionTimeout;
let timeLeft = 30;
let score = 0;
let questionCount = 0;
let gameActive = false;
let acceptingAnswer = false;
let currentLearnQuestion = null;

// Mengacak array
function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

// Membuat empat pilihan jawaban
function createOptions(correctAnswer) {
    const wrongAnswers = questions
        .map(question => question.answer)
        .filter(answer => answer !== correctAnswer);

    return shuffle([
        correctAnswer,
        ...shuffle(wrongAnswers).slice(0, 3)
    ]);
}

// Memilih mode game
document.querySelectorAll(".mode-container").forEach(button => {
    button.addEventListener("click", function () {
        const mode = button.dataset.mode;

        mainmenu.hidden = true;
        gameScreen.hidden = false;

        if (mode === "time-attack") {
            startTimeAttack();
        } else {
            startLearn();
        }
    });
});

// Memulai Time Attack
function startTimeAttack() {
    stopGame();

    timeLeft = 30;
    score = 0;
    questionCount = 0;
    gameActive = true;

    gameTitle.textContent = "Time Attack";

    showQuestion();

    timerInterval = setInterval(function () {
        if (!gameActive) return;

        timeLeft--;

        const timer = document.getElementById("timer");
        if (timer) {
            timer.textContent = `00:${String(timeLeft).padStart(2, "0")}`;
        }

        if (timeLeft <= 0) {
            endTimeAttack();
        }
    }, 1000);
}

// Menampilkan soal dan pilihan jawaban (Time Attack)
function showQuestion() {
    if (!gameActive) return;

    const question = questions[Math.floor(Math.random() * questions.length)];
    const options = createOptions(question.answer);
    const letters = ["A", "B", "C", "D"];

    questionCount++;
    acceptingAnswer = true;

    gameContent.innerHTML = `
        <div class="game-topbar">
            <h2>TIME ATTACK</h2>
            <div class="timer-box">
                <span class="timer-label">WAKTU</span>
                <span id="timer">00:${String(timeLeft).padStart(2, "0")}</span>
            </div>
        </div>

        <section class="question-card">
            <p id="question-number">PERTANYAAN ${questionCount}</p>
            <h2>Apa huruf dari kode Morse ini?</h2>
            <div id="morse-code-display">${question.morse}</div>
        </section>

        <section class="answer-grid">
            ${options.map((option, index) => `
                <button class="answer-option ${colors[index]}" data-answer="${option}">
                    <span>${letters[index]}</span>
                    <strong>${option}</strong>
                </button>
            `).join("")}
        </section>

        <div id="feedback" aria-live="polite"></div>

        <div class="game-footer">
            <span>Skor: <strong id="score">${score}</strong></span>
            <span>Soal: ${questionCount}</span>
        </div>

        <div class="game-actions">
            <button id="back-to-menu" class="btn-secondary">Kembali ke Menu</button>
        </div>
    `;

    gameContent.querySelectorAll(".answer-option").forEach(button => {
        button.addEventListener("click", function () {
            if (!gameActive || !acceptingAnswer) return;

            acceptingAnswer = false;

            const feedback = document.getElementById("feedback");
            const buttons = gameContent.querySelectorAll(".answer-option");

            buttons.forEach(item => { item.disabled = true; });

            if (button.dataset.answer === question.answer) {
                score++;
                document.getElementById("score").textContent = score;
                feedback.textContent = "Benar!";
                feedback.style.color = "#229b75";
            } else {
                feedback.textContent = `Kurang tepat! Jawabannya ${question.answer}.`;
                feedback.style.color = "#e34f58";
            }

            nextQuestionTimeout = setTimeout(function () {
                if (gameActive) {
                    showQuestion();
                }
            }, 600);
        });
    });

    document.getElementById("back-to-menu").addEventListener("click", backToMenu);
}

// Waktu habis
function endTimeAttack() {
    stopGame();

    gameContent.innerHTML = `
        <section id="game-over">
            <h2>Waktu Habis!</h2>
            <p>Jumlah soal: ${questionCount}</p>
            <p>Skor akhir: <strong>${score}</strong></p>

            <button id="restart-button">Main Lagi</button>
            <button id="back-to-menu" class="btn-secondary">Kembali ke Menu</button>
        </section>
    `;

    document.getElementById("restart-button").addEventListener("click", startTimeAttack);
    document.getElementById("back-to-menu").addEventListener("click", backToMenu);
}

// Mode Learn
function startLearn() {
    stopGame();
    gameTitle.textContent = "Learn";
    showLearnQuestion();
}

function showLearnQuestion() {
    currentLearnQuestion = questions[Math.floor(Math.random() * questions.length)];

    gameContent.innerHTML = `
        <div class="game-topbar">
            <h2>LEARN MODE</h2>
        </div>

        <section class="question-card">
            <p id="question-number">BELAJAR MORSE</p>
            <h2>Apa huruf dari kode Morse berikut?</h2>
            <div id="morse-code-display">${currentLearnQuestion.morse}</div>
        </section>

        <div class="learn-input-section">
            <div class="input-box">
                <input id="user-input"
                       type="text"
                       maxlength="1"
                       placeholder="Ketik huruf..."
                       autocomplete="off">
                <button id="check-answer">Periksa Jawaban</button>
            </div>
            <div id="feedback" aria-live="polite"></div>
        </div>

        <div class="game-actions">
            <button id="back-to-menu" class="btn-secondary">Kembali ke Menu</button>
        </div>
    `;

    const input = document.getElementById("user-input");
    const feedback = document.getElementById("feedback");

    input.focus();

    function checkAnswer() {
        const userVal = input.value.trim().toUpperCase();
        if (!userVal) return;

        if (userVal === currentLearnQuestion.answer) {
            feedback.textContent = `Benar! ${currentLearnQuestion.morse} adalah huruf ${currentLearnQuestion.answer}.`;
            feedback.style.color = "#229b75";
            setTimeout(() => {
                showLearnQuestion();
            }, 1000);
        } else {
            feedback.textContent = `Belum tepat. Coba lagi!`;
            feedback.style.color = "#e34f58";
        }
    }

    document.getElementById("check-answer").addEventListener("click", checkAnswer);
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") checkAnswer();
    });
    document.getElementById("back-to-menu").addEventListener("click", backToMenu);
}

// Menghentikan timer dan perpindahan soal
function stopGame() {
    gameActive = false;
    acceptingAnswer = false;

    clearInterval(timerInterval);
    clearTimeout(nextQuestionTimeout);
}

// Kembali ke menu mode
function backToMenu() {
    stopGame();

    gameScreen.hidden = true;
    mainmenu.hidden = false;
}