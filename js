// ==========================================
// QUIZ DO NEYMAR JR. - LÓGICA EM JAVASCRIPT
// ==========================================

// 1. Array com as perguntas, opções e o índice da resposta correta
const questions = [
  {
    question: "Em qual clube Neymar iniciou sua carreira profissional de futebol?",
    options: ["Barcelona", "Santos FC", "Paris Saint-Germain", "Palmeiras"],
    answer: 1 // Resposta correta: Santos FC
  },
  {
    question: "Em que ano Neymar conquistou a UEFA Champions League pelo Barcelona?",
    options: ["2011", "2013", "2015", "2017"],
    answer: 2 // Resposta correta: 2015
  },
  {
    question: "Qual foi o valor recorde de sua transferência do Barcelona para o PSG em 2017?",
    options: ["180 milhões de €", "222 milhões de €", "100 milhões de €", "250 milhões de €"],
    answer: 1 // Resposta correta: 222 milhões de €
  },
  {
    question: "Qual título inédito Neymar conquistou com a Seleção Brasileira em 2016 no Maracanã?",
    options: ["Copa do Mundo", "Copa América", "Ouro Olímpico", "Copa das Confederações"],
    answer: 2 // Resposta correta: Ouro Olímpico
  },
  {
    question: "Em 2023, para qual clube do futebol árabe Neymar se transferiu?",
    options: ["Al-Nassr", "Al-Ittihad", "Al-Hilal", "Al-Ahli"],
    answer: 2 // Resposta correta: Al-Hilal
  }
];

// 2. Variáveis de controle de estado
let currentQuestionIndex = 0;
let score = 0;
let canAnswer = true;

// 3. Captura dos elementos HTML
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('progress');
const finalScore = document.getElementById('final-score');
const scoreMessage = document.getElementById('score-message');

// 4. Eventos dos botões (Início e Reinício)
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);

// 5. Função para iniciar ou reiniciar o Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  startScreen.classList.remove('active');
  endScreen.classList.remove('active');
  quizScreen.classList.add('active');
  showQuestion();
}

// 6. Função para renderizar a pergunta atual
function showQuestion() {
  canAnswer = true;
  const q = questions[currentQuestionIndex];
  
  progressText.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
  questionText.innerText = q.question;
  optionsContainer.innerHTML = '';

  q.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('option-btn');
    button.addEventListener('click', () => selectOption(index, button));
    optionsContainer.appendChild(button);
  });
}

// 7. Função para validar a resposta do usuário
function selectOption(selectedIndex, selectedButton) {
  if (!canAnswer) return;
  canAnswer = false;

  const correctIndex = questions[currentQuestionIndex].answer;
  const buttons = optionsContainer.querySelectorAll('.option-btn');

  // Verifica se acertou ou errou e aplica o estilo CSS correspondente
  if (selectedIndex === correctIndex) {
    score++;
    selectedButton.classList.add('correct');
  } else {
    selectedButton.classList.add('wrong');
    buttons[correctIndex].classList.add('correct'); // Mostra qual era a correta
  }

  // Transição com atraso de 1.2s para próxima pergunta ou tela final
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showEndScreen();
    }
  }, 1200);
}

// 8. Função para exibir o resultado final
function showEndScreen() {
  quizScreen.classList.remove('active');
  endScreen.classList.add('active');
  finalScore.innerText = `${score} / ${questions.length}`;

  if (score === questions.length) {
    scoreMessage.innerText = "Perfeito! Você é um verdadeiro especialista na carreira do Neymar.";
  } else if (score >= 3) {
    scoreMessage.innerText = "Muito bom! Você conhece bem os momentos marcantes do craque.";
  } else {
    scoreMessage.innerText = "Vale a pena revisar a história do camisa 10 e tentar novamente!";
  }
}