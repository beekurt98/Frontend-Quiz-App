let allQuizzes;
let leftCont = document.querySelector(".left")
let rightCont = document.querySelector(".right")
let optionsForm = document.querySelector(".questions")
let currentQuestionNumber = 0;
let score = 0;

async function init() {
    let data = await fetch("./data.json").then(x=>x.json());
    allQuizzes = data.quizzes;
    render();
}

function render() {
    selectSubject();
}

function selectSubject() {
    optionsForm.innerHTML = allQuizzes.map((quiz) => {
        return `<button class="div-button ${quiz.title.toLowerCase()}"><img src="${quiz.icon}">${quiz.title}</button>`
    }).join('');
    let selectedSubject;
    let subjectButtons = document.querySelectorAll(".div-button");
    subjectButtons.forEach((subjBtn) => {
        subjBtn.addEventListener(("click"), (e) => {
            e.preventDefault();
            getQuestions(subjBtn.innerText);
            // console.log(subjBtn.innerText)
        })
    })
}

function getQuestions(selectedSubj) {
    let questionsList;
    allQuizzes.forEach((quiz) => {
        quiz.title == selectedSubj ? questionsList = quiz.questions : ""
    })
    getQuestion(questionsList[currentQuestionNumber])
}

function getQuestion(currentQuestion) {
    console.log(currentQuestion.question)
    leftCont.innerHTML = `
    <div>${currentQuestion.question}</div>
    `
    optionsForm.innerHTML = `
    <button class="div-button answers"><div>A </div>${currentQuestion.options[0]}</button>
    <button class="div-button answers"><div>B </div>${currentQuestion.options[1]}</button>

    `
    
}

function bindEvents() {
    let answers = document.querySelectorAll(".answers")
    answers.forEach((answer) => {
        answer.addEventListener("click", (e) => {
            e.preventDefault();
            
        })
    })
}

init();