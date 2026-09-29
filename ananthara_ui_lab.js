(function () {
  "use strict";

  var STORAGE_KEY = "ananthara_ui_lab_theme";
  var THEMES = ["original", "archive", "codex", "reliquary", "celestial"];
  var VISIBLE_THEMES = ["original", "reliquary", "celestial"];
  var LABELS = {original:"Original", archive:"Archive", codex:"Living Codex", reliquary:"Astral Reliquary", celestial:"Celestial Astrolabe"};

  function validTheme(value) { return THEMES.indexOf(value) !== -1 ? value : "original"; }
  function storedTheme() {
    try { return validTheme(localStorage.getItem(STORAGE_KEY)); }
    catch (error) { return "original"; }
  }
  function requestedTheme() {
    var value = new URLSearchParams(location.search).get("theme");
    return value && THEMES.indexOf(value) !== -1 ? value : storedTheme();
  }
  function remember(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); }
    catch (error) { console.warn("UI Lab theme preference could not be stored.", error); }
  }
  function updateUrl(theme) {
    var url = new URL(location.href);
    url.searchParams.set("theme", theme);
    history.replaceState(null, "", url.pathname + url.search + url.hash);
  }
  function applyTheme(theme, updateHistory) {
    theme = validTheme(theme);
    document.documentElement.dataset.anaTheme = theme;
    document.querySelectorAll("link[data-ana-theme-sheet]").forEach(function (sheet) {
      sheet.disabled = sheet.dataset.anaThemeSheet !== theme;
    });
    document.querySelectorAll("[data-ui-lab-theme]").forEach(function (button) {
      var selected = button.dataset.uiLabTheme === theme;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    remember(theme);
    if (updateHistory) updateUrl(theme);
    revealCurrentUi();
  }

  function motionTheme() {
    var theme = document.documentElement.dataset.anaTheme;
    return theme === "codex" || theme === "reliquary" || theme === "celestial";
  }

  function revealNode(node) {
    if (!node || node.nodeType !== 1 || !motionTheme()) return;
    var targets = [];
    if (node.matches && node.matches(".ana-prologue-banner,.ana-game-menu,.ana-save-panel,.ananthara-game-ui,.as-panel,.aq-card,.aj-entry,#text")) targets.push(node);
    if (node.querySelectorAll) {
      node.querySelectorAll(".ana-prologue-banner,.ana-game-menu,.ana-save-panel,.ananthara-game-ui,.as-panel,.aq-card,.aj-entry").forEach(function (target) { targets.push(target); });
    }
    targets.forEach(function (target) {
      target.classList.remove("is-lab-revealed");
      void target.offsetWidth;
      target.classList.add("is-lab-revealed");
      if (target.classList.contains("ana-prologue-banner") && !target.dataset.labMotionBound) {
        target.dataset.labMotionBound = "true";
        var continueButton = target.querySelector("button");
        if (continueButton) continueButton.addEventListener("click", function () { target.classList.add("is-lab-leaving"); }, {capture:true, once:true});
      }
    });
  }

  function revealCurrentUi() {
    if (!document.body) return;
    revealNode(document.getElementById("text"));
    revealNode(document.body);
  }

  function installMotionObserver() {
    if (!window.MutationObserver) return;
    var observer = new MutationObserver(function (records) {
      if (!motionTheme()) return;
      records.forEach(function (record) {
        revealNode(record.target);
        record.addedNodes.forEach(revealNode);
      });
    });
    observer.observe(document.body, {childList:true, subtree:true});
    revealCurrentUi();
  }
  function mountSwitcher() {
    if (document.querySelector("[data-ana-ui-lab-switcher]")) return;
    var panel = document.createElement("aside");
    panel.className = "ana-ui-lab-switcher";
    panel.dataset.anaUiLabSwitcher = "true";
    panel.setAttribute("aria-label", "UI Lab theme selector");
    panel.innerHTML = '<button class="ana-ui-lab-toggle" type="button" aria-expanded="true">UI LAB</button><div class="ana-ui-lab-options"></div>';
    var options = panel.querySelector(".ana-ui-lab-options");
    VISIBLE_THEMES.forEach(function (theme) {
      var choice = document.createElement("button");
      choice.type = "button";
      choice.dataset.uiLabTheme = theme;
      choice.textContent = LABELS[theme];
      choice.addEventListener("click", function () { applyTheme(theme, true); });
      options.appendChild(choice);
    });
    panel.querySelector(".ana-ui-lab-toggle").addEventListener("click", function (event) {
      var collapsed = panel.classList.toggle("is-collapsed");
      event.currentTarget.textContent = collapsed ? "UI" : "UI LAB";
      event.currentTarget.setAttribute("aria-expanded", String(!collapsed));
    });
    document.body.appendChild(panel);
    applyTheme(requestedTheme(), false);
    installMotionObserver();
  }

  var style = document.createElement("style");
  style.textContent = '.ana-ui-lab-switcher{position:fixed;right:max(10px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));z-index:100000;width:168px;padding:8px;background:rgba(18,20,20,.96);border:1px solid #8f8f8f;border-radius:6px;box-shadow:0 8px 30px rgba(0,0,0,.5);font:600 11px/1.2 Arial,sans-serif;color:#eee}.ana-ui-lab-switcher button{display:block;width:100%;min-height:34px;margin:3px 0;padding:7px 9px;border:1px solid #555;border-radius:3px;background:#292b2b;color:#eee;font:inherit;text-align:left;cursor:pointer}.ana-ui-lab-switcher button:hover,.ana-ui-lab-switcher button:focus-visible{border-color:#fff;outline:2px solid #fff;outline-offset:1px}.ana-ui-lab-switcher [aria-pressed="true"]{background:#eee;color:#111;border-color:#eee}.ana-ui-lab-toggle{letter-spacing:.16em!important;text-align:center!important}.ana-ui-lab-switcher.is-collapsed{width:48px;padding:4px}.ana-ui-lab-switcher.is-collapsed .ana-ui-lab-options{display:none}@media(max-width:430px){.ana-ui-lab-switcher{right:6px;bottom:6px;width:148px}.ana-ui-lab-switcher button{min-height:40px}}';
  document.head.appendChild(style);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountSwitcher);
  else mountSwitcher();

  window.AnantharaUiLab = {applyTheme: function (theme) { applyTheme(theme, true); }, themes: THEMES.slice()};
})();
