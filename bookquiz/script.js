
/* --------------------------------
   READR — BOOK QUIZ
---------------------------------- */


const questions = [

    {
        category: "THE BASICS",
        question: "First things first — what kind of world do you want to enter?",
        answers: [
            {
                text: "📚 A fictional world",
                value: "fiction"
            },
            {
                text: "🧠 Real life & ideas",
                value: "nonfiction"
            }
        ]
    },

    {
        category: "YOUR VIBE",
        question: "What feeling are you chasing?",
        answers: [
            {
                text: "💗 Something emotional",
                value: "emotional"
            },
            {
                text: "🕵️ Mystery & suspense",
                value: "mystery"
            },
            {
                text: "✨ Escapism & adventure",
                value: "fantasy"
            },
            {
                text: "🌱 Growth & motivation",
                value: "selfhelp"
            }
        ]
    },

    {
        category: "THE PLOT",
        question: "How much chaos are we talking?",
        answers: [
            {
                text: "☕ Calm & cozy",
                value: "cozy"
            },
            {
                text: "🌊 A little drama",
                value: "drama"
            },
            {
                text: "🔥 Give me EVERYTHING",
                value: "intense"
            }
        ]
    },

    {
        category: "THE PACING",
        question: "How do you want the story to move?",
        answers: [
            {
                text: "🐢 Slow burn",
                value: "slow"
            },
            {
                text: "🚶 Steady & immersive",
                value: "medium"
            },
            {
                text: "🏃 Fast & addictive",
                value: "fast"
            }
        ]
    },

    {
        category: "THE MOOD",
        question: "Pick your current main-character energy.",
        answers: [
            {
                text: "🌙 In my feelings",
                value: "emotional"
            },
            {
                text: "🖤 A little mysterious",
                value: "mystery"
            },
            {
                text: "☀️ I need something uplifting",
                value: "happy"
            },
            {
                text: "🧘 I want to improve myself",
                value: "selfhelp"
            }
        ]
    },

    {
        category: "THE COMMITMENT",
        question: "How much time are you willing to give this book?",
        answers: [
            {
                text: "🍪 Short & sweet",
                value: "short"
            },
            {
                text: "📖 A normal-sized adventure",
                value: "medium"
            },
            {
                text: "🏰 Give me a huge story",
                value: "long"
            }
        ]
    },

    {
        category: "THE SETTING",
        question: "Where would you rather spend your evening?",
        answers: [
            {
                text: "🏙️ A modern city",
                value: "modern"
            },
            {
                text: "🌲 Somewhere magical",
                value: "fantasy"
            },
            {
                text: "🏡 A cozy little town",
                value: "cozy"
            },
            {
                text: "🌎 The real world",
                value: "nonfiction"
            }
        ]
    },

    {
        category: "THE FINAL QUESTION",
        question: "Be honest... what do you REALLY want right now?",
        answers: [
            {
                text: "💘 Fall in love",
                value: "romance"
            },
            {
                text: "😱 Be completely shocked",
                value: "mystery"
            },
            {
                text: "🧠 Learn something useful",
                value: "selfhelp"
            },
            {
                text: "🌌 Escape reality",
                value: "fantasy"
            }
        ]
    }

];


/* --------------------------------
   BOOK DATABASE
---------------------------------- */

const books = [

    {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        genre: "PSYCHOLOGICAL THRILLER",
        tags: ["Mystery", "Twists", "Psychological"],
        description:
            "A gripping psychological mystery about a famous painter who suddenly stops speaking after a shocking event.",
        match: ["mystery", "intense", "fast"],
        cover: "linear-gradient(135deg, #5b3545, #1b2438)"
    },

    {
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        genre: "FICTION",
        tags: ["Emotional", "Romance", "Drama"],
        description:
            "A glamorous, emotional story about love, ambition, secrets and one unforgettable Hollywood star.",
        match: ["emotional", "drama", "romance", "slow"],
        cover: "linear-gradient(135deg, #744f43, #312337)"
    },

    {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "SELF-HELP",
        tags: ["Growth", "Habits", "Productivity"],
        description:
            "A practical guide to building better habits through small changes that can create surprisingly big results.",
        match: ["selfhelp", "nonfiction", "medium"],
        cover: "linear-gradient(135deg, #405b50, #18272b)"
    },

    {
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: "MAGICAL FICTION",
        tags: ["Fantasy", "Emotional", "Life"],
        description:
            "A magical library filled with infinite possibilities explores the lives we could have lived.",
        match: ["fantasy", "emotional", "slow", "medium"],
        cover: "linear-gradient(135deg, #253d52, #362440)"
    },

    {
        title: "The House in the Cerulean Sea",
        author: "TJ Klune",
        genre: "FANTASY",
        tags: ["Cozy", "Fantasy", "Found Family"],
        description:
            "A warm, whimsical fantasy about an unusual family and a quiet journey toward finding where you belong.",
        match: ["fantasy", "cozy", "happy", "slow"],
        cover: "linear-gradient(135deg, #37666a, #263348)"
    },

    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "PHILOSOPHICAL FICTION",
        tags: ["Adventure", "Purpose", "Growth"],
        description:
            "A simple yet powerful journey about dreams, purpose and listening to the world around you.",
        match: ["fiction", "selfhelp", "adventure", "medium"],
        cover: "linear-gradient(135deg, #80633e, #332d27)"
    }

];


