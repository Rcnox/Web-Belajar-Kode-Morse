//  Mengambil elemen dari HTML
const morseDisplay = document.getElementById("morse-code-display");
const userInput = document.getElementById("user-input");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");

//  Menentukan soal
const questions = [
    {morse: ".-"    , answer: "A"  },  {morse: "-..."   , answer: "B"  }, {morse: "-.-."    , answer: "C"  },
    {morse: "-.."   , answer: "D"  },  {morse: "."      , answer: "E"  }, {morse: "..-."    , answer: "F"  },
    {morse: "--."   , answer: "G"  },  {morse: "...."   , answer: "H"  }, {morse: ".."      , answer: "I"  },
    {morse: ".---"  , answer: "J"  },  {morse: "-.-"    , answer: "K"  }, {morse: ".-.."    , answer: "L"  },
    {morse: "--"    , answer: "M"  },  {morse: "-."     , answer: "N"  }, {morse: "---"     , answer: "O"  },
    {morse: ".--."  , answer: "P"  },  {morse: "--.-"   , answer: "Q"  }, {morse: ".-."     , answer: "R"  },
    {morse: "..."   , answer: "S"  },  {morse: "-"      , answer: "T"  }, {morse: "..-"     , answer: "U"  }, 
    {morse: "...-"  , answer: "V"  },  {morse: ".--"    , answer: "W"  }, {morse: "-..-"    , answer: "X"  },
    {morse: "-.--"  , answer: "Y"  },  {morse: "--.."   , answer: "Z"  },
];

//  Menampilkan soal ke halaman
let currentQuestionIndex = 0;
const question = questions[currentQuestionIndex];
morseDisplay.textContent = question.morse;

//  Menyiapkan skor
let score = 0;
let answeredCorrectly = false;

// 5. Memeriksa jawaban ketika Enter ditekan
userInput.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") {
        return;
    }

    event.preventDefault();

    const answer = userInput.value.trim().toUpperCase();

    if (answer === "") {
        feedback.textContent = "Masukkan jawaban terlebih dahulu!";
        return;
    }

    if (answeredCorrectly) {
        feedback.textContent = "Kamu sudah menjawab dengan benar!";
        return;
    }

    if (answer === question.answer) {
        feedback.textContent = "Benar!";
        score++;
        scoreDisplay.textContent = score;
        answeredCorrectly = true;
    } else {
        feedback.textContent = "Jawaban salah. Coba lagi!";
    }
});