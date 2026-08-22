// ==============================
// あなたのいいところ診断
// ==============================

const questions = [
  {
    question: "友達から相談されたら？",
    answers: [
      { text: "最後まで話を聞く", type: "kind" },
      { text: "解決方法を一緒に考える", type: "action" },
      { text: "楽しく励ます", type: "bright" },
      { text: "相手が自分で考えられるように見守る", type: "serious" }
    ]
  },
  {
    question: "グループ活動では？",
    answers: [
      { text: "みんなの意見をまとめる", type: "kind" },
      { text: "積極的にアイデアを出す", type: "action" },
      { text: "場を盛り上げる", type: "bright" },
      { text: "自分の役割をしっかり行う", type: "serious" }
    ]
  },
  {
    question: "新しいことを始めるときは？",
    answers: [
      { text: "周りの人と相談してから始める", type: "kind" },
      { text: "まずはやってみる", type: "action" },
      { text: "楽しそうなら挑戦する", type: "bright" },
      { text: "しっかり調べてから始める", type: "serious" }
    ]
  },
  {
    question: "失敗してしまったときは？",
    answers: [
      { text: "誰かに相談して気持ちを整理する", type: "kind" },
      { text: "次は成功するように工夫する", type: "action" },
      { text: "気持ちを切り替えて前向きになる", type: "bright" },
      { text: "失敗した原因をじっくり考える", type: "serious" }
    ]
  },
  {
    question: "あなたに一番近いと思うのは？",
    answers: [
      { text: "人の気持ちを大切にする", type: "kind" },
      { text: "思い立ったら行動する", type: "action" },
      { text: "いつも楽しく過ごしたい", type: "bright" },
      { text: "何事にも真面目に取り組む", type: "serious" }
    ]
  }
];

// 診断結果
const results = {
  kind: {
    title: "優しさ",
    icon: "🌷",
    description:
      "あなたの一番の魅力は「優しさ」です。相手の気持ちを考えて行動できるあなたは、周りの人から安心して頼られる存在です。"
  },

  action: {
    title: "行動力",
    icon: "🚀",
    description:
      "あなたの一番の魅力は「行動力」です。迷ったときにも一歩踏み出せるあなたは、新しい可能性を切り開いていける人です。"
  },

  bright: {
    title: "明るさ",
    icon: "☀️",
    description:
      "あなたの一番の魅力は「明るさ」です。あなたの笑顔や前向きな姿勢は、周りの人まで明るい気持ちにしてくれます。"
  },

  serious: {
    title: "真面目さ",
    icon: "📚",
    description:
      "あなたの一番の魅力は「真面目さ」です。責任感が強く、最後まで努力できるあなたは、周りから信頼される存在です。"
  }
};

let currentQuestion = 0;

let scores = {
  kind: 0,
  action: 0,
  bright: 0,
  serious: 0
};

// HTML要素を取得
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const retryButton = document.getElementById("retry-btn");

const questionNumber =
  document.getElementById("question-number");

const progressPercent =
  document.getElementById("progress-percent");

const progressBar =
  document.getElementById("progress-bar");

const questionText =
  document.getElementById("question-text");

const answersContainer =
  document.getElementById("answers");

const resultIcon =
  document.getElementById("result-icon");

const resultTitle =
  document.getElementById("result-title");

const resultDescription =
  document.getElementById("result-description");

// ==============================
// 画面切り替え
// ==============================

function showScreen(screen) {
  startScreen.classList.remove("active");
  quizScreen.classList.remove("active");
  resultScreen.classList.remove("active");

  screen.classList.add("active");
}

// ==============================
// 診断開始
// ==============================

startButton.addEventListener("click", () => {
  currentQuestion = 0;

  scores = {
    kind: 0,
    action: 0,
    bright: 0,
    serious: 0
  };

  showScreen(quizScreen);
  displayQuestion();
});

// ==============================
// 質問を表示
// ==============================

function displayQuestion() {
  const current = questions[currentQuestion];

  const questionCount = currentQuestion + 1;
  const progress =
    Math.round((questionCount / questions.length) * 100);

  questionNumber.textContent =
    `QUESTION ${questionCount} / ${questions.length}`;

  progressPercent.textContent = `${progress}%`;

  progressBar.style.width = `${progress}%`;

  questionText.textContent = current.question;

  answersContainer.innerHTML = "";

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer-btn";

    button.innerHTML = `
      <span class="answer-number">${index + 1}</span>
      ${answer.text}
    `;

    button.addEventListener("click", () => {
      selectAnswer(answer.type);
    });

    answersContainer.appendChild(button);
  });
}

// ==============================
// 回答処理
// ==============================

function selectAnswer(type) {
  scores[type]++;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    displayResult();
  }
}

// ==============================
// 結果を表示
// ==============================

function displayResult() {
  const resultType = getResultType();
  const result = results[resultType];

  resultIcon.textContent = result.icon;
  resultTitle.textContent = result.title;
  resultDescription.textContent = result.description;

  showScreen(resultScreen);
}

// ==============================
// 一番得点が高いタイプを取得
// ==============================

function getResultType() {
  let highestType = "kind";
  let highestScore = scores.kind;

  Object.keys(scores).forEach((type) => {
    if (scores[type] > highestScore) {
      highestScore = scores[type];
      highestType = type;
    }
  });

  return highestType;
}

// ==============================
// もう一度診断
// ==============================

retryButton.addEventListener("click", () => {
  currentQuestion = 0;

  scores = {
    kind: 0,
    action: 0,
    bright: 0,
    serious: 0
  };

  showScreen(startScreen);
});
