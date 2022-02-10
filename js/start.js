// val : 변수  const : 상수         let은 머지?
//  querySelector : document  문서에서 css선택자에 대응되는 것을 선택해주는 기능
// 즉 const main  상수에 main section이 담긴것
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");

const endPoint = 12;

function addAnswer(answerText, qIdx) {
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');

    // 버튼 3개중 하나를 누르면 다음 질문이 나오게끔 하기위해
    // 버튼에 클래스를 넣어줌
    answer.classList.add('answerList');
    // html파일에서 클래스를 선언한 것이 아니기 때문에 부트스트랩 명령어도 js에서 넣어주어어야함
    answer.classList.add('my-3');
    answer.classList.add('py-2');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    // a변수에 담은 answerBox 클래스 아래에  변수 ansswer인  button을 넣어줌
    a.appendChild(answer);
    // answer에 파라미터로 받아온 answerText즉 문자열을 담아줌
    answer.innerHTML = answerText;

    // 버튼을 눌렀을때 발생하는 이벤트
    answer.addEventListener("click", function(){
        // 이벤트가 발생하면 버튼들을 없애주기 위해 
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animaion = "fadeOut 0.5s";
            // children[i].style.display = 'none';
        }
        setTimeout(() => {
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450);

    }, false);
}

function goNext(qIdx) {
    var q = document.querySelector(".qBox");
    q.innerHTML = qnaList[qIdx].q;

    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
    
    // status의 진행도를 표시하기 위해 변수로 선언
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
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
        }, 450)

        let qIdx = 0;

        goNext(qIdx);

    }, 450);


    // main.style.display = "none";
    // qna.style.display = "block";
}