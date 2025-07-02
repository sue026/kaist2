gsap.registerPlugin(ScrollTrigger);

//section - parallax
const sections = gsap.utils.toArray('main section');

sections.forEach(section => {
  gsap.from(section, {
    y: 100,opacity: 0,duration: 0.5,
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
    }
  })
});

/** header */
//- 헤더 스타일 변경 => scroll 클래스 넣다 뺐다
const header = document.querySelector('#header');
const gnbDep1 = document.querySelectorAll('#gnb .dep1>li');

const langWrap = document.querySelector('.header-util .lang-wrap')
const langBtn = document.querySelector('.header-util .lang-wrap button')

const searchBtn = document.querySelector('.search-wrap button')
const searchBox = document.querySelector('.search-wrap .search-box');

window.addEventListener('scroll', () => {
  if(window.scrollY >= header.offsetHeight) {
    header.classList.add('scroll')
  } else {
    header.classList.remove('scroll')
  }
  // console.log(window.scrollY);
})

gnbDep1.forEach(dep1 => {
  // gnbDep2 구현
  dep1.addEventListener('mouseenter', () => {
    header.classList.add('scroll');
    
  })
  dep1.addEventListener('mouseleave', () => {
    // header.classList.remove('scroll')
    if(window.scrollY < header.offsetHeight) {
      header.classList.remove('scroll')
    }
  })
})

langBtn.addEventListener('click', () => {
  langWrap.classList.toggle('active');
  searchBox.style.display = 'none'
})

searchBox.style.display = 'none'; //초기값, 
searchBtn.addEventListener('click', () => {
  // header.classList.toggle('scroll')
  // searchBox.classList.toggle('show')

  // 토글 직접 작성
  if(searchBox.style.display === 'none') {
    searchBox.style.display = 'flex';
    header.classList.add('scroll');
    langWrap.classList.remove('active')
  } else {
    searchBox.style.display = 'none';
    // header.classList.remove('scroll'); => 무조건 remove
    if(window.scrollY < header.offsetHeight) {
      header.classList.remove('scroll')
    }
  }
})


const allmenuOpenBtn = document.querySelector('.allmenu-open');
const allmenuCloseBtn = document.querySelector('.allmenu-close');
const allmenu = document.querySelector('.allmenu-popup')

allmenuOpenBtn.addEventListener('click', () => {
  allmenu.style.display = 'flex';
  document.documentElement.style.overflow = 'hidden';
  langWrap.classList.remove('active');
  searchBox.style.display = 'none';

  if(window.scrollY < header.offsetHeight) {
    header.classList.remove('scroll')
  }
})
allmenuCloseBtn.addEventListener('click', () => {
  allmenu.style.display = 'none';
  document.documentElement.style.overflow = 'auto';
})

/** main-visual-swiper */
const progressBar = document.querySelector('.main-swiper .bar');
const playBtn = document.querySelector('.main-swiper .btn-play');
const stopBtn = document.querySelector('.main-swiper .btn-stop');
let progressTimeout;
let startTime = 0;
let pausedTime = 0; //일시정지 된 시간을 담을 변수
let isPaused = false;
let animationDuration = 5000;

document.documentElement.style.setProperty('--animaiton-duration',`${animationDuration}ms`)
  //css에 사용할 변수 설정 :root {} , html {} //documentElement => html 태그

//** 문제점
// 스탑버튼 
// => 키프레임 애니메이션 : 일시정지
// => 스와이퍼 : 완전정지, => 스와이퍼는 일시정지 기능이 없음

// 플레이버튼
// => 키프레임 : 남은 시간 플레이
// => 스와이퍼 : 새로 시작

// ** 스탑버튼 클릭 했을 때의 진행 시간을 기록 // pausedAt
//  */

// console.log(performance.now());
let start = performance.now();

document.querySelector('header h1').addEventListener('click', function() {
  let eTime = performance.now()
  console.log(` 클릭시간: ${eTime}, 시작시간 : ${start},경과시간 : ${eTime - start}`);
})



const mainSwiper = new Swiper('.main-swiper', {
  autoplay: {
    delay: animationDuration,
  },
  effect: 'fade',
  loop: true,
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  on: {
    init: () => { //초기에 한번만 실행
      resetProgressBar();
    },
    slideChangeTransitionStart : () => {
      //progress bar animation
      resetProgressBar();
      mainSwiper.autoplay.start();
      stopBtn.style.display = 'block';
      playBtn.style.display = 'none';
    }
  }
});

function resetProgressBar() {
  startTime = performance.now() //함수가 호출된 시점의 시간을 저장해 둠

  // 애니메이션
  progressBar.style.animation = 'none'; 
  progressBar.offsetHeight;
  progressBar.style.animation = `progress ${animationDuration}ms linear`

  progressTimeout = setTimeout(() => {}, animationDuration)
}

playBtn.addEventListener('click', () => {
  //애니메이션 runnig
  progressBar.style.animationPlayState = 'running';
  //스와이퍼 오토플레이 속성 시작
  // mainSwiper.autoplay.start();

  

  //스탑버튼으로 바꿈
  stopBtn.style.display = 'block';
  playBtn.style.display = 'none';
})

stopBtn.addEventListener('click', () => {
  isPaused = true; // 일시정지 상황을 변수에 저장
  pausedTime = performance.now() - startTime; // 스탑버튼이 클릭된 시간에서 애니메이션 함수(resetProgressBar)가 호출된 시간을 뺌


  //애니메이션 paused => animation-play-state: paused;
  progressBar.style.animationPlayState = 'paused';
  //스와이퍼 오토플레이 속성 멈춤
  mainSwiper.autoplay.stop();

  //플레이버튼으로 바꿈
  stopBtn.style.display = 'none';
  playBtn.style.display = 'block';
})

/** Faculty */
const facultySwiper = new Swiper('.faculty-swiper', {
  loop: true,
  autoplay: {delay: 0}, //다음 애니메이션 시작 시간과의 간격
  speed: 4000,
  // slidesPerView : 4, //화면에 보여질 슬라이드 갯수
  slidesPerView : 'auto', //css에 적용된 크기
  //** 연속적으로 자연스럽게 흐르게 => css의 transition-timing-function: linear
  // spaceBetween: 60
});

/** tab - news section */
const newsTabs = document.querySelectorAll('.tab-btns button');
const newsContents = document.querySelectorAll('.tab-contents .cont-box')

newsTabs.forEach((tab, i) => {
   tab.addEventListener('click', function() {
    newsTabs.forEach(t => t.classList.remove('active'))
    this.classList.add('active')
    // newsTabs[i].classList.add('active')

    //* Contents
    newsContents.forEach(cont => cont.style.display = 'none');
    newsContents[i].style.display = 'block'
   })
})

/* Banner */
const bannerBar = document.querySelector('.banner-wrap .bar')
const bannerLink = document.querySelector('.banner-wrap .main-link') 

bannerLink.addEventListener('mouseenter', () => {
  bannerBar.style.animation = 'none'; //애니메이션 초기화
  bannerBar.offsetHeight; //요소를 다시 찾아서 아래 animation을 다시 시작

  bannerBar.style.animation = 'progress 1s' //애니메이션 다시 시작
})