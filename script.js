document.addEventListener("DOMContentLoaded", () => {
  // All your code, including:
  loadQuestions();
});

const quizData = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "What is the capital city of France?",
    options: ["Paris", "Berlin", "Madrid", "Lisbon"],
    answer: "Paris",
  },
  {
    question: "How many continents are there in the world?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Rhino"],
    answer: "Blue Whale",
  },
  {
    question: "Who invented the light bulb?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Thomas Edison",
      "Nikola Tesla",
    ],
    answer: "Thomas Edison",
  },
  {
    question: "Which language is the most spoken in the world?",
    options: ["English", "Mandarin Chinese", "Spanish", "Hindi"],
    answer: "Mandarin Chinese",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Thailand", "South Korea"],
    answer: "Japan",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    answer: "Diamond",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the currency of the United Kingdom?",
    options: ["Dollar", "Euro", "Pound Sterling", "Yen"],
    answer: "Pound Sterling",
  },
];

const questionNumberEl = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionEl = document.querySelectorAll(".option");
const timeEl = document.getElementById("timer");
const nextBtnEl = document.getElementById("next-btn");
const resultsEl = document.getElementById("results");
 const scoreEl = document.getElementById("score");

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;
let selectedAnswer = false;

function loadQuestions() {
  const { question, options } = quizData[currentQuestion];
  questionNumberEl.textContent = `
    Question ${currentQuestion + 1} / ${quizData.length}`;
  questionEl.textContent = question;
  optionEl.forEach((option, index) => {
    option.textContent = options[index];
    option.classList.remove("correct", "incorrect");
    option.onclick = () => selectoption(option);
  });
  selectedAnswer = false;
//   nextBtnEl.disabled = true;
  startTimer();
}

function selectoption(option) {
  if (!selectedAnswer) {
    selectedAnswer = true;
    const slectedAnswer = option.textContent;
    const correctAnswer = quizData[currentQuestion].answer;
    if (slectedAnswer == correctAnswer) {
        score++
      option.classList.add("correct");
    } else {
      option.classList.add("incorrect");
      optionEl.forEach((opt) => {
        if (opt.textContent === correctAnswer) opt.classList.add("correct");
      });
    }
  }
}

function loadNextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestions();
  } else {
    showResults();
    loadNextQuestion(); 
  }
}
nextBtnEl.disabled = false;


nextBtnEl.addEventListener("click", () => {
  loadNextQuestion();
});

function startTimer(){
    clearInterval(timer)
    timeLeft =10
    timeEl.textContent =`Time Left : ${timeLeft}s`
    timer = setInterval(() =>{
        timeLeft--
        timeEl.textContent = `Time Left : ${timeLeft}s`
        if(timeLeft <= 0){
            clearInterval(timer);
            if(!selectedAnswer){
                loadNextQuestion();
            }

        }
    }, 1000)
}

function showResults(){
    const quizEl = document.getElementById('Quiz')
    quizEl.classList.add("hide")
    resultsEl.classList.remove("hide")
    scoreEl.textContent =`${score} / ${quizData.length}`
}


