// val : 변수  const : 상수         let은 머지?
//  querySelector : document  문서에서 css선택자에 대응되는 것을 선택해주는 기능
// 즉 const main  상수에 main section이 담긴것
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
// 사용자가 버튼을 눌러서 선택할때마다 배열에 값 추가
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


function calResult(/* select */) {
 /*   알고리즘 개선을 위해서 필요없어짐
 
    // data.js파일에서  qnaList의 type을 보면 동물이름이 있는데 같은 동물이 여러번 나온걸로 결과를 보여줄거임
    var pointArray = [
        { name: 'mouse',    value: 0, key:0 },
        { name: 'cow',      value: 0, key:1 },
        { name: 'tiger',    value: 0, key:2 },
        { name: 'rabbit',   value: 0, key:3 },
        { name: 'dragon',   value: 0, key:4 },
        { name: 'snake',    value: 0, key:5 },
        { name: 'horse',    value: 0, key:6 },
        { name: 'sheep',    value: 0, key:7 },
        { name: 'monkey',   value: 0, key:8 },
        { name: 'chick',    value: 0, key:9 },
        { name: 'dog',      value: 0, key:10 },
        { name: 'pig',      value: 0, key:11 }
    ];

    for (let i = 0; i < endPoint; i++) {
        var target = qnaList[i].a[select[i]];
        
        for(let j = 0; j < target.type.length; j++){
            for(let k = 0; k < pointArray.length; k++){
                if(target.type[j] == pointArray[k].name){
                    pointArray[k].value +=1;
                }
            }
        }
    } 

    var resultArray = pointArray.sort(function(a,b){
        if(a.value > b.value){
            return -1;
        }
        if(a.value < b.value){
            return 1;
        }
    })
    // 위에랑 아래랑 같은거 같아서 한번 만들어봄 TODO: 틀렸나봄 오류남
    // var resultArray_Lamda = pointArray.sort((a,b) => {
    //     return a.value > b.value ?  -1 : a.value < b.value ? 1 : 0;
    // })
    // 배열이랑 일반 문자열을 같이 로그를 찍으면 배열이 OBject로만 표시됨
    // console.log("pointArray        " + pointArray);
    console.log(resultArray);
    // console.log(resultLamda);

        let resultword = resultArray[0].key;
    // console.log(resultword);

    return resultword;

*/
    console.log(Math.max(...select));
    
    var result = select.indexOf(Math.max(...select));

    // TODO: 두번째로 높았던 동물도 만들어 볼까?
    // select를 솔트한 다음에 구현하면 어렵지 않을듯
    
    return result;
}

function setResult(){
    let point = calResult();

    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');

    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    //부트스트랩으로 이미지 크기 조절
    resultImg.classList.add('img-fluid');

    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animaion = "fadeOut 1s";

    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";

        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)})

    setResult();
}

function addAnswer(answerText, qIdx, idx) {
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
            // 복잡한 알고리즘 개선을 위해 버튼을 누르는 순간 data_copy.js 파일의
            // qnaList파일의 a.type을 int 형으로 바꿔주고 그걸index로 select 배열의 값을 증가 시키기 위해
            var target = qnaList[qIdx].a[idx].type;
            for(let j = 0; j < target.length; j++){
                select[target[j]] += 1;
            }

            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }

            // TODO: 이렇게 작성하면 왜 안되는지 파악하기
            // if(qIdx > endPoint){
            //     goResult();
            // }
            goNext(++qIdx);
        }, 450);

    }, false);
}

function goNext(qIdx) {

    if(qIdx == endPoint){
        goResult();
        return;
    }

    var q = document.querySelector(".qBox");
    q.innerHTML = qnaList[qIdx].q;

    for(let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
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