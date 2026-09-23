// Tier-Lernwelt: Kartenfilter und Quiz funktionieren vollständig ohne Backend.

const animals = [
  { name: "Löwe", emoji: "🦁", habitat: "Savanne", description: "Löwen leben in Familien und sind die Könige der Savanne.", tone: "tone-yellow" },
  { name: "Elefant", emoji: "🐘", habitat: "Savanne", description: "Elefanten sind die größten Landtiere und lieben ihre Herde.", tone: "tone-green" },
  { name: "Pinguin", emoji: "🐧", habitat: "Küste", description: "Pinguine können nicht fliegen, schwimmen aber wunderbar.", tone: "tone-blue" },
  { name: "Delfin", emoji: "🐬", habitat: "Meer", description: "Delfine sind kluge Meeressäuger und leben gern in Gruppen.", tone: "tone-blue" },
  { name: "Giraffe", emoji: "🦒", habitat: "Savanne", description: "Mit ihrem langen Hals erreichen Giraffen Blätter hoch oben.", tone: "tone-yellow" },
  { name: "Frosch", emoji: "🐸", habitat: "Teich", description: "Frösche mögen feuchte Orte und können weit hüpfen.", tone: "tone-green" },
  { name: "Tiger", emoji: "🐯", habitat: "Wald", description: "Tiger sind starke Einzelgänger mit einem tollen Streifenfell.", tone: "tone-coral" },
  { name: "Papagei", emoji: "🦜", habitat: "Regenwald", description: "Papageien sind sehr schlau und können Geräusche nachmachen.", tone: "tone-green" },
  { name: "Biene", emoji: "🐝", habitat: "Wiese", description: "Bienen bestäuben Blumen und leben gemeinsam in einem Volk.", tone: "tone-yellow" }
];

const questions = [
  { text: "Welche dieser Tiere lebt normalerweise im Wasser?", answers: ["🐬 Delfin", "🦁 Löwe", "🦒 Giraffe", "🐝 Biene"], correct: 0 },
  { text: "Welches Tier ist das größte Landtier?", answers: ["🐸 Frosch", "🐘 Elefant", "🐧 Pinguin", "🐝 Biene"], correct: 1 },
  { text: "Welches Tier bestäubt viele Pflanzen?", answers: ["🐯 Tiger", "🦁 Löwe", "🐝 Biene", "🐬 Delfin"], correct: 2 }
];

const $ = (id) => document.getElementById(id);

function renderAnimals(list) {
  $("animalGrid").innerHTML = list.map((animal) => `
    <article class="animal-card">
      <div class="animal-visual ${animal.tone}" aria-hidden="true">${animal.emoji}</div>
      <h3>${animal.name}</h3>
      <p>${animal.description}</p>
      <span class="habitat">📍 ${animal.habitat}</span>
    </article>
  `).join("");
  $("noResults").classList.toggle("hidden", list.length > 0);
}

$("searchInput").addEventListener("input", (event) => {
  const term = event.target.value.toLocaleLowerCase("de-DE").trim();
  renderAnimals(animals.filter((animal) => `${animal.name} ${animal.habitat} ${animal.description}`.toLocaleLowerCase("de-DE").includes(term)));
});

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
  const question = questions[currentQuestion];
  $("progressText").textContent = `Frage ${currentQuestion + 1} von ${questions.length}`;
  $("progressBar").style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  $("question").textContent = question.text;
  $("answers").innerHTML = "";
  $("quizResult").textContent = "";
  $("nextButton").classList.add("hidden");
  answered = false;

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(button, index));
    $("answers").appendChild(button);
  });
}

function checkAnswer(selectedButton, selectedIndex) {
  if (answered) return;
  answered = true;
  const correctIndex = questions[currentQuestion].correct;
  const buttons = [...document.querySelectorAll(".answer")];
  buttons.forEach((button) => { button.disabled = true; });
  buttons[correctIndex].classList.add("correct");

  if (selectedIndex === correctIndex) {
    score += 1;
    $("quizResult").textContent = "🎉 Richtig! Super gemacht!";
  } else {
    selectedButton.classList.add("wrong");
    $("quizResult").textContent = "🙂 Fast! Die richtige Antwort ist grün markiert.";
  }
  $("nextButton").classList.remove("hidden");
}

function showFinalResult() {
  $("progressText").textContent = "Quiz geschafft!";
  $("progressBar").style.width = "100%";
  $("question").textContent = "🌟 Das hast du toll gemacht!";
  $("answers").innerHTML = "";
  $("quizResult").textContent = `Du hast ${score} von ${questions.length} Fragen richtig! 🌟`;
  $("nextButton").textContent = "🔄 Quiz erneut starten";
  $("nextButton").classList.remove("hidden");
  $("nextButton").onclick = restartQuiz;
}

function nextQuestion() {
  currentQuestion += 1;
  if (currentQuestion >= questions.length) showFinalResult();
  else showQuestion();
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  $("nextButton").textContent = "Nächste Frage →";
  $("nextButton").onclick = nextQuestion;
  showQuestion();
}

$("nextButton").addEventListener("click", nextQuestion);
renderAnimals(animals);
showQuestion();
