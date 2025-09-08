// 英語問題リスト（追加入力可能）
const questions = [
  // 単語問題
  { q: "「apple」の意味は？", a: "りんご" },
  { q: "「study」の意味は？", a: "勉強する" },
  { q: "「beautiful」の意味は？", a: "美しい" },
  { q: "「difficult」の意味は？", a: "難しい" },
  { q: "「quickly」の意味は？", a: "速く" },

  // 英文和訳
  { q: "I like soccer. の意味は？", a: "私はサッカーが好きです" },
  { q: "She is reading a book. の意味は？", a: "彼女は本を読んでいます" },
  { q: "This is my bag. の意味は？", a: "これは私のかばんです" },
  { q: "We went to Kyoto yesterday. の意味は？", a: "私たちは昨日京都へ行きました" },
  { q: "Can you speak English? の意味は？", a: "あなたは英語を話せますか" },

  // 日本語→英語
  { q: "「私は毎日英語を勉強します」を英語に訳せ。", a: "I study English every day." },
  { q: "「彼は先生です」を英語に訳せ。", a: "He is a teacher." },
  { q: "「私たちは図書館に行きました」を英語に訳せ。", a: "We went to the library." },
  { q: "「これはペンです」を英語に訳せ。", a: "This is a pen." },
  { q: "「彼女はピアノを弾きます」を英語に訳せ。", a: "She plays the piano." },
];

let wrongList = []; // 間違った問題を保存
let currentQuestion = null;
let score = { correct: 0, wrong: 0 };

const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const scoreBox = document.getElementById("score");
const submitBtn = document.getElementById("submitBtn");

// ランダムで次の問題を選ぶ
function getNextQuestion() {
  let pool = [...questions];
  if (wrongList.length > 0 && Math.random() < 0.3) {
    pool = wrongList; // 時々間違いリストから出題
  }
  currentQuestion = pool[Math.floor(Math.random() * pool.length)];
  questionText.textContent = currentQuestion.q;
  answerInput.value = "";
  feedback.textContent = "";
}

// 回答チェック
function checkAnswer() {
  const userAnswer = answerInput.value.trim();
  if (!currentQuestion) return;

  if (userAnswer === currentQuestion.a) {
    feedback.textContent = "⭕ 正解！";
    feedback.style.color = "green";
    score.correct++;
    // 正解したら間違いリストから削除
    wrongList = wrongList.filter(q => q.q !== currentQuestion.q);
  } else {
    feedback.textContent = `❌ 不正解！ 正解は「${currentQuestion.a}」`;
    feedback.style.color = "red";
    score.wrong++;
    // 間違いリストに追加
    if (!wrongList.find(q => q.q === currentQuestion.q)) {
      wrongList.push(currentQuestion);
    }
  }
  updateScore();
  setTimeout(getNextQuestion, 1500);
}

// スコア更新
function updateScore() {
  scoreBox.textContent = `正解数: ${score.correct} | 不正解数: ${score.wrong}`;
}

// イベント設定
submitBtn.addEventListener("click", checkAnswer);
answerInput.addEventListener("keypress", e => {
  if (e.key === "Enter") checkAnswer();
});

// 最初の問題表示
getNextQuestion();
