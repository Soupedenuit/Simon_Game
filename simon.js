// 'use strict';

/********************************************
*********************************************
**  Copyright (C) 2017
**  AUTHOR:  Tony Whomever
**   PLACE:  Ottawa, ON, Canada
**    DATE:  October-November 2017
**
*********************************************
********************************************/
// "use strict";  // Uncaught SyntaxError: In strict mode code, functions can only be declared at top level or inside a block.

var simonModule = function () {
  // init: function() {
  // this.cacheDom();
  // this.bindEvents();
  // },
  // cacheDom: function() {

  var cacheDom = {
    allColorButtons: document.getElementById('layer2'),
    upperLeftGreen: document.getElementById('upper-left-green'),
    upperRightRed: document.getElementById('upper-right-red'),
    lowerLeftYellow: document.getElementById('lower-left-yellow'),
    lowerRightBlue: document.getElementById('lower-right-blue'),
    innerCircle: document.getElementById('inner-circle')
  };

  var quadrants = {
    1: cacheDom.upperLeftGreen,
    2: cacheDom.upperRightRed,
    3: cacheDom.lowerLeftYellow,
    4: cacheDom.lowerRightBlue
  };

  var colors = {
    defaultGreen: cacheDom.upperLeftGreen.getAttribute('fill'),
    defaultRed: cacheDom.upperRightRed.getAttribute('fill'),
    defaultYellow: cacheDom.lowerLeftYellow.getAttribute('fill'),
    defaultBlue: cacheDom.lowerRightBlue.getAttribute('fill')
  };

  var getColor = function getColor(id) {
    var color = void 0;
    id === 'upper-left-green' ? color = colors.defaultGreen : id === 'upper-right-red' ? color = colors.defaultRed : id === 'lower-left-yellow' ? color = colors.defaultYellow : id === 'lower-right-blue' ? color = colors.defaultBlue : null;
    return color;
  };

  const getQuad = function(el) {
    let quad;
    el === 'upper-left-green' ? quad = 1 :
    el === 'upper-right-red' ? quad = 2 :
    el === 'lower-left-yellow' ? quad = 3 :
    el === 'lower-right-blue' ? quad = 4 :
    null;
    return quad;
  };

  var rgbModifierLights = function rgbModifierLights(rgb, change) {
    var rgbIn = rgb.match(/\d+/g);
    var rgbOut = rgbIn.map(function (x) {
      x = Number(x) + change;
      return x;
    });
    return 'rgb(' + rgbOut.join(',') + ')';
  };

  var lightOn = function lightOn(element, intensity) {
    var rgbIn = element.getAttribute('fill');
    var rgbOut = rgbModifierLights(rgbIn, intensity);
    element.setAttribute('fill', rgbOut);
  };

  var lightOff = function lightOff(element) {
    var color = getColor(element.id);
    element.setAttribute('fill', color);
  };

  /********************************************
   Light show functions:
  ********************************************/

  var lightShowPattern = function lightShowPattern(loopTime) {
    var quadsPattern = [1, 3, 2, 4];
    quadsPattern.forEach(function (x) {
      return lightShowSettings(x, loopTime);
    });
  };

  var lightShowSettings = function lightShowSettings(quad, loopTime) {
    var el = void 0;
    quad === 1 ? el = quadrants[1] : quad === 2 ? el = quadrants[2] : quad === 3 ? el = quadrants[3] : quad === 4 ? el = quadrants[4] : null;
    lightShowSettings2(quad, el, loopTime);
  };

  var lightShowSettings2 = function lightShowSettings2(quad, el, loopTime) {
    quad === 1 ? lightShow1(1, el, loopTime) : quad === 2 ? lightShow2(2, el, loopTime) : quad === 3 ? lightShow3(3, el, loopTime) : quad === 4 ? lightShow4(4, el, loopTime) : null;
    // timeoutOn = setTimeout(function() {
    // lightOn(el, 50);
    // }, 500 * quad);
    // timeoutOff = setTimeout(function() {
    // lightOff(el);
    // }, 2000 + 500 * quad);
  };

  var lightShow1 = function lightShow1(quad, el, loopTime) {
    var lapseStart = loopTime / 8;
    var lapseEnd = loopTime / 2;
    timeoutOn1 = setTimeout(function () {
      lightOn(el, 50);
    }, lapseStart * quad);
    timeoutOff1 = setTimeout(function () {
      lightOff(el);
    }, lapseEnd + lapseStart * quad);
  };

  var lightShow2 = function lightShow2(quad, el, loopTime) {
    var lapseStart = loopTime / 8;
    var lapseEnd = loopTime / 2;
    timeoutOn2 = setTimeout(function () {
      lightOn(el, 50);
    }, lapseStart * quad);
    timeoutOff2 = setTimeout(function () {
      lightOff(el);
    }, lapseEnd + lapseStart * quad);
  };

  var lightShow3 = function lightShow3(quad, el, loopTime) {
    var lapseStart = loopTime / 8;
    var lapseEnd = loopTime / 2;
    timeoutOn3 = setTimeout(function () {
      lightOn(el, 50);
    }, lapseStart * quad);
    timeoutOff3 = setTimeout(function () {
      lightOff(el);
    }, lapseEnd + lapseStart * quad);
  };

  var lightShow4 = function lightShow4(quad, el, loopTime) {
    var lapseStart = loopTime / 8;
    var lapseEnd = loopTime / 2;
    timeoutOn4 = setTimeout(function () {
      lightOn(el, 50);
    }, lapseStart * quad);
    timeoutOff4 = setTimeout(function () {
      lightOff(el);
    }, lapseEnd + lapseStart * quad);
  };

  /*var asdf = function(i) {
    let x = 'timeoutOn' + i;
    clearTimeout(x);
    let y = 'timeoutOff' + i;
    console.log(y);
    clearTimeout(y);
  };*/

  var lightShowSwitch = false;

  var lightShowStart = function lightShowStart(loopTime) {
    if (!lightShowSwitch) {
      console.log(lightShowSwitch);
      lightShowPattern(loopTime);
      intervalOnOff = setInterval(function () {
        lightShowPattern(loopTime);
      }, loopTime);
      intervalH1 = setInterval(function () {
        h1Colorizer('letters');
      }, 100);
      lightShowSwitch = !lightShowSwitch;
    } else {
      /*for ( let i = 1; i < 5; i++ ) {
        asdf(i);
      }*/ //does not work
      clearTimeout(timeoutOn1);
      clearTimeout(timeoutOff1);
      clearTimeout(timeoutOn2);
      clearTimeout(timeoutOff2);
      clearTimeout(timeoutOn3);
      clearTimeout(timeoutOff3);
      clearTimeout(timeoutOn4);
      clearTimeout(timeoutOff4);
      clearInterval(intervalOnOff);
      clearInterval(intervalH1);
      lightOff(cacheDom.upperLeftGreen);
      lightOff(cacheDom.upperRightRed);
      lightOff(cacheDom.lowerLeftYellow);
      lightOff(cacheDom.lowerRightBlue);
      h1Colorizer('words');
      console.log(lightShowSwitch);
      lightShowSwitch = !lightShowSwitch;
    }
  };

  var resetQuadColors = function resetQuadColors() {
    quadrants[1].setAttribute('fill', colors.defaultGreen);
    quadrants[2].setAttribute('fill', colors.defaultRed);
    quadrants[3].setAttribute('fill', colors.defaultYellow);
    quadrants[4].setAttribute('fill', colors.defaultBlue);
  };

  var wrongAnswerLights = function wrongAnswerLights() {
    var allQuads = cacheDom.allColorButtons.childNodes;
    var color = void 0;
    var colors = ['red', 'white'];
    var position = true;
    var counter = 0;
    var interval = setInterval(function () {
      position === true ? color = colors[0] : color = colors[1];
      for ( var i = 0; i < allQuads.length; i++ ) {
        if (allQuads[i].nodeType === 1) {
          allQuads[i].setAttribute('fill', color);
        }
      }
      position = !position;
      counter++;
      if (counter === 6) {
        clearInterval(interval);
        resetQuadColors();
      }
    }, 150);
  };

  /********************************************
   Heading (h1) colorizer:
  ********************************************/

  var position = 0;
  var h1Colorizer = function h1Colorizer(letters_words) {
    var h1 = document.querySelector('h1');
    var h1ArrLetters = h1.textContent.split('');
    var h1ArrWords = h1.textContent.split(' ');
    var h1Colors = {
      0: '4e9a60',
      1: 'cc0000',
      2: '3465a4',
      3: 'ffc022'
    };
    var alpha = void 0;
    letters_words === 'letters' ? alpha = h1ArrLetters : letters_words === 'words' ? alpha = h1ArrWords : null;
    var h1ArrColorized = alpha.map(function (x, index) {
      var y = void 0;
      var indexShift = index + position;
      if (indexShift <= 3) {
        y = indexShift;
      } else {
        y = indexShift % 4;
      }
      return '<span style="color:#' + h1Colors[y] + ';">' + x + '</span>';
    });
    var h1ColorizedLetters = h1ArrColorized.join('');
    var h1ColorizedWords = h1ArrColorized.join(' ');
    letters_words === 'letters' ? h1.innerHTML = h1ColorizedLetters : letters_words === 'words' ? h1.innerHTML = h1ColorizedWords : null;
    position++;
    if (position > h1Colors.length) {
      position = 0;
    }
  };

  var h1ColorReset = function h1ColorReset() {
    var h1 = document.querySelector('h1');
    var text = h1.textContent;
    h1.innerHTML = '<span style="color:#ccc">' + text + '</span>';
  };

  h1Colorizer('words');
  zxcvb = setInterval(function () {
    h1Colorizer('words');
  }, 100);
  setTimeout(function () {
    h1ColorReset();
    clearInterval(zxcvb);
    h1Colorizer('words');
    document.getElementById('main-board').classList.remove('board-intro');
    document.getElementById('start').style.visibility = 'visible';
  }, 2900); // equal to CSS animation-duration plus delay minus interval


  /********************************************
   Game functions:
  ********************************************/

  var randomQuads = [];

  var randomizer = function randomizer() {
    var nextQuad = Math.floor(Math.random() * 4 + 1);
    randomQuads.push(nextQuad);
  };

  // const controls1 = document.getElementById('controls1');
  // const controls2 = document.getElementById('controls2');

  // adds & removes hover class on quads:
  var hoverQuadsOnOff = function hoverQuadsOnOff(x) {
    var allQuads = cacheDom.allColorButtons.childNodes;
    if (x === 'on') {
      for ( var i = 0; i < allQuads.length; i++ ) {
        if (allQuads[i].nodeType === 1) {
          allQuads[i].classList.add('quads-hover-on-off');
        }
      }
    }
    if (x === 'off') {
      for ( var i = 0; i < allQuads.length; i++ ) {
        if (allQuads[i].nodeType === 1) {
          allQuads[i].classList.remove('quads-hover-on-off');
        }
      }
    }
  };

  // main game controls outside of user actions:
  // var quadClickerEventType = 'click'; //default
  var startGame = function startGame() {
    randomizer();
    var startButton = document.getElementById('start');
    document.getElementById('colorSequence').style.visibility = 'hidden';
    startButton.setAttribute('disabled', true);
    disableStartButton();
    startButton.classList.remove('start-hover-on-off');
    var color = ['green', 'red', 'yellow', 'blue'];
    var colorSequence = [];
    // let colorCodes = ['rgb(68,144,86)', 'rgb(194,0,0)', 'rgb(245,184,22)', 'rgb(42,91,154)'];
    var colorCodes = [colors.defaultGreen, colors.defaultRed, colors.defaultYellow, colors.defaultBlue];
    var text = '<ins>Color sequence was</ins><br/>';
    var el = document.querySelector('#colorSequence');
    var lightOnLength = document.getElementById('lightOnLength').value;
    console.log('lightOnLength (before):  ' + lightOnLength);
    // Radio buttons control speed (length of lightOn) & intermittent (time between lights on):
    var radioSetting = document.querySelectorAll('.radio');
    lightOnLength > 0 ? lightOnLength = lightOnLength : radioSetting[0].checked ? lightOnLength = 800 : radioSetting[1].checked ? lightOnLength = 550 : radioSetting[2].checked ? lightOnLength = 300 : null;
    console.log('lightOnLength (after):  ' + lightOnLength);
    var intermittent = Math.round(lightOnLength / 3);
    console.log('intermittent: ' + intermittent);
    var lightOffStart = Number(lightOnLength) + intermittent;
    var cycleStart = Number(lightOffStart) + intermittent;
    randomQuads.forEach(function (x, index) {
      setTimeout(function () {
        lightOn(quadrants[x], 70);
        lightBeep(x, lightOnLength);
      }, intermittent + cycleStart * index); //200 + 1000
      setTimeout(function () {
        lightOff(quadrants[x]);
      }, lightOffStart + cycleStart * index); //600 + 1000
      colorSequence.push(color[x - 1]);
    });
    colorSequence.forEach(function (x) {
      var y = color.indexOf(x);
      text += '<span style="color: ' + colorCodes[y] + ';">\u25CF </span>';
    });
    var lgt = colorSequence.length;
    setTimeout(function (lgt) {
      el.innerHTML = text;
    }, intermittent + cycleStart * (lgt - 1)); //200 + 1000
    document.getElementById('start').innerHTML = 'round<br />' + randomQuads.length;
    setTimeout(function (lgt) {
      addQuadClickerEvent();
      hoverQuadsOnOff('on');
    }, cycleStart * lgt);
  }; // end of startGame function


  // game controls based on user actions:
  var gameClickerPosition = 0;
  var gameClicker = function gameClicker(el) {
    var startButton = document.getElementById('start');
    var lgt = randomQuads.length;
    if (lgt === 0) {
      return;
    } else {
      var currentQuad = randomQuads[gameClickerPosition];
      var nextQuadEl = quadrants[currentQuad];
      if (el === nextQuadEl) {
        startButton.innerHTML = 'correct';
        // console.log('right!');
        // console.log('gameClicker: ' + el.id);
        // console.log(nextQuadEl.id);
        gameClickerPosition++;
        // console.log(gameClickerPosition);
      } else {
        wrongAnswerLights();
        hoverQuadsOnOff('off');
        removeQuadClickerEvent();
        let score = randomQuads.length - 1;
        startButton.innerHTML = 'wrong!';
        setTimeout(function () {
          startButton.innerHTML = 'score:<br />' + score;
        }, 900); // 150 * 6
        document.getElementById('colorSequence').style.visibility = 'visible';
        setTimeout(function () {
          startButton.innerHTML = 'try<br />again';
          startButton.removeAttribute('disabled');
          enableStartButton();
          startButton.classList.add('start-hover-on-off');
        }, 5000);
        setTimeout(function () {
          if ( startButton.innerHTML === 'try<br>again' ) {
            startButton.innerText = 'start';
          }
        }, 15000);
        // console.log('wrong!');
        // console.log('gameClicker: ' + el.id);
        // console.log(nextQuadEl.id);
        randomQuads = [];
        gameClickerPosition = 0;
        return;
      }
      if (gameClickerPosition === lgt) {
        startButton.innerHTML = 'nice!';
        removeQuadClickerEvent();
        hoverQuadsOnOff('off');
        setTimeout(startGame, 2000);
        gameClickerPosition = 0;
      }
    }
  };

  // Audio API for lightOn sounds:
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);
  gainNode.gain.value = 0.3;

  var notes = {
    C: 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392,
    'G#': 415.30,
    'A': 440,
    'A#': 466.16,
    'B': 493.88
  };

  function lightBeep(el, duration) {
    var oscillator = audioCtx.createOscillator();
    oscillator.connect(gainNode);
    oscillator.type = 'triangle'; //default
    // oscillator.frequency.value = 440;
    let note;
    if ( typeof el !== 'number' ) {
      el = getQuad(el);
    }
    el === 1 ? note = notes['C'] :
    el === 2 ? note = notes['E'] :
    el === 3 ? note = notes['G'] :
    el === 4 ? note = notes['A'] :
    null;
    oscillator.frequency.value = note;
    oscillator.start();
    setTimeout(function() {
      oscillator.stop();
    }, duration);
  }


  /********************************************
   Modify SVG (other than colour):
  ********************************************/

  /*
    const moveQuad = function() {
      let quad = document.querySelectorAll('path')[3];
      let trans = 'rotate(-45)';
      quad.setAttribute('transform', trans);
    }
    moveQuad();
    */


  /********************************************
   Event Listeners:
  ********************************************/

  function innerCircleLightShowStart(event) {
    lightShowStart(400);
    if ( event.type === 'touchstart' ) {
      event.preventDefault();
      console.log(event.type);
      // event.stopPropagation();
    }
  }

  // Click or touch inner circle to turn light show on/off:
  cacheDom.innerCircle.addEventListener('click', innerCircleLightShowStart, false);
  cacheDom.innerCircle.addEventListener('touchstart', innerCircleLightShowStart, false);

  // Enables start button:
  function enableStartButton() {
    document.getElementById('start').addEventListener('click', startGame, false);
    document.getElementById('start').addEventListener('touchstart', startGame, false);
  }
  window.addEventListener('load', enableStartButton,false);

  // Disables start button:
  function disableStartButton() {
    document.getElementById('start').removeEventListener('click', startGame, false);
    document.getElementById('start').removeEventListener('touchstart', startGame, false);
  }

  // Click or touch quads to turn lights on. Allows to play the game:
  function quadClicker(event) {
    if (event.target !== event.currentTarget) {
      lightOn(event.target, 70);
      lightBeep(event.target.id, 300);
      setTimeout(lightOff.bind(null, event.target), 300);
      gameClicker(event.target);
      if ( event.type === 'touchstart' ) {
        event.preventDefault();
        console.log(event.type);
        // event.stopPropagation();
      }
      // console.log('eventListener (target): ' + event.target);
      // console.log('eventListener (target.id): ' + event.target.id);
      // console.log('eventListener (currentTarget.id): ' + event.currentTarget.id);
    }
  }

  // Enables quads:
  function addQuadClickerEvent() {
    cacheDom.allColorButtons.addEventListener('touchstart', quadClicker, false);
    cacheDom.allColorButtons.addEventListener('click', quadClicker, false);
  }

  // Disable quads (click):
  function removeQuadClickerEvent() {
    cacheDom.allColorButtons.removeEventListener('touchstart', quadClicker, false);
    cacheDom.allColorButtons.removeEventListener('click', quadClicker, false);
  }

  // Resets custom speed value when radio button clicked:
  document.getElementById('controls1').addEventListener('click', function () {
    document.getElementById('lightOnLength').value = 0;
    // document.querySelectorAll('.radio')[1].checked = true;
    event.stopPropagation();
  }, false);

  // Unchecks all radio buttons when speed value is adjusted (clicked):
  document.getElementById('controls2').addEventListener('click', function () {
    var radioSetting = document.querySelectorAll('.radio');
    radioSetting[0].checked = false;
    radioSetting[1].checked = false;
    radioSetting[2].checked = false;
  }, false);

  // Click outer rim for a wheel spin (CSS animation):
  document.getElementById('outer-rim').addEventListener('click', function () {
    document.getElementById('main-board').classList.add('board-spin');
    event.preventDefault();
    event.stopPropagation();
  }, false);

  // leaving outer rim removes board-spin class.
  // (this enables reusing same CSS animation again)
  document.getElementById('outer-rim').addEventListener('mouseout', function () {
    document.getElementById('main-board').classList.remove('board-spin');
  }, false);

  // Removes h1 if main board overlaps it:
  function h1Remover() {
    let h1 = document.getElementsByTagName('h1')[0];
    let board = document.getElementById('main-board');
    let x = h1.getBoundingClientRect().bottom;
    let y = board.getBoundingClientRect().top;
    // console.log(y - x);
    // console.log('window resized');
    if ( x > ( y + 10 ) ) {
      h1.classList.add('visible');
    }
    else {
      h1.classList.remove('visible');
    }
  }
  window.addEventListener('load', h1Remover,false);
  window.addEventListener('resize', h1Remover,false);


  /********************************************
   TESTING:
  ********************************************/

  // hovering over quads turns on the lights:
  // (for testing only)
  /*
    cacheDom.allColorButtons.addEventListener('mouseover', function(event) {
      if ( event.target !== event.currentTarget ) {
        lightOn(event.target, 50);
      }
      // event.stopPropagation();
    }, false);

    cacheDom.allColorButtons.addEventListener('mouseout', function(event) {
      if ( event.target !== event.currentTarget ) {
        lightOff(event.target);
      }
      // event.stopPropagation();
    }, false);
  */

  // Button for testing "wrong answer" lights:
  /*
  document.getElementById('wrong').addEventListener('click', wrongAnswerLights, false);
  allColorButtons.addEventListener('mouseenter',lightOn.bind(null, target, 30), false);
  allColorButtons.addEventListener('mouseleave', lightOff.bind(null, target), false);
  */

  // for testing only:
  /*
  function addPointer() {
    window.addEventListener('pointerdown', function onFirstPointer(event) {
      window.POINTER_SIZE = event.height;
      console.log(window.POINTER_SIZE);
      console.log(event);
      window.removeEventListener('pointerdown', onFirstPointer, false);
    }, false);
  }
  */

}();

// simonModule.init();


/********************************************
*********************************************
**  Copyright (C) 2017
**  AUTHOR:  Tony Whomever
**   PLACE:  Ottawa, ON, Canada
**    DATE:  October-November 2017
**
*********************************************
********************************************/