/* --------------------------------
   VARIABLES
---------------------------------- */

let currentQuestion = 0;
let userAnswers = [];


/* --------------------------------
   ELEMENTS
---------------------------------- */

const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const questionNumber = document.getElementById("questionNumber");
const questionCategory = document.getElementById("questionCategory");
const questionText = document.getElementById("question");

const answersContainer = document.getElementById("answers");
const progress = document.getElementById("progress");


/* --------------------------------
   START QUIZ
---------------------------------- */

startBtn.addEventListener("click", () => {

    currentQuestion = 0;
    userAnswers = [];

    intro.classList.remove("active");
    quiz.classList.add("active");

    showQuestion();

});


/* --------------------------------
   SHOW QUESTION
---------------------------------- */

function showQuestion() {

    const q = questions[currentQuestion];

    questionNumber.textContent =
        `${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;

    questionCategory.textContent = q.category;

    questionText.textContent = q.question;

    progress.style.width =
        `${((currentQuestion) / questions.length) * 100}%`;

    answersContainer.innerHTML = "";


    q.answers.forEach(answer => {

        const button = document.createElement("button");

        button.classList.add("answer");

        button.textContent = answer.text;

        button.addEventListener("click", () => {

            userAnswers.push(answer.value);

            nextQuestion();

        });

        answersContainer.appendChild(button);

    });

}


/* --------------------------------
   NEXT QUESTION
---------------------------------- */

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        progress.style.width = "100%";

        setTimeout(showResult, 400);

    }

}


/* --------------------------------
   FIND BEST BOOK
---------------------------------- */

function getBestBook() {

    let bestBook = books[0];
    let highestScore = 0;

    books.forEach(book => {

        let score = 0;

        book.match.forEach(preference => {

            if (userAnswers.includes(preference)) {
                score++;
            }

        });

        if (score > highestScore) {

            highestScore = score;
            bestBook = book;

        }

    });

    return {
        book: bestBook,
        score: highestScore
    };

}


/* --------------------------------
   SHOW RESULT
---------------------------------- */

function showResult() {

    const resultData = getBestBook();

    const book = resultData.book;

    quiz.classList.remove("active");
    result.classList.add("active");


    document.getElementById("bookTitle").textContent =
        book.title;

    document.getElementById("bookAuthor").textContent =
        `by ${book.author}`;

    document.getElementById("coverTitle").textContent =
        book.title;

    document.getElementById("coverAuthor").textContent =
        book.author;

    document.getElementById("coverGenre").textContent =
        book.genre;

    document.getElementById("bookDescription").textContent =
        book.description;

    document.getElementById("bookCover").style.background =
        book.cover;


    /* Tags */

    const tagsContainer =
        document.getElementById("bookTags");

    tagsContainer.innerHTML = "";

    book.tags.forEach(tag => {

        const span = document.createElement("span");

        span.classList.add("tag");

        span.textContent = tag;

        tagsContainer.appendChild(span);

    });


    /* Match percentage */

    const matchPercent =
        Math.min(
            99,
            78 + resultData.score * 5
        );

    document.getElementById("matchPercent").textContent =
        `${matchPercent}%`;

}


/* --------------------------------
   RESTART
---------------------------------- */

restartBtn.addEventListener("click", () => {

    result.classList.remove("active");

    intro.classList.add("active");

});
