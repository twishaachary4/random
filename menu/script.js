const mealData = {
  breakfast: {
    type: "BREAKFAST",
    title: "Green Garden Toast",
    intro: "A bright, creamy toast with avocado, herby cottage cheese, cucumber and lemony crunch.",
    time: "15 min",
    serves: "2 servings",
    ingredients: [
      "2 slices sourdough or whole-grain bread",
      "1 ripe avocado",
      "½ cup cottage cheese",
      "½ cucumber, thinly sliced",
      "1 tsp lemon juice",
      "1 tbsp pumpkin or sunflower seeds",
      "1 tsp olive oil",
      "Salt and black pepper",
      "Chilli flakes",
      "Fresh mint or coriander"
    ],
    steps: [
      "Toast the bread until golden and crisp.",
      "Mash the avocado with lemon juice, salt and black pepper.",
      "Spread cottage cheese over each toast.",
      "Add the mashed avocado and cucumber slices.",
      "Finish with olive oil, seeds, herbs and chilli flakes."
    ]
  },

  brunch: {
    type: "BRUNCH",
    title: "Olive Herb Shakshuka",
    intro: "Eggs gently cooked in a rich tomato and pepper sauce with olives and herbs.",
    time: "30 min",
    serves: "2 servings",
    ingredients: [
      "4 eggs",
      "1 tbsp olive oil",
      "1 small onion, diced",
      "1 red bell pepper, diced",
      "2 garlic cloves, minced",
      "400 g canned chopped tomatoes",
      "¼ tsp cumin",
      "½ tsp smoked paprika",
      "¼ cup sliced green olives",
      "Fresh coriander or parsley",
      "Salt and black pepper",
      "Chilli flakes",
      "Warm bread"
    ],
    steps: [
      "Heat olive oil in a deep skillet.",
      "Cook onion and pepper for 5–7 minutes.",
      "Add garlic, cumin and paprika.",
      "Add tomatoes and simmer for 8–10 minutes.",
      "Stir in the olives.",
      "Make four wells and crack an egg into each.",
      "Cover and cook until the eggs are set.",
      "Finish with fresh herbs and serve with warm bread."
    ]
  },

  lunch: {
    type: "LUNCH",
    title: "Golden Green Bowl",
    intro: "A colourful bowl of roasted vegetables, chickpeas and rice with creamy tahini-lime dressing.",
    time: "35 min",
    serves: "2 servings",
    ingredients: [
      "1 cup cooked rice or quinoa",
      "1 cup cooked chickpeas",
      "1 small zucchini",
      "1 carrot",
      "1 cup broccoli",
      "1 tbsp olive oil",
      "½ tsp turmeric",
      "½ tsp cumin",
      "2 tbsp tahini",
      "1 tbsp lime juice",
      "1–2 tbsp water",
      "Fresh coriander",
      "Pumpkin seeds"
    ],
    steps: [
      "Heat the oven to 220°C.",
      "Chop the zucchini, carrot and broccoli.",
      "Toss vegetables with olive oil, turmeric, cumin, salt and pepper.",
      "Roast for 20–25 minutes.",
      "Warm the chickpeas in a pan.",
      "Mix tahini, lime juice, salt and water to make the dressing.",
      "Add rice, vegetables and chickpeas to a bowl.",
      "Drizzle with tahini dressing and finish with herbs and seeds."
    ]
  },

  dinner: {
    type: "DINNER",
    title: "Creamy Pesto Pasta",
    intro: "Silky basil pesto pasta with spinach and peas — comforting but fresh.",
    time: "25 min",
    serves: "2 servings",
    ingredients: [
      "180 g pasta",
      "1 tbsp olive oil",
      "2 garlic cloves",
      "2 cups baby spinach",
      "½ cup green peas",
      "3 tbsp basil pesto",
      "¼ cup pasta water",
      "¼ cup grated parmesan",
      "Black pepper",
      "Lemon zest",
      "Fresh basil"
    ],
    steps: [
      "Cook the pasta according to the packet instructions.",
      "Save ¼ cup of pasta water before draining.",
      "Heat olive oil and gently cook the garlic.",
      "Add spinach and peas.",
      "Add the cooked pasta and pesto.",
      "Slowly add pasta water while mixing.",
      "Add parmesan and lemon zest.",
      "Finish with black pepper and fresh basil."
    ]
  }
};


let currentStep = 1;

let answers = {
  meal: "",
  veggies: "",
  taste: "",
  feeling: ""
};


const questions = document.querySelectorAll(".question");
const progressBars = document.querySelectorAll(".progress span");
const stepCounter = document.querySelector(".step-counter");


/* OPTION SELECTION */

document.querySelectorAll(".options button").forEach(button => {

  button.addEventListener("click", () => {

    const question = button.closest(".question");

    question
      .querySelectorAll("button")
      .forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");

    const step = Number(question.dataset.step);

    const keys = [
      "meal",
      "veggies",
      "taste",
      "feeling"
    ];

    const key = keys[step - 1];

    answers[key] = button.dataset.value;

  });

});


/* UPDATE QUESTION */

function updatePlanner() {

  questions.forEach(question => {

    question.classList.toggle(
      "active-question",
      Number(question.dataset.step) === currentStep
    );

  });


  progressBars.forEach((bar, index) => {

    bar.classList.toggle(
      "active",
      index < currentStep
    );

  });


  stepCounter.textContent = `${currentStep} of 4`;


  document.querySelector(".back-btn").style.visibility =
    currentStep === 1 ? "hidden" : "visible";


  document.querySelector(".next-btn").textContent =
    currentStep === 4
      ? "Find my meal ✦"
      : "Next →";

}


/* NEXT */

function nextStep() {

  const keys = [
    "meal",
    "veggies",
    "taste",
    "feeling"
  ];

  const key = keys[currentStep - 1];


  if (!answers[key]) {

    alert("Pick an option first 🌿");

    return;

  }


  if (currentStep < 4) {

    currentStep++;

    updatePlanner();

  } else {

    showResult();

  }

}


/* BACK */

function previousStep() {

  if (currentStep > 1) {

    currentStep--;

    updatePlanner();

  }

}


/* CHOOSE MEAL */

function chooseMeal() {

  return answers.meal || "lunch";

}


/* SHOW RESULT */

function showResult() {

  const meal = chooseMeal();

  const data = mealData[meal];


  document.getElementById("resultTitle").textContent =
    data.title;


  document.getElementById("resultDescription").textContent =
    buildDescription(meal);


  document.getElementById("resultTime").textContent =
    `⏱ ${data.time}`;


  document.getElementById("resultTag").textContent =
    `🌿 ${prettyFeeling(answers.feeling)}`;


  document.getElementById("recipeButton").onclick =
    () => openRecipe(meal);


  document
    .getElementById("result")
    .classList.remove("hidden");


  document
    .getElementById("result")
    .scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

}


/* DESCRIPTION */

function buildDescription(meal) {

  const veggieText = {

    leafy: "with plenty of leafy greens",

    roasted: "with cosy roasted vegetables",

    crunchy: "with fresh crunchy vegetables",

    mixed: "packed with a lovely mix of vegetables"

  };


  const tasteText = {

    creamy: "and a creamy cosy finish",

    fresh: "and a bright zesty finish",

    spicy: "with a gentle spicy kick",

    savory: "with deep savoury flavour"

  };


  return `${mealData[meal].intro} It's
  ${veggieText[answers.veggies] || "made with good things"}
  ${tasteText[answers.taste] || "and full of flavour"}.`;

}


/* FEELING */

function prettyFeeling(value) {

  const labels = {

    healthy: "nourishing",

    comfort: "comforting",

    quick: "quick & easy",

    balanced: "balanced"

  };


  return labels[value] || "your vibe";

}


/* OPEN RECIPE */

function openRecipe(meal) {

  const data = mealData[meal];


  document.getElementById("recipeMealType").textContent =
    data.type;


  document.getElementById("recipeTitle").textContent =
    data.title;


  document.getElementById("recipeIntro").textContent =
    data.intro;


  document.getElementById("recipeTime").textContent =
    `⏱ ${data.time}`;


  document.getElementById("recipeServes").textContent =
    `◉ ${data.serves}`;


  document.getElementById("ingredients").innerHTML =
    data.ingredients
      .map(item => `<li>${item}</li>`)
      .join("");


  document.getElementById("steps").innerHTML =
    data.steps
      .map(item => `<li>${item}</li>`)
      .join("");


  document
    .getElementById("recipeModal")
    .classList.remove("hidden");


  document.body.style.overflow = "hidden";

}


/* CLOSE RECIPE */

function closeRecipe() {

  document
    .getElementById("recipeModal")
    .classList.add("hidden");


  document.body.style.overflow = "";

}


/* RESTART */

function restartPlanner() {

  currentStep = 1;


  answers = {

    meal: "",
    veggies: "",
    taste: "",
    feeling: ""

  };


  document
    .querySelectorAll(".options button")
    .forEach(button =>
      button.classList.remove("selected")
    );


  document
    .getElementById("result")
    .classList.add("hidden");


  updatePlanner();


  document
    .getElementById("planner")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* SCROLL TO PLANNER */

function scrollToPlanner() {

  document
    .getElementById("planner")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* ESCAPE KEY */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeRecipe();

  }

});


/* START */

updatePlanner();