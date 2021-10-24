let yOffset = 0; // window.pageYOffset 대신 쓸 변수
let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
let currentScene = 0; //현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

(() => {
    const sceneInfo = [
        {//0
            type: 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight :0,
            objs :{
                container : document.querySelector('#scroll-section-0')
            }
        },
        {//1
            type: 'normal',
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight :0,
            objs :{
                container : document.querySelector('#scroll-section-1')
            }
        },
        {//2
            type: 'sticky',
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight :0,
            objs :{
                container : document.querySelector('#scroll-section-2')
            }
        },
        {//3
            type:'sticky',
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight :0,
            objs :{
                container : document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout(){
        //각 스크롤 섹션의 높이 세팅
        for(let i = 0; i<sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        yOffset = window.pageYOffset;

        let totalScrollHeight = 0;
        for(let i=0; sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);
    }


    function scrollLoop(){
        prevScrollHeight = 0;
        for(let i=0; i<currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }
        if(yOffset<prevScrollHeight){
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }
        //일케하면 currentScene에 맞춰서 번호가 입력됨
    }

    window.addEventListener('resize',setLayout);
    window.addEventListener('scroll',() => {
        yOffset = window.pageYOffset
        scrollLoop();
    });

    //DomContentLoaded 설정시 좀 더 빨리 로드됨
    window.addEventListener('load',setLayout); //sceneInfo의 scrollHeight 값들을 잡아줌
    //load로 설정 시 사진부터 모든 설정이 다 로드됨
    window.addEventListener('resize',setLayout);
})();