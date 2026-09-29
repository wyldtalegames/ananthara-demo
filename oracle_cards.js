(function () {
  "use strict";

  function localized(stats, key, language) {
    return stats[key + "_" + language] || stats[key + "_de"] || "";
  }

  function mount(scene) {
    scene.finished = true;
    scene.save("");
    var language = scene.stats.language === "en" ? "en" : "de";
    var main = document.getElementById("main");
    main.classList.add("ana-oracle-screen");
    var shell = document.createElement("section");
    shell.className = "ana-oracle";
    shell.innerHTML =
      '<div class="ana-oracle-background" aria-hidden="true"><span></span></div>' +
      '<header class="ana-oracle-heading"><h2></h2><p></p></header>' +
      '<div class="ana-oracle-fan" aria-label="Oracle deck"></div>' +
      '<div class="ana-oracle-result" hidden><img alt=""><h3></h3><p class="ana-oracle-short"></p><p class="ana-oracle-full"></p><blockquote></blockquote><button type="button" class="ana-oracle-continue"></button></div>';
    shell.querySelector("h2").textContent = language === "en" ? "✧ The Oracle Deck" : "✧ Das Orakeldeck";
    shell.querySelector(".ana-oracle-heading p").textContent = language === "en" ? "The threads are stirring…" : "Die Fäden geraten in Bewegung…";
    var fan = shell.querySelector(".ana-oracle-fan");

    for (var i = 0; i < 5; i++) {
      var card = document.createElement("button");
      card.type = "button";
      card.disabled = true;
      card.className = "ana-oracle-card";
      card.style.setProperty("--card-index", i - 2);
      card.innerHTML = '<img src="Assets/cards/card_back.png" alt="">';
      card.setAttribute("aria-label", language === "en" ? "Draw oracle card" : "Orakelkarte ziehen");
      card.addEventListener("click", reveal, {once:true});
      fan.appendChild(card);
    }
    main.appendChild(shell);

    var shuffleFinished = false;
    var fallbackTimer;

    function completeShuffle() {
      if (shuffleFinished) return;
      shuffleFinished = true;
      window.clearTimeout(fallbackTimer);
      fan.classList.remove("is-shuffling");
      fan.classList.add("is-ready");
      fan.removeAttribute("aria-busy");
      fan.querySelectorAll(".ana-oracle-card").forEach(function (card) { card.disabled = false; });
      shell.querySelector(".ana-oracle-heading p").textContent = language === "en" ? "Choose a card." : "Wähle eine Karte.";
    }

    function beginShuffle() {
      fan.setAttribute("aria-busy", "true");
      fan.classList.add("is-shuffling");
      var firstCard = fan.querySelector(".ana-oracle-card");
      if (firstCard) firstCard.addEventListener("animationend", completeShuffle, {once:true});
      var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      fallbackTimer = window.setTimeout(completeShuffle, reduceMotion ? 120 : 1450);
    }

    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(function () { window.requestAnimationFrame(beginShuffle); });
    } else {
      window.setTimeout(beginShuffle, 50);
    }

    function reveal(event) {
      fan.querySelectorAll(".ana-oracle-card").forEach(function (card) { card.disabled = true; });
      fan.classList.add("is-drawn");
      event.currentTarget.classList.add("is-selected");
      var result = shell.querySelector(".ana-oracle-result");
      var title = localized(scene.stats, "oracle_card_title", language);
      result.querySelector("img").src = scene.stats.oracle_card_image;
      result.querySelector("img").alt = title;
      result.querySelector("h3").textContent = title;
      result.querySelector(".ana-oracle-short").textContent = localized(scene.stats, "oracle_card_text", language);
      result.querySelector(".ana-oracle-full").textContent = localized(scene.stats, "oracle_card_full", language);
      result.querySelector("blockquote").textContent = language === "en"
        ? "No explanation follows. Its meaning is yours to discover."
        : "Keine Erklärung folgt. Seine Bedeutung musst du selbst entdecken.";
      var next = result.querySelector(".ana-oracle-continue");
      next.textContent = language === "en" ? "Continue" : "Weiter";
      result.hidden = false;
      next.addEventListener("click", function () {
        main.classList.remove("ana-oracle-screen");
        scene.goto("oracle_complete");
        scene.finished = false;
        scene.resetPage();
      }, {once:true});
    }
  }

  function enhanceStats(scene, preferredTarget) {
    var stats = scene.stats;
    var language = stats.language === "en" ? "en" : "de";
    window.setTimeout(function () {
      var main = document.getElementById("main");
      if (!main || main.querySelector(".ana-fate-card")) return;
      var target = preferredTarget || main.querySelector(".ana-fate-gallery") || document.getElementById("text") || main;
      var title = localized(stats, "oracle_card_title", language);
      var button = document.createElement("button");
      button.type = "button";
      button.className = "ana-fate-card";
      button.innerHTML = '<img alt=""><span></span>';
      button.querySelector("img").src = stats.oracle_card_image;
      button.querySelector("img").alt = title;
      button.querySelector("span").textContent = title;
      button.addEventListener("click", function () { openFateModal(stats, language); });
      target.appendChild(button);
    }, 0);
  }

  function openFateModal(stats, language) {
    var old = document.getElementById("anaFateModal");
    if (old) old.remove();
    var title = localized(stats, "oracle_card_title", language);
    var modal = document.createElement("div");
    modal.id = "anaFateModal";
    modal.className = "ana-fate-modal";
    modal.innerHTML = '<div class="ana-fate-dialog" role="dialog" aria-modal="true"><img alt=""><h2></h2><p></p><small></small><button type="button"></button></div>';
    modal.querySelector("img").src = stats.oracle_card_image;
    modal.querySelector("img").alt = title;
    modal.querySelector("h2").textContent = title;
    modal.querySelector("p").textContent = language === "en" ? stats.prophecy_01_en : stats.prophecy_01_de;
    modal.querySelector("small").textContent = language === "en" ? "This card was drawn in Ithar’kael’s archive." : "Diese Karte wurde im Archiv von Ithar’kael gezogen.";
    var close = modal.querySelector("button");
    close.textContent = language === "en" ? "Close" : "Schließen";
    close.addEventListener("click", function () { modal.remove(); });
    modal.addEventListener("click", function (event) { if (event.target === modal) modal.remove(); });
    document.body.appendChild(modal);
    close.focus({preventScroll:true});
  }

  window.AnantharaOracle = {mount: mount, enhanceStats: enhanceStats};
})();
