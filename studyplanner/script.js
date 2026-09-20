```javascript
/* =====================================================
   STUDYOS — STUDY PLANNER
===================================================== */


/* ================= TASK SYSTEM ================= */

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

const taskForm = document.getElementById("taskForm");

const taskName = document.getElementById("taskName");
const taskSubject = document.getElementById("taskSubject");
const taskPriority = document.getElementById("taskPriority");


/* OPEN MODAL */

openModal.addEventListener("click", () => {
    modal.classList.add("show");

    setTimeout(() => {
        taskName.focus();
    }, 100);
});


/* CLOSE MODAL */

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});


/* CLOSE WHEN CLICKING OUTSIDE */

modal.addEventListener("click", (e) => {

    if (e.target === modal) {
        modal.classList.remove("show");
    }

});


/* ADD TASK */

taskForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const newTask = {
        id: Date.now(),

        name: taskName.value,

        subject: taskSubject.value,

        priority: taskPriority.value,

        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    renderTasks();

    taskForm.reset();

    modal.classList.remove("show");

});


/* SAVE TASKS */

function saveTasks() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

}


/* RENDER TASKS */

function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.appendChild(emptyState);

        updateProgress();

        return;
    }


    tasks.forEach(task => {

        const taskElement = document.createElement("div");

        taskElement.className =
            `task ${task.completed ? "completed" : ""}`;


        taskElement.innerHTML = `

            <div class="check" data-id="${task.id}"></div>

            <div class="task-content">

                <span class="task-name">
                    ${escapeHTML(task.name)}
                </span>

                <span class="task-subject">
                    ${escapeHTML(task.subject)}
                </span>

            </div>

            <span class="priority ${task.priority}">
                ${task.priority}
            </span>

            <button
                class="delete-task"
                data-delete="${task.id}">
                ×
            </button>

        `;


        taskList.appendChild(taskElement);

    });


    updateProgress();

}


/* ESCAPE HTML */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* TASK CLICK */

taskList.addEventListener("click", (e) => {

    const check = e.target.closest(".check");

    const deleteButton =
        e.target.closest(".delete-task");


    /* COMPLETE TASK */

    if (check) {

        const id = Number(check.dataset.id);

        const task = tasks.find(
            task => task.id === id
        );

        if (task) {

            task.completed = !task.completed;

            saveTasks();

            renderTasks();

        }

    }


    /* DELETE TASK */

    if (deleteButton) {

        const id =
            Number(deleteButton.dataset.delete);

        tasks = tasks.filter(
            task => task.id !== id
        );

        saveTasks();

        renderTasks();

    }

});


/* CLEAR COMPLETED */

document
    .getElementById("clearCompleted")
    .addEventListener("click", () => {

        tasks = tasks.filter(
            task => !task.completed
        );

        saveTasks();

        renderTasks();

    });


/* ================= PROGRESS ================= */

function updateProgress() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;


    const percentage =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);


    document.getElementById("progressText")
        .textContent = `${percentage}%`;

    document.getElementById("ringNumber")
        .textContent = `${percentage}%`;

    document.getElementById("completedCount")
        .textContent = completed;

    document.getElementById("totalCount")
        .textContent = total;


    document.getElementById("progressFill")
        .style.width = `${percentage}%`;


    const circumference = 264;

    document.getElementById("ringProgress")
        .style.strokeDashoffset =
            circumference -
            (percentage / 100) * circumference;

}


/* ================= FOCUS TIMER ================= */

let selectedMinutes = 25;

let timeLeft = selectedMinutes * 60;

let timerInterval = null;

let timerRunning = false;


const bigTimer =
    document.getElementById("bigTimer");

const miniTimer =
    document.getElementById("miniTimer");

const bigStart =
    document.getElementById("bigStart");

const miniStart =
    document.getElementById("miniStart");

const bigReset =
    document.getElementById("bigReset");

const miniReset =
    document.getElementById("miniReset");

const bigRing =
    document.getElementById("bigRing");


/* FORMAT TIMER */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

}


/* UPDATE TIMER */

function updateTimer() {

    const formatted =
        formatTime(timeLeft);

    bigTimer.textContent = formatted;

    miniTimer.textContent = formatted;


    const totalSeconds =
        selectedMinutes * 60;

    const progress =
        1 - timeLeft / totalSeconds;

    const circumference = 553;

    bigRing.style.strokeDashoffset =
        circumference * (1 - progress);

}


/* START / PAUSE */

function toggleTimer() {

    if (timerRunning) {

        clearInterval(timerInterval);

        timerRunning = false;

        bigStart.textContent = "Start";

        miniStart.textContent = "Start focus";

        return;
    }


    timerRunning = true;

    bigStart.textContent = "Pause";

    miniStart.textContent = "Pause";


    timerInterval = setInterval(() => {

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timerRunning = false;

            bigStart.textContent = "Start";

            miniStart.textContent = "Start focus";

            alert("Focus session complete. Nice work!");

            return;
        }


        timeLeft--;

        updateTimer();

    }, 1000);

}


/* RESET TIMER */

function resetTimer() {

    clearInterval(timerInterval);

    timerRunning = false;

    timeLeft = selectedMinutes * 60;

    bigStart.textContent = "Start";

    miniStart.textContent = "Start focus";

    updateTimer();

}


/* BUTTONS */

bigStart.addEventListener(
    "click",
    toggleTimer
);

miniStart.addEventListener(
    "click",
    toggleTimer
);

bigReset.addEventListener(
    "click",
    resetTimer
);

miniReset.addEventListener(
    "click",
    resetTimer
);


/* TIMER LENGTH */

document
    .querySelectorAll(".focus-option")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".focus-option")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");


            selectedMinutes =
                Number(button.dataset.time);

            resetTimer();

        });

    });


/* ================= THEME BUTTON ================= */

const themeBtn =
    document.getElementById("themeBtn");

let lightMode = false;


themeBtn.addEventListener("click", () => {

    lightMode = !lightMode;

    if (lightMode) {

        document.documentElement.style.setProperty(
            "--bg",
            "#f2f3f7"
        );

        document.documentElement.style.setProperty(
            "--panel",
            "#ffffff"
        );

        document.documentElement.style.setProperty(
            "--text",
            "#15161b"
        );

        document.documentElement.style.setProperty(
            "--muted",
            "#737783"
        );

        document.body.style.background =
            "#f2f3f7";

        themeBtn.textContent = "☀";

    } else {

        document.documentElement.style.setProperty(
            "--bg",
            "#08090d"
        );

        document.documentElement.style.setProperty(
            "--panel",
            "#101218"
        );

        document.documentElement.style.setProperty(
            "--text",
            "#f4f4f5"
        );

        document.documentElement.style.setProperty(
            "--muted",
            "#777b87"
        );

        document.body.style.background =
            "#08090d";

        themeBtn.textContent = "☾";

    }

});


/* ================= NAVIGATION ================= */

document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            document
                .querySelectorAll(".nav-link")
                .forEach(item =>
                    item.classList.remove("active")
                );

            link.classList.add("active");

        });

    });


/* ================= INITIAL LOAD ================= */

renderTasks();

updateTimer();
```
