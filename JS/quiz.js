const questions = [
  {
    question: "Who was named as the 'Princess of Pop'?",
    options: ["Britney Spears", "Dua Lipa", "Katy Perry", "Taylor Swift"],
    answer: 1
  },
  {
    question: "What is the name of Harry Styles' 2nd Album?",
    options: ["Encore", "One Of The Boys", "Fine Line", "Daydream"],
    answer: 3
  },
  {
    question:"Which list of artists belong to the same decade?",
    options: ["Harry Styles, Mariah Carrey, Linkin Park, Marron 5","One Direction, Harry Styles, The Weeknd, Taylor Swift", "Eminem, Rhianna, Britney Spears, Boys II Men", "Ed Sheeran, Dua Lipa, Backstreet Boys, Beyonce"],
    answer: 2 
  },
  {
    question:"What is the name of One Direction's album that featured their hit song 'Story Of My Life'?",
    options: ["1989", "Midnight Memories","Nevermind","Millenium"],
    answer: 2 
  },
  {
    question:"Which one of these albums are by The Weeknd?",
    options: ["Songs About Jane", "Daydream","After Hours","Up All Night"],
    answer: 3 
  },
  {
    question:"What is the name of Rhianna's hit song?",
    options: ["I Kissed Girl", "Fantasy","Umbrella","Mockingbird"],
    answer: 3  
  },
  {
    question:"Which song became a 'cultural phenomenon' for it's iconic dance routine?",
    options: ["I Want It That Way", "Shape Of You","This Love","Single Ladies"],
    answer: 4
  },
  {
    question:"What was the name of the album that featured Nirvana's 'Smells Like Teen Spirit'?",
    options: ["Nevermind", "Reputation","Millenium","Stayboy"],
    answer: 1  
  },
  {
    question:"Which two of these albums are by Taylor Swift?",
    options: ["Fine Line, Encore", "1989, Reputation","Daydream, One of the Boys","Future Nostalgia, Songs About Jane"],
    answer: 2 
  },
  {
    question:"Who performs 'Mockingbird'?",
    options: ["Linkin Park", "Ed Sheeran","Eminem","Dr Dre"],
    answer: 3  
  },

  
];


const boxes = document.getElementsByClassName('box');
let currentQuestionIndex = 0;
let qnum = currentQuestionIndex + 1;
let userAnswers = [];
let secondsRemaining = 300; // Countdown
let countdownInterval;

function handleBoxClick() {
  if (userAnswers[currentQuestionIndex] !== undefined) {
    return;
  }

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].classList.remove('selected');
  }

  this.classList.add('selected');

  const selectedBoxIndex = Array.prototype.indexOf.call(boxes, this);
  userAnswers[currentQuestionIndex] = selectedBoxIndex + 1;

  const { answer } = questions[currentQuestionIndex];
  if (selectedBoxIndex + 1 === answer) {
    this.classList.add('correct');
  } else {
    this.classList.add('incorrect');

    // Highlight the correct answer
    boxes[answer - 1].classList.add('correct');
  }

  calculateScore();
}

function updateQuestion() {
  const { question, options } = questions[currentQuestionIndex];
  qnum = currentQuestionIndex + 1;

  document.getElementById('questionNumber').textContent = `Question ${qnum} / ${questions.length}`;
  document.getElementById('questionText').textContent = question;

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const optionElement = document.createElement('div');
    optionElement.className = 'box';
    optionElement.textContent = option;
    optionsContainer.appendChild(optionElement);
  }

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].classList.remove('selected');
    boxes[i].classList.remove('correct');
    boxes[i].classList.remove('incorrect');

    if (userAnswers[currentQuestionIndex] === i + 1) {
      boxes[i].classList.add('selected');

      const { answer } = questions[currentQuestionIndex];
      if (userAnswers[currentQuestionIndex] === answer) {
        boxes[i].classList.add('correct');
      } else {
        boxes[i].classList.add('incorrect');
      }
    }

    boxes[i].addEventListener('click', handleBoxClick);
  }
}

function handlePreviousClick() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    updateQuestion();
  }
}

function handleNextClick() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    updateQuestion();
  } else {
    clearInterval(countdownInterval);
    displaySummary();
  }
}

function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

function displaySummary() {


  const summarymainContainer = document.getElementById('summaryModal');
  summarymainContainer.style.display = 'block';

  const summaryContainer = document.getElementById('summary');
  summaryContainer.innerHTML = '';

  const score = calculateScore();
  const totalQuestions = questions.length;

  const percentageScore = (score / totalQuestions) * 100;

  let message = '';
  let colorClass = '';
  if (percentageScore >= 70) {
    message = 'Amazing job! You know your decades!';
    colorClass = 'good-performance';
  } else if (percentageScore >= 40) {
    message = 'Good Job! Maybe a another trip down the decades will help you score better!.';
    colorClass = 'ok-performance';
  } else {
    message = 'Oh no! You need to know your decades better, but that was a good try!';
    colorClass = 'bad-performance';
  }

  const messageText = document.createElement('p');
  messageText.textContent = message;
  messageText.classList.add(colorClass);


  const scoreText = document.createElement('p');
  scoreText.textContent = `Your Score: ${score}/${totalQuestions}`;

  summaryContainer.appendChild(messageText);
  summaryContainer.appendChild(scoreText);

  const summaryText = document.createElement('p');
  summaryText.textContent = "Summary: ";
  summaryContainer.appendChild(summaryText);


  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const userAnswer = userAnswers[i];
    const questionSummary = document.createElement('p');

    questionSummary.textContent = `Question ${i + 1}: ${
      userAnswer === question.answer ? 'Correct' : 'Incorrect'
    }`;

    summaryContainer.appendChild(questionSummary);
  }

  const modal = document.getElementById('summaryModal');
  modal.style.display = 'block';

  const closeBtn = document.querySelector('.modal .close');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

function startCountdown() {
  const countdownDisplay = document.getElementById('countdown');

  function updateCountdown() {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
  
    countdownDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    secondsRemaining--;
  
    if (secondsRemaining < 0) {
      clearInterval(countdownInterval);
      handleNextClick();
    }
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

const previousBtn = document.getElementById('previousBtn');
const nextBtn = document.getElementById('nextBtn');

previousBtn.addEventListener('click', handlePreviousClick);
nextBtn.addEventListener('click', handleNextClick);

updateQuestion();
startCountdown();

