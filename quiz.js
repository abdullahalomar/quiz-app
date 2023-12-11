const app = document.getElementById("app");
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    userAnswer: null,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
    userAnswer: null,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Southern Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: "Pacific Ocean",
    userAnswer: null,
  },
  {
    question: 'Who wrote the play "Romeo and Juliet"?',
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "F. Scott Fitzgerald",
    ],
    correctAnswer: "William Shakespeare",
    userAnswer: null,
  },
  {
    question: 'Which element has the chemical symbol "O"?',
    options: ["Oxygen", "Gold", "Silver", "Uranium"],
    correctAnswer: "Oxygen",
    userAnswer: null,
  },
];

let currentQuestionIndex = 0;
let timer;

function renderQuiz() {
  const question = quizData[currentQuestionIndex];
  const html = `
    <div class="my-8 p-4 bg-white shadow-lg rounded-lg">
      <div class="flex-none md:flex justify-between items-baseline mb-5">
      <h2 class="text-lg font-semibold mb-4 order-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">${
        currentQuestionIndex + 1
      }. ${question.question}</h2>
      <div id="timer" class="bg-red-300 order-2 mt-4 p-2 rounded-lg"><p class="text-lg font-semibold">Time Left: 30 seconds</p></div>
      </div>
      <div class="grid gap-4 mb-3">
        ${question.options
          .map(
            (option) => `
          <button id="${option}" class="text-white bg-gradient-to-br from-purple-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer" onclick="checkAnswer('${option}')">${option}</button>
        `
          )
          .join("")}
      </div>
      
      <button id="nextBtn" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onclick="moveNext()" disabled>Next</button>
    </div>
    <div id="result" class="mt-4"></div>
  `;
  app.innerHTML = html;

  // Set the timer for 30 seconds
  let timeLeft = 30;
  updateTimerDisplay(timeLeft);

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timeLeft);

    if (timeLeft === 0) {
      clearInterval(timer);
      disableOptions();
      document.getElementById("nextBtn").removeAttribute("disabled");
    }
  }, 1000);
}

function updateTimerDisplay(timeLeft) {
  document.getElementById("timer").innerText = `Time Left: ${timeLeft} seconds`;
}

function disableOptions() {
  const options = quizData[currentQuestionIndex].options;
  options.forEach((option) => {
    document.getElementById(option).setAttribute("disabled", "true");
  });
}

function checkAnswer(selectedAnswer) {
  const question = quizData[currentQuestionIndex];
  question.userAnswer = selectedAnswer;
  const correctAnswer = question.correctAnswer;
  const isCorrect = selectedAnswer === correctAnswer;

  const resultHtml = `
    <div class="my-4 p-4 bg-white shadow-lg rounded-lg">
      <h2 class="text-xl font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-600">${
        currentQuestionIndex + 1
      }. ${question.question}</h2>
      <p class="text-xl font-medium bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 inline-block text-transparent bg-clip-text">Your answer: <span class="text-blue-500">${selectedAnswer}</span></p>
      <p class="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-red-600">Correct answer: <span class="text-green-500">${correctAnswer}</span> </p>
      <p class="${
        isCorrect ? "text-green-500" : "text-red-500"
      } text-red-400 text-xl font-medium">${
    isCorrect ? "Correct!" : "Incorrect!"
  }</p>
    </div>
  `;
  document.getElementById("result").innerHTML = resultHtml;

  // Enable the Next button
  document.getElementById("nextBtn").removeAttribute("disabled");
}

function moveNext() {
  clearInterval(timer);
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    renderQuiz();
  } else {
    renderFinishButton();
  }
}

function renderFinishButton() {
  const html = `
    <div class="my-4 p-4 bg-white shadow-md">
      <p class="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-600">Quiz completed! Click the button below to see your results.</p>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800" onclick="showResults()">Finish</button>
    </div>
  `;
  app.innerHTML += html;
}

function showResults() {
  app.innerHTML =
    '<h2 class="text-2xl font-bold mb-4 font-medium from-indigo-800 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">Quiz Results</h2>';
  quizData.forEach((question, index) => {
    const resultHtml = `
      <div class="my-4 p-4 bg-white shadow-md">
        <h3 class="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-red-600">${
          index + 1
        }. ${question.question}</h3>
        <p class="${
          question.userAnswer === question.correctAnswer
            ? "text-xl font-medium from-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent"
            : "text-xl font-medium from-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent"
        }">
          Your answer: <span class="text-blue-400">${
            question.userAnswer || "Not answered"
          }</span>
        </p>
        <p class="text-xl font-medium from-purple-600 via-red-600 to-red-300 bg-gradient-to-r bg-clip-text text-transparent">Correct answer: <span class="from-green-600 to-green-300 bg-gradient-to-r bg-clip-text text-transparent">${
          question.correctAnswer
        }</span></p>
      </div>
    `;
    app.innerHTML += resultHtml;
  });
}
// Initial render
renderQuiz();
