// 1. Mengambil elemen dari HTML
const morseDisplay = document.getElementById("morse-code-display");
const userInput = document.getElementById("user-input");
const submitButton = document.getElementById("submit-button");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");

// 2. Menentukan soal
const question = {
    morse: ".-.",
    answer: "R"
};

// 3. Menampilkan soal ke halaman
morseDisplay.textContent = question.morse;

// 4. Menyiapkan skor
let score = 0;
let answeredCorrectly = false;

// 5. Menjalankan fungsi ketika tombol diklik
submitButton.addEventListener("click", function () {
    const answer = userInput.value.trim().toUpperCase();

    // Memeriksa apakah input kosong
    if (answer === "") {
        feedback.textContent = "Masukkan jawaban terlebih dahulu!";
        return;
    }

    // Mencegah skor bertambah berkali-kali pada soal yang sama
    if (answeredCorrectly) {
        feedback.textContent = "Kamu sudah menjawab soal ini dengan benar.";
        return;
    }

    // Memeriksa jawaban pemain
    if (answer === question.answer) {
        feedback.textContent = "Benar! Kode Morse tersebut adalah huruf R.";
        score = score + 1;
        scoreDisplay.textContent = score;
        answeredCorrectly = true;
    } else {
        feedback.textContent = "Jawaban salah. Coba lagi!";
    }
});