// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.onload = function() {
    const { body } = document;
    body.classList.add("load-page");
};

export default class AccentTypographyBuild {
  constructor(
    elementSelector,
    timer,
    classForActivate,
    property
  ) {
    this._TIME_SPACE = 100;

    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelectorAll(this._elementSelector);
    this._timeOffset = 0;
    
    this.prePareText();
  }
  
  createElement(letter) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;
    this._timeOffset += 20;
    return span;
  }
  
  prePareText() {
    if (!this._element) {
      return;
    }
    this._element.forEach((element) => {
        const text = element.textContent.trim().split(` `).filter((latter)=>latter !== '');

        const content = text.reduce((fragmentParent, word) => {
        const wordElement = Array.from(word).reduce((fragment, latter) => {
            fragment.appendChild(this.createElement(latter));
            return fragment;
        }, document.createDocumentFragment());
        const wordContainer = document.createElement(`span`);
        wordContainer.classList.add(`letter-animation-active`);
        wordContainer.appendChild(wordElement);
        fragmentParent.appendChild(wordContainer);
        return fragmentParent;
        }, document.createDocumentFragment());

        element.innerHTML = ``;
        element.appendChild(content);
    });
  }
  
  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.forEach((element) => {
        element.classList.add(this._classForActivate);
    });
  }
}

const animationTopScreenTextLine = new AccentTypographyBuild(`.js-letter-animation`, 500, `active`, `transform`);
setTimeout(()=>{
  animationTopScreenTextLine.runAnimation();
}, 1000);
