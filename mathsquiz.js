const questions=[
    {
        question: "Which type of investors typically invest in startups in exchange for equity or ownership stake?",
        answers: [
            {text:'Traditional banks',correct:false},
            {text:'Family and friends only',correct:false},
            {text:'Venture capital firms and angel investors',correct:true},
            {text:'Government agencies',correct:false}
        ]
    },
    {
        question:"The concept of unicorn in the startup world refers to:",
        answers: [
            {text:'Startups offering unique and innovative products or services',correct:false},
            {text:'Startups achieving a valuation of $1 billion or more',correct:true},
            {text:'Startups supported by government grants and angel investors',correct:false},
            {text:'Startups disrupting established industries with rapid growth',correct:false}
        ]
    },
    {
        question:"What is the name for the digital currency recently launched by China? ",
        answers: [
            {text:'YuanPay',correct:false},
            {text:'Alipay',correct:false},
            {text:'Renminbi Digital Yuan',correct:false},
            {text:'e-CNY',correct:true}
        ]
    },
    {
        question:' The term "Series A funding" in the startup world refers to:',
        answers: [
            {text:'Initial seed funding provided by angel investors or incubators',correct:true},
            {text:'First round of institutional investment by venture capitalists',correct:false},
            {text:'Subsequent funding rounds raising larger amounts for growth and expansion',correct:false},
            {text:' Exit events like acquisitions or IPOs leading to liquidity for investors',correct:false}
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

//Current Question Index
let cqi=0;
let score=0;

function startQuiz()
{
    cqi=0;
    score=0;
    nextButton.innerHTML="Next";
    //at the end we'll change it to Replay
    showQuestion();
}

function showQuestion()
{
    resetState();
    //to hide the previous questions and answers

    let currentQuestion=questions[cqi];
    let questionNo=cqi+1;
    questionElement.innerHTML=questionNo+'. '+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        //will create a button with the text for each option of the current question
        button.classList.add("btn");
        //adding the class name 'btn' to the button
        answerButtons.appendChild(button);
        //to display this button in the div with id 'answerButton'

        if(answer.correct)
        {
            button.dataset.correct=answer.correct;
        }
        //it'll add the true or false value in the dataset correct

        button.addEventListener("click",selectAnswer);
        //when we'll click on the answer button, it'll call this function
    });
}

function resetState()
{
    nextButton.style.display='none';
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn =e.target;
    const isCorrect = selectedBtn.dataset.correct=="true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    //using css, we'll change the background colours of the classes 'correct' and 'incorrect'

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");
        }
        //to show the correct answer regardless of the fact we have answered correctly or not
        //so to do that it is traversing through the list
        button.disabled=true;
        //disabling the button so that no more options can be selected
    });
    nextButton.style.display="block";
    //to make the next button visible which was previously set as display:'none'
}

function showScore()
{
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block"; 
    exit.style.display="block";  
}

function handleNextButton()
{
    cqi++;
    if(cqi<questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(cqi<questions.length)
    {
        handleNextButton();
    }
    else
    {
        startQuiz();
    }
});

startQuiz(); 