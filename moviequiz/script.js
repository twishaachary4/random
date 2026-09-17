/* ============================================
   MOVIE DATABASE
   Each movie carries tags the scoring engine
   matches against the user's answers.
   ============================================ */
const MOVIES = [
  { title: "Amélie", year: 2001, emoji: "🥐", genre: "comedy", mood: "cozy", company: "solo", length: "standard", visual: "bright",
    blurb: "A shy Parisian waitress decides to secretly mend the lives of everyone around her, one whimsical scheme at a time." },
  { title: "Paddington 2", year: 2017, emoji: "🧡", genre: "comedy", mood: "cozy", company: "family", length: "quick", visual: "bright",
    blurb: "The politest bear in London lands in prison trying to clear his name — and somehow makes it the coziest place on earth." },
  { title: "The Grand Budapest Hotel", year: 2014, emoji: "🍰", genre: "comedy", mood: "silly", company: "friends", length: "quick", visual: "bold",
    blurb: "A legendary concierge and his loyal lobby boy get tangled in a murder, a stolen painting, and a prison break, all in candy-colored style." },
  { title: "Booksmart", year: 2019, emoji: "🎓", genre: "comedy", mood: "silly", company: "friends", length: "quick", visual: "bright",
    blurb: "Two overachieving best friends try to cram four years of fun into one wild night before graduation." },
  { title: "Everything Everywhere All at Once", year: 2022, emoji: "🥯", genre: "scifi", mood: "deep", company: "friends", length: "epic", visual: "bold",
    blurb: "A laundromat owner discovers she can access the lives of her parallel-universe selves — and has to save all of them at once." },
  { title: "Spirited Away", year: 2001, emoji: "🐉", genre: "fantasy", mood: "cozy", company: "family", length: "standard", visual: "bright",
    blurb: "A girl wanders into a bathhouse for spirits and has to work her way back to her own world, and her own name." },
  { title: "La La Land", year: 2016, emoji: "🌆", genre: "romance", mood: "swept", company: "date", length: "standard", visual: "bold",
    blurb: "A jazz pianist and an aspiring actress fall for each other in Los Angeles, chasing dreams that don't quite leave room for both of them." },
  { title: "Pride & Prejudice", year: 2005, emoji: "🌾", genre: "romance", mood: "swept", company: "date", length: "standard", visual: "classic",
    blurb: "Headstrong Elizabeth Bennet and proud Mr. Darcy slowly, stubbornly, fall in love in the English countryside." },
  { title: "Before Sunrise", year: 1995, emoji: "🚋", genre: "romance", mood: "swept", company: "solo", length: "quick", visual: "classic",
    blurb: "Two strangers meet on a train and spend one night walking and talking through Vienna, knowing it might be all they get." },
  { title: "Parasite", year: 2019, emoji: "🪟", genre: "thriller", mood: "tense", company: "friends", length: "standard", visual: "moody",
    blurb: "A struggling family cons their way into working for a wealthy household, and things spiral somewhere no one saw coming." },
  { title: "Knives Out", year: 2019, emoji: "🔪", genre: "mystery", mood: "tense", company: "friends", length: "standard", visual: "classic",
    blurb: "A wealthy novelist turns up dead, and a detective with a very particular drawl has to untangle a family full of suspects." },
  { title: "Gone Girl", year: 2014, emoji: "🕵️‍♀️", genre: "thriller", mood: "tense", company: "solo", length: "standard", visual: "moody",
    blurb: "A man becomes the prime suspect when his wife vanishes on their anniversary, and nothing about the marriage was what it looked like." },
  { title: "Get Out", year: 2017, emoji: "🌀", genre: "thriller", mood: "tense", company: "friends", length: "quick", visual: "moody",
    blurb: "A young man meets his girlfriend's parents for the first time, and the weekend gets stranger with every polite smile." },
  { title: "Inception", year: 2010, emoji: "🌪️", genre: "scifi", mood: "tense", company: "friends", length: "epic", visual: "moody",
    blurb: "A thief who steals secrets from people's dreams takes on one last job: planting an idea instead of stealing one." },
  { title: "Interstellar", year: 2014, emoji: "🌌", genre: "scifi", mood: "deep", company: "solo", length: "epic", visual: "moody",
    blurb: "A pilot leaves his children behind to search the stars for a new home for humanity, racing against time itself." },
  { title: "Arrival", year: 2016, emoji: "🛸", genre: "scifi", mood: "deep", company: "solo", length: "standard", visual: "moody",
    blurb: "A linguist is recruited to communicate with aliens who've just landed, and learns something that reshapes how she sees time." },
  { title: "Good Will Hunting", year: 1997, emoji: "📐", genre: "drama", mood: "deep", company: "solo", length: "standard", visual: "classic",
    blurb: "A janitor with a genius-level gift for math has to decide whether he's brave enough to use it, and to be truly known." },
  { title: "The Farewell", year: 2019, emoji: "🥟", genre: "drama", mood: "deep", company: "family", length: "quick", visual: "classic",
    blurb: "A family gathers under the pretense of a wedding to say goodbye to their grandmother, who doesn't know she's dying." },
  { title: "Little Women", year: 2019, emoji: "🪡", genre: "drama", mood: "cozy", company: "family", length: "standard", visual: "classic",
    blurb: "Four sisters grow up, chase their ambitions, and hold onto each other through love, loss, and everything in between." },
  { title: "Coco", year: 2017, emoji: "💀", genre: "animation", mood: "cozy", company: "family", length: "quick", visual: "bright",
    blurb: "A boy who dreams of being a musician accidentally crosses into the Land of the Dead to find his great-great-grandfather." },
  { title: "Into the Spider-Verse", year: 2018, emoji: "🕸️", genre: "animation", mood: "silly", company: "friends", length: "quick", visual: "bold",
    blurb: "A new Spider-Man from Brooklyn meets a handful of alternate-universe Spider-people, and has to learn what makes him a hero." },
  { title: "Shaun of the Dead", year: 2004, emoji: "🧟", genre: "comedy", mood: "silly", company: "friends", length: "quick", visual: "bold",
    blurb: "A guy tries to win back his girlfriend, patch things up with his mum, and survive a zombie apocalypse, all in one weekend." },
  { title: "Casablanca", year: 1942, emoji: "🎹", genre: "romance", mood: "swept", company: "date", length: "quick", visual: "classic",
    blurb: "A cynical nightclub owner in wartime Morocco has to choose between the woman he loves and doing the right thing." },
  { title: "Whiplash", year: 2014, emoji: "🥁", genre: "drama", mood: "tense", company: "solo", length: "quick", visual: "moody",
    blurb: "A young drummer pushes himself to the edge under a ferocious instructor who believes greatness requires suffering." },
  { title: "The Princess Bride", year: 1987, emoji: "🗡️", genre: "fantasy", mood: "silly", company: "family", length: "quick", visual: "classic",
    blurb: "A farmhand-turned-pirate has to rescue his true love from an unwanted royal engagement, with pirates, giants, and revenge along the way." },
];

