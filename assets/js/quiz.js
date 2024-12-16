// TO DO LIST: put the progress bar
// fix css

// dom elements
let mainCont = document.querySelector(".content-cont");
let leftCont = document.querySelector(".left");
let rightCont = document.querySelector(".right");
let shownQuizSubj = document.querySelector(".quiz-subject");
let lightSwitch = document.querySelector("#themeChange")

// vars
let quizzesAll;
let score = 0;
let currentQuestionNumber = 0;
let chosenQuiz;
let colorCodes = {
    "HTML": "#FFF1E9",
    "CSS": "#E0FDEF",
    "JavaScript": "#EBF0FF",
    "Accessibility": "#F6E7FF",
}

async function init() {
    let data = await fetch("./data.json").then(x=>x.json());
    quizzesAll = data.quizzes;
    render();
}

function render() {
    showQuizType();
    selectQuizType();
}

function showQuizType() {   
    let htmlLogo = quizzesAll[0].icon
    console.log(htmlLogo)
    leftCont.innerHTML = `
        <h1>Welcome to the <strong>Frontend Quiz!</strong></h1>
        <p class="description">Pick a subject to get started.</p>
    `;

    rightCont.innerHTML = quizzesAll.map((quiz) => {
        return `<button class="div-button subject-pick ${quiz.title}" data-title="${quiz.title}">
                   <div class="icon-bg" style="background-color:${colorCodes[quiz.title]}"><img src="${quiz.icon}"></div>
                    ${quiz.title}
                </button>`
    }).join('');
}

function selectQuizType() {
    let subjBtn = document.querySelectorAll(".subject-pick");
    subjBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            getQuestionsSubject(btn.getAttribute("data-title"));
        })
    })
}

function getQuestionsSubject(subject) {
    quizzesAll.forEach((quiz) => {
        quiz.title == subject ? chosenQuiz = quiz : "";
    })
    getQuestions();

}

function getQuestions() {
    // console.log(chosenQuiz.title)
    // console.log(chosenQuiz.icon)
    console.log(quizzesAll);

    getQuestion(chosenQuiz, chosenQuiz.questions[currentQuestionNumber]);
}

function getQuestion(quiz, question) {
    shownQuizSubj.innerHTML = `<div class="icon-bg" style="background-color:${colorCodes[quiz.title]}"><img src="${quiz.icon}"></div>${quiz.title}`

    leftCont.innerHTML = `
    <p class="question-number">Question ${currentQuestionNumber+1} of 10</p>
    <h2 class="question">${question.question}</h2>
    `;
    rightCont.innerHTML = `
        <div class="div-button answers opt1"><div class="logo alphabet">A </div>${escapeHTML(question.options[0])}</div>
        <div class="div-button answers opt2"><div class="logo alphabet">B </div>${escapeHTML(question.options[1])}</div>
        <div class="div-button answers opt3"><div class="logo alphabet">C </div>${escapeHTML(question.options[2])}</div>
        <div class="div-button answers opt4"><div class="logo alphabet">D </div>${escapeHTML(question.options[3])}</div>
        <button class="submit main-btn">Submit Answer</button>
    `;
    
    // coloring the button border
    let userSelectedAnswer;
    let answerButtons = document.querySelectorAll(".answers");
    answerButtons.forEach((answerBtn) => {
        answerBtn.addEventListener("click", () => {
            answerButtons.forEach((btn) => {
                btn.style.borderColor = "white"
                btn.querySelector(".alphabet").style.backgroundColor = "#F4F6FA"
                btn.querySelector(".alphabet").style.color = "#313E51"

            });
            userSelectedAnswer = answerBtn.innerText.slice(2).trim();
            

            console.log("userselectedans", userSelectedAnswer)
            if (answerBtn.innerHTML == answerBtn.innerHTML) {
                answerBtn.style.borderColor = "#A729F5"
                answerBtn.querySelector(".alphabet").style.backgroundColor = "#A729F5"
                answerBtn.querySelector(".alphabet").style.color = "white"
            } 
        }) 
    })

    // user clicks submit
    let submitBtn = document.querySelector(".submit");
    submitBtn.addEventListener("click", () => {
        if (!userSelectedAnswer) {
            rightCont.innerHTML += `<div class="error" ><img src="images/cross-incorrect.svg" alt="Correct">Please select an answer</div>`
            return;
        }

        checkIfCorrect(question, userSelectedAnswer);
        
        answerButtons.forEach((answerButton) => {
            let optionText = answerButton.innerText.slice(2).trim();
            let alphaDiv = answerButton.querySelector(".alphabet");
        
            if (optionText === userSelectedAnswer) {
                if (optionText === question.answer) {
                    answerButton.style.borderColor = "#26D782";
                    alphaDiv.style.backgroundColor = "#26D782";
                    alphaDiv.style.color = "white";
                } else {
                    answerButton.style.borderColor = "#EE5454";
                    alphaDiv.style.backgroundColor = "#EE5454";
                    alphaDiv.style.color = "white";
                    answerButton.innerHTML += `<img class="indicator" src="images/cross-incorrect.svg" alt="Correct">`;

                }
            }
        
            if (optionText === question.answer) {
                answerButton.innerHTML += `<img class="indicator" src="images/check-correct.svg" alt="Correct">`;
            }
        });
        
        
        submitBtn.remove();
        rightCont.innerHTML += `<button class="next-question main-btn">Next Question</button>`;

        let nextQButton = document.querySelector(".next-question");

        nextQButton.addEventListener("click", () => {
            checkIfGameEnds();
        })
    })
}

function checkIfCorrect(question, userSelectedAnswer) {
    if (question.answer == userSelectedAnswer) {
        console.log("qa", question.answer)
        console.log("selected", userSelectedAnswer)
        score++;
        currentQuestionNumber++;
        return true;
    } else {
        console.log("qa", question.answer)
        console.log("selected", userSelectedAnswer)
        currentQuestionNumber++;
        return false;
    }
}
function checkIfGameEnds() {
    if (currentQuestionNumber == 10) {
        console.log("game over!");
        leftCont.innerHTML = `
        <h1>Quiz completed.<br><strong>You scored...</strong></h1>
        `;
        rightCont.innerHTML = `
        <div>${score} / 10</div>
        <button class="play-again main-btn">Play Again</button>
        `;
        
        document.querySelector(".play-again").addEventListener("click", () => {
            shownQuizSubj.innerHTML = ""
            render();
        })
    } else {
        getQuestion(chosenQuiz, chosenQuiz.questions[currentQuestionNumber]);
    }
}

lightSwitch.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
})

function escapeHTML(html) {
    return html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

init();