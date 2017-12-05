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
    h1: document.getElementById('h1'),
    mainBoard: document.getElementById('main-board'),
    allColorButtons: document.getElementById('layer2'),
    upperLeftGreen: document.getElementById('upper-left-green'),
    upperRightRed: document.getElementById('upper-right-red'),
    lowerLeftYellow: document.getElementById('lower-left-yellow'),
    lowerRightBlue: document.getElementById('lower-right-blue'),
    innerCircle: document.getElementById('inner-circle'),
    startButton: document.getElementById('start'),
    innerCircleTextArea: document.getElementById('inner-circle-text')
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

  var misc = {
    gameClickerPosition: 0,
    strictMode: null, // value determined by strictModeSetter()
    quitGameTimeoutCleared: null,
    storedHighScoreSimon: Number(localStorage.getItem('storedHighScoreSimon'))
  }

  var getColor = function getColor(id) {
    var color = void 0;
    id === 'upper-left-green' ? color = colors.defaultGreen : id === 'upper-right-red' ? color = colors.defaultRed : id === 'lower-left-yellow' ? color = colors.defaultYellow : id === 'lower-right-blue' ? color = colors.defaultBlue : null;
    return color;
  };

  var getQuad = function(el) {
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

  var lightShowSwitch = false;

  var lightShowStart = function lightShowStart(loopTime) {
    if ( !lightShowSwitch ) {
      console.log(lightShowSwitch);
      lightShowPattern(loopTime);
      intervalOnOff = setInterval(function () {
        lightShowPattern(loopTime);
      }, loopTime);
      intervalH1 = setInterval(function () {
        textColorizer('letters', cacheDom.h1);
      }, 100);
      // intervalHighScore = setInterval(function () {
      //   textColorizer('letters', cacheDom.innerCircleTextArea);
      // }, 100);
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
      // clearInterval(intervalHighScore);
      lightOff(cacheDom.upperLeftGreen);
      lightOff(cacheDom.upperRightRed);
      lightOff(cacheDom.lowerLeftYellow);
      lightOff(cacheDom.lowerRightBlue);
      textColorizer('words', cacheDom.h1);
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
    cacheDom.startButton.innerHTML = 'wrong!';
    var allQuads = cacheDom.allColorButtons.childNodes;
    var color = void 0;
    var colors = ['red', 'white'];
    var position = true;
    var counter = 0;
    var interval = setInterval(function () {
      position === true ? color = colors[0] : color = colors[1];
      for ( var i = 0; i < allQuads.length; i++ ) {
        if ( allQuads[i].nodeType === 1 ) {
          allQuads[i].setAttribute('fill', color);
        }
      }
      position = !position;
      counter++;
      if ( counter === 6 ) {
        clearInterval(interval);
        resetQuadColors();
      }
    }, 150);
  };


  /********************************************
   Text colorizer:
  ********************************************/

  var position = 0;
  var textColorizer = function textColorizer(letters_words, target) {
    // var h1 = cacheDom.h1;
    var targetArrLetters = target.textContent.split('');
    var targetArrWords = target.textContent.split(' ');
    var targetColors = {
      0: '4e9a60',
      1: 'cc0000',
      2: '3465a4',
      3: 'ffc022'
    };
    var alpha = void 0;
    letters_words === 'letters' ? alpha = targetArrLetters : letters_words === 'words' ? alpha = targetArrWords : null;
    var targetArrColorized = alpha.map(function (x, index) {
      var y = void 0;
      var indexShift = index + position;
      if ( indexShift <= 3 ) {
        y = indexShift;
      } else {
        y = indexShift % 4;
      }
      return '<span style="color:#' + targetColors[y] + ';">' + x + '</span>';
    });
    var targetColorizedLetters = targetArrColorized.join('');
    var targetColorizedWords = targetArrColorized.join(' ');
    letters_words === 'letters' ? target.innerHTML = targetColorizedLetters : letters_words === 'words' ? target.innerHTML = targetColorizedWords : null;
    position++;
    if ( position > targetColors.length ) {
      position = 0;
    }
  };

  var textColorReset = function textColorReset(target) {
    // var h1 = cacheDom.h1;
    var text = target.textContent;
    target.innerHTML = '<span style="color:#ccc">' + text + '</span>';
  };

  textColorizer('words', cacheDom.h1);
  zxcvb = setInterval(function () {
    textColorizer('words', cacheDom.h1);
  }, 100);
  setTimeout(function () {
    // textColorReset(cacheDom.h1);
    clearInterval(zxcvb);
    textColorizer('words', cacheDom.h1);
    cacheDom.mainBoard.classList.remove('board-intro');
    cacheDom.startButton.style.visibility = 'visible';
  }, 2900); // equal to CSS animation-duration plus delay minus interval


  /********************************************
   Game functions:
  ********************************************/

  var randomQuads = []; /*[1,1,2,2,3,3,4,4,1,1,2,2,3,3,4,4,1,1,2,3,4,1,2,3]; */

  // adds random lights in game sequence:
  var randomizer = function randomizer() {
    var nextQuad = Math.floor(Math.random() * 4 + 1);
    randomQuads.push(nextQuad);
  };

  // determines if strict mode is on or off:
  function strictModeSetter() {
    var radio2Setting = document.querySelectorAll('.radio2');
    radio2Setting[0].checked ? misc.strictMode = true : radio2Setting[1].checked ? misc.strictMode = false :
    null;
  }

  // adds & removes hover class on quads:
  var hoverQuadsOnOff = function hoverQuadsOnOff(x) {
    var allQuads = cacheDom.allColorButtons.childNodes;
    if ( x === 'on' ) {
      for ( var i = 0; i < allQuads.length; i++ ) {
        if ( allQuads[i].nodeType === 1 ) {
          allQuads[i].classList.add('quads-hover-on-off');
        }
      }
    }
    if ( x === 'off' ) {
      for ( var i = 0; i < allQuads.length; i++ ) {
        if ( allQuads[i].nodeType === 1 ) {
          allQuads[i].classList.remove('quads-hover-on-off');
        }
      }
    }
  };

  // tests whether you're correct during the game:
  function gameTest(el) {
    var lgt = randomQuads.length;
    var currentQuad = randomQuads[misc.gameClickerPosition];
    var nextQuadEl = quadrants[currentQuad];
    if ( el === nextQuadEl ) {
      cacheDom.startButton.innerHTML = 'correct';
      misc.gameClickerPosition++;
    } else {
      wrongAnswerLights();
      removeQuadClickerEvent();
      hoverQuadsOnOff('off');
      if ( misc.strictMode ) {
        gameOver(1);
      }
      else if ( !misc.strictMode ) {
        misc.gameClickerPosition = 0;
        // gameTest(el);
        // gameClicker(el);
        setTimeout(resumeGame, 1500);
      }
    }
    if ( misc.gameClickerPosition === lgt ) {
      cacheDom.startButton.innerHTML = 'nice!';
      removeQuadClickerEvent();
      hoverQuadsOnOff('off');
      setTimeout(startGame, 2000);
      misc.gameClickerPosition = 0;
    }
  }

  // determines actions when game is over:
  function gameOver(type) {
    if ( !type ) {
      type === 0;
    }// hoverQuadsOnOff('off');
    // removeQuadClickerEvent();
    disableQuitButton();
    let score = randomQuads.length - 1;
    highScore(score);
    // cacheDom.startButton.innerHTML = 'wrong!';
    setTimeout(function() {
      cacheDom.startButton.innerHTML = 'score:<br />' + score;
    }, type * 1000); // 150 * 6 ("wrong" duration) + 100 (no delay for quit)
    document.getElementById('colorSequence').style.visibility = 'visible';
    setTimeout(function() {
      cacheDom.startButton.innerHTML = 'try<br />again';
      cacheDom.startButton.removeAttribute('disabled');
      enableStartButton();
      cacheDom.startButton.classList.add('start-hover-on-off');
    }, 5000);
    setTimeout(function() {
      if ( cacheDom.startButton.innerHTML === 'try<br>again' ) {
        cacheDom.startButton.textContent = 'start';
      }
    }, 15000);
    randomQuads = [];
    misc.gameClickerPosition = 0;
    return;
  }

  // Option to quit game after some time:
  function quitGame() {
    cacheDom.startButton.innerHTML = 'quit?';
    enableQuitButton();
    cacheDom.startButton.removeAttribute('disabled');
    cacheDom.startButton.classList.add('start-hover-on-off');
  }

  // Determines if a new high score was achieved:
  function highScore(score) {
    if ( misc.storedHighScoreSimon ) {
      if ( score > misc.storedHighScoreSimon ) {
        localStorage.setItem('storedHighScoreSimon', score);
        misc.storedHighScoreSimon = score;
        highScoreShow(score);
        document.getElementById('new-best').textContent = '(new high score)';
      }
    }
    else {
      localStorage.setItem('storedHighScoreSimon', score);
      misc.storedHighScoreSimon = score;
      highScoreShow(score);
      document.getElementById('new-best').textContent = '(new high score)';
    }
  }

  // Starts lightShow if high score achieved:
  function highScoreShow(score) {
    setTimeout(lightShowStart.bind(null, 400), 1000); // "wrong" duration
    setTimeout(lightShowStart.bind(null, 400), 5000); // duration of CSS animation plus start delay
    setTimeout(function() {
      cacheDom.startButton.style.visibility = 'hidden';
      cacheDom.innerCircleTextArea.innerHTML = 'NEW<br />HIGH SCORE:<br />' + score;
    }, 1000); // "wrong" duration
    setTimeout(function() {
      cacheDom.startButton.style.visibility = 'visible';
      cacheDom.innerCircleTextArea.textContent = '';
    }, 5000); // duration of CSS animation


    setTimeout(function() {
      cacheDom.mainBoard.classList.add('board-spin');
    }, 1000);
    setTimeout(function() {
      cacheDom.mainBoard.classList.remove('board-spin');
    }, 5000); // duration of CSS animation plus start delay
  }


  // main game controls outside of user actions:
  var startGame = function startGame() {
    randomizer();
    resumeGame();
  }

  var resumeGame = function () {
    volume(); // retrieves on/off sound value
    strictModeSetter();
    document.getElementById('colorSequence').style.visibility = 'hidden';
    cacheDom.startButton.setAttribute('disabled', true);
    // removes event listener (cannot disable button for touch):
    disableStartButton();
    cacheDom.startButton.classList.remove('start-hover-on-off');
    var color = ['green', 'red', 'yellow', 'blue'];
    var colorSequence = [];
    // let colorCodes = ['rgb(68,144,86)', 'rgb(194,0,0)', 'rgb(245,184,22)', 'rgb(42,91,154)'];
    var colorCodes = [colors.defaultGreen, colors.defaultRed, colors.defaultYellow, colors.defaultBlue];
    var el = document.querySelector('#colorSequence');
    var lightOnLength = document.getElementById('lightOnLength').value;
    // Radio buttons control speed (length of lightOn) & intermittent (time between lights on):
    var radio3Setting = document.querySelectorAll('.radio3');
    lightOnLength > 0 ? lightOnLength = lightOnLength : radio3Setting[0].checked ? lightOnLength = 800 : radio3Setting[1].checked ? lightOnLength = 550 : radio3Setting[2].checked ? lightOnLength = 300 : null;
    var intermittent = Math.round(lightOnLength / 3);
    var lightOffStart = Number(lightOnLength) + intermittent;
    var cycleStart = Number(lightOffStart) + intermittent;
    randomQuads.forEach(function (x, index) {
      setTimeout(function () {
        lightOn(quadrants[x], 70); // 70 is light intensity
        lightBeep(x, lightOnLength);
      }, intermittent + cycleStart * index); //200 + 1000
      setTimeout(function () {
        lightOff(quadrants[x]);
      }, lightOffStart + cycleStart * index); //600 + 1000
      colorSequence.push(color[x - 1]);
    });
    var text = 'last sequence was:<br/><span style="font-size: 2em;height:12px;line-height: 0.5em">';
    colorSequence.forEach(function (x) {
      var y = color.indexOf(x);
      text += '<span style="color: ' + colorCodes[y] + '">\u25CF</span>';
    });
    var lgt = colorSequence.length;
    setTimeout(function (lgt) {
      el.innerHTML = 'you got ' + (randomQuads.length - 1) + ' correct! <span id="new-best" style="font-size: 0.8em;">(your best is ' + misc.storedHighScoreSimon + ' )</span><br />' + text + '</span>';
    }, intermittent + cycleStart * (lgt - 1)); //200 + 1000
    cacheDom.startButton.innerHTML = 'round<br />' + randomQuads.length;
    setTimeout(function (lgt) {
      addQuadClickerEvent();
      hoverQuadsOnOff('on');
      quitGameTimeout = setTimeout(quitGame, 9000);
      misc.quitGameTimeoutCleared = false;
    }, cycleStart * lgt);
  }; // end of resumeGame function

  // game controls based on user actions:
  var gameClicker = function gameClicker(el) {
    // volume(); // retrieves on/off sound value
    if ( !misc.quitGameTimeoutCleared ) {
      clearTimeout( quitGameTimeout );
      misc.quitGameTimeoutCleared = true;
      console.log('cleared quitGame feature');
    }
    var lgt = randomQuads.length;
    if ( lgt === 0 ) {
      return;
    }
    else {
      gameTest(el);
    }
  };


  /********************************************
   Audio API for lightOn sounds:
  ********************************************/

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);
  gainNode.gain.value = 0; //default
  function volume() {
    var radio1Setting = document.querySelectorAll('.radio1');
    radio1Setting[0].checked ? gainNode.gain.value = 0.3 : radio1Setting[1].checked ? gainNode.gain.value = 0 :
    null;
  }

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
   Event Listeners:
  ********************************************/

  // Enables start button:
  function enableStartButton() {
    cacheDom.startButton.addEventListener('click', startGame, false);
    cacheDom.startButton.addEventListener('touchstart', startGame, false);
  }
  window.addEventListener('load', enableStartButton,false);

  // Disables start button:
  function disableStartButton() {
    cacheDom.startButton.removeEventListener('click', startGame, false);
    cacheDom.startButton.removeEventListener('touchstart', startGame, false);
  }

  // Enables quit (gameOver) button:
  function enableQuitButton() {
    cacheDom.startButton.addEventListener('click', gameOver, false);
    cacheDom.startButton.addEventListener('touchstart', gameOver, false);
  }

  // Disables quit (gameOver) button:
  function disableQuitButton() {
    cacheDom.startButton.removeEventListener('click', gameOver, false);
    cacheDom.startButton.removeEventListener('touchstart', gameOver, false);
  }

  // Click or touch quads to turn lights on. Allows to play the game:
  function quadClicker(event) {
    if ( event.target !== event.currentTarget ) {
      lightOn(event.target, 70);
      lightBeep(event.target.id, 300);
      setTimeout(lightOff.bind(null, event.target), 300);
      gameClicker(event.target);
      if ( event.type === 'touchstart' ) {
        event.preventDefault();
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
    // event.stopPropagation();
  }, false);

  // Unchecks all radio buttons when speed value is adjusted (clicked):
  document.getElementById('controls4').addEventListener('click', function () {
    var radio3Setting = document.querySelectorAll('.radio3');
    radio3Setting[0].checked = false;
    radio3Setting[1].checked = false;
    radio3Setting[2].checked = false;
  }, false);

  // Removes h1 if main board overlaps it:
  function h1Remover() {
    let h1 = cacheDom.h1;
    let board = cacheDom.mainBoard;
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

  /* (FOR TESTING ONLY)
  // this function only used for eventListeners below:
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
  */

  /* (FOR TESTING ONLY)
  // hovering over quads turns on the lights:
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

  /* (FOR TESTING ONLY)
  // Button for testing "wrong answer" lights:
  document.getElementById('wrong').addEventListener('click', wrongAnswerLights, false);
  allColorButtons.addEventListener('mouseenter',lightOn.bind(null, target, 30), false);
  allColorButtons.addEventListener('mouseleave', lightOff.bind(null, target), false);
  */

  /* (FOR TESTING ONLY)
  function addPointer() {
    window.addEventListener('pointerdown', function onFirstPointer(event) {
      window.POINTER_SIZE = event.height;
      console.log(window.POINTER_SIZE);
      console.log(event);
      window.removeEventListener('pointerdown', onFirstPointer, false);
    }, false);
  }
  */

  /* (FOR TESTING ONLY)
  // Click outer rim for a wheel spin (CSS animation):
  document.getElementById('outer-rim').addEventListener('click', function () {
    cacheDom.mainBoard.classList.add('board-spin');
    // event.preventDefault();
    // event.stopPropagation();
  }, false);

  // leaving outer rim removes board-spin class.
  // (this enables reusing same CSS animation again)
  document.getElementById('outer-rim').addEventListener('mouseout', function () {
    cacheDom.mainBoard.classList.remove('board-spin');
  }, false);
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