/* ============================================
   QUIZ QUESTIONS
   Each option carries the tag value it scores against.
   ============================================ */
const QUESTIONS = [
  {
    key: "mood",
    title: "What's the mood tonight?",
    options: [
      { label: "Cozy & warm", emoji: "🕯️", value: "cozy" },
      { label: "Thrilling & tense", emoji: "🔦", value: "tense" },
      { label: "Silly & light", emoji: "🎈", value: "silly" },
      { label: "Deep & thought-provoking", emoji: "🌙", value: "deep" },
      { label: "Swept away & romantic", emoji: "🌷", value: "swept" },
    ],
  },
  {
    key: "company",
    title: "Who's on the couch with you?",
    options: [
      { label: "Just me, myself, and I", emoji: "🛋️", value: "solo" },
      { label: "My favorite people", emoji: "🧸", value: "friends" },
      { label: "A date", emoji: "🌹", value: "date" },
      { label: "The whole family", emoji: "🏡", value: "family" },
    ],
  },
  {
    key: "length",
    title: "How much time do you have?",
    options: [
      { label: "Quick one, under 100 minutes", emoji: "⏱️", value: "quick" },
      { label: "Standard, around 2 hours", emoji: "🕰️", value: "standard" },
      { label: "All night, give me an epic", emoji: "🌌", value: "epic" },
    ],
  },
  {
    key: "visual",
    title: "Pick a vibe for the visuals",
    options: [
      { label: "Bright & colorful", emoji: "🌈", value: "bright" },
      { label: "Moody & atmospheric", emoji: "🌫️", value: "moody" },
      { label: "Classic & timeless", emoji: "🎞️", value: "classic" },
      { label: "Bold & stylish", emoji: "💫", value: "bold" },
    ],
  },
  {
    key: "genre",
    title: "One more thing — what genre calls to you?",
    options: [
      { label: "Comedy", emoji: "😂", value: "comedy" },
      { label: "Drama", emoji: "🎭", value: "drama" },
      { label: "Sci-fi & fantasy", emoji: "🪐", value: "scifi" },
      { label: "Romance", emoji: "💌", value: "romance" },
      { label: "Mystery & thriller", emoji: "🔍", value: "thriller" },
      { label: "Animation", emoji: "🎨", value: "animation" },
    ],
  },
];

const LOADING_LINES = [
  "Consulting the popcorn oracle…",
  "Reading the tea leaves of your taste…",
  "Shuffling the film reels…",
  "Asking the cinema gods nicely…",
];

/* ============================================
   STATE
   ============================================ */
let currentIndex = 0;
const answers = {};

/* ============================================
   DOM REFS
   ============================================ */
const panelStart = document.getElementById("panel-start");
const panelQuestion = document.getElementById("panel-question");
const panelLoading = document.getElementById("panel-loading");
const panelResult = document.getElementById("panel-result");
const progressEl = document.getElementById("progress");

const qCount = document.getElementById("q-count");
const qTitle = document.getElementById("q-title");
const qOptions = document.getElementById("q-options");
const backBtn = document.getElementById("back-btn");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const loadingText = document.getElementById("loading-text");

/* build progress dots */
QUESTIONS.forEach(() => {
  const dot = document.createElement("span");
  dot.className = "dot";
  progressEl.appendChild(dot);
});
const dots = Array.from(progressEl.children);

/* ============================================
   PANEL SWITCHING
   ============================================ */
function showPanel(panel) {
  [panelStart, panelQuestion, panelLoading, panelResult].forEach((p) => {
    p.hidden = p !== panel;
  });
}

/* ============================================
   RENDER A QUESTION
   ============================================ */
function renderQuestion() {
  const q = QUESTIONS[currentIndex];
  qCount.textContent = `Question ${currentIndex + 1} of ${QUESTIONS.length}`;
  qTitle.textContent = q.title;
  qOptions.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    if (answers[q.key] === opt.value) btn.classList.add("is-selected");
    btn.innerHTML = `<span class="opt-emoji">${opt.emoji}</span><span>${opt.label}</span>`;
    btn.addEventListener("click", () => selectAnswer(q.key, opt.value));
    qOptions.appendChild(btn);
  });

  backBtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";

  dots.forEach((d, i) => {
    d.classList.toggle("is-active", i === currentIndex);
    d.classList.toggle("is-done", i < currentIndex);
  });

  showPanel(panelQuestion);
}

/* ============================================
   HANDLE ANSWER SELECTION
   ============================================ */
function selectAnswer(key, value) {
  answers[key] = value;
  // brief visual confirmation, then advance
  renderQuestion();
  window.setTimeout(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      currentIndex += 1;
      renderQuestion();
    } else {
      runMatch();
    }
  }, 260);
}

backBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderQuestion();
  }
});

/* ============================================
   SCORING ENGINE
   ============================================ */
function scoreMovie(movie, ans) {
  let score = 0;
  if (movie.mood === ans.mood) score += 3;
  if (movie.genre === ans.genre) score += 3;
  if (movie.company === ans.company) score += 2;
  if (movie.visual === ans.visual) score += 1;
  if (movie.length === ans.length) score += 1;
  return score;
}

function pickMovie(ans) {
  const scored = MOVIES.map((m) => ({ movie: m, score: scoreMovie(m, ans) }));
  scored.sort((a, b) => b.score - a.score);
  const topScore = scored[0].score;
  const topPicks = scored.filter((s) => s.score === topScore);
  const chosen = topPicks[Math.floor(Math.random() * topPicks.length)];
  return chosen.movie;
}

/* ============================================
   LOADING -> RESULT
   ============================================ */
function runMatch() {
  loadingText.textContent = LOADING_LINES[Math.floor(Math.random() * LOADING_LINES.length)];
  showPanel(panelLoading);

  window.setTimeout(() => {
    const movie = pickMovie(answers);
    renderResult(movie);
    showPanel(panelResult);
  }, 1100);
}

function renderResult(movie) {
  document.getElementById("result-emoji").textContent = movie.emoji;
  document.getElementById("result-title").textContent = movie.title;
  document.getElementById("result-meta").textContent = `${movie.year}`;
  document.getElementById("result-blurb").textContent = movie.blurb;

  const tagsEl = document.getElementById("result-tags");
  tagsEl.innerHTML = "";
  const tagWords = [movie.genre, movie.mood, movie.visual];
  tagWords.forEach((t) => {
    const span = document.createElement("span");
    span.textContent = capitalize(t);
    tagsEl.appendChild(span);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ============================================
   START / RESTART
   ============================================ */
startBtn.addEventListener("click", () => {
  currentIndex = 0;
  renderQuestion();
});

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  Object.keys(answers).forEach((k) => delete answers[k]);
  showPanel(panelStart);
});