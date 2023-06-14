// scroll to top button action
let scrol = document.querySelector('.scroll-button');
scrol.addEventListener('click', () => {
  scrollTo(0,0)
})

// Toggle Menu
let bars = document.querySelector('i.fa-bars');
let menu = document.querySelector('ul.menu');
bars.addEventListener('click',() => {
  gear.classList.remove('opened');
  gearBox.classList.remove('active');
  bars.classList.toggle('opened');
  menu.classList.toggle('active');
});


// Settings Gear
let gear = document.querySelector('i.fa-gear');
let gearBox = document.querySelector('.gear-box');
gear.addEventListener('click', () => {
  bars.classList.remove('opened');
  menu.classList.remove('active');
  gear.classList.toggle('opened');
  gearBox.classList.toggle('active');
});


// Color Options
let colors = document.querySelectorAll('.colors li');
let mainColor = localStorage.getItem('color-option') ?? '#1cc5f0';
document.documentElement.style.setProperty('--main-color', mainColor);
colors.forEach( (li) => {
  li.classList.remove('active');
  if (li.dataset.color === mainColor) {
    li.classList.add('active')
  };
  li.addEventListener('click', () => {
    document.documentElement.style.setProperty('--main-color', li.dataset.color);
    localStorage.setItem('color-option', li.dataset.color);
    colors.forEach((ele) => 
      {ele.classList.remove('active')}
    );
    li.classList.add('active');
  });
});


// -----------------------  Image Slider --------------------

// add images to html page
let imgs = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg'];
let slider = document.querySelector('.landing .slider')
imgs.forEach( (img) => {
  let imgElemnet = document.createElement('img');
  imgElemnet.src = `imgs/${img}`
  slider.prepend(imgElemnet)
});
let dotsParent = document.querySelector('.landing .dots');
for (i of imgs) {
  let dotSpan = dotsParent.appendChild(document.createElement('span'));
  dotSpan.classList.add('d-inline-block','rounded-pill', 'm-sm-1');
};
let images = document.querySelectorAll('.slider img');


// margin left array
let marginArr =[];
let y = 0;
for (i of images){
  marginArr[y] =`-${y}00%`
  y+=1;
}

// arrows image slider
let Arrows = document.querySelectorAll('.landing i.fa-solid');
var i =0
var curentMargin = marginArr[i];
function activation(i) {
  if (i >= marginArr.length -1) {
    Arrows[1].classList.add('disaply');
  } else {
    Arrows[1].classList.remove('disaply');
  }
  if (i <= 0) {
    Arrows[0].classList.add('disaply');
  } else {
    Arrows[0].classList.remove('disaply');
  }
};
Arrows[0].classList.add('disaply');

Arrows[1].addEventListener('click', () => {
  curentMargin = marginArr[i];
  if (i !== marginArr.length ) {
    activation(i);
    i+=1;
  } 
  images[0].style.marginLeft = curentMargin;
  dotActive(i)
});

Arrows[0].addEventListener('click', () => {
  if (i !== 0 ) {
    i -= 1;
    activation(i);
  };
  images[0].style.cssText = `margin-left: ${marginArr[i -1]};`;
  dotActive(i)
});

// Slider active dot 
let dots = document.querySelectorAll('.dots span');
dots[0].classList.add('active');
function dotActive(i){
  dots.forEach((d) => {
    d.classList.remove('active')
  });
  dots[i].classList.add('active')
}

// Auto slider
let arrowElement = document.querySelector('.arrows');
let toggle = document.querySelector('.toggle-switch span');

let Handler;
let x = 1;
function autoSlider() {
  Handler = setInterval(() => {
    if (x == images.length){
      x = 0;
    };
    images[0].style.marginLeft = marginArr[x];
    dotActive(x);
    activation(x);
    x += 1;
  }, 2500);
};
autoSlider() 

// switch auto slider
toggle.addEventListener('click', () => {
  toggle.classList.toggle('off');
  if (toggle.classList.contains('off')) {
    clearInterval(Handler)
  } else {
    autoSlider();
  }
});


// ------------------- Skills Progress
let analysis = document.querySelector('.skills .analysis')
let widthSpans = document.querySelectorAll('.skills .line-bar div span')
window.onscroll = () => {
  let t = analysis.offsetTop
  let w = window.innerHeight
  let p = window.pageYOffset
  if (p >= t -w) {
    widthSpans.forEach((span) => {
      span.style.width = span.dataset.percentage;
    })
  }
  // visibilty of scroll to top button
  if (p > 600) {
    scrol.classList.add('active')
  } else {
    scrol.classList.remove('active')
  }
}


// ------------------- Gallery
let imgCards = document.querySelectorAll('.gallery .car img');
let overlay = document.querySelector('body .over-lay');
let openedImg = document.createElement('img');
let popup =document.querySelector('body .over-lay .popup');

imgCards.forEach((img)=> {
  img.addEventListener('click', (el) => {
    overlay.classList.add('active');
    openedImg.src = el.target.src;
    popup.appendChild(openedImg)
  });
})

let closePop = document.querySelector('.over-lay .popup span')
closePop.addEventListener('click',()=>{
  overlay.classList.remove('active');
})


