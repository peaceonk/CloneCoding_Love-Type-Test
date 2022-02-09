// val : 변수  const : 상수
//  querySelector : document  문서에서 css선택자에 대응되는 것을 선택해주는 기능
// 즉 const main  상수에 main section이 담긴것

const main = document.querySelector("#main");
const qna = document.querySelector("#qna");




function addAnswer(answerText) {
    var answers = document.querySelector('.answerBox');
    var answer_buttons = document.createElement('button');

    answers.appendChild(answer_buttons);
    answers.innerHTML = answerText;
}

function goNext(qIdx) {
    var q = document.querySelector(".qBox");
    q.innerHTML = qnaList[qIdx].q;

    for (let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer);
    }
}


function begin() {
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animaion = "fadeOut 1s";

    setTimeout(() => {

        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";

        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450);

        let qIdx = 0;

        goNext(qIdx);

    }, 450);


    // main.style.display = "none";
    // qna.style.display = "block";
}