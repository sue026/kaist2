// ** popup
const btnPopup = document.querySelector('#popup button')
btnPopup.addEventListener('click', function() {
   document.querySelector('#popup').style.display = 'none';
})

/* 헤더 */
//** 헤더 scroll
const header = document.querySelector('#header')

header.addEventListener('mouseenter', function() {
   header.classList.add('scroll')
})
header.addEventListener('mouseleave', function() {
   header.classList.remove('scroll')
})

//** allmenu
const btnAllmenuOpen = document.querySelector('.header-util .allmenu-open')
const btnAllmenuClose = document.querySelector('.header-util .allmenu-close')
const allmenu = document.querySelector('.header-util .allmenu-popup')

btnAllmenuOpen.addEventListener('click', function() {
   allmenu.style.display = 'flex';
   document.documentElement.style.overflow = 'hidden'
})
btnAllmenuClose.addEventListener('click', function() {
   allmenu.style.display = 'none';
   document.documentElement.style.overflow = 'auto'
})

//** language
const btnLang = document.querySelector('.header-util .lang-wrap button')
const langWrap = document.querySelector('.header-util .lang-wrap')

btnLang.addEventListener('click', function() {
   langWrap.classList.toggle('active')
   // searchbox 안보임
   document.querySelector('#header').classList.add('scroll')
})


/* 푸터 */
const familyBtn = document.querySelector('#footer .family-site button');
const familyList = document.querySelector('#footer .family-site ul');

familyBtn.addEventListener('click', function() {
   // familyList.style.display = 'block'
   familyList.classList.toggle('on')
})

/* 메인비주얼 스와이퍼 */
const mainSwiper = new Swiper('.main-swiper', {
//   speed: 400,
//   spaceBetween: 100,
   autoplay: true,
   effect: 'fade',
   loop: true,
   pagination: {
      el: ".swiper-pagination",
   },
});


/* 배너 */
const bannerLink = document.querySelector(".banner-wrap .main-link")
const bannerBar = document.querySelector(".banner-wrap .progress .bar")

bannerLink.addEventListener('mouseover', function() {   
   bannerBar.style.animation = "progress 1s linear"// 애니메이션 실행
})
bannerLink.addEventListener('mouseout', function() {   
   bannerBar.style.animation = "none" //초기화
})

// bannerLink.style.width = "500px"


//tab
const newsTabs = document.querySelectorAll('.tab-btns button');

newsTabs.forEach(tab => {
   tab.addEventListener('click', function() {
      newsTabs.forEach(t => t.classList.remove('active'))
      this.classList.add('active')
   })
})
