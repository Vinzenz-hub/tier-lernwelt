/* =========================================
   TIERDATEN
========================================= */

const animals = [

  {
    name: "Löwe",
    emoji: "🦁",
    habitat: "Savanne",
    description:
      "Löwen leben in Afrika und gehören zu den größten Großkatzen."
  },

  {
    name: "Elefant",
    emoji: "🐘",
    habitat: "Savanne",
    description:
      "Elefanten sind die größten lebenden Landtiere der Erde."
  },

  {
    name: "Pinguin",
    emoji: "🐧",
    habitat: "Küste",
    description:
      "Pinguine können nicht fliegen, sind aber hervorragende Schwimmer."
  },

  {
    name: "Delfin",
    emoji: "🐬",
    habitat: "Meer",
    description:
      "Delfine sind intelligente Meeressäuger und leben häufig in Gruppen."
  },

  {
    name: "Giraffe",
    emoji: "🦒",
    habitat: "Savanne",
    description:
      "Mit ihrem langen Hals können Giraffen Blätter hoch oben in Bäumen erreichen."
  },

  {
    name: "Frosch",
    emoji: "🐸",
    habitat: "Teich",
    description:
      "Frösche leben häufig in der Nähe von Wasser und können weit springen."
  },

  {
    name: "Tiger",
    emoji: "🐯",
    habitat: "Wald",
    description:
      "Tiger sind Einzelgänger und die größten lebenden Katzen."
  },

  {
    name: "Papagei",
    emoji: "🦜",
    habitat: "Regenwald",
    description:
      "Papageien sind sehr intelligente Vögel und besitzen kräftige Schnäbel."
  },

  {
    name: "Biene",
    emoji: "🐝",
    habitat: "Wiese",
    description:
      "Bienen bestäuben Pflanzen und leben meistens in einem Bienenvolk."
  }

];


/* =========================================
   TIERKARTEN ANZEIGEN
========================================= */

const animalGrid =
  document.getElementById("animalGrid");

const searchInput =
  document.getElementById("searchInput");

const noResults =
  document.getElementById("noResults");


function displayAnimals(list) {

  animalGrid.innerHTML = "";

  if (list.length === 0) {

    noResults.classList.remove("hidden");

    return;
  }

  noResults.classList.add("hidden");


  list.forEach(animal => {

    const card =
      document.createElement("article");

    card.className = "animal-card";

    card.innerHTML = `

      <div class="animal-image">
        ${animal.emoji}
      </div>

      <h3>
        ${animal.name}
      </h3>

      <p>
        ${animal.description}
      </p>

      <span class="habitat">
        📍 ${animal.habitat}
      </span>

    `;

    animalGrid.appendChild(card);

  });

}


/* Erste Anzeige */

displayAnimals(animals);


/* =========================================
   SUCHFUNKTION
========================================= */

searchInput.addEventListener(
  "input",
  function () {

    const search =
      searchInput.value
        .toLowerCase()
        .trim();

    const filtered =
      animals.filter(animal => {

        return (

          animal.name
            .toLowerCase()
            .includes(search)

          ||

          animal.habitat
            .toLowerCase()
            .includes(search)

          ||

          animal.description
            .toLowerCase()
            .includes(search)

        );

      });

    displayAnimals(filtered);

  }
);


/* =========================================
   QUIZ
========================================= */

const questions = [

  {
    question:
      "Welches dieser Tiere lebt normalerweise im Wasser?",

    answers: [
      "🐬 Delfin",
      "🦁 Löwe",
      "🦒 Giraffe",
      "🐝 Biene"
    ],

    correct: 0
  },

  {
    question:
      "Welches Tier ist das größte Landtier?",

    answers: [
      "🐸 Frosch",
      "🐘 Elefant",
      "🐧 Pinguin",
      "🐝 Biene"
    ],

    correct: 1
  },

  {
    question:
      "Welches Tier bestäubt viele Pflanzen?",

    answers: [
      "🐯 Tiger",
      "🦁 Löwe",
      "🐝 Biene",
      "🐬 Delfin"
    ],

    correct: 2
  },

  {
    question:
      "Welches Tier hat einen besonders langen Hals?",

    answers: [
      "🐸 Frosch",
      "🐧 Pinguin",
      "🦒 Giraffe",
      "🐝 Biene"
    ],

    correct: 2
  },

  {
    question:
      "Welches dieser Tiere kann nicht fliegen?",

    answers: [
      "🦜 Papagei",
      "🐧 Pinguin",
      "🐝 Biene",
      "🦋 Schmetterling"
    ],

    correct: 1
  }

];


let currentQuestion = 0;

let score = 0;

let questionAnswered = false;


const questionElement =
  document.getElementById("question");

const answersElement =
  document.getElementById("answers");

const resultElement =
  document.getElementById("quizResult");

const nextButton =
  document.getElementById("nextButton");


/* =========================================
   FRAGE ANZEIGEN
========================================= */

function showQuestion() {

  const question =
    questions[currentQuestion];

  questionElement.textContent =
    question.question;

  answersElement.innerHTML = "";

  resultElement.textContent = "";

  nextButton.classList.add("hidden");

  questionAnswered = false;


  question.answers.forEach(
    (answer, index) => {

      const button =
        document.createElement("button");

      button.className = "answer";

      button.textContent = answer;

      button.dataset.index = index;

      button.addEventListener(
        "click",
        checkAnswer
      );

      answersElement.appendChild(button);

    }
  );

}


/* =========================================
   ANTWORT PRÜFEN
========================================= */

function checkAnswer(event) {

  if (questionAnswered) {
    return;
  }

  questionAnswered = true;


  const selected =
    Number(event.target.dataset.index);

  const correct =
    questions[currentQuestion].correct;


  const buttons =
    document.querySelectorAll(".answer");


  buttons.forEach(button => {

    button.disabled = true;

  });


  if (selected === correct) {

    event.target.classList.add("correct");

    resultElement.textContent =
      "🎉 Richtig! Super gemacht!";

    score++;

  } else {

    event.target.classList.add("wrong");

    buttons[correct]
      .classList.add("correct");

    resultElement.textContent =
      "🙂 Fast! Die richtige Antwort ist grün markiert.";

  }


  nextButton.classList.remove("hidden");

}


/* =========================================
   NÄCHSTE FRAGE
========================================= */

nextButton.addEventListener(
  "click",
  function () {

    currentQuestion++;


    if (
      currentQuestion >=
      questions.length
    ) {

      showFinalResult();

    } else {

      showQuestion();

    }

  }
);


/* =========================================
   ENDRESULTAT
========================================= */

function showFinalResult() {

  questionElement.textContent =
    "🌟 Quiz geschafft!";

  answersElement.innerHTML = "";

  resultElement.textContent =
    `Du hast ${score} von ${questions.length} Fragen richtig beantwortet!`;

  nextButton.textContent =
    "🔄 Nochmal spielen";

  nextButton.classList.remove("hidden");


  nextButton.onclick =
    restartQuiz;

}


/* =========================================
   QUIZ NEUSTARTEN
========================================= */

function restartQuiz() {

  currentQuestion = 0;

  score = 0;

  nextButton.textContent =
    "Nächste Frage →";

  nextButton.onclick = null;

  showQuestion();

}


/* =========================================
   QUIZ STARTEN
========================================= */

showQuestion();
