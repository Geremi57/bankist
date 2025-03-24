'use strict';

//element///////////selection////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnscrollto = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window
//////////////////////////////////////
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

////////element//////selection/////
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');

/////butttons////for/////opening/////closing///////modals///
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
// btnsOpenModal[i].addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);

//////display/////blurry/////background////
overlay.addEventListener('click', closeModal);

//////add////escape/////key/////for/////exiting///modal////
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//BUTTON SCROLLING
//////learn//////more////////button/////for////section//1
btnscrollto.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coods = section1.getBoundingClientRect();
  console.log(s1coods);

  console.log(e.target.getBoundingClientRect());

  console.log('current scrol(x/y)', window.scrollX, window.scrollY);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // window.scrollTo(s1coods.left, s1coods.top);

  // window.scrollTo({
  //   left: s1coods.left + scrollX,
  //   top: s1coods.top + scrollY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////
//PAGE NAVIGATION
////////////////////

///navigations////for///links//////on/////the/////header
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     // id.scrollIntoView({ behavior: 'smooth' });
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();

  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
    console.log('link');
  }
});

/////////building/////// a/////// tabbed//////// componenet
// tabs.f orEach(t => t.addEventListener('click', () => console.log('tab')));

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //guard clause
  if (!clicked) return;

  //clearing the class on all of them

  //adding the class on one of them

  //active content
  // document
  //   .querySelector('.operations__content')
  //   .classList.remove('.operations__tab--active');

  //removing classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  tabsContent.forEach(function (el) {
    console.log(el);
    el.classList.remove('operations__content--active');
  });

  //activate tab
  clicked.classList.add('operations__tab--active');

  //activate content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');

  console.log(clicked.dataset);
});

//menu fade animation

const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  // e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
    // console.log(sibling);
  }
};

//passing an srgument into a handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1.0));

//Sticky navigation
// const initialCoods = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   // console.log(this.window.scrollY);
//   if (window.scrollY > initialCoods.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
//   console.log(initialCoods);
// });

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  entries.forEach(entry => {
    // console.log(entry.isIntersecting);
    // const [entry] = entries;
    if (entry.isIntersecting) nav.classList.remove('sticky');
    else if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    }
    // if(entry.is)
  });
  // observe.unobserve
};
const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerobserver = new IntersectionObserver(stickyNav, observerOptions);
headerobserver.observe(header);

///////////////////////////////
//reveal section as we approach
///////////////////////////////

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  // entries.forEach(entry => {
  console.log(entries);
  const [entry] = entries;
  console.log(entry.target);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
  // });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy loading images
const imageTargets = document.querySelectorAll('img[data-src]');

// console.log(imageTargets);
const loading = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  //replace src attribute with data-src
  console.log(entry.target.classList);

  entry.target.src = entry.target.dataset.src;
  // entry.target.remove('lazy-img');

  // console.log(entry);
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,

  threshold: 0,
  rootMargin: '200px',
});

imageTargets.forEach(img => imgObserver.observe(img));

// implementing the slider component (testimonials)

//slider

const sliders = function () {
  const slides = document.querySelectorAll('.slide');

  const btnLeft = document.querySelector('.slider__btn--left');

  let currSlide = 0;
  const maxslide = slides.length;

  const btnRight = document.querySelector('.slider__btn--right');

  const dotContainer = document.querySelector('.dots');

  //functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class = "dots__dot" 
      
    data-slide =  "${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide = "${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // gotoSlide(0);
  // activateDot(0);

  //next slide
  const nextSlide = function () {
    if (currSlide === maxslide - 1) currSlide = 0;
    else {
      currSlide++;
    }
    gotoSlide(currSlide);
    activateDot(currSlide);
  };

  const prevSlide = function () {
    // currSlide--;
    if (currSlide === 0) currSlide = maxslide - 1;
    else {
      currSlide--;
    }

    gotoSlide(currSlide);
    activateDot(currSlide);
  };

  const init = function () {
    gotoSlide(0);
    createDots();
    activateDot(0);
  };

  init();
  //event handlers
  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log('dot');

      const currSlide = Number(e.target.dataset.slide);
      gotoSlide(currSlide);
      activateDot(currSlide);
    }
  });
};

sliders();

//0, 100, 200, 300
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const observerOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallback, observerOptions);

// observer.observe(section1);

// document
//   .querySelector('.operations')
//   .querySelectorAll('.operations__tab')
//   .forEach(t => t.addEventListener('click', () => console.log('tabs pressed')));

// console.log(document.documentElement);
// console.log(document.body);

// const allSections = document.querySelectorAll('.section');

// const callBack = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 1, 0.2],
// };

// const observer = new IntersectionObserver(callBack, obsOptions);

// observer.observe(section1);

// console.log(allSections);

// document.getElementById('section--1');

// const allButtons = document.getElementsByTagName('div');
// console.log(allButtons);

// console.log(document.getElementsByClassName('section'));

// //creating and inserting elements
// //.insertAdjacentHtml
// const header = document.querySelector('.header');
// // let html = '<p> yeaaah </p>';

// // header.insertAdjacentHTML('afterend', html);

const message = document.createElement('div');

message.classList.add('cookie-message');
message.texContent =
  'we use cookies for improved for functionality and analytics';

message.innerHTML =
  'we use cookies for improved for functionality and analytics, <button class= "btn btn--close-cookie" >Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.parentElement.removeChild(message);
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).backgroundColor);

console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseInt(getComputedStyle(message).height, 10) + 30 + 'px';

// // console.log(height);
// console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// logo.alt = 'Beautiful minimalist logo';
// logo.setAttribute('company', 'oliro');

// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.getAttribute('company', 'oliro'));

// console.log(logo.getAttribute('src'));

// console.log(logo.dataset.versionNumber);

// Events;
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great you are reading the heading :D');
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);l
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great you are reading the heading :D');
// };

// function randomInt(max, min) {
//   if (Math.random() * 1000 > min && Math.random() * 1000 < max)
//     console.log(Math.round(Math.random() * 1000));
// }

// randomInt(255, 0);
//rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)},
// ${randomInt(0, 255)},
// ${randomInt(0, 255)}

// )`;

// // console.log(randomColor(0, 255));

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();

//   console.log('link', e.target, e.currentTarget);
//   // console.log('link');
//   // e.stopPropagation();
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     e.preventDefault();
//     this.style.backgroundColor = randomColor();
//     console.log('container', e.target, e.currentTarget);
//   },
//   true
// );

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('nav links', e.target, e.currentTarget);

//   // console.log('link');
// });

// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight'));

// console.log(h1.childNodes);
// console.log(h1.children);
// console.log((h1.firstElementChild.style.color = 'white'));
// console.log((h1.lastElementChild.style.color = 'orangered'));

// //doing upwards
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// // console.log();
// // h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // console.log();

// //going sideways
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(1.0)';
// });

// const section = document.querySelector('.section__title');

// console.log(
//   [...section.parentElement.children].forEach(
//     e => (e.style.background = 'orangered')
//   )
// )

// Dom content loaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('Html parsed and dom tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
