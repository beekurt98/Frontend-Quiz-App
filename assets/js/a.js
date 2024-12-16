// TO DO LIST: if option not selected, error
// green/red
// make the code

let mainCont = document.querySelector(".content-cont");
let leftCont = document.querySelector(".left");
let rightCont = document.querySelector(".right");
let quizzesAll;
let score = 0;
let currentQuestionNumber = 0;
let chosenQuiz;

let form = document.querySelector("form")
let lightBox = form["lightSwitch"].checked
console.log(form)
console.log(lightBox)
if (lightBox) {
    console.log("checked light")
}

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
    let htmlLogo = quizzesAll[0].icon
    console.log(htmlLogo)
    leftCont.innerHTML = `
        <h1>Welcome to the <strong>Frontend Quiz!</strong></h1>
        <p class="description">Pick a subject to get started.</p>
    `;
    // <div class="logo"></div>
    // rightCont.innerHTML = `
    //     <div class="div-button subject-pick html">HTML</div>
    //     <div class="div-button subject-pick css">CSS</div>
    //     <div class="div-button subject-pick javascript">JavaScript</div>
    //     <div class="div-button subject-pick accessibility">Accessibility</div>
    // `;

    rightCont.innerHTML = quizzesAll.map((quiz) => {
        return `<div class="div-button subject-pick"><img src="${quiz.icon}">${quiz.title}</div>`
    }).join('');
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
    <p class="question-number">Question ${currentQuestionNumber+1} of 10</p>
    <h2 class="question">${question.question}</h2>
`;
    rightCont.innerHTML = `
        <div class="div-button answers opt1"><div class="logo alphabet">A </div>${question.options[0]}</div>
        <div class="div-button answers opt2"><div class="logo alphabet">B </div>${question.options[1]}</div>
        <div class="div-button answers opt3"><div class="logo alphabet">C </div>${question.options[2]}</div>
        <div class="div-button answers opt4"><div class="logo alphabet">D </div>${question.options[3]}</div>
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

        let status = checkIfCorrect(question, userSelectedAnswer);
        
        answerButtons.forEach((answerButton) => {
            let optionText = answerButton.innerText.slice(2).trim();
            let alphaDiv = answerButton.querySelector(".alphabet");
        
            if (optionText === userSelectedAnswer) {
                if (optionText === question.answer) {
                    // User selected the correct answer: Green border and background
                    answerButton.style.borderColor = "#26D782";
                    alphaDiv.style.backgroundColor = "#26D782";
                    alphaDiv.style.color = "white";
                } else {
                    // User selected the wrong answer: Red border and background
                    answerButton.style.borderColor = "#EE5454";
                    alphaDiv.style.backgroundColor = "#EE5454";
                    alphaDiv.style.color = "white";
                    answerButton.innerHTML += `<img class="indicator" src="images/cross-incorrect.svg" alt="Correct">`;

                }
            }
        
            if (optionText === question.answer) {
                // Correct answer: Add checkmark icon only
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