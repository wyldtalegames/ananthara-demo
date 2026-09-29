(function () {
  "use strict";

  var MANIFEST_KEY = "ananthara_manual_save_manifest";
  var META_PREFIX = "ananthara_manual_save_meta_";
  var SLOT_PREFIX = "ananthara_manual_";
  var LINKS = Object.assign({feedback: "", newsletter: "", patreon: ""}, window.AnantharaLinks || {});

  var COPY = {
    de: {
      menu: "Menü", returnGame: "Zurück zum Spiel", saveGame: "Spiel speichern", loadGame: "Spiel laden",
      restartGame: "Neu beginnen", settings: "Einstellungen", saveTitle: "SPIEL SPEICHERN", loadTitle: "SPIEL LADEN",
      saveName: "Name des Speicherstands", createSave: "Neuen Speicherstand anlegen", overwrite: "Überschreiben",
      load: "Laden", remove: "Löschen", cancel: "Abbrechen", back: "Zurück", confirmOverwrite: "Diesen Speicherstand wirklich überschreiben?",
      confirmDelete: "Diesen Speicherstand wirklich löschen?", confirmRestart: "Das aktive Spiel wirklich neu beginnen? Manuelle Speicherstände bleiben erhalten.",
      yesOverwrite: "Ja, überschreiben", yesDelete: "Ja, löschen", yesRestart: "Ja, neu beginnen", no: "Nein",
      empty: "Noch keine manuellen Speicherstände vorhanden.", unavailable: "Lokales Speichern ist in diesem Browser nicht verfügbar.",
      corrupt: "Dieser Speicherstand konnte nicht gelesen werden.", saveFailed: "Der Speicherstand konnte nicht angelegt werden.",
      saved: "Spiel erfolgreich gespeichert.", unnamed: "Unbenannter Sucher", defaultSuffix: "Speicherstand",
      demo: "DANKE, DASS DU DIE DEMO GESPIELT HAST.", feedback: "Feedback geben", newsletter: "Für Neuigkeiten anmelden",
      patreon: "Auf Patreon unterstützen", newGame: "Neues Spiel", howTo: "So wird gespielt", linkUnavailable: "Link noch nicht konfiguriert."
    },
    en: {
      menu: "Menu", returnGame: "Return to the Game", saveGame: "Save Game", loadGame: "Load Game",
      restartGame: "Restart Game", settings: "Settings", saveTitle: "SAVE GAME", loadTitle: "LOAD GAME",
      saveName: "Save name", createSave: "Create New Save", overwrite: "Overwrite",
      load: "Load", remove: "Delete", cancel: "Cancel", back: "Back", confirmOverwrite: "Overwrite this saved game?",
      confirmDelete: "Delete this saved game?", confirmRestart: "Restart the active game? Manual saves will be kept.",
      yesOverwrite: "Yes, overwrite", yesDelete: "Yes, delete", yesRestart: "Yes, restart", no: "No",
      empty: "No manual saves yet.", unavailable: "Local saving is unavailable in this browser.",
      corrupt: "This saved game could not be read.", saveFailed: "The saved game could not be created.",
      saved: "Game saved successfully.", unnamed: "Unnamed Seeker", defaultSuffix: "Save",
      demo: "THANK YOU FOR PLAYING THE DEMO.", feedback: "Give Feedback", newsletter: "Subscribe for News",
      patreon: "Support on Patreon", newGame: "New Game", howTo: "How to Play", linkUnavailable: "Link not configured yet."
    }
  };

  function language(value) {
    var candidate = value || (window.stats && window.stats.language);
    return candidate === "en" ? "en" : "de";
  }

  function text(lang, key) { return COPY[language(lang)][key] || key; }

  function safeString(value) { return typeof value === "string" ? value.trim() : ""; }

  function engineStore() {
    try { return typeof window.initStore === "function" ? window.initStore() : null; }
    catch (error) { console.warn("Ananthara save storage is unavailable.", error); return null; }
  }

  function read(store, key, callback) {
    if (!store) return callback(false, null);
    try { store.get(key, function (ok, value) { callback(!!ok, value); }); }
    catch (error) { console.warn("Could not read Ananthara save data.", error); callback(false, null); }
  }

  function write(store, key, value, callback) {
    if (!store) return callback && callback(false);
    try { store.set(key, value, function (ok) { if (callback) callback(ok !== false); }); }
    catch (error) { console.warn("Could not write Ananthara save data.", error); if (callback) callback(false); }
  }

  function remove(store, key, callback) {
    if (!store) return callback && callback(false);
    try { store.remove(key, function () { if (callback) callback(true); }); }
    catch (error) { console.warn("Could not remove Ananthara save data.", error); if (callback) callback(false); }
  }

  function parseJson(value, fallback) {
    try { return value ? JSON.parse(value) : fallback; }
    catch (error) { return fallback; }
  }

  function readManifest(store, callback) {
    read(store, MANIFEST_KEY, function (ok, value) {
      var ids = ok ? parseJson(value, []) : [];
      callback(Array.isArray(ids) ? ids.filter(function (id) { return /^[a-z0-9_]+$/i.test(id); }) : []);
    });
  }

  function writeManifest(store, ids, callback) {
    var unique = ids.filter(function (id, index) { return ids.indexOf(id) === index; });
    write(store, MANIFEST_KEY, JSON.stringify(unique), callback);
  }

  function slotFor(id) { return SLOT_PREFIX + id; }

  function stateFromRaw(raw) {
    var state = parseJson(raw, null);
    return state && state.stats && state.stats.sceneName ? state : null;
  }

  function metadataFromState(id, state, existing) {
    var stats = state.stats || {};
    var lang = language((existing && existing.language) || stats.language);
    var characterName = safeString(stats.name) || text(lang, "unnamed");
    return {
      id: id,
      displayName: safeString(existing && existing.displayName) || characterName + " – " + text(lang, "defaultSuffix"),
      characterName: characterName,
      timestamp: Number(existing && existing.timestamp) || Date.now(),
      language: lang,
      sceneName: safeString(stats.sceneName),
      portraitImage: safeString(stats.race_image) || safeString(existing && existing.portraitImage),
      homeland: safeString(stats.homeland) || safeString(existing && existing.homeland),
      personalQuestId: safeString(stats.personal_quest_id) || safeString(existing && existing.personalQuestId),
      campaignRoute: safeString(stats.campaign_route_01) || safeString(existing && existing.campaignRoute)
    };
  }

  function listSaves(callback) {
    var store = engineStore();
    if (!store) return callback([], false);
    readManifest(store, function (ids) {
      if (!ids.length) return callback([], true);
      var remaining = ids.length;
      var saves = [];
      var validIds = [];
      ids.forEach(function (id) {
        read(store, "state" + slotFor(id), function (stateOk, rawState) {
          var state = stateOk ? stateFromRaw(rawState) : null;
          read(store, META_PREFIX + id, function (metaOk, rawMeta) {
            if (state) {
              var meta = metadataFromState(id, state, metaOk ? parseJson(rawMeta, null) : null);
              saves.push(meta);
              validIds.push(id);
              if (!metaOk) write(store, META_PREFIX + id, JSON.stringify(meta));
            } else {
              remove(store, META_PREFIX + id);
            }
            remaining--;
            if (!remaining) {
              saves.sort(function (a, b) { return b.timestamp - a.timestamp; });
              if (validIds.length !== ids.length) writeManifest(store, validIds);
              callback(saves, true);
            }
          });
        });
      });
    });
  }

  function currentState(callback) {
    var pseudo = window.pseudoSave && window.pseudoSave[""];
    if (pseudo && stateFromRaw(pseudo)) return callback(true, pseudo);
    var store = engineStore();
    read(store, "state", function (ok, raw) { callback(!!(ok && stateFromRaw(raw)), raw); });
  }

  function makeId() {
    return Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
  }

  function saveManual(existing, requestedName, callback) {
    var store = engineStore();
    if (!store) return callback(false, "unavailable");
    currentState(function (ok, rawState) {
      var state = ok ? stateFromRaw(rawState) : null;
      if (!state) return callback(false, "state");
      var id = existing ? existing.id : makeId();
      var meta = metadataFromState(id, state, existing || null);
      var lang = language(state.stats.language);
      meta.displayName = safeString(requestedName) || (meta.characterName + " – " + text(lang, "defaultSuffix"));
      meta.timestamp = Date.now();
      meta.language = lang;
      var slot = slotFor(id);
      if (!window.pseudoSave) window.pseudoSave = {};
      window.pseudoSave[slot] = rawState;
      write(store, "state" + slot, rawState, function (stateWritten) {
        if (!stateWritten) return callback(false, "state");
        write(store, META_PREFIX + id, JSON.stringify(meta), function (metaWritten) {
          if (!metaWritten) return callback(false, "meta");
          readManifest(store, function (ids) {
            if (ids.indexOf(id) === -1) ids.push(id);
            writeManifest(store, ids, function (manifestWritten) {
              if (window.AnantharaIntro) window.AnantharaIntro.refreshManualSaveButton();
              callback(!!manifestWritten, manifestWritten ? meta : "manifest");
            });
          });
        });
      });
    });
  }

  function deleteManual(save, callback) {
    var store = engineStore();
    if (!store || !save) return callback(false);
    var slot = slotFor(save.id);
    remove(store, "state" + slot, function () {
      remove(store, META_PREFIX + save.id, function () {
        if (window.pseudoSave) delete window.pseudoSave[slot];
        readManifest(store, function (ids) {
          writeManifest(store, ids.filter(function (id) { return id !== save.id; }), function (ok) {
            if (window.AnantharaIntro) window.AnantharaIntro.refreshManualSaveButton();
            callback(!!ok);
          });
        });
      });
    });
  }

  function element(tag, className, content) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function button(label, action, className) {
    var node = element("button", className || "", label);
    node.type = "button";
    node.addEventListener("click", action);
    return node;
  }

  function formatDate(timestamp, lang) {
    try {
      return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "de-DE", {
        day:"2-digit", month:"2-digit", year:"numeric", hour:"2-digit", minute:"2-digit"
      }).format(new Date(timestamp)).replace(",", " ·");
    } catch (error) { return new Date(timestamp).toLocaleString(); }
  }

  function closeOverlay(overlay) { if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay); }

  var HOW_TO_COPY = {
    de: [
      ["basics", "GRUNDLAGEN", ["ANANTHARA: THE LOST FRAGMENTS ist eine interaktive Geschichte. Deine Entscheidungen bestimmen, wie dein Charakter handelt, welchen Spuren du folgst und welche Informationen du entdeckst.", "Du musst nicht jede Möglichkeit auswählen oder jeden Ort vollständig untersuchen. Manche Spuren bleiben verborgen, andere zeigen sich erst durch bestimmte Entscheidungen.", "Es gibt nicht nur einen richtigen Weg durch Ananthara."]],
      ["choices", "ENTSCHEIDUNGEN", ["Wähle die Antwort oder Handlung, die zu deinem Charakter und deinem bisherigen Weg passt.", "Manche Entscheidungen verändern eine Szene unmittelbar. Andere beeinflussen, welche Informationen, Reaktionen oder Möglichkeiten dir später zur Verfügung stehen."]],
      ["thal", "THAL’ITHARA", ["An bestimmten Stellen kannst du deine Thal’ithara direkt einsetzen.", "Folge der eingeblendeten Aufforderung und tippe, halte oder interagiere mit dem dargestellten Zeichen.", "Eine alternative Bedienung ohne Geste steht immer zur Verfügung und führt zum gleichen Ergebnis."]],
      ["character", "CHARAKTER", ["Im Charakterbereich findest du Informationen über deine Figur, ihre Herkunft und ihre Thal’ithara.", "Deinen aktuellen Charakterbogen kannst du jederzeit aus diesem Bereich herunterladen."]],
      ["quest", "QUESTLOG", ["Im Questlog findest du deine aktuellen Aufgaben, Ziele, entdeckten Hinweise und offenen Fragen.", "Einträge erscheinen erst, wenn dein Charakter die entsprechende Information tatsächlich erfahren oder entdeckt hat."]],
      ["journey", "REISECHRONIK", ["Die Reisechronik hält wichtige Erlebnisse, Erinnerungen und Entscheidungen deiner Reise fest.", "Die neuesten Ereignisse stehen oben.", "Anders als das Questlog dokumentiert die Reisechronik nicht nur, was noch zu tun ist, sondern auch, was dein Charakter bereits erlebt hat."]],
      ["items", "GEGENSTÄNDE", ["Besondere Gegenstände, die du während deiner Reise mitnimmst, werden unter Gegenstände gesammelt.", "Dort kannst du ihre Beschreibung und Bedeutung später erneut ansehen."]],
      ["save", "SPEICHERN & LADEN", ["Über das Menü kannst du einen manuellen Speicherstand anlegen oder einen vorhandenen Spielstand laden.", "„Return to Ananthara“ setzt deine aktuelle Reise fort.", "Manuelle Speicherstände bleiben erhalten, wenn du ein neues Spiel beginnst."]]
    ],
    en: [
      ["basics", "BASICS", ["ANANTHARA: THE LOST FRAGMENTS is an interactive story. Your choices determine how your character acts, which traces you follow, and what information you discover.", "You do not have to select every possibility or fully investigate every location. Some traces remain hidden, while others only reveal themselves through certain decisions.", "There is no single correct path through Ananthara."]],
      ["choices", "CHOICES", ["Choose the response or action that fits your character and the path you have taken so far.", "Some choices change a scene immediately. Others affect which information, reactions, or possibilities become available later."]],
      ["thal", "THAL’ITHARA", ["At certain moments, you can use your Thal’ithara directly.", "Follow the displayed instruction and tap, hold, or interact with the shown sign.", "An alternative interaction without a gesture is always available and leads to the same result."]],
      ["character", "CHARACTER", ["The Character section contains information about your character, their origins, and their Thal’ithara.", "You can download your current Character Sheet from this section at any time."]],
      ["quest", "QUEST LOG", ["The Quest Log contains your current tasks, objectives, discovered clues, and open questions.", "Entries only appear once your character has actually learned or discovered the relevant information."]],
      ["journey", "JOURNEY LOG", ["The Journey Log records important experiences, memories, and decisions from your journey.", "The newest events appear at the top.", "Unlike the Quest Log, the Journey Log does not only show what remains to be done. It also records what your character has already experienced."]],
      ["items", "ITEMS", ["Special items you take with you during your journey are collected under Items.", "You can return there later to review their description and significance."]],
      ["save", "SAVE & LOAD", ["The menu allows you to create a manual save or load an existing saved game.", "“Return to Ananthara” continues your current journey.", "Manual saves remain available when you begin a new game."]]
    ]
  };

  var HOW_TO_ICONS = {
    basics: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="7"/><path d="M32 3v15M32 46v15M3 32h15M46 32h15M12 12l11 11M41 41l11 11M52 12 41 23M23 41 12 52"/></svg>',
    thal: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 4 47 20 41 45 32 59 23 45 17 20Z"/><path d="m32 4 6 21-6 34-6-34Z"/><circle cx="32" cy="29" r="7"/></svg>',
    character: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="20" r="10"/><path d="M13 56c2-16 9-24 19-24s17 8 19 24M8 8h9M47 8h9M8 56h9M47 56h9"/></svg>',
    quest: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 8h30l10 10v38H12zM42 8v12h10M20 29h24M20 39h20M20 49h14"/><circle cx="18" cy="13" r="4"/></svg>',
    journey: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="24"/><ellipse cx="32" cy="32" rx="24" ry="10"/><path d="m38 20-5 15-15 7 7-15z"/></svg>',
    items: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M15 18h34v38H15zM23 18V9h18v9M15 29h34M27 29v7h10v-7"/></svg>',
    save: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M11 8h36l6 6v42H11zM20 8v17h24V8M20 41h24M20 49h18"/></svg>',
    choices: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="15" cy="17" r="6"/><circle cx="15" cy="32" r="6"/><circle cx="15" cy="47" r="6"/><path d="M28 17h25M28 32h25M28 47h25"/></svg>'
  };

  function openHowTo(options) {
    options = options || {};
    var existing = document.querySelector(".ana-howto-overlay");
    if (existing) existing.remove();
    var lang = language(options.language);
    var source = HOW_TO_COPY[lang];
    var trigger = options.trigger || document.activeElement;
    var previousOverflow = document.body.style.overflow;
    var overlay = element("div", "ana-howto-overlay");
    var dialog = element("section", "ana-howto-dialog");
    var headingId = "ana-howto-title-" + Date.now();
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", headingId);
    var header = element("header", "ana-howto-header");
    var heading = element("h2", "", lang === "en" ? "HOW TO PLAY" : "SO WIRD GESPIELT");
    heading.id = headingId;
    header.appendChild(heading);
    var close = button("×", closeDialog, "ana-howto-close");
    close.setAttribute("aria-label", lang === "en" ? "Close" : "Schließen");
    header.appendChild(close);
    dialog.appendChild(header);
    var tabs = element("div", "ana-howto-tabs");
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", lang === "en" ? "How to play sections" : "Spielhilfe-Bereiche");
    var panel = element("div", "ana-howto-panel");
    panel.id = headingId + "-panel";
    panel.setAttribute("role", "tabpanel");
    dialog.appendChild(tabs);
    dialog.appendChild(panel);

    function mini(type) {
      var demo = element("div", "ana-howto-demo is-" + type);
      if (type === "choices") demo.innerHTML = '<span class="ana-howto-icon">' + HOW_TO_ICONS.choices + '</span><label><b></b><i></i></label><label><b></b><i></i></label>';
      else if (type === "thal") demo.innerHTML = '<span class="ana-howto-hold">' + HOW_TO_ICONS.thal + '</span><small>' + (lang === "en" ? "HOLD" : "HALTEN") + '</small>';
      else demo.innerHTML = '<span class="ana-howto-icon">' + HOW_TO_ICONS[type] + '</span><i></i><i></i>';
      return demo;
    }

    function select(index, focusTab) {
      var item = source[index];
      Array.prototype.forEach.call(tabs.children, function (tab, tabIndex) {
        var active = tabIndex === index;
        tab.setAttribute("aria-selected", active ? "true" : "false");
        tab.tabIndex = active ? 0 : -1;
      });
      panel.innerHTML = "";
      panel.setAttribute("aria-labelledby", tabs.children[index].id);
      panel.appendChild(mini(item[0]));
      panel.appendChild(element("h3", "", item[1]));
      item[2].forEach(function (copy) { panel.appendChild(element("p", "", copy)); });
      if (focusTab) tabs.children[index].focus({preventScroll:true});
    }

    source.forEach(function (item, index) {
      var tab = button(item[1], function () { select(index, false); }, "ana-howto-tab");
      tab.id = headingId + "-tab-" + index;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", panel.id);
      tab.addEventListener("keydown", function (event) {
        var next = event.key === "ArrowRight" ? index + 1 : event.key === "ArrowLeft" ? index - 1 : event.key === "Home" ? 0 : event.key === "End" ? source.length - 1 : -1;
        if (next < 0 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) next = event.key === "ArrowLeft" ? source.length - 1 : 0;
        if (next >= 0) { event.preventDefault(); select(next % source.length, true); }
      });
      tabs.appendChild(tab);
    });

    function closeDialog() {
      document.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = previousOverflow;
      overlay.remove();
      if (trigger && typeof trigger.focus === "function") trigger.focus({preventScroll:true});
    }
    function onKeydown(event) {
      if (event.key === "Escape") return closeDialog();
      if (event.key !== "Tab") return;
      var focusable = dialog.querySelectorAll('button:not([disabled]),[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    overlay.addEventListener("click", function (event) { if (event.target === overlay) closeDialog(); });
    document.addEventListener("keydown", onKeydown);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    select(0, false);
    close.focus({preventScroll:true});
  }

  function confirmInline(container, message, yesLabel, onYes, lang) {
    var confirm = element("div", "ana-save-confirm");
    confirm.appendChild(element("p", "", message));
    var actions = element("div", "ana-save-actions");
    actions.appendChild(button(yesLabel, onYes, "is-danger"));
    actions.appendChild(button(text(lang, "no"), function () { confirm.remove(); }));
    confirm.appendChild(actions);
    container.appendChild(confirm);
  }

  function saveCard(save, lang, mode, refresh, landing) {
    var card = element("article", "ana-save-card");
    var portrait = element("div", "ana-save-portrait");
    if (safeString(save.portraitImage)) {
      var image = document.createElement("img");
      image.alt = "";
      image.src = save.portraitImage;
      image.addEventListener("error", function () { image.remove(); portrait.classList.add("is-fallback"); }, {once:true});
      portrait.appendChild(image);
    } else portrait.classList.add("is-fallback");
    card.appendChild(portrait);
    var copy = element("div", "ana-save-card-copy");
    copy.appendChild(element("strong", "", save.characterName));
    copy.appendChild(element("span", "", save.displayName));
    copy.appendChild(element("time", "", formatDate(save.timestamp, lang)));
    var sceneLabels = {
      de: {de_00_arrival:"Prolog",de_00_identity:"Sucherakte",de_00_exam_room_01:"Verborgene Wahrheit",en_00_exam_room_01:"Verborgene Wahrheit",de_00_exam_room_02:"Die Gabe des Lichts",en_00_exam_room_02:"Die Gabe des Lichts",de_00_exam_room_03:"Was wir in uns tragen",en_00_exam_room_03:"Was wir in uns tragen",de_00_post_exam:"Abschlussprüfung",en_00_post_exam:"Abschlussprüfung",de_00_itharkael_free_time:"Ithar’kael",en_00_itharkael_free_time:"Ithar’kael",de_00_great_hall:"Große Halle",en_00_great_hall:"Große Halle",de_00_demo_end:"Ende der Demo",en_00_demo_end:"Ende der Demo"},
      en: {de_00_arrival:"Prologue",de_00_identity:"Seeker Dossier",de_00_exam_room_01:"Hidden Truth",en_00_exam_room_01:"Hidden Truth",de_00_exam_room_02:"The Gift of Light",en_00_exam_room_02:"The Gift of Light",de_00_exam_room_03:"What We Carry Within",en_00_exam_room_03:"What We Carry Within",de_00_post_exam:"Final Examination",en_00_post_exam:"Final Examination",de_00_itharkael_free_time:"Ithar’kael",en_00_itharkael_free_time:"Ithar’kael",de_00_great_hall:"Great Hall",en_00_great_hall:"Great Hall",de_00_demo_end:"End of Demo",en_00_demo_end:"End of Demo"}
    };
    var routeLabels = {bayr:"Bay’r",thaldraen:"Thal’draen",veild:"V’eild"};
    if (save.sceneName) copy.appendChild(element("span", "ana-save-location", sceneLabels[lang][save.sceneName] || save.sceneName.replace(/^(de|en)_/, "").replace(/_/g, " ")));
    if (save.campaignRoute) copy.appendChild(element("span", "ana-save-route", (lang === "en" ? "First destination: " : "Erstes Reiseziel: ") + (routeLabels[save.campaignRoute] || save.campaignRoute)));
    card.appendChild(copy);
    var actions = element("div", "ana-save-actions");
    if (mode === "save") {
      actions.appendChild(button(text(lang, "overwrite"), function () {
        confirmInline(card, text(lang, "confirmOverwrite"), text(lang, "yesOverwrite"), function () {
          saveManual(save, save.displayName, function (ok, result) { refresh(ok ? result : false); });
        }, lang);
      }));
    } else {
      actions.appendChild(button(text(lang, "load"), function () {
        var slot = slotFor(save.id);
        var overlay = card.closest(".ana-save-overlay");
        closeOverlay(overlay);
        if (landing && window.AnantharaIntro) window.AnantharaIntro.loadManualGame(slot);
        else window.clearScreen(function () { window.loadAndRestoreGame(slot); });
      }, "is-primary"));
      actions.appendChild(button(text(lang, "remove"), function () {
        confirmInline(card, text(lang, "confirmDelete"), text(lang, "yesDelete"), function () {
          deleteManual(save, refresh);
        }, lang);
      }, "is-danger"));
    }
    card.appendChild(actions);
    return card;
  }

  function openSavePanel(options) {
    options = options || {};
    var lang = language(options.language);
    var overlay = element("div", "ana-save-overlay");
    var panel = element("section", "ana-save-panel");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    panel.appendChild(element("h2", "", options.mode === "save" ? text(lang, "saveTitle") : text(lang, "loadTitle")));
    var status = element("p", "ana-save-status");
    var list = element("div", "ana-save-list");

    function refresh(result) {
      if (result === false) status.textContent = text(lang, "saveFailed");
      else if (result && result.id) status.textContent = text(lang, "saved");
      listSaves(function (saves, available) {
        list.innerHTML = "";
        if (!available) list.appendChild(element("p", "ana-save-empty", text(lang, "unavailable")));
        else if (!saves.length) list.appendChild(element("p", "ana-save-empty", text(lang, "empty")));
        else saves.forEach(function (save) { list.appendChild(saveCard(save, lang, options.mode, refresh, !!options.landing)); });
      });
    }

    if (options.mode === "save") {
      var creator = element("div", "ana-save-create");
      var input = element("input");
      input.type = "text";
      input.maxLength = 80;
      input.placeholder = text(lang, "saveName");
      creator.appendChild(input);
      creator.appendChild(button(text(lang, "createSave"), function () {
        saveManual(null, input.value, function (ok, result) {
          if (ok) input.value = "";
          refresh(ok ? result : false);
        });
      }, "is-primary"));
      panel.appendChild(creator);
    }
    panel.appendChild(status);
    panel.appendChild(list);
    panel.appendChild(button(text(lang, options.landing ? "cancel" : "back"), function () { closeOverlay(overlay); }, "ana-save-close"));
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    refresh();
    var focusTarget = panel.querySelector("input,button");
    if (focusTarget) focusTarget.focus({preventScroll:true});
  }

  function returnToGame() {
    window.clearScreen(function () {
      if (typeof window.setButtonTitles === "function") window.setButtonTitles();
      window.loadAndRestoreGame();
    });
  }

  function showAnantharaMenu() {
    if (document.getElementById("loading")) return;
    var menuButton = document.getElementById("menuButton");
    if (!menuButton) return;
    if (menuButton.getAttribute("data-return")) return returnToGame();
    var lang = language();
    window.clearScreen(function () {
      if (typeof window.setAnantharaNavButton === "function") window.setAnantharaNavButton(menuButton, text(lang, "returnGame"), "back");
      else menuButton.textContent = text(lang, "returnGame");
      menuButton.setAttribute("data-return", "true");
      var target = document.getElementById("text");
      var menu = element("section", "ana-game-menu");
      menu.appendChild(element("h2", "", text(lang, "menu")));
      menu.appendChild(button(text(lang, "returnGame"), returnToGame, "is-primary"));
      menu.appendChild(button(text(lang, "howTo"), function (event) { openHowTo({language:lang, trigger:event.currentTarget}); }));
      menu.appendChild(button(text(lang, "saveGame"), function () { openSavePanel({mode:"save"}); }));
      menu.appendChild(button(text(lang, "loadGame"), function () { openSavePanel({mode:"load"}); }));
      menu.appendChild(button(text(lang, "restartGame"), function () {
        confirmInline(menu, text(lang, "confirmRestart"), text(lang, "yesRestart"), function () {
          if (window.AnantharaIntro) window.AnantharaIntro.startNewGame();
          else window.restartGame(false);
        }, lang);
      }));
      menu.appendChild(button(text(lang, "settings"), function () {
        window.textOptionsMenu({size:1, color:1, family:1, animation:window.animationProperty, sliding:window.isMobile});
      }));
      target.appendChild(menu);
      if (typeof window.changeTitle === "function") window.changeTitle(document.title);
      if (typeof window.curl === "function") window.curl();
    });
  }

  function mountDemoEnd(scene) {
    if (!scene) return;
    scene.finished = true;
    scene.save("");
    var lang = language(scene.stats && scene.stats.language);
    var target = document.getElementById("text");
    if (!target) return;
    var existing = target.querySelector(".ana-demo-end");
    if (existing) existing.remove();
    var panel = element("section", "ana-demo-end");
    panel.appendChild(element("div", "ana-demo-sigil", "✧"));
    var actions = element("div", "ana-demo-actions");
    [
      ["feedback", "feedback"], ["newsletter", "newsletter"], ["patreon", "patreon"]
    ].forEach(function (entry) {
      var url = safeString(LINKS[entry[0]]);
      var link = element("a", "", text(lang, entry[1]));
      if (url) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else {
        link.classList.add("is-disabled");
        link.setAttribute("aria-disabled", "true");
        link.setAttribute("title", text(lang, "linkUnavailable"));
      }
      actions.appendChild(link);
    });
    actions.appendChild(button(text(lang, "newGame"), function () {
      if (window.AnantharaIntro) window.AnantharaIntro.startNewGame();
      else window.restartGame(false);
    }, "is-primary"));
    panel.appendChild(actions);
    target.appendChild(panel);
  }

  window.AnantharaLinks = LINKS;
  window.AnantharaManualSaves = {
    list: listSaves,
    save: saveManual,
    remove: deleteManual,
    hasAny: function (callback) { listSaves(function (saves) { callback(saves.length > 0); }); },
    openSave: function () { openSavePanel({mode:"save"}); },
    openLoad: function (options) { openSavePanel(Object.assign({mode:"load"}, options || {})); },
    slotFor: slotFor
  };
  window.AnantharaDemoEnd = {mount: mountDemoEnd};
  window.AnantharaHowTo = {open: openHowTo};
  window.showMenu = showAnantharaMenu;
})();
