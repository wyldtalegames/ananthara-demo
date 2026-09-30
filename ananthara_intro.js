(function () {
  "use strict";
  var SAVE_MARKER = "ananthara_has_autosave";
  var LANGUAGE_KEY = "ananthara_language";
  var gameStarted = false;
  var introInitialized = false;
  var gameLoadReleased = false;
  var originalLoadAndRestoreGame = window.loadAndRestoreGame;

  function runtimeReady() {
    return window.anantharaChoiceScriptReady === true &&
      typeof window.restartGame === "function" &&
      typeof window.startLoading === "function" &&
      typeof window.Scene === "function" &&
      typeof window.SceneNavigator === "function" &&
      !!window.nav;
  }

  function whenRuntimeReady(callback) {
    if (runtimeReady()) {
      callback();
      return;
    }
    window.addEventListener("ananthara:runtime-ready", function () {
      if (runtimeReady()) callback();
    }, {once:true});
  }

  function storageGet(key) {
    try { return window.localStorage ? localStorage.getItem(key) : null; }
    catch (error) { return null; }
  }

  function storageSet(key, value) {
    try { if (window.localStorage) localStorage.setItem(key, value); }
    catch (error) { console.warn("Ananthara local storage is unavailable.", error); }
  }

  function storageRemove(key) {
    try { if (window.localStorage) localStorage.removeItem(key); }
    catch (error) { console.warn("Ananthara local storage is unavailable.", error); }
  }

  // ChoiceScript normally restores a game as soon as the page loads. The intro
  // must remain the only gateway so New Game and Continue cannot both fire.
  if (typeof originalLoadAndRestoreGame === "function") {
    window.loadAndRestoreGame = function () {
      if (!gameLoadReleased) return;
      return originalLoadAndRestoreGame.apply(window, arguments);
    };
  }

  function hideIntro() {
    var intro = document.getElementById("anantharaIntro");
    if (!intro) return;
    intro.classList.add("is-leaving");
    window.setTimeout(function () { intro.hidden = true; }, 650);
  }

  function beginNewGame(language) {
    if (gameStarted) return;
    gameStarted = true;
    storageSet(LANGUAGE_KEY, language);
    storageRemove(SAVE_MARKER);
    gameLoadReleased = true;
    whenRuntimeReady(function () {
      hideIntro();
      window.restartGame(false);
    });
  }

  function continueGame() {
    if (gameStarted || storageGet(SAVE_MARKER) !== "1") return;
    gameStarted = true;
    gameLoadReleased = true;
    whenRuntimeReady(function () {
      hideIntro();
      originalLoadAndRestoreGame.call(window);
    });
  }

  function loadManualGame(slot) {
    if (gameStarted || !slot) return;
    gameStarted = true;
    gameLoadReleased = true;
    whenRuntimeReady(function () {
      hideIntro();
      originalLoadAndRestoreGame.call(window, slot);
    });
  }

  function startNewGameFromUi() {
    storageRemove(SAVE_MARKER);
    gameLoadReleased = true;
    whenRuntimeReady(function () {
      hideIntro();
      window.restartGame(false);
    });
  }

  function mountPrologueBanner(scene) {
    if (!scene || typeof scene.goto !== "function") return;
    scene.finished = true;
    scene.save("");
    var text = document.getElementById("text");
    if (!text) return;
    var english = scene.stats && scene.stats.language === "en";
    text.innerHTML = "";
    var panel = document.createElement("section");
    panel.className = "ana-prologue-banner";
    panel.innerHTML = '<div class="ana-prologue-sigil" aria-hidden="true">✧</div><p class="ana-prologue-kicker"></p><h2></h2><button type="button"></button>';
    panel.querySelector(".ana-prologue-kicker").textContent = english ? "PROLOGUE" : "PROLOG";
    panel.querySelector("h2").textContent = english
      ? "Seek what is hidden. Question what is known."
      : "Suche, was verborgen ist. Hinterfrage, was als Wahrheit gilt.";
    var button = panel.querySelector("button");
    button.textContent = english ? "Continue" : "Weiter";
    button.addEventListener("click", function () {
      scene.goto("prologue");
      scene.finished = false;
      scene.resetPage();
    }, {once:true});
    text.appendChild(panel);
    button.focus({preventScroll:true});
  }

  document.addEventListener("DOMContentLoaded", function () {
    var intro = document.getElementById("anantharaIntro");
    var menu = document.getElementById("anaIntroMenu");
    var language = document.getElementById("anaLanguage");
    var modal = document.getElementById("anaWorldModal");
    var continueButton = document.getElementById("anaContinue");
    var loadButton = document.getElementById("anaLoadGame");
    var openingVideo = intro && intro.querySelector(".ana-intro-video-opening");
    var loopVideo = intro && intro.querySelector(".ana-intro-video-loop");
    var soundButton = document.getElementById("anaIntroSound");
    var skipButton = document.getElementById("anaIntroSkip");
    var landingCopy = {
      de: {begin:"Reise beginnen", how:"So wird gespielt", continue:"Zurück nach Ananthara", load:"Spiel laden", language:"Sprache", languageTitle:"SPRACHE", back:"Zurück", world:"Über Ananthara", leave:"Den Pfad verlassen", worldCopy:"Willkommen in Ananthara, einer Welt uralter Königreiche, heiliger Magie und vergessener Wahrheiten.", close:"Schließen"},
      en: {begin:"Begin Your Journey", how:"How to Play", continue:"Return to Ananthara", load:"Load Game", language:"Language", languageTitle:"LANGUAGE", back:"Back", world:"About Ananthara", leave:"Leave the Path", worldCopy:"Welcome to Ananthara, a world shaped by ancient kingdoms, sacred magic and forgotten truths.", close:"Close"}
    };
    function localizeLanding(lang) {
      lang = lang === "de" ? "de" : "en";
      var copy = landingCopy[lang];
      [["begin","begin"],["how-to","how"],["continue","continue"],["load","load"],["language","language"],["world","world"],["leave","leave"]].forEach(function (entry) {
        var node = intro.querySelector('[data-intro-action="' + entry[0] + '"]');
        if (node) node.textContent = copy[entry[1]];
      });
      var worldTitle = document.getElementById("anaWorldTitle");
      if (worldTitle) worldTitle.textContent = copy.world;
      var worldCopy = document.getElementById("anaWorldCopy");
      if (worldCopy) worldCopy.textContent = copy.worldCopy;
      var worldClose = document.getElementById("anaWorldClose");
      if (worldClose) worldClose.textContent = copy.close;
      var languageTitle = document.getElementById("anaLanguageTitle");
      var languageCancel = language.querySelector("[data-language-cancel]");
      if (languageTitle && !languageCancel.hidden) languageTitle.textContent = copy.languageTitle;
      if (languageCancel) languageCancel.textContent = copy.back;
    }
    function showLandingMenu(focusMenu) {
      if (document.activeElement && language.contains(document.activeElement)) document.activeElement.blur();
      language.hidden = true;
      language.setAttribute("hidden", "");
      language.setAttribute("aria-hidden", "true");
      language.setAttribute("inert", "");
      language.style.pointerEvents = "none";
      language.style.display = "none";
      menu.removeAttribute("hidden");
      menu.hidden = false;
      menu.removeAttribute("aria-hidden");
      menu.removeAttribute("inert");
      menu.inert = false;
      menu.style.display = "grid";
      menu.style.pointerEvents = "auto";
      menu.classList.remove("is-menu-restored");
      // iOS/WebKit can retain the completed reveal animation after the
      // language view was hidden. Re-add a stable state on the next frame.
      window.requestAnimationFrame(function () { menu.classList.add("is-menu-restored"); });
      intro.classList.remove("is-language-open", "is-changing-language");
      document.body.classList.remove("ana-language-open");
      if (focusMenu && !window.matchMedia("(pointer: coarse)").matches) {
        window.requestAnimationFrame(function () {
          var target = menu.querySelector('[data-intro-action="language"]');
          if (target) target.focus({preventScroll:true});
        });
      }
    }
    function showLanguagePicker(fromMenu) {
      var languageCancel = language.querySelector("[data-language-cancel]");
      var languageTitle = document.getElementById("anaLanguageTitle");
      if (languageCancel) languageCancel.hidden = !fromMenu;
      if (languageTitle) {
        var lang = storageGet(LANGUAGE_KEY) === "de" ? "de" : "en";
        languageTitle.textContent = fromMenu ? landingCopy[lang].languageTitle : "Choose your language · Wähle deine Sprache";
      }
      menu.hidden = true;
      menu.setAttribute("hidden", "");
      menu.setAttribute("aria-hidden", "true");
      menu.setAttribute("inert", "");
      menu.style.pointerEvents = "none";
      menu.style.display = "none";
      language.removeAttribute("hidden");
      language.hidden = false;
      language.removeAttribute("aria-hidden");
      language.removeAttribute("inert");
      language.inert = false;
      language.style.display = "grid";
      language.style.pointerEvents = "auto";
      intro.classList.add("is-language-open");
      if (!window.matchMedia("(pointer: coarse)").matches) window.requestAnimationFrame(function () {
        var selected = storageGet(LANGUAGE_KEY);
        var target = language.querySelector('[data-language="' + (selected === "de" ? "de" : "en") + '"]');
        if (target) target.focus({preventScroll:true});
      });
    }
    function setLandingLanguage(lang) {
      lang = lang === "de" ? "de" : "en";
      intro.classList.add("is-changing-language");
      storageSet(LANGUAGE_KEY, lang);
      document.documentElement.lang = lang;
      localizeLanding(lang);
      showLandingMenu(true);
    }
    function revealLanding() {
      var savedLanguage = storageGet(LANGUAGE_KEY);
      if (savedLanguage === "de" || savedLanguage === "en") {
        localizeLanding(savedLanguage);
        document.documentElement.lang = savedLanguage;
        showLandingMenu(false);
      } else {
        showLanguagePicker(false);
      }
    }
    if (!intro) {
      gameLoadReleased = true;
      if (!gameStarted && typeof originalLoadAndRestoreGame === "function") {
        gameStarted = true;
        originalLoadAndRestoreGame.call(window);
      }
      return;
    }
    if (introInitialized) return;
    introInitialized = true;
    continueButton.hidden = storageGet(SAVE_MARKER) !== "1";
    if (loadButton && window.AnantharaManualSaves) {
      window.AnantharaManualSaves.hasAny(function (hasSaves) {
        loadButton.hidden = !hasSaves;
      });
    }

    var showLandingAfterTransition = function () {
      intro.classList.remove("intro-sequence-pending");
      intro.classList.add("intro-menu-visible");
      revealLanding();
      if (skipButton) skipButton.hidden = true;
    };
    var revealMenuAndLoop = function () {
      if (skipButton) skipButton.hidden = true;
      if (typeof beginLoop === "function") beginLoop(showLandingAfterTransition);
      else showLandingAfterTransition();
    };
    // Mobile starts its longer visual fade after the opening logo has had time
    // to read, while retaining enough room for a clean handoff before media end.
    var mobileOpening = window.matchMedia("(max-width: 699px)").matches;
    var menuRevealTimer = window.setTimeout(revealMenuAndLoop, mobileOpening ? 8200 : 9000);
    if (skipButton) skipButton.addEventListener("click", function () {
      window.clearTimeout(menuRevealTimer);
      revealMenuAndLoop();
    }, {once:true});

    if (openingVideo && loopVideo) {
      var soundEnabled = false;
      var transitioned = false;
      var transitionComplete = false;
      var transitionCallbacks = [];
      var audioContext = null;
      var audioGain = null;
      function updateSoundButton(enabled) {
        if (!soundButton) return;
        soundButton.hidden = false;
        soundButton.classList.toggle("is-sound-on", !!enabled);
        soundButton.setAttribute("aria-pressed", enabled ? "true" : "false");
        var label = enabled ? "Ton ausschalten · Disable sound" : "Ton aktivieren · Enable sound";
        soundButton.setAttribute("aria-label", label);
        soundButton.title = label;
      }
      function ensureAudioGraph() {
        if (audioGain) return audioGain;
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return null;
        try {
          audioContext = new AudioContext();
          var source = audioContext.createMediaElementSource(openingVideo);
          audioGain = audioContext.createGain();
          audioGain.gain.value = 0.5;
          source.connect(audioGain); audioGain.connect(audioContext.destination);
          openingVideo.volume = 1;
          return audioGain;
        } catch (error) {
          console.warn("Ananthara intro audio graph unavailable; using media volume fallback.", error);
          return null;
        }
      }
      var failVideo = function (event) {
        console.warn("Ananthara intro video unavailable; using visual fallback.", {
          source: openingVideo.currentSrc || "Assets/video/logo-fin-fragments.mp4",
          event: event && event.type ? event.type : "playback-timeout",
          mediaError: openingVideo.error ? openingVideo.error.code : null
        });
        intro.classList.remove("video-pending");
        intro.classList.add("video-failed");
        intro.classList.remove("intro-sequence-pending");
      };
      var showVideo = function () {
        intro.classList.remove("video-pending", "video-failed");
      };

      var finishTransition = function () {
        transitionComplete = true;
        soundEnabled = !loopVideo.muted;
        updateSoundButton(soundEnabled);
        intro.classList.remove("is-blackout");
        transitionCallbacks.splice(0).forEach(function (callback) { callback(); });
      };
      var beginLoop = function (callback) {
        if (typeof callback === "function") {
          if (transitionComplete) { callback(); return; }
          transitionCallbacks.push(callback);
        }
        if (transitioned) return;
        transitioned = true;
        var videoSwapDelay = mobileOpening ? 1200 : 520;
        var blackHoldAfterSwap = mobileOpening ? 400 : 160;
        intro.classList.add("is-blackout");
        var fadeStartedAt = Date.now();
        var fadeStartVolume = openingVideo.muted ? 0 : openingVideo.volume;
        var audioFade = 0;
        if (audioGain && audioContext) {
          audioGain.gain.cancelScheduledValues(audioContext.currentTime);
          audioGain.gain.setValueAtTime(audioGain.gain.value, audioContext.currentTime);
          audioGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.8);
        } else {
          audioFade = window.setInterval(function () {
            var progress = Math.min(1, (Date.now() - fadeStartedAt) / 1800);
            openingVideo.volume = Math.max(0, fadeStartVolume * (1 - progress));
            if (progress >= 1) window.clearInterval(audioFade);
          }, 50);
        }
        window.setTimeout(function () {
          openingVideo.classList.remove("is-active");
          loopVideo.currentTime = 0;
          loopVideo.muted = true;
          loopVideo.defaultMuted = true;
          loopVideo.classList.add("is-active");
          var loopAttempt = loopVideo.play();
          if (loopAttempt && typeof loopAttempt.catch === "function") {
            loopAttempt.catch(function () { failVideo({type:"loop-playback"}); });
          }
          window.setTimeout(finishTransition, blackHoldAfterSwap);
        }, videoSwapDelay);
        window.setTimeout(function () {
          openingVideo.volume = 0;
          openingVideo.pause();
        }, 1850);
      };

      openingVideo.playsInline = true;
      openingVideo.volume = 0.5;
      openingVideo.muted = false;
      openingVideo.defaultMuted = false;
      loopVideo.playsInline = true;
      openingVideo.classList.add("is-active");
      openingVideo.addEventListener("playing", showVideo, {once:true});
      openingVideo.addEventListener("ended", function () {
        if (audioGain) audioGain.gain.value = 0;
        else openingVideo.volume = 0;
      }, {once:true});
      openingVideo.addEventListener("timeupdate", function () {
        if (!Number.isFinite(openingVideo.duration)) return;
        var remaining = openingVideo.duration - openingVideo.currentTime;
        if (remaining <= 2.4 && soundEnabled && !openingVideo.muted) {
          var naturalFadeVolume = Math.max(0, Math.min(0.5, (remaining / 2.4) * 0.5));
          if (audioGain) audioGain.gain.value = naturalFadeVolume;
          else openingVideo.volume = naturalFadeVolume;
        }
      });
      openingVideo.addEventListener("error", failVideo, {once:true});
      openingVideo.addEventListener("abort", failVideo, {once:true});
      loopVideo.addEventListener("error", failVideo, {once:true});

      var toggleSound = function () {
        soundEnabled = !soundEnabled;
        var target = transitioned ? loopVideo : openingVideo;
        target.muted = !soundEnabled;
        target.defaultMuted = !soundEnabled;
        if (!transitioned) {
          var gain = ensureAudioGraph();
          if (gain && audioContext && audioContext.state === "suspended") audioContext.resume();
          if (gain) gain.gain.value = soundEnabled ? 0.5 : 0;
          else openingVideo.volume = soundEnabled ? 0.5 : 0;
        } else target.volume = soundEnabled ? 0.5 : 0;
        updateSoundButton(soundEnabled);
        var retry = target.play();
        if (retry && typeof retry.catch === "function") retry.catch(function () {});
      };
      if (soundButton) {
        updateSoundButton(false);
        soundButton.addEventListener("click", toggleSound);
      }

      var playAttempt = openingVideo.play();
      if (playAttempt && typeof playAttempt.then === "function") {
        playAttempt.then(function () {
          soundEnabled = !openingVideo.muted;
          updateSoundButton(soundEnabled);
        }).catch(function () {
          openingVideo.muted = true;
          openingVideo.defaultMuted = true;
          soundEnabled = false;
          updateSoundButton(false);
          var mutedAttempt = openingVideo.play();
          if (mutedAttempt && typeof mutedAttempt.catch === "function") mutedAttempt.catch(failVideo);
        });
      }
      window.setTimeout(function () {
        if (openingVideo.readyState < 2 || openingVideo.paused) failVideo();
      }, 4000);
    } else {
      intro.classList.remove("video-pending");
      intro.classList.add("video-failed");
    }

    language.querySelectorAll("[data-language]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        setLandingLanguage(button.dataset.language);
      });
    });
    var languageCancel = language.querySelector("[data-language-cancel]");
    if (languageCancel) languageCancel.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      showLandingMenu(true);
    });

    intro.addEventListener("click", function (event) {
      var actionButton = event.target.closest("[data-intro-action]");
      if (!actionButton) return;
      event.preventDefault();
      var action = actionButton.dataset.introAction;
      if (action === "begin" && !gameStarted) beginNewGame(storageGet(LANGUAGE_KEY) || "en");
      if (action === "how-to" && window.AnantharaHowTo) {
        window.AnantharaHowTo.open({language:storageGet(LANGUAGE_KEY) || "en", trigger:actionButton});
      }
      if (action === "continue") continueGame();
      if (action === "language") showLanguagePicker(true);
      if (action === "load" && window.AnantharaManualSaves) {
        window.AnantharaManualSaves.openLoad({landing:true, language:storageGet(LANGUAGE_KEY) || "en"});
      }
      if (action === "world") {
        var worldUrl = "https://www.worldofananthara.com/";
        var worldWindow = window.open(worldUrl, "_blank");
        if (worldWindow) worldWindow.opener = null;
        else window.location.href = worldUrl;
      }
      if (action === "close-world") modal.hidden = true;
      if (action === "leave") {
        intro.classList.add("has-left");
        if (openingVideo) openingVideo.pause();
        if (loopVideo) loopVideo.pause();
        window.close();
        window.setTimeout(function () {
          if (!document.hidden) window.location.replace("about:blank");
        }, 120);
      }
    });
  });

  var originalSave = window.Scene.prototype.save;
  window.Scene.prototype.save = function (slot) {
    var result = originalSave.apply(this, arguments);
    if (!slot && this.stats && this.stats.language) storageSet(SAVE_MARKER, "1");
    return result;
  };

  window.AnantharaIntro = {
    loadManualGame: loadManualGame,
    mountPrologueBanner: mountPrologueBanner,
    startNewGame: startNewGameFromUi,
    refreshManualSaveButton: function () {
      var button = document.getElementById("anaLoadGame");
      if (!button || !window.AnantharaManualSaves) return;
      window.AnantharaManualSaves.hasAny(function (hasSaves) { button.hidden = !hasSaves; });
    }
  };
})();
