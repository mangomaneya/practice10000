// js file
const shareButton = document.querySelector('.share_btn');
const openButton = document.querySelector('.modal_btn');
const closeButton = document.querySelector('.close_btn');
const startButton = document.querySelector('.start_btn');
const result = document.querySelector('.result');
const modal = document.querySelector('#modal');
const loading = document.querySelector('.result_loading');

//입력한 값을 바탕으로 계산 및 모달을 호출하는 기능
function calculator() {
    const fieldValue = document.querySelector('#field_value');
    let timeValue = document.querySelector('#time_value');
    let timeValue_int = Number(timeValue.value);

    const fieldResult = document.querySelector('.field_result');
    const timeResult = document.querySelector('.time_result');

    // field 값을 입력하지 않은채로 스타트버튼을 눌렀을 때 경고창이 뜨게 함 
    if(fieldValue.value == "") {
        alert('입력되지 않았습니다.');
        fieldValue.focus(); // 입력이 필요한 창에 포커스를 이동시킴
        return false; 
    } //time 값을 입력하지 않은채로 스타트버튼을 눌렀을 때 경고창이 뜨게 함
    else if (timeValue.value == "") {
        alert('입력되지 않았습니다.');
        timeValue.focus(); 
        return false;
    } // time 값이 24시간 보다 많이 입력되었을 때 경고창을 뜨게 함
    else if (timeValue_int > 24) {
        alert('잘못된 값입니다. 24이하의 값을 입력해 주세요.');
        return false;
    }

    // 결과창은 안보이고 로딩 이미지가 보이도록 함
    result.style.display = 'none';
    loading.style.display = 'flex';

    // 로딩이미지가 일정시간(1.8초) 후에 사라지고 계산된 결과창이 보여지게 함
    setTimeout(function(){
        loading.style.display = 'none';
        result.style.display = 'flex';
        
        //결과창 안에 입력받은 값의 **텍스트**를 넣어줌
        fieldResult.innerText = fieldValue.value;
        timeResult.innerText = parseInt((10000/timeValue_int),10); // 10000시간을 입력한 값으로 나누어서 10진수로 변환한 정수로 표현함
    },1800);

} 
// 모달을 열기
function openModal(){
    modal.style.display = 'flex';
}
// 모달을 닫기
function closeModal(){    
    modal.style.display = 'none';
}
// 모달 창 바깥의 화면을 클릭해도 모달이 닫히도록 작성
window.onclick = function(event) { //페이지 전체에 클릭 이벤트를 설정, 클릭이벤트가 발생할 때 클릭한 요소에 대한 정보를 제공
    if(event.target == modal) { //사용자가 모달 창 자체가 아닌 모달 바깥 영역을 클릭한 경우를 의미
        closeModal();
    }
}


function copyUrl() {
    let url = window.location.href; // 현재 페이지의 URL을 가져옴
    let tmp = document.createElement('input'); // 임시 입력 요소 생성

    document.body.appendChild(tmp); // 입력 요소를 문서에 추가
    tmp.value = url; // 입력 요소의 값을 URL로 설정
    tmp.select(); // URL을 선택
    document.execCommand('copy'); // 선택된 내용을 복사 **현재는 권장하지 않는 방식의 코드
    document.body.removeChild(tmp); // 임시 입력 요소 제거

    alert('URL이 복사되었습니다.'); // 복사 완료 알림
} 
//  GPT가 추천해준 코드 (위 코드를 요즘 방식으로 바꾼)
function copyUrl() {
    let url = window.location.href;
    navigator.clipboard.writeText(url)
        .then(() => alert("URL이 복사되었습니다."))
        .catch(err => console.error("복사에 실패했습니다: ", err)); // 오류 정보를 콘솔에 출력
}


shareButton.addEventListener('click',copyUrl);
openButton.addEventListener('click',openModal);
closeButton.addEventListener('click',closeModal);
startButton.addEventListener('click',calculator);