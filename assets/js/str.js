// TO DO LIST: if option not selected, error

let mainCont = document.querySelector(".content-cont");
let leftCont = document.querySelector(".left");
let rightCont = document.querySelector(".right");
let quizzesAll;
let score = 0;
let currentQuestionNumber = 0;
let chosenQuiz;

async function init() {
    let data = await fetch("./data.json").then(x=>x.json());
    quizzesAll = data.quizzes;
    render();
}

function render() {
    // 
    showQuizType();
    selectQuizType();
    // for (let i=0; i<quizzes.length; i++) {
    //     console.log(quizzes[i])
    // }
}

function showQuizType() {
    
    leftCont.innerHTML = `
        <h1>Welcome to the <strong>Frontend Quiz!</strong></h1>
        <p>Pick a subject to get started.</p>
    `;
    rightCont.innerHTML = `
        <div class="div-button subject-pick html">HTML</div>
        <div class="div-button subject-pick css">CSS</div>
        <div class="div-button subject-pick javascript">JavaScript</div>
        <div class="div-button subject-pick accessibility">Accessibility</div>
    `;
}

function selectQuizType() {
    let subjBtn = document.querySelectorAll(".subject-pick");
    subjBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            getQuestionsSubject(btn.innerHTML);
        })
    })
}

function getQuestionsSubject(subject) {
    
    //  = quizzesAll[`${subject}`];
    quizzesAll.forEach((quiz) => {
        quiz.title == subject ? chosenQuiz = quiz : "";
    })
    getQuestions();

}

function getQuestions() {
    // console.log(chosenQuiz.title)
    // console.log(chosenQuiz.icon)
    console.log(quizzesAll);

    getQuestion(chosenQuiz.questions[currentQuestionNumber]);
}

function getQuestion(question) {
    leftCont.innerHTML = `
    <p>${currentQuestionNumber+1}</p>
    <h2>${question.question}</h2>
`;
    rightCont.innerHTML = `
        <div class="div-button answers opt1"><div class="alphabet">A </div>${question.options[0]}</div>
        <div class="div-button answers opt2"><div class="alphabet">B </div>${question.options[1]}</div>
        <div class="div-button answers opt3"><div class="alphabet">C </div>${question.options[2]}</div>
        <div class="div-button answers opt4"><div class="alphabet">D </div>${question.options[3]}</div>
        <button class="submit main-btn">Submit Answer</button>
    `;
    
    // coloring the button border
    let userSelectedAnswer;
    let answerButtons = document.querySelectorAll(".answers");
    answerButtons.forEach((answerBtn) => {
        answerBtn.addEventListener("click", () => {
            answerButtons.forEach((btn) => {
                btn.style.borderColor = "white"
                btn.querySelector(".alphabet").style.backgroundColor = "white"
            });
            userSelectedAnswer = answerBtn.innerHTML;

            if (userSelectedAnswer == answerBtn.innerHTML) {
                answerBtn.style.borderColor = "#A729F5"
                answerBtn.querySelector(".alphabet").style.backgroundColor = "#A729F5"
            } 
        }) 
    })

    // user clicks submit
    let submitBtn = document.querySelector(".submit");
    submitBtn.addEventListener("click", () => {
        let status = checkIfCorrect(question, userSelectedAnswer);
        if (status) {
            console.log(status);
            submitBtn.remove();
            rightCont.innerHTML += `<button class="next-question">Next Question</button>`;
            // getQuestion(chosenQuiz.questions[currentQuestionNumber])
        } else {
            console.log(status);
            submitBtn.remove();
            rightCont.innerHTML += `<button class="next-question main-btn">Next Question</button>`;
            // 
        }
        let nextQButton = document.querySelector(".next-question");

        nextQButton.addEventListener("click", () => {
            checkIfGameEnds();
        })
    })

    
}

function checkIfCorrect(question, userSelectedAnswer) {
    if (question.answer == userSelectedAnswer) {
        console.log(question.answer)
        score++;
        currentQuestionNumber++;
        return true;
    } else {
        currentQuestionNumber++;
        return false;
    }
}
function checkIfGameEnds() {
    if (currentQuestionNumber == 10) {
        console.log("game over!");
        leftCont.innerHTML = `
        <div>Quiz completed. <strong>You scored...</strong></div>
        `;
        rightCont.innerHTML = `
        <div>${score} / 10</div>
        `;
    } else {
        getQuestion(chosenQuiz.questions[currentQuestionNumber]);
    }
}


init();