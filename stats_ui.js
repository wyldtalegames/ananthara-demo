(function () {
  "use strict";

  var I18N = {
    de: {
      tabs: {character: "Charakter", quests: "Questlog", journey: "Reisechronik", items: "Gegenstände"},
      archive: "ARCHIV DER SUCHER DER WAHRHEIT",
      dossier: "ITHAR’KAEL SUCHERAKTE",
      unnamed: "Unbenannter Sucher",
      identity: "Identität",
      race: "Volk",
      homeland: "Heimat",
      personalHistory: "Persönliche Geschichte",
      reason: "Grund der Suche",
      origin: "Herkunft",
      order: "Orden",
      guildRank: "Gildenrang",
      stability: "Aktuelle Stabilität",
      thalProfile: "Thal’ithara-Profil",
      thal: "Thal’ithara",
      calling: "Calling",
      affinity: "Angeborene Affinität",
      currentResonance: "Aktuelle Resonanz",
      manifestation: "Thal’ithara-Manifestation",
      legacyThal: "Legacy-Thal’ithara-Eintrag",
      oracleProphecy: "Orakelprophezeiung",
      noOracle: "Noch hat sich keine Prophezeiung offenbart.",
      cardDrawn: "Diese Karte wurde im Archiv von Ithar’kael gezogen.",
      attributesTitle: "Aktuelle Resonanzwerte",
      journeyTitle: "Reisechronik",
      echoArchive: "Chronik deiner Echos",
      noEchoes: "Noch hat deine Reise keine sichtbaren Echos hinterlassen.",
      questLogTitle: "Questlog",
      activeQuests: "Aktive Quests",
      completedQuests: "Abgeschlossene Quests",
      noQuests: "Noch wurden keine Quests in deiner Akte verzeichnet.",
      currentObjective: "Aktuelles Ziel",
      discoveries: "Erkenntnisse und Hinweise",
      relevantItems: "Relevante Gegenstände und Quellen",
      openQuestions: "Offene Fragen",
      preservedNotes: "Bewahrte Notizen",
      travelItems: "Reisegegenstände",
      itemsTitle: "Gegenstände",
      noItems: "Du trägst noch keine besonderen Gegenstände mit dir.",
      passiveEffect: "Passiver Effekt",
      questStatusActive: "Aktiv",
      questStatusCompleted: "Abgeschlossen",
      questTypeMain: "Hauptquest",
      questTypePersonal: "Persönliche Quest",
      questTypeSide: "Nebenquest",
      questTypeExamination: "Prüfung",
      personalQuestFallback: "Persönliche Suche",
      close: "Schließen",
      raceFallback: "Darstellung nicht verfügbar",
      homelandFallback: "Heimatdarstellung nicht verfügbar",
      oracleFallback: "Orakelbild nicht verfügbar",
      value: "Wert",
      orderText: "Ithar'kael · Sucher der Wahrheit",
      downloadSheet: "Charakterbogen herunterladen",
      preparingDownload: "Charakterbogen wird erstellt …",
      empty: "—",
      attributes: {
        neugier: "Neugier",
        offenheit: "Offenheit",
        innereBalance: "Innere Balance",
        wyldVertrauen: "Vertrauen zu Wyld",
        verbundenheit: "Verbundenheit",
        resonanz: "Resonanz",
        authentizitaet: "Authentizität",
        vorsicht: "Vorsicht"
      }
    },
    en: {
      tabs: {character: "Character", quests: "Quest Log", journey: "Journey Log", items: "Items"},
      archive: "ARCHIVE OF THE SEEKERS OF TRUTH",
      dossier: "ITHAR’KAEL SEEKER DOSSIER",
      unnamed: "Unnamed Seeker",
      identity: "Identity",
      race: "Race",
      homeland: "Homeland",
      personalHistory: "Personal History",
      reason: "Reason for Seeking",
      origin: "Origin",
      order: "Order",
      guildRank: "Guild Rank",
      stability: "Current Stability",
      thalProfile: "Thal’ithara Profile",
      thal: "Thal’ithara",
      calling: "Calling",
      affinity: "Innate Affinity",
      currentResonance: "Current Resonance",
      manifestation: "Thal’ithara Manifestation",
      legacyThal: "Legacy Thal’ithara Entry",
      oracleProphecy: "Oracle Prophecy",
      noOracle: "No prophecy has revealed itself yet.",
      cardDrawn: "This card was drawn in Ithar’kael’s archive.",
      attributesTitle: "Current Resonance Values",
      journeyTitle: "Journey Log",
      echoArchive: "Chronicle of Your Echoes",
      noEchoes: "Your journey has not left any visible echoes yet.",
      questLogTitle: "Quest Log",
      activeQuests: "Active Quests",
      completedQuests: "Completed Quests",
      noQuests: "No quests have been recorded in your dossier yet.",
      currentObjective: "Current Objective",
      discoveries: "Discoveries and Clues",
      relevantItems: "Relevant Items and Sources",
      openQuestions: "Open Questions",
      preservedNotes: "Preserved Notes",
      travelItems: "Travel Items",
      itemsTitle: "Items",
      noItems: "You are not carrying any notable items yet.",
      passiveEffect: "Passive Effect",
      questStatusActive: "Active",
      questStatusCompleted: "Completed",
      questTypeMain: "Main Quest",
      questTypePersonal: "Personal Quest",
      questTypeSide: "Side Quest",
      questTypeExamination: "Examination",
      personalQuestFallback: "Personal Search",
      close: "Close",
      raceFallback: "Race artwork unavailable",
      homelandFallback: "Homeland artwork unavailable",
      oracleFallback: "Oracle artwork unavailable",
      value: "Value",
      orderText: "Ithar'kael · Seekers of Truth",
      downloadSheet: "Download Character Sheet",
      preparingDownload: "Creating Character Sheet …",
      empty: "—",
      attributes: {
        neugier: "Curiosity",
        offenheit: "Openness",
        innereBalance: "Inner Balance",
        wyldVertrauen: "Trust in Wyld",
        verbundenheit: "Connection",
        resonanz: "Resonance",
        authentizitaet: "Authenticity",
        vorsicht: "Caution"
      }
    }
  };

  var ECHO_CONFIG = [
    {id: "echo_origin", category: "arrival", titleDe: "Herkunft", titleEn: "Origin", order: 5, icon: "✦"},
    {id: "echo_intro", category: "arrival", titleDe: "Ankunft", titleEn: "Arrival", order: 10, icon: "✧"},
    {id: "echo_wyld", category: "wyld", titleDe: "Wyld", titleEn: "Wyld", order: 20, icon: "☉"},
    {id: "echo_sacred_wylds", category: "place", titleDe: "Sacred Wylds", titleEn: "Sacred Wylds", order: 30, icon: "♣"},
    {id: "echo_festival", category: "place", titleDe: "Lir’fael’thaen", titleEn: "Lir’fael’thaen", order: 40, icon: "✺"},
    {id: "echo_reflection", category: "reflection", titleDe: "Reflexion", titleEn: "Reflection", order: 50, icon: "◌"},
    {id: "echo_ritual", category: "ritual", titleDe: "Kaerun’shae", titleEn: "Kaerun’shae", order: 60, icon: "◇"},
    {id: "echo_oracle", category: "oracle", titleDe: "Orakel", titleEn: "Oracle", order: 70, icon: "☽"},
    {id: "echo_personal_quest", category: "personal", titleDe: "Persönlicher Faden", titleEn: "Personal Thread", order: 80, icon: "✧"}
    ,{id: "echo_exam_room_02", category: "reflection", titleDe: "Was weitergetragen wird", titleEn: "What Is Carried Forward", order: 75, icon: "◇"}
    ,{id: "echo_personal_clue_01", category: "personal", titleDe: "Persönliche Spur", titleEn: "Personal Lead", order: 85, icon: "✧"}
    ,{id: "echo_tehand", category: "personal", titleDe: "Worte ohne Bedeutung", titleEn: "Words Without Meaning", order: 86, icon: "⌁"}
    ,{id: "echo_personal_keepsake", category: "personal", titleDe: "Was ich mitnehme", titleEn: "What I Carry With Me", order: 87, icon: "◇"}
    ,{id: "echo_chronicles_assignment", category: "quest", titleDe: "Die Chroniken", titleEn: "The Chronicles", order: 90, icon: "▣"}
    ,{id: "echo_first_departure", category: "place", titleDe: "Der erste Weg", titleEn: "The First Path", order: 95, icon: "✦"}
  ];

  /* Presentation metadata only. Add a record when an authored quest adds its
     persistent ChoiceScript fields; never store quest progress in this array. */
  var QUEST_CONFIG = [
    {
      id: "chronicles",
      type: "main",
      order: 5,
      statusField: "quest_chronicles_status",
      objectiveField: "quest_chronicles_objective",
      titleDe: "Die Chroniken von Ananthara",
      titleEn: "The Chronicles of Ananthara"
    },
    {
      id: "exam_room_01",
      type: "examination",
      order: 10,
      statusField: "quest_exam_status",
      visibleField: "quest_exam_room_01_visible",
      objectiveField: "quest_exam_objective",
      titleDe: "Abschlussprüfung von Ithar’kael",
      titleEn: "Ithar’kael Final Examination"
      ,rooms: [
        {id: "room_01", statusField: "quest_exam_room_01_status", objectiveField: "quest_exam_room_01_objective", discoveryPrefix: "quest_exam_room_01_discovery_", itemPrefix: "quest_exam_room_01_item_", notePrefix: "quest_exam_room_01_note_", titleDe: "Verborgene Wahrheit", titleEn: "Hidden Truth"},
        {id: "room_02", statusField: "quest_exam_room_02_status", objectiveField: "quest_exam_room_02_objective", discoveryPrefix: "quest_exam_room_02_discovery_", titleDe: "Die Gabe des Lichts", titleEn: "The Gift of Light"},
        {id: "room_03", statusField: "quest_exam_room_03_status", objectiveField: "quest_exam_room_03_objective", discoveryPrefix: "quest_exam_room_03_discovery_", titleDe: "Was wir in uns tragen", titleEn: "What We Carry Within"}
      ]
    },
    {
      id: "personal_quest",
      idField: "personal_quest_id",
      type: "personal",
      order: 20,
      statusField: "personal_quest_stage",
      visibleField: "personal_quest_log_visible",
      titleField: "personal_quest_log_title",
      objectiveField: "personal_quest_log_objective",
      discoveryPrefix: "personal_quest_discovery_",
      itemPrefix: "personal_quest_log_item_",
      questionPrefix: "personal_quest_log_question_",
      fallbackTitleKey: "personalQuestFallback"
    }
  ];

  /* Presentation-only fallback for saves created before the personal Quest Log
     fields were initialized during identity creation. Never written to stats. */
  var PERSONAL_QUEST_FALLBACK = {
    missing: {
      de: {title: "Verlorene Seelen", objective: "Finde heraus, was mit der verschwundenen Person geschehen ist."},
      en: {title: "Lost Souls", objective: "Find out what happened to the person who disappeared."}
    },
    affliction: {
      de: {title: "Die Krankheit", objective: "Finde den Ursprung der Krankheit, die deine Heimat heimgesucht hat."},
      en: {title: "The Affliction", objective: "Find the origin of the illness that struck your homeland."}
    },
    lost_memory: {
      de: {title: "Verlorene Erinnerungen", objective: "Finde heraus, was in deiner Vergangenheit geschehen ist und warum Teile deiner Erinnerung fehlen."},
      en: {title: "Lost Memories", objective: "Find out what happened in your past and why parts of your memory are missing."}
    }
  };

  /* Presentation text for authored knowledge flags. ChoiceScript remains the
     source of truth: an entry exists only when its path and knowledge flag are
     set. General mural observations deliberately remain outside the Quest Log. */
  var PERSONAL_DISCOVERY_CONFIG = [
    {
      id: "missing_mural_connection",
      questId: "missing",
      flag: "missing_mural_connection",
      title: {
        de: "Neue Spur – Eine vertraute Verbindung",
        en: "New Lead – A Familiar Connection"
      },
      text: function (stats, language) {
        var relationship = safeString(stats.missing_person_relationship);
        var memory = safeString(stats.missing_connection_memory);
        var relationshipText = {
          loved: {de: "die Person, die ich liebte", en: "the person I loved"},
          closest_friend: {de: "meinen engsten Freund oder meine engste Freundin", en: "my closest friend"},
          parent: {de: "meine Mutter oder meinen Vater", en: "my mother or father"},
          sister: {de: "meine Schwester", en: "my sister"},
          brother: {de: "meinen Bruder", en: "my brother"}
        };
        var memoryText = {
          gesture: {de: "unsere vertraute Geste", en: "our familiar gesture"},
          place: {de: "einen Ort, der uns beiden etwas bedeutete", en: "a place that meant something to both of us"},
          shared_moment: {de: "einen Moment, den wir miteinander geteilt hatten", en: "a moment we had shared"}
        };
        var subject = safeString(relationshipText[relationship] && relationshipText[relationship][language]) || safeString(stats.missing_room2_name_or_relationship);
        var trait = safeString(memoryText[memory] && memoryText[memory][language]) || safeString(stats.missing_room2_symbol_or_trait);
        if (!subject || !trait) return "";
        return language === "en"
          ? "The mural in my final examination triggered an unexpectedly vivid memory of " + subject + ". Part of the depiction reminded me of " + trait + " and felt strikingly familiar. I do not yet know whether the mural merely awakened a memory or whether it touched upon something connected to the disappearance."
          : "Das Wandbild in meiner Abschlussprüfung löste eine unerwartet deutliche Erinnerung an " + subject + " aus. Ein Teil der Darstellung erinnerte mich an " + trait + " und fühlte sich auffällig vertraut an. Ich weiß noch nicht, ob das Wandbild lediglich eine Erinnerung geweckt hat oder ob es etwas berührt hat, das mit dem Verschwinden zusammenhängt.";
      }
    },
    {
      id: "lost_memory_sand_ruin",
      questId: "lost_memory",
      flag: "lost_memory_sand_ruin",
      title: {de: "Neue Spur – Die Ruine im Sand", en: "New Lead – The Ruin in the Sand"},
      text: {
        de: "Während meiner Abschlussprüfung löste das Wandbild eine kurze Vision aus. Ich hörte eine Stimme und sah eine Ruine, umgeben von Sand. Die Erinnerung – falls es eine war – endete mit starken körperlichen Nachwirkungen. Ich kenne diesen Ort nicht. Trotzdem fühlte er sich vertraut an.",
        en: "During my final examination, the mural triggered a brief vision. I heard a voice and saw a ruin surrounded by sand. The memory—if that is what it was—ended with intense physical aftereffects. I do not know this place. Even so, it felt familiar."
      },
      replicaText: {
        de: "Die Replik der Chroniken zeigte mir eine Ruine in einer endlosen Sandlandschaft. Ich kenne diesen Ort nicht bewusst, doch etwas daran fühlte sich beinahe vertraut an. Zum ersten Mal besitzt meine Suche einen konkreten Ausgangspunkt.",
        en: "The replica of the Chronicles showed me a ruin in an endless landscape of sand. I do not consciously know this place, yet something about it felt almost familiar. For the first time, my search has a concrete starting point."
      }
    },
    {
      id: "affliction_veil_connection",
      questId: "affliction",
      flag: "affliction_veil_connection",
      title: {de: "Neue Spur – Der schwarze Schleier", en: "New Lead – The Black Veil"},
      text: {
        de: "Während meiner Abschlussprüfung reagierte der schwarze Schleier des Wandbilds auf mich und löste eine Vision meiner Heimat aus. Darin erkannte ich denselben dunklen Einfluss bei den Erkrankten wieder. Ursache und Zusammenhang sind unbekannt, doch möglicherweise besteht eine Verbindung zwischen der Krankheit und dem, was das Wandbild darstellt.",
        en: "During my final examination, the mural’s black veil reacted to me and triggered a vision of my homeland. In it, I recognized the same dark influence among those afflicted by the illness. Its cause and the nature of the connection remain unknown, but there may be a link between the sickness and what the mural depicts."
      }
    }
  ];

  var AnantharaThalitharaData = {
    archetypes: {
      Veilwalker: {
        de: {
          title: "Veilwalker",
          callingDescription: "Dein Calling wurde durch den Teil deiner Seele offenbart, der sich instinktiv zwischen der sichtbaren und der unsichtbaren Welt bewegt und Emotionen, Geister und unsichtbare Spuren wahrnimmt, die andere oft nicht erkennen können.",
          popupDescription: "Dein Calling wurde durch den Teil deiner Seele offenbart, der sich zwischen der sichtbaren und der unsichtbaren Welt bewegt und Geister, Emotionen und unsichtbare Spuren wahrnimmt, die andere oft nicht erkennen können.",
          affinity: "Du bemerkst vielleicht, wenn jemand bezaubert, verflucht, spirituell beeinflusst oder dazu gedrängt wird, etwas zu fühlen, das nicht wirklich zu dieser Person gehört.",
          resonanceDescription: "Veilwalker-Resonanz kann dich sensibler für Magie machen, die Geist, Seele oder Emotionen beeinflusst — einschließlich Illusionen, Flüchen und Manipulation.",
          direction: "Dein Thal’ithara kann sich durch den Schleier zwischen der sichtbaren und der unsichtbaren Welt manifestieren — durch das Wahrnehmen von Geistern, emotionalen Spuren, Flüchen, spirituellem Einfluss oder unsichtbaren Kräften, die die Seele berühren."
        },
        en: {
          title: "Veilwalker",
          callingDescription: "Your Calling was revealed through the part of your soul that instinctively moves between the visible and invisible world, sensing emotions, spirits and unseen traces others often cannot perceive.",
          popupDescription: "Your Calling was revealed through the part of your soul that moves between the visible and invisible world, sensing spirits, emotions and unseen traces others often cannot perceive.",
          affinity: "You may notice when someone is charmed, cursed, spiritually influenced or pushed to feel something that is not truly their own.",
          resonanceDescription: "Veilwalker Resonance may make you more sensitive to magic that affects the mind, soul or emotions, including illusions, curses and manipulation.",
          direction: "Your Thal’ithara may manifest through the veil between the visible and invisible world — sensing spirits, emotional traces, curses, spiritual influence or the unseen forces that touch the soul."
        }
      },
      Llifari: {
        de: {
          title: "Llifari",
          callingDescription: "Dein Calling wurde durch den Teil deiner Seele offenbart, der Natur als etwas Lebendiges, Zerbrechliches und tief Verbundenes versteht. Wo andere Ressourcen sehen, die man nehmen kann, oder Land, das man umformen kann, spürst du, was bewahrt werden muss, bevor das Gleichgewicht zu brechen beginnt. Llifari verstehen, dass die Natur bereits Magie in sich trägt — in Wachstum, Verfall, Heilung, Transformation und Erneuerung — und dass wahre Kraft daraus entsteht, mit diesen Kräften zu arbeiten, ohne das zu zerstören, was sie erhält.",
          popupDescription: "Dein Calling wurde durch den Teil deiner Seele offenbart, der Natur als lebendig, zerbrechlich und tief verbunden versteht. Wo andere Ressourcen sehen, die man nehmen kann, spürst du, was bewahrt werden muss, bevor Balance zerbricht.",
          affinity: "Kräuter, klares Wasser, erwärmter Stein, Asche, Rinde, Wurzeln oder Mineralien können in deinen Händen zu Medizin, Heilmittel, Gift, Schutz oder Nahrung werden.",
          resonanceDescription: "Llifari-Resonanz kann deine Wahrnehmung für sichere Wege, nützliche Pflanzen, Warnungen von Tieren, verborgene Nahrung, vergiftetes Wasser, wechselndes Wetter oder Land schärfen, das aus dem Gleichgewicht gerät.",
          direction: "Dein Thal’ithara kann sich durch eine tiefe Harmonie mit der Natur und den Elementen manifestieren. Wasser kann sich mit deinem Rhythmus bewegen, Blumen können unter deinen Schritten wachsen, Flammen können auf deinen Atem antworten und Wind kann sich verändern, als würde er zuhören. Die Natur gehorcht dir nicht. Sie erkennt dich."
        },
        en: {
          title: "Llifari",
          callingDescription: "Your Calling was revealed through the part of your soul that understands nature as something living, fragile and deeply connected. Where others may see resources to take or land to reshape, you sense what must be preserved before balance begins to break. Llifari understand that nature already carries magic within itself — in growth, decay, healing, transformation and renewal — and that true power comes from working with these forces without destroying what sustains them.",
          popupDescription: "Your Calling was revealed through the part of your soul that understands nature as living, fragile and deeply connected. Where others see resources to take, you sense what must be preserved before balance breaks.",
          affinity: "Herbs, clean water, warmed stone, ash, bark, roots or minerals may become medicine, remedy, poison, protection or nourishment in your hands.",
          resonanceDescription: "Llifari Resonance may sharpen your awareness for safe paths, useful plants, animal warnings, hidden nourishment, poisoned water, shifting weather or land falling out of balance.",
          direction: "Your Thal’ithara may manifest through a deep harmony with nature and the elements. Water may move with your rhythm, flowers may rise beneath your steps, flame may answer your breath, and wind may shift as if listening. Nature does not obey you. It recognizes you."
        }
      },
      Seeker: {
        de: {
          title: "Seeker",
          callingDescription: "Dein Calling wurde durch den Teil deiner Seele offenbart, der vergessene Dinge nicht begraben lassen kann. Du fühlst dich zu alter Geschichte, verlorenen Zivilisationen, Relikten, Symbolen und unbeantworteten Fragen hingezogen und spürst, dass jede Ruine, jedes Zeichen oder jede zerbrochene Geschichte noch eine Wahrheit bergen kann, die darauf wartet, entdeckt zu werden.",
          popupDescription: "Dein Calling wurde durch den Teil deiner Seele offenbart, der vergessene Dinge nicht begraben lassen kann. Du fühlst dich zu Ruinen, Relikten, Symbolen und unbeantworteten Fragen hingezogen, die noch eine verborgene Wahrheit bergen könnten.",
          affinity: "Du spürst vielleicht den Fehler in einer perfekten Geschichte, das fehlende Teil in einem Rätsel, einen verborgenen Auslöser oder das Muster, mit dem jemand verbergen wollte, was geschehen ist.",
          resonanceDescription: "Seeker-Resonanz kann deine Wahrnehmung für veränderte Symbole, umgeschriebene Aufzeichnungen, falsche Muster und Dinge schärfen, die andere von der Wahrheit wegführen sollen.",
          direction: "Dein Thal’ithara kann sich durch Entdeckung selbst manifestieren — durch das Enthüllen veränderter Symbole, falscher Muster, verborgener Mechanismen, vergessener Aufzeichnungen, versteckter Fallen oder jenes fehlenden Teils, das verändert, wie eine Wahrheit verstanden wird."
        },
        en: {
          title: "Seeker",
          callingDescription: "Your Calling was revealed through the part of your soul that cannot leave forgotten things buried. You are drawn to ancient history, lost civilizations, relics, symbols and unanswered questions, sensing that every ruin, mark or broken story may still hold a truth waiting to be uncovered.",
          popupDescription: "Your Calling was revealed through the part of your soul that cannot leave forgotten things buried. You are drawn to ruins, relics, symbols and unanswered questions that may still hold a truth waiting to be uncovered.",
          affinity: "You may sense the flaw in a perfect story, the missing piece in a puzzle, a concealed trigger or the pattern someone used to hide what happened.",
          resonanceDescription: "Seeker Resonance may sharpen your awareness for altered symbols, changed records, false patterns and things arranged to lead others away from the truth.",
          direction: "Your Thal’ithara may manifest through discovery itself — revealing altered symbols, false patterns, hidden mechanisms, forgotten records, concealed traps or the missing piece that changes how the truth is understood."
        }
      },
      Artisari: {
        de: {
          title: "Artisari",
          callingDescription: "Dein Calling wurde durch den Teil deiner Seele offenbart, der Gefühl in Form verwandelt. Artisari fühlen sich zu Musik, Malerei, Geschichten, Tanz, Handwerkskunst, Architektur und allem hingezogen, was einen Moment, eine Emotion oder eine Erinnerung bewahren kann, bevor sie verloren geht.",
          popupDescription: "Dein Calling wurde durch den Teil deiner Seele offenbart, der Gefühl in Form verwandelt. Du fühlst dich zu Kunst, Geschichten, Musik, Handwerk und allem hingezogen, was Emotionen oder Erinnerungen bewahren kann, bevor sie verloren gehen.",
          affinity: "Du verstehst instinktiv, wie Ausdruck auf andere wirkt — welche Worte ein verschlossenes Herz weicher machen, welche Geschichte jemanden zum Zuhören bringt und wie Schönheit, Stimme oder Rhythmus Emotionen leichter fühlbar machen.",
          resonanceDescription: "Artisari-Resonanz kann deine Wahrnehmung dafür schärfen, was Menschen anzieht, die Stimmung eines Raumes verändert, eine Stimme überzeugend macht, eine Geschichte unvergesslich werden lässt oder eine Schöpfung unmöglich zu ignorieren macht.",
          direction: "Dein Thal’ithara kann sich durch Schöpfung selbst manifestieren — indem Emotion, Erinnerung, Vorstellungskraft, Schönheit oder Bedeutung zu etwas wird, das andere sehen, hören, berühren, betreten, tragen oder erinnern können."
        },
        en: {
          title: "Artisari",
          callingDescription: "Your Calling was revealed through the part of your soul that turns feeling into form. Artisari are drawn to music, painting, storytelling, dance, craftsmanship, architecture and anything that can capture a moment, emotion or memory before it is lost.",
          popupDescription: "Your Calling was revealed through the part of your soul that turns feeling into form. You are drawn to art, story, music, craft and anything that can capture emotion or memory before it is lost.",
          affinity: "You instinctively understand how expression affects others — which words may soften a guarded heart, which story might make someone listen, and how beauty, voice or rhythm can make emotion easier to feel.",
          resonanceDescription: "Artisari Resonance may sharpen your awareness for what draws people in, shifts the mood of a room, makes a voice convincing, a story unforgettable or a creation impossible to ignore.",
          direction: "Your Thal’ithara may manifest through creation itself — shaping emotion, memory, imagination, beauty, or meaning into something others can see, hear, touch, enter, carry, or remember."
        }
      },
      Vanguard: {
        de: {
          title: "Vanguard",
          callingDescription: "Dein Calling wurde durch den Teil deiner Seele offenbart, der auf die Welt blickt und sieht, was verändert werden könnte. Vanguards fühlen sich zu Erfindung, Fortschritt, Wiederaufbau, Mechanismen, Werkzeugen, Strukturen, Systemen und Möglichkeiten hingezogen, die noch nicht existieren.",
          popupDescription: "Dein Calling wurde durch den Teil deiner Seele offenbart, der auf die Welt blickt und sieht, was verändert werden könnte. Du fühlst dich zu Erfindung, Wiederaufbau, Mechanismen und Möglichkeiten hingezogen, die noch nicht existieren.",
          affinity: "Deine Berührung kann Ordnung in Dinge bringen, die andere für zu empfindlich, zerbrochen oder komplex halten. Schlösser, Mechanismen, Artefakte und instabile magische Geräte wirken in deinen Händen weniger unmöglich.",
          resonanceDescription: "Vanguard-Resonanz kann deine Wahrnehmung für arkane Struktur, Funktion und Design schärfen und deine Hände präziser im Umgang mit Werkzeugen, Schlössern, Mechanismen, Artefakten und empfindlichen magischen Komponenten machen.",
          direction: "Dein Thal’ithara kann sich durch Magitech manifestieren — indem Magie, Mechanismus und Erfindung zu Werkzeugen, Geräten, Strukturen oder Artefakten verschmelzen, die verbessern, was existiert, reparieren, was versagt hat, oder Möglichkeiten erschaffen, die die Welt sich noch nicht vorgestellt hat."
        },
        en: {
          title: "Vanguard",
          callingDescription: "Your Calling was revealed through the part of your soul that looks at the world and sees what could be changed. Vanguards are drawn to invention, progress, rebuilding, mechanisms, tools, structures, systems and possibilities that do not exist yet.",
          popupDescription: "Your Calling was revealed through the part of your soul that looks at the world and sees what could be changed. You are drawn to invention, rebuilding, mechanisms and possibilities that do not exist yet.",
          affinity: "Your touch may bring order to things others find too delicate, broken or complex. Locks, mechanisms, artifacts and unstable magical devices may seem less impossible in your hands.",
          resonanceDescription: "Vanguard Resonance may sharpen your awareness of arcane structure, function and design, making your hands more precise with tools, locks, mechanisms, artifacts and delicate magical components.",
          direction: "Your Thal’ithara may manifest through magitech — blending magic, mechanism and invention into tools, devices, structures or artifacts that improve what exists, repair what has failed or create possibilities the world has not yet imagined."
        }
      },
      Aegis: {
        de: {
          title: "Aegis",
          callingDescription: "Aegis sind Menschen, deren instinktives Wesen sich um Schutz, Verantwortung, Stärke und darum dreht, standzuhalten, wenn andere es nicht können. Sie treten von selbst vor, wenn Menschen in ihrer Nähe Hilfe brauchen, und stellen das Wohlergehen anderer oft über den eigenen Komfort. Wo viele zögern, verspüren Aegis ein tiefes inneres Bedürfnis, die Menschen, Werte, Orte und Überzeugungen zu schützen, die sie für verteidigenswert halten. Für sie ging es bei Stärke nie allein um Macht. Es geht um den Mut zu handeln, die Widerstandskraft auszuhalten und die Entschlossenheit, zu der Person zu werden, auf die andere sich verlassen können, wenn alles auseinanderzubrechen beginnt. Ein Aegis erträgt Gefahr nicht einfach. Aegis stellen sich ihr entgegen. Sie halten, was nicht fallen darf, zerbrechen, was Schaden anzurichten droht, und drängen Kräfte zurück, die andere überwältigen würden. Ihre Gegenwart trägt oft dieselbe Kraft. Ihre Stimme kann Angst beruhigen, ihre Entschlossenheit Feinde zögern lassen und ihr Mut jene sammeln, die kurz davor sind aufzugeben. Wenn ein Aegis sich weigert, zur Seite zu treten, finden andere vielleicht die Stärke, an seiner Seite standzuhalten. Ihr Thal’ithara manifestiert sich häufig als Stärke, der magische Form verliehen wird. Es kann den Körper verstärken und einem Aegis ermöglichen, gewaltigem Druck standzuhalten oder außergewöhnliche Kraftleistungen zu vollbringen, doch diese Macht ist nicht auf den Körper beschränkt. Durch Zeichen, Siegel und Schutzzeichen, die von der eigenen Hand geformt werden, kann ein Aegis seine Stärke über die körperliche Reichweite hinaus lenken und Kraft eine sichtbare, greifbare Gestalt geben. Ein gezeichnetes Zeichen kann zu einer Barriere, einem bindenden Siegel, einem mächtigen Stoß oder zu einer manifestierten Erweiterung der eigenen Stärke werden, die etwas schiebt, hebt, hält oder trägt, das sich mit bloßen Händen niemals bewegen ließe. Ihre Zeichen und Siegel können auch auf Magie selbst einwirken — geschwächte Grenzen verstärken, instabile Kräfte verankern, gefährliche Einflüsse versiegeln, feindliche Verzauberungen stören, Flüche brechen oder Kräfte bannen, die andere bedrohen. Manche Zeichen stärken den Aegis selbst, andere lassen seinen Willen und seine Macht auf die Welt um ihn herum einwirken. Ein Aegis kann zugleich Schild und Kraft sein: fähig auszuhalten, was ihn trifft, zu schützen, was hinter ihm steht, und Gefahr mit eigener Macht zu beantworten. Für einen Aegis bemisst sich wahre Stärke nicht daran, wie viel Macht jemand besitzt, sondern daran, wofür man sich entscheidet einzustehen — und was man bereit ist zu schützen.",
          popupDescription: "Dein Calling wurde durch den Teil deiner Seele offenbart, der instinktiv schützen, standhalten und Verantwortung übernehmen will. Wo andere zurückweichen, trittst du vor und richtest deine Stärke dorthin, wo sie gebraucht wird. Für einen Aegis bedeutet Macht nicht nur auszuhalten, sondern zu entscheiden, wofür man einsteht und was man bereit ist zu schützen.",
          affinity: "Schutz ist dein Instinkt, Stärke deine Kraft. Zeichen, Siegel und Schutzzeichen können dieser Kraft Form, Richtung und Zweck geben — in deinem Körper, über deine körperliche Reichweite hinaus oder gegen Magie selbst.",
          resonanceDescription: "Aegis-Resonanz richtet die Fähigkeiten deines Kernarchetyps auf Schutz, Verantwortung, Stärke, Widerstandskraft und das aktive Zurückdrängen von Gefahr. Sie macht dich nicht zu einem Aegis, sondern prägt, wie dein eigener Archetyp Schaden erkennt, ihm standhält oder andere davor bewahrt.",
          direction: "Dein Thal’ithara kann Stärke in magische Form übersetzen: als körperliche Verstärkung, außergewöhnliche Kraft, projizierte Macht, Barrieren, Zeichen, Siegel, Schutzzeichen, Bindung, Verankerung, Bannung, Fluchbruch oder Störung feindlicher Magie. Dies sind mögliche Ausdrucksformen, keine festgelegte Zauberliste."
        },
        en: {
          title: "Aegis",
          callingDescription: "Aegis are individuals whose instinctive nature revolves around protection, responsibility, strength and standing firm when others cannot. They naturally step forward when people around them need help, often placing the well-being of others above their own comfort. Where many hesitate, Aegis feel a deep inner need to protect the people, values, places and beliefs they consider worth defending. For them, strength has never been about power alone. It is about having the courage to act, the resilience to endure and the determination to become the person others can rely on when everything begins to fall apart. An Aegis does not simply endure danger. They confront it. They hold what must not fall, break what threatens to cause harm and push back against forces that would overwhelm others. Their presence often carries that same force. Their voice may calm fear, their resolve may make enemies hesitate, and their courage can rally those who are close to giving up. When an Aegis refuses to step aside, others may find the strength to stand their ground beside them. Their Thal’ithara often manifests through strength given magical form. It may reinforce the body, allowing an Aegis to withstand tremendous pressure or perform feats of extraordinary strength, but that power is not limited to the body itself. Through signs, seals and wards shaped by their own hand, an Aegis may direct their strength beyond their physical reach, giving force a visible and tangible form. A drawn sign might become a barrier, a binding seal, a powerful impact or a manifested extension of their own strength capable of pushing, lifting, holding or carrying what they could never move by hand alone. Their signs and seals may also act upon magic itself — reinforcing weakened boundaries, anchoring unstable forces, sealing dangerous influences, disrupting hostile enchantments, breaking curses or banishing forces that threaten others. Some signs strengthen the Aegis themselves, while others allow their will and power to act upon the world around them. An Aegis may become both shield and force: capable of enduring what strikes them, protecting what stands behind them and answering danger with power of their own. To an Aegis, true strength is measured not by how much power one possesses, but by what one chooses to stand for — and what one is willing to protect.",
          popupDescription: "Your Calling was revealed through the part of your soul that instinctively seeks to protect, endure and take responsibility. Where others step back, you step forward and direct your strength where it is needed. To an Aegis, power is not only about enduring, but deciding what you will stand for and what you are willing to protect.",
          affinity: "Protection is your instinct; strength is your power. Signs, seals and wards can give that power form, direction and purpose — within your body, beyond your physical reach or against magic itself.",
          resonanceDescription: "Aegis Resonance directs the abilities of your Core Archetype toward protection, responsibility, strength, resilience and actively confronting danger. It does not turn you into an Aegis; it shapes how your own Archetype detects, withstands or prevents harm.",
          direction: "Your Thal’ithara may give strength magical form through physical reinforcement, extraordinary strength, projected force, barriers, signs, seals, wards, binding, anchoring, banishment, curse-breaking or disruption of hostile magic. These are possible expressions, not a fixed spell list."
        }
      }
    },
    manifestations: {
      "Veilwalker|Llifari": {en: "Your Thal’ithara may manifest through shamanic energy work — healing stones, herbs, sacred water, roots or carved runes may become part of rites that cleanse spiritual influence, release emotions that do not truly belong and guide body, soul and nature back into balance.", de: "Dein Thal’ithara kann sich durch schamanische Energiearbeit manifestieren — Heilsteine, Kräuter, heiliges Wasser, Wurzeln oder geschnitzte Runen können Teil von Ritualen werden, die spirituelle Einflüsse reinigen, Gefühle lösen, die nicht wirklich zu jemandem gehören, und Körper, Seele und Natur wieder ins Gleichgewicht führen."},
      "Veilwalker|Seeker": {en: "Your Thal’ithara may manifest through ancestral interpretation — dreams, omens and echoes from beyond the veil may come to you in fragments, allowing you to decipher past lives, ancestral memories, emotional patterns, spiritual attachments, possessions or unresolved stories still carried by the soul.", de: "Dein Thal’ithara kann sich durch Ahnen-Deutung manifestieren — Träume, Omen und Echos jenseits des Schleiers können in Fragmenten zu dir kommen und dir ermöglichen, frühere Leben, Ahnenerinnerungen, emotionale Muster, spirituelle Anhaftungen, Besetzungen oder ungelöste Geschichten zu entschlüsseln, die noch immer von der Seele getragen werden."},
      "Veilwalker|Artisari": {en: "Your Thal’ithara may manifest through soul-imprinted visions — personal belongings, artworks or crafted objects may carry the emotional and spiritual traces of those connected to them, allowing you to sense feelings, memories, unseen presences or glimpses of a soul’s lingering bond.", de: "Dein Thal’ithara kann sich durch seelengeprägte Visionen manifestieren — persönliche Gegenstände, Kunstwerke oder handgefertigte Objekte können emotionale und spirituelle Spuren der Menschen tragen, die mit ihnen verbunden sind, und dir erlauben, Gefühle, Erinnerungen, unsichtbare Präsenzen oder Einblicke in eine fortbestehende Seelenbindung wahrzunehmen."},
      "Veilwalker|Vanguard": {en: "Your Thal’ithara may manifest through restorative influence — you may sense when emotions, thoughts or spiritual forces have been twisted by fear, illusion, curses or manipulation, then guide them back toward clarity, calm and balance before they can overwhelm the soul.", de: "Dein Thal’ithara kann sich durch wiederherstellenden Einfluss manifestieren — du kannst spüren, wenn Emotionen, Gedanken oder spirituelle Kräfte durch Angst, Illusion, Flüche oder Manipulation verdreht wurden, und sie zurück zu Klarheit, Ruhe und Balance führen, bevor sie die Seele überwältigen."},
      "Veilwalker|Aegis": {en: "Your Thal’ithara may manifest through soulbound guardianship — protective spirits, familiars or soulbound companions may appear beside you, sensing curses, hostile presences or emotional manipulation and shielding others from unseen forces that try to touch the soul.", de: "Dein Thal’ithara kann sich durch seelengebundene Wächterschaft manifestieren — schützende Geister, Vertraute oder seelengebundene Begleiter können an deiner Seite erscheinen, Flüche, feindliche Präsenzen oder emotionale Manipulation wahrnehmen und andere vor unsichtbaren Kräften abschirmen, die versuchen, die Seele zu berühren."},
      "Llifari|Veilwalker": {en: "Your Thal’ithara may manifest through elemental spiritcalling — spirits of flame, water, stone, wind or growing life may answer your call, becoming temporary companions, guardians or guides between the living world and the unseen.", de: "Dein Thal’ithara kann sich durch elementares Geist-Rufen manifestieren — Geister von Flamme, Wasser, Stein, Wind oder wachsendem Leben können deinem Ruf antworten und zu vorübergehenden Begleitern, Wächtern oder Führern zwischen der lebendigen Welt und dem Unsichtbaren werden."},
      "Llifari|Seeker": {en: "Your Thal’ithara may manifest through venomwise alchemy — poisonous plants, animal venom, minerals, spoiled water or hidden toxins may reveal their nature to you, allowing you to craft antidotes, neutralize harmful substances or build resistance against poison.", de: "Dein Thal’ithara kann sich durch giftkundige Alchemie manifestieren — giftige Pflanzen, Tiergifte, Mineralien, verdorbenes Wasser oder verborgene Toxine können dir ihre Natur offenbaren und dir ermöglichen, Gegengifte herzustellen, schädliche Stoffe zu neutralisieren oder Widerstand gegen Gift aufzubauen."},
      "Llifari|Artisari": {en: "Your Thal’ithara may manifest through sensory enchantment — flowers, herbs, pigments, oils, perfumes or potions may carry subtle magic that sharpens the senses, stirs emotion, influences attraction or changes how a person, place or moment is perceived. Natural dyes, garments or adornments may become one of the many ways this magic takes form.", de: "Dein Thal’ithara kann sich durch sinnliche Verzauberung manifestieren — Blumen, Kräuter, Pigmente, Öle, Parfüms oder Tränke können subtile Magie tragen, die die Sinne schärft, Gefühle bewegt, Anziehung beeinflusst oder verändert, wie eine Person, ein Ort oder ein Moment wahrgenommen wird. Natürliche Farben, Kleidung oder Schmuck können eine von vielen Formen sein, die diese Magie annimmt."},
      "Llifari|Vanguard": {en: "Your Thal’ithara may manifest through potioncraft — herbs, roots, minerals, water, ash and elemental essences may be refined into elixirs, salves and alchemical mixtures that heal wounds, strengthen the body, protect against harm or awaken hidden properties within the living world.", de: "Dein Thal’ithara kann sich durch Trankkunst manifestieren — Kräuter, Wurzeln, Mineralien, Wasser, Asche und elementare Essenzen können zu Elixieren, Salben und alchemistischen Mischungen veredelt werden, die Wunden heilen, den Körper stärken, vor Schaden schützen oder verborgene Eigenschaften der lebendigen Welt erwecken."},
      "Llifari|Aegis": {en: "Your Thal’ithara may manifest through elemental guardianship — when something must be protected, the elements may merge with your body and transform you into a living force of defense and strength. Stone may armor your skin and strengthen your limbs, flame may cloak your form, water may absorb tremendous force, or wind may gather around you to push danger back.", de: "Dein Thal’ithara kann sich durch elementare Wächterschaft manifestieren — wenn etwas geschützt werden muss, können die Elemente mit deinem Körper verschmelzen und dich in eine lebendige Kraft der Verteidigung und Stärke verwandeln. Stein kann deine Haut panzern und deine Glieder stärken, Flamme deine Gestalt umhüllen, Wasser gewaltige Kräfte aufnehmen oder Wind sich um dich sammeln, um Gefahr zurückzudrängen."},
      "Seeker|Veilwalker": {en: "Your Thal’ithara may manifest through spirit divination — cards, symbols, dreams or ritual signs may become gateways to hidden truths, allowing you to channel echoes from beyond the veil and uncover what memory, history or the living world has forgotten.", de: "Dein Thal’ithara kann sich durch spirituelle Weissagung manifestieren — Karten, Symbole, Träume oder rituelle Zeichen können zu Toren verborgener Wahrheiten werden und dir ermöglichen, Echos jenseits des Schleiers zu channeln und aufzudecken, was Erinnerung, Geschichte oder die lebendige Welt vergessen haben."},
      "Seeker|Llifari": {en: "Your Thal’ithara may manifest through wild pathfinding — tracks, animal whispers, roots, soil and shifting weather may guide you toward ancient ruins, hidden relics and forgotten histories no map remembers.", de: "Dein Thal’ithara kann sich durch wilde Pfadfindung manifestieren — Spuren, Tierflüstern, Wurzeln, Erde und wechselndes Wetter können dich zu uralten Ruinen, verborgenen Relikten und vergessenen Geschichten führen, an die sich keine Karte erinnert."},
      "Seeker|Artisari": {en: "Your Thal’ithara may manifest through hidden messages in creation — murals, architecture, symbols, songs or crafted works may reveal secrets intentionally woven into them, exposing lost histories, concealed meanings, forgotten records or truths their creators tried to preserve.", de: "Dein Thal’ithara kann sich durch verborgene Botschaften in Schöpfungen manifestieren — Wandgemälde, Architektur, Symbole, Lieder oder handgefertigte Werke können Geheimnisse offenbaren, die bewusst in sie eingewoben wurden, und verlorene Geschichten, versteckte Bedeutungen, vergessene Aufzeichnungen oder Wahrheiten enthüllen, die ihre Schöpfer bewahren wollten."},
      "Seeker|Vanguard": {en: "Your Thal’ithara may manifest through forensic magitech — lenses, tools or devices that reveal traces left behind after an event. Blood, footprints, residue, damaged mechanisms or disturbed patterns may become visible, helping you reconstruct what happened and uncover the truth others tried to erase.", de: "Dein Thal’ithara kann sich durch forensische Magitech manifestieren — Linsen, Werkzeuge oder Geräte können Spuren sichtbar machen, die nach einem Ereignis zurückgeblieben sind. Blut, Fußabdrücke, Rückstände, beschädigte Mechanismen oder gestörte Muster können sichtbar werden und dir helfen, zu rekonstruieren, was geschehen ist, und die Wahrheit aufzudecken, die andere auslöschen wollten."},
      "Seeker|Aegis": {en: "Your Thal’ithara may manifest through trap-sense — dangerous places may reveal their warnings to you before harm occurs. You may sense concealed triggers, unstable floors, cursed thresholds or false-safe paths, allowing you to stop, disarm or guide others away from danger before it strikes.", de: "Dein Thal’ithara kann sich durch Fallen-Sinn manifestieren — gefährliche Orte können dir ihre Warnungen zeigen, bevor Schaden entsteht. Du kannst verborgene Auslöser, instabile Böden, verfluchte Schwellen oder trügerisch sichere Wege spüren und dadurch andere aufhalten, Fallen entschärfen oder sie von Gefahr wegführen, bevor sie zuschlägt."},
      "Artisari|Veilwalker": {en: "Your Thal’ithara may manifest through memory-bound creation — paintings, symbols, songs or crafted works may become vessels for emotion and remembrance, allowing scenes to move, memories to awaken and moments from the past to be experienced again through what you create.", de: "Dein Thal’ithara kann sich durch erinnerungsgebundene Schöpfung manifestieren — Gemälde, Symbole, Lieder oder handgefertigte Werke können zu Gefäßen für Emotion und Erinnerung werden, sodass Szenen sich bewegen, Erinnerungen erwachen und Momente aus der Vergangenheit durch das, was du erschaffst, erneut erlebt werden können."},
      "Artisari|Llifari": {en: "Your Thal’ithara may manifest through elemental artistry — water, flowers, earth or wind may become living materials for your expression. A flowing water sculpture may calm pain, blooming patterns may release healing energy, or forms shaped from earth may carry the restoring strength of nature.", de: "Dein Thal’ithara kann sich durch elementare Kunstfertigkeit manifestieren — Wasser, Blumen, Erde oder Wind können zu lebendigen Materialien deines Ausdrucks werden. Eine fließende Wasserskulptur kann Schmerz beruhigen, blühende Muster können heilende Energie freisetzen oder aus Erde geformte Gestalten können die wiederherstellende Kraft der Natur tragen."},
      "Artisari|Seeker": {en: "Your Thal’ithara may manifest through truth-shaping art — the symbols, maps, images or crafted works you create may arrange scattered clues into visible patterns, allowing hidden truths, forgotten paths or buried meanings to finally take form.", de: "Dein Thal’ithara kann sich durch wahrheitsformende Kunst manifestieren — die Symbole, Karten, Bilder oder handgefertigten Werke, die du erschaffst, können verstreute Hinweise zu sichtbaren Mustern ordnen und verborgenen Wahrheiten, vergessenen Pfaden oder vergrabenen Bedeutungen endlich Gestalt geben."},
      "Artisari|Vanguard": {en: "Your Thal’ithara may manifest through spellbound artistry — paintings may stir into motion, songs may linger in crafted objects, and symbols may awaken as light, sound or illusion, allowing emotion and imagination to become something others can experience.", de: "Dein Thal’ithara kann sich durch zaubergebundene Kunst manifestieren — Gemälde können sich in Bewegung regen, Lieder in handgefertigten Objekten nachklingen und Symbole als Licht, Klang oder Illusion erwachen, sodass Emotion und Vorstellungskraft zu etwas werden, das andere erleben können."},
      "Artisari|Aegis": {en: "Your Thal’ithara may manifest through guardian-creation — statues, sculpted figures, masks or crafted forms may awaken with a protective spirit, becoming living defenders that guard people, places or memories entrusted to them.", de: "Dein Thal’ithara kann sich durch Wächter-Schöpfung manifestieren — Statuen, geformte Figuren, Masken oder handgefertigte Gestalten können mit einem schützenden Geist erwachen und zu lebendigen Verteidigern werden, die Menschen, Orte oder ihnen anvertraute Erinnerungen bewachen."},
      "Vanguard|Veilwalker": {en: "Your Thal’ithara may manifest through veilcraft — protective charms, ritual objects, mirrors or other magically infused objects may be shaped to reveal spirits, break illusions, weaken curses or anchor unseen forces before they can harm the soul.", de: "Dein Thal’ithara kann sich durch Schleierhandwerk manifestieren — Schutzamulette, rituelle Objekte, Spiegel oder andere magisch erfüllte Gegenstände können geformt werden, um Geister sichtbar zu machen, Illusionen zu brechen, Flüche zu schwächen oder unsichtbare Kräfte zu verankern, bevor sie der Seele schaden können."},
      "Vanguard|Llifari": {en: "Your Thal’ithara may manifest through ecological magitech — inventions that help the living world recover. Your devices may encourage plants to grow, purify poisoned water, restore damaged soil or help an ecosystem return to balance.", de: "Dein Thal’ithara kann sich durch ökologische Magitech manifestieren — Erfindungen, die der lebendigen Welt helfen, sich zu erholen. Deine Geräte können Pflanzen zum Wachsen anregen, vergiftetes Wasser reinigen, beschädigte Erde wiederherstellen oder einem Ökosystem helfen, ins Gleichgewicht zurückzufinden."},
      "Vanguard|Seeker": {en: "Your Thal’ithara may manifest through relic-decoding magitech — devices, lenses, tools or mechanisms that analyze ancient relics, translate forgotten symbols, reveal hidden blueprints or unlock the purpose of lost magical systems.", de: "Dein Thal’ithara kann sich durch reliktentschlüsselnde Magitech manifestieren — Geräte, Linsen, Werkzeuge oder Mechanismen, die uralte Relikte analysieren, vergessene Symbole übersetzen, verborgene Baupläne offenbaren oder den Zweck verlorener magischer Systeme freilegen."},
      "Vanguard|Artisari": {en: "Your Thal’ithara may manifest through supportive invention — prosthetics, enchanted tools, household charms or beautifully crafted artifacts may help people carry daily burdens, heal, move forward and make ordinary life feel lighter, smoother and more beautiful.", de: "Dein Thal’ithara kann sich durch unterstützende Erfindung manifestieren — Prothesen, verzauberte Werkzeuge, Haushaltszauber oder schön gefertigte Artefakte können Menschen helfen, alltägliche Lasten zu tragen, zu heilen, weiterzugehen und das gewöhnliche Leben leichter, fließender und schöner werden zu lassen."},
      "Vanguard|Aegis": {en: "Your Thal’ithara may manifest through wardforging — armor, shields, weapons and protective magitech may be shaped to defend, endure and push back against danger. Wards or force-bearing mechanisms may reinforce what you create, allowing your inventions to absorb tremendous impacts, hold impossible weight or project protective force beyond the object itself.", de: "Dein Thal’ithara kann sich durch Schutzschmieden manifestieren — Rüstungen, Schilde, Waffen und schützende Magitech können so geformt werden, dass sie verteidigen, standhalten und Gefahr zurückdrängen. Schutzzeichen oder krafttragende Mechanismen können deine Schöpfungen verstärken und deinen Erfindungen ermöglichen, gewaltige Einschläge aufzunehmen, unmögliches Gewicht zu halten oder schützende Kraft über das Objekt selbst hinaus zu projizieren."},
      "Aegis|Veilwalker": {en: "Your Thal’ithara may manifest through spiritual warding — your strength of will may take form as signs, seals or protective forces that act upon the unseen. You may anchor frightened souls, repel hostile spirits, break curses, disrupt emotional manipulation or seal influences that try to take hold of another person.", de: "Dein Thal’ithara kann sich durch spirituelle Schutzwirkung manifestieren — deine Willensstärke kann als Zeichen, Siegel oder schützende Kraft Gestalt annehmen und auf das Unsichtbare einwirken. Du kannst verängstigte Seelen verankern, feindliche Geister zurückweisen, Flüche brechen, emotionale Manipulation stören oder Einflüsse versiegeln, die von einem anderen Menschen Besitz ergreifen wollen."},
      "Aegis|Llifari": {en: "Your Thal’ithara may manifest through elemental fortitude — your strength may draw the elements into your body, weapons or signs when you stand against danger. Stone may reinforce your limbs, flame may blaze along your strikes, water may absorb the force of an impact, or wind may lend impossible momentum to a movement, allowing nature itself to strengthen the force you bring to bear.", de: "Dein Thal’ithara kann sich durch elementare Widerstandskraft manifestieren — wenn du dich einer Gefahr entgegenstellst, kann deine Stärke die Elemente in deinen Körper, deine Waffen oder deine Zeichen ziehen. Stein kann deine Glieder verstärken, Flamme entlang deiner Schläge auflodern, Wasser die Wucht eines Aufpralls aufnehmen oder Wind einer Bewegung unmöglichen Schwung verleihen, sodass die Natur selbst die Kraft verstärkt, die du einsetzt."},
      "Aegis|Seeker": {en: "Your Thal’ithara may manifest through protective sigilwork — ancient symbols, seals and hidden patterns may reveal ways to shape and direct your power. By recreating or adapting them through your own Thal’ithara, you may form wards, bind dangerous forces, reinforce weakened boundaries, break hostile enchantments or create signs that channel your strength toward a specific purpose.", de: "Dein Thal’ithara kann sich durch schützende Zeichenarbeit manifestieren — uralte Symbole, Siegel und verborgene Muster können Wege offenbaren, deine Macht zu formen und zu lenken. Indem du sie durch dein eigenes Thal’ithara nachbildest oder anpasst, kannst du Schutzzeichen formen, gefährliche Kräfte binden, geschwächte Grenzen verstärken, feindliche Verzauberungen brechen oder Zeichen erschaffen, die deine Stärke auf einen bestimmten Zweck ausrichten."},
      "Aegis|Artisari": {en: "Your Thal’ithara may manifest through rallying expression — your strength may take form through symbols, banners, songs, spoken words or other acts of expression that others can see, hear or feel. A drawn emblem may become a ward, a spoken vow may strengthen resolve, or a symbol carried into danger may project your protective presence beyond your own body, turning courage itself into something others can stand behind.", de: "Dein Thal’ithara kann sich durch sammelnden Ausdruck manifestieren — deine Stärke kann durch Symbole, Banner, Lieder, gesprochene Worte oder andere Ausdrucksformen Gestalt annehmen, die andere sehen, hören oder fühlen können. Ein gezeichnetes Emblem kann zum Schutzzeichen werden, ein gesprochener Schwur die Entschlossenheit stärken oder ein in die Gefahr getragenes Symbol deine schützende Gegenwart über deinen eigenen Körper hinaus projizieren und Mut selbst zu etwas machen, hinter dem andere standhalten können."},
      "Aegis|Vanguard": {en: "Your Thal’ithara may manifest through engineered guardianship — your strength may be channeled through shields, armor, gates, defensive mechanisms or other crafted systems built to withstand and oppose danger. Your signs and wards may reinforce these creations, anchor them against overwhelming force or empower mechanisms that push back against whatever threatens the people and places behind them.", de: "Dein Thal’ithara kann sich durch konstruierte Wächterschaft manifestieren — deine Stärke kann durch Schilde, Rüstungen, Tore, Verteidigungsmechanismen oder andere gefertigte Systeme gelenkt werden, die Gefahr standhalten und sich ihr entgegenstellen sollen. Deine Zeichen und Schutzzeichen können diese Schöpfungen verstärken, sie gegen überwältigende Kraft verankern oder Mechanismen stärken, die alles zurückdrängen, was die Menschen und Orte hinter ihnen bedroht."}
    },
    openNote: {
      de: "Dein Thal’ithara zeigt eine mögliche Richtung, die deine Magie annehmen kann. In Ananthara ist Magie niemals festgelegt — sie wächst mit Identität, Entscheidung und Erfahrung.",
      en: "Your Thal’ithara shows one possible direction your magic may take. In Ananthara, magic is never fixed — it grows with identity, choice and experience."
    },
    legacyMap: {
      "The Preserver": "Artisari",
      "Soul Whisperer": "Veilwalker",
      "Pattern Seeker": "Seeker",
      "Resonant Creator": "Artisari",
      "Veil Walker": "Veilwalker",
      "Empathic Conduit": "Aegis",
      "Echobinder": "Artisari"
    }
  };

  var thalIconGlyphs = {
    Veilwalker: '<path d="M14 34s7-10 18-10 18 10 18 10-7 10-18 10-18-10-18-10Z"/><circle cx="32" cy="34" r="5"/><path d="M20 13c8 5 10 12 4 22-3 5-7 9-11 12M44 13c-8 5-10 12-4 22 3 5 7 9 11 12M24 16c3-4 5-6 8-9 3 3 5 5 8 9M26 49c2 3 4 5 6 7 2-2 4-4 6-7"/>',
    Llifari: '<path d="M32 51V24M32 25c-6-1-10-5-11-11 6 0 10 4 11 11ZM32 31c6-1 10-5 11-11-6 0-10 4-11 11Z"/><path d="M32 10c4 5 6 9 6 12a6 6 0 0 1-12 0c0-3 2-7 6-12Z"/><path d="M11 42c6-6 12-7 18-2s12 4 18-2M12 49c7-4 13-3 19 1 6 4 12 4 21-2M46 17c4 1 7 4 7 8 0 4-3 7-7 7"/>',
    Seeker: '<circle cx="32" cy="32" r="18"/><circle cx="32" cy="32" r="11"/><path d="m32 21 7 11-7 11-7-11 7-11Z"/><path d="M32 8v9M32 47v9M8 32h9M47 32h9M32 8l-3 5M32 8l3 5M56 32l-5-3M56 32l-5 3M32 56l-3-5M32 56l3-5M8 32l5-3M8 32l5 3"/><circle cx="32" cy="32" r="2"/>',
    Artisari: '<path d="M18 15c-4 10-4 24 0 32 3 5 8 8 14 10 6-2 11-5 14-10 4-8 4-22 0-32-5 5-9 7-14 7s-9-2-14-7Z"/><path d="M24 22v25M32 23v30M40 22v25M20 18c-4-5-8-4-10-1M44 18c4-5 8-4 10-1"/><path d="M33 47c5-10 11-16 19-20-2 9-7 17-19 25M38 42l8-1M41 37l7-3"/><path d="m32 29 2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z"/>',
    Vanguard: '<circle cx="32" cy="43" r="7"/><circle cx="32" cy="43" r="3"/><path d="M32 9v26M22 28l10-14 10 14M18 40c3-8 7-13 14-17M46 40c-3-8-7-13-14-17M11 43h14M39 43h14M15 50h12M37 50h12"/><circle cx="11" cy="43" r="2"/><circle cx="53" cy="43" r="2"/><path d="M20 54h24M32 50v7"/>',
    Aegis: '<path d="M32 8 14 18v14c0 11 7 19 18 25 11-6 18-14 18-25V18L32 8Z"/><path d="M24 33h16M32 25v16"/>'
  };

  var thalIcons = {};
  Object.keys(thalIconGlyphs).forEach(function (key) {
    thalIcons[key] = '<svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ritual-icon-ring" cx="32" cy="32" r="29"/><g class="ritual-icon-glyph">' + thalIconGlyphs[key] + '</g><circle class="ritual-icon-spark" cx="32" cy="3" r="2"/></svg>';
  });

  var identityChoiceCards = {
    "Lir'vyn": {kind: "race", image: "Assets/races/lirvyn.png", en: "You instinctively notice bonds between people, places and living things.", de: "Du bemerkst instinktiv die Verbindungen zwischen Menschen, Orten und allem Lebendigen."},
    "Draek'har": {kind: "race", image: "Assets/races/draekhar.png", en: "You instinctively notice distrust before trust.", de: "Du bemerkst Misstrauen instinktiv, lange bevor Vertrauen ausgesprochen wird."},
    "Varinar": {kind: "race", image: "Assets/races/varinar.png", en: "You instinctively read unfamiliar customs and search for common ground.", de: "Du liest fremde Bräuche instinktiv und suchst nach einer gemeinsamen Sprache."},
    "Durkaen": {kind: "race", image: "Assets/races/durkaen.png", en: "You notice what was built to endure and what is beginning to fracture.", de: "Du bemerkst, was für die Ewigkeit gebaut wurde und wo bereits erste Risse entstehen."},
    "Bay'r": {kind: "homeland", image: "Assets/homelands/web-bayr.webp", en: "Bay'r's customs, seasons and communal rites are part of your own memory.", de: "Bay'rs Bräuche, Jahreszeiten und gemeinschaftliche Rituale sind Teil deiner eigenen Erinnerung."},
    "Thal'draen": {kind: "homeland", image: "Assets/homelands/web-thal.webp", en: "You watch closely and rarely mistake silence for emptiness.", de: "Du beobachtest genau und verwechselst Stille nur selten mit Leere."},
    "V'eild": {kind: "homeland", image: "Assets/homelands/web-veild.webp", en: "You search beneath beauty and appearances for the truth they conceal.", de: "Du suchst unter Schönheit und äußeren Erscheinungen nach der Wahrheit, die sie verbergen."}
  };

  function languageOf(stats, override) {
    return override === "en" || (!override && stats && stats.language === "en") ? "en" : "de";
  }

  function t(language, key) {
    var parts = key.split(".");
    var value = I18N[language] || I18N.de;
    for (var i = 0; i < parts.length; i++) value = value && value[parts[i]];
    return value || key;
  }

  function safeString(value, fallback) {
    return typeof value === "string" && value.trim() ? value.trim() : (fallback || "");
  }

  function safeNumber(value, fallback) {
    var number = Number(value);
    return Number.isFinite(number) ? number : (fallback || 0);
  }

  function safeBoolean(value) {
    return value === true || value === "true";
  }

  function addText(element, value) {
    element.textContent = safeString(value, "—");
    return element;
  }

  function appendIf(parent, child) {
    if (child) parent.appendChild(child);
    return child;
  }

  function hasContent(value) {
    return safeString(value) !== "";
  }

  function legacyArtworkPath(kind, value) {
    var keys = {
      race: {"Lir'vyn": "lirvyn", "Draek'har": "draekhar", "Varinar": "varinar", "Durkaen": "durkaen"},
      homeland: {"Bay'r": "bayr", "Thal'draen": "thaldraen", "V'eild": "veild"}
    };
    var file = keys[kind] && keys[kind][value];
    if (!file) return "";
    if (kind === "homeland") {
      return "Assets/homelands/" + ({bayr:"web-bayr.webp", thaldraen:"web-thal.webp", veild:"web-veild.webp"}[file] || file + ".png");
    }
    return "Assets/races/" + file + ".png";
  }

  function currentArtworkPath(path) {
    return safeString(path)
      .replace(/Assets\/homelands\/bayr\.(?:png|jpg)$/i, "Assets/homelands/web-bayr.webp")
      .replace(/Assets\/homelands\/thaldraen\.(?:png|jpg)$/i, "Assets/homelands/web-thal.webp")
      .replace(/Assets\/homelands\/veild\.(?:png|jpg)$/i, "Assets/homelands/web-veild.webp");
  }

  function localized(stats, base, language) {
    return safeString(stats[base + "_" + language]) || safeString(stats[base + "_de"]) || safeString(stats[base + "_en"]);
  }

  function collectQuestValues(stats, prefix) {
    if (!prefix) return [];
    return Object.keys(stats).filter(function (key) {
      return key.indexOf(prefix) === 0 && /^\d+$/.test(key.slice(prefix.length));
    }).sort(function (a, b) {
      return Number(a.slice(prefix.length)) - Number(b.slice(prefix.length));
    }).map(function (key) {
      return safeString(stats[key]);
    }).filter(Boolean);
  }

  function normalizeQuestStatus(value) {
    var status = safeString(value).toLowerCase();
    return status === "completed" || status === "complete" || status === "abgeschlossen" ? "completed" : "active";
  }

  function appendUniqueQuestValue(values, value) {
    value = safeString(value);
    if (value && values.indexOf(value) === -1) values.push(value);
  }

  function collectUnlockedPersonalDiscoveries(stats, language, questId) {
    var discoveries = [];
    PERSONAL_DISCOVERY_CONFIG.forEach(function (config) {
      /* Room-II knowledge becomes a quest discovery only when the authored
         vision event actually fired. This keeps knowledge, quest records and
         Journey Log echoes distinct while remaining safe for older saves. */
      if (config.questId !== questId || !safeBoolean(stats[config.flag])) return;
      var fromReplica = config.id === "lost_memory_sand_ruin" && safeBoolean(stats.lost_memory_sand_ruin_discovered_via_replica);
      if (!fromReplica && !safeBoolean(stats.personal_room2_clue_discovered)) return;
      var selectedText = fromReplica && config.replicaText ? config.replicaText : config.text;
      var body = typeof selectedText === "function"
        ? selectedText(stats, language)
        : safeString(selectedText && (selectedText[language] || selectedText.de || selectedText.en));
      var title = safeString(config.title && (config.title[language] || config.title.de || config.title.en));
      if (body) appendUniqueQuestValue(discoveries, title ? title + " — " + body : body);
    });
    if (safeBoolean(stats.room3_chronicles_replica_manifested) && questId === "lost_memory") {
      if (!safeBoolean(stats.lost_memory_sand_ruin)) {
        appendUniqueQuestValue(discoveries, language === "en" ? "Undiscovered Lead — Not yet discovered." : "Unentdeckte Spur — Noch nicht entdeckt.");
      }
      if (safeBoolean(stats.lost_memory_tehand_inscription)) {
        appendUniqueQuestValue(discoveries, language === "en"
          ? "Words connected to the memory of the ruin — ‘Pîn reip kalztarkaikh duldid sêmîk.’ Meaning unknown."
          : "Mit der Ruinenerinnerung verbundene Worte — ‚Pîn reip kalztarkaikh duldid sêmîk.‘ Bedeutung unbekannt.");
      } else {
        appendUniqueQuestValue(discoveries, language === "en" ? "Undiscovered Lead — Not yet discovered." : "Unentdeckte Spur — Noch nicht entdeckt.");
      }
      if (safeBoolean(stats.lost_memory_tehand_translation_known)) {
        appendUniqueQuestValue(discoveries, language === "en"
          ? "Meaning of the inscription — “Only the darkness can bring us the light.”"
          : "Bedeutung der Inschrift — „Nur die Dunkelheit kann uns das Licht bringen.“");
      } else {
        appendUniqueQuestValue(discoveries, language === "en" ? "Undiscovered Lead — Not yet discovered." : "Unentdeckte Spur — Noch nicht entdeckt.");
      }
    }
    if (questId === "affliction" && safeBoolean(stats.affliction_shared_source_known)) {
      appendUniqueQuestValue(discoveries, language === "en"
        ? "Confirmed connection — The black veil and the dark influence within the afflicted spring from the same still-unknown source."
        : "Bestätigte Verbindung — Der schwarze Schleier und der dunkle Einfluss in den Erkrankten entspringen derselben weiterhin unbekannten Quelle.");
    }
    return discoveries;
  }

  function getQuestData(stats, language) {
    stats = stats || {};
    language = languageOf(stats, language);
    return QUEST_CONFIG.map(function (config) {
      var discoveries = collectQuestValues(stats, config.discoveryPrefix);
      var items = collectQuestValues(stats, config.itemPrefix);
      var questions = collectQuestValues(stats, config.questionPrefix);
      var notes = collectQuestValues(stats, config.notePrefix);
      var questId = safeString(stats[config.idField]) || config.id;
      var personalFallback = config.id === "personal_quest" && PERSONAL_QUEST_FALLBACK[questId]
        ? PERSONAL_QUEST_FALLBACK[questId][language]
        : null;
      var title = safeString(stats[config.titleField])
        || safeString(personalFallback && personalFallback.title)
        || safeString(language === "en" ? config.titleEn : config.titleDe);
      var objective = safeString(stats[config.objectiveField])
        || safeString(personalFallback && personalFallback.objective);
      if (config.id === "personal_quest") {
        collectUnlockedPersonalDiscoveries(stats, language, questId).forEach(function (discovery) {
          appendUniqueQuestValue(discoveries, discovery);
        });
      }
      var personalStage = safeString(stats[config.statusField]).toLowerCase();
      var legacyPersonalVisible = config.id === "personal_quest"
        && !!PERSONAL_QUEST_FALLBACK[questId]
        && personalStage !== ""
        && personalStage !== "unassigned";
      var visible = safeBoolean(stats[config.visibleField])
        || legacyPersonalVisible
        || !!(objective || discoveries.length || items.length || notes.length || questions.length);
      if (!visible) return null;
      return {
        id: questId,
        type: config.type || "side",
        order: safeNumber(config.order),
        title: title || t(language, config.fallbackTitleKey || "questLogTitle"),
        status: normalizeQuestStatus(stats[config.statusField]),
        objective: objective,
        discoveries: discoveries,
        items: items,
        notes: notes,
        questions: questions,
        rooms: (config.rooms || []).map(function (room) {
          var status = safeString(stats[room.statusField]).toLowerCase() || "locked";
          if (status !== "active" && status !== "completed") return null;
          return {
            id: room.id,
            title: safeString(language === "en" ? room.titleEn : room.titleDe),
            status: status === "completed" ? "completed" : (status === "active" ? "active" : "locked"),
            objective: safeString(stats[room.objectiveField]),
            discoveries: collectQuestValues(stats, room.discoveryPrefix),
            items: collectQuestValues(stats, room.itemPrefix),
            notes: collectQuestValues(stats, room.notePrefix),
            questions: collectQuestValues(stats, room.questionPrefix)
          };
        }).filter(Boolean)
      };
    }).filter(Boolean).sort(function (a, b) { return a.order - b.order; });
  }

  var THAL_ARCHETYPES = ["Veilwalker", "Llifari", "Seeker", "Artisari", "Vanguard", "Aegis"];

  function thalKey(value) {
    var raw = safeString(value);
    if (!raw) return "";
    if (AnantharaThalitharaData.archetypes[raw]) return raw;
    if (AnantharaThalitharaData.legacyMap[raw]) return AnantharaThalitharaData.legacyMap[raw];
    var lowered = raw.toLowerCase().replace(/[\s_-]+/g, "");
    for (var i = 0; i < THAL_ARCHETYPES.length; i++) {
      if (THAL_ARCHETYPES[i].toLowerCase() === lowered) return THAL_ARCHETYPES[i];
    }
    return "";
  }

  function thalText(key, language, field) {
    var config = key && AnantharaThalitharaData.archetypes[key];
    return safeString(config && config[language] && config[language][field]) ||
      safeString(config && config.de && config.de[field]) ||
      safeString(config && config.en && config.en[field]);
  }

  function thalTitle(key, language) {
    return thalText(key, language, "title") || safeString(key);
  }

  function thalManifestationText(key, language) {
    var config = key && AnantharaThalitharaData.manifestations[key];
    return safeString(config && config[language]) || safeString(config && config.de) || safeString(config && config.en);
  }

  function resolveThalithara(stats, language) {
    var manifestationRaw = safeString(stats.thal_manifestation);
    var parts = manifestationRaw.indexOf("|") !== -1 ? manifestationRaw.split("|") : [];
    var archetype = thalKey(stats.thal_archetype) || thalKey(stats.thal_calling) || thalKey(parts[0]) || thalKey(stats.thal_type);
    var resonance = thalKey(stats.thal_resonance) || thalKey(parts[1]);
    if (resonance === archetype) resonance = "";

    var known = !!archetype;
    var legacyType = safeString(stats.thal_type);
    var legacyOnly = !known && hasContent(legacyType);
    var manifestationKey = known && resonance ? archetype + "|" + resonance : "";
    var manifestationDescription = thalManifestationText(manifestationKey, language) ||
      safeString(stats.thal_manifestation_description) ||
      safeString(stats.thal_growth);

    return {
      archetype: archetype,
      calling: thalKey(stats.thal_calling) || archetype,
      title: known ? thalTitle(archetype, language) : legacyType,
      callingDescription: known ? thalText(archetype, language, "callingDescription") : safeString(stats.thal_description),
      popupDescription: known ? thalText(archetype, language, "popupDescription") : "",
      affinity: known ? thalText(archetype, language, "affinity") : safeString(stats.thal_passive),
      resonance: resonance,
      resonanceTitle: resonance ? thalTitle(resonance, language) : "",
      resonanceDescription: resonance ? thalText(resonance, language, "resonanceDescription") : "",
      manifestation: manifestationKey || manifestationRaw,
      manifestationDescription: manifestationDescription,
      openNote: known ? safeString(AnantharaThalitharaData.openNote[language]) || safeString(AnantharaThalitharaData.openNote.de) : "",
      stability: safeString(stats.current_stability),
      legacy: legacyOnly,
      legacyNote: legacyOnly ? (language === "en"
        ? "This older save contains a legacy Thal’ithara entry. Continue playing to let the new archive system classify future awakenings."
        : "Dieser ältere Spielstand enthält einen früheren Thal’ithara-Eintrag. Spiele weiter, damit das neue Archivsystem künftige Erwachen einordnen kann.") : ""
    };
  }

  function getCharacterData(stats) {
    stats = stats || {};
    var language = languageOf(stats);
    var oracleTitle = localized(stats, "oracle_card_title", language);
    var oracleText = localized(stats, "oracle_card_text", language);
    var prophecy = safeString(language === "en" ? stats.prophecy_01_en : stats.prophecy_01_de) ||
      safeString(stats.prophecy_01) ||
      localized(stats, "oracle_card_full", language);

    var echoes = ECHO_CONFIG.map(function (config) {
      var text = safeString(stats[config.id]);
      if (!text) return null;
      var titleDe = config.titleDe, titleEn = config.titleEn;
      if (config.id === "echo_personal_clue_01") {
        if (stats.personal_quest_id === "lost_memory") { titleDe = "Die Ruine im Sand"; titleEn = "The Ruin in the Sand"; }
        else if (stats.personal_quest_id === "missing") { titleDe = "Eine vertraute Verbindung"; titleEn = "A Familiar Connection"; }
        else if (stats.personal_quest_id === "affliction") { titleDe = "Der schwarze Schleier"; titleEn = "The Black Veil"; }
      }
      return {
        id: config.id,
        category: config.category,
        titleDe: titleDe,
        titleEn: titleEn,
        text: text,
        order: config.order,
        icon: config.icon
      };
    }).filter(Boolean).sort(function (a, b) { return b.order - a.order; });

    var guildRank = safeString(stats.guild_rank);
    if (safeString(stats.quest_exam_status) === "completed" && (!guildRank || guildRank === "Initiate Seeker")) guildRank = "Envoy";
    var displayGuildRank = guildRank === "Envoy" && language === "de" ? "Gesandter" : guildRank;

    return {
      version: 1,
      language: language,
      identity: {
        name: safeString(stats.name),
        race: {
          id: safeString(stats.race),
          title: safeString(stats.race),
          image: safeString(stats.race_image) || legacyArtworkPath("race", stats.race),
          lore: safeString(stats.race_lore),
          lens: safeString(stats.race_lens)
        },
        homeland: {
          id: safeString(stats.homeland),
          title: safeString(stats.homeland),
          image: safeString(stats.homeland_image) || legacyArtworkPath("homeland", stats.homeland),
          lore: safeString(stats.homeland_lore),
          lens: safeString(stats.homeland_lens)
        },
        origin: {
          title: safeString(stats.origin),
          lens: safeString(stats.origin_lens)
        },
        history: {
          id: safeString(stats.personal_history),
          text: safeString(stats.personal_history_full)
        },
        seekerReason: {
          id: safeString(stats.seeker_reason),
          text: safeString(stats.seeker_reason_full)
        }
      },
      thalithara: resolveThalithara(stats, language),
      guild: {
        rank: displayGuildRank
      },
      oracle: {
        drawn: safeBoolean(stats.oracle_card_drawn) || safeBoolean(stats.prophecy_01_revealed) || hasContent(stats.oracle_card),
        id: safeString(stats.oracle_card),
        title: oracleTitle,
        shortText: oracleText,
        prophecy: prophecy,
        image: safeString(stats.oracle_card_image)
      },
      attributes: {
        neugier: safeNumber(stats.neugier),
        offenheit: safeNumber(stats.offenheit),
        innereBalance: safeNumber(stats.innere_balance),
        wyldVertrauen: safeNumber(stats.wyld_vertrauen),
        verbundenheit: safeNumber(stats.verbundenheit),
        resonanz: safeNumber(stats.resonanz),
        authentizitaet: safeNumber(stats.authentizitaet),
        vorsicht: safeNumber(stats.vorsicht)
      },
      quests: getQuestData(stats, language),
      travelItems: (function () {
        var items = [];
        if (safeBoolean(stats.personal_keepsake_taken) && safeString(stats.personal_keepsake_id)) items.push(keepsakeContent(stats, language === "en"));
        if (safeString(stats.exam_room_01_scroll_disposition) === "taken" && safeString(stats.quest_exam_status) !== "completed") items.push({
          name: language === "en" ? "Têhand Scroll" : "Têhand-Schriftrolle",
          description: language === "en" ? "The physical scroll you recovered during the first section of your final examination." : "Die physische Schriftrolle, die du im ersten Abschnitt deiner Abschlussprüfung geborgen hast.",
          effect: language === "en" ? "Original Source" : "Originalquelle",
          effectText: language === "en" ? "The original source remains available for later examination." : "Die Originalquelle steht für spätere Untersuchungen weiterhin zur Verfügung."
        });
        return items;
      }()),
      knowledge: {
        personalRoom2VisionSeen: safeBoolean(stats.personal_room2_vision_seen),
        personalRoom2ClueDiscovered: safeBoolean(stats.personal_room2_clue_discovered),
        missingMuralConnection: safeBoolean(stats.missing_mural_connection),
        lostMemorySandRuin: safeBoolean(stats.lost_memory_sand_ruin),
        afflictionVeilConnection: safeBoolean(stats.affliction_veil_connection),
        room2SeenDivineLight: safeBoolean(stats.room2_seen_divine_light),
        room2SeenCreationLines: safeBoolean(stats.room2_seen_creation_lines),
        room2SeenClosedHands: safeBoolean(stats.room2_seen_closed_hands),
        room2SeenVeil: safeBoolean(stats.room2_seen_veil),
        room3LightPatternUnderstood: safeBoolean(stats.room3_light_pattern_understood),
        room3SelfAsLightUnderstood: safeBoolean(stats.room3_self_as_light_understood),
        room3LightCarriedThroughDarkness: safeBoolean(stats.room3_light_carried_through_darkness),
        room3ChroniclesReplicaManifested: safeBoolean(stats.room3_chronicles_replica_manifested),
        lostMemoryTehandInscription: safeBoolean(stats.lost_memory_tehand_inscription),
        lostMemoryTehandTranslationKnown: safeBoolean(stats.lost_memory_tehand_translation_known),
        afflictionSharedSourceKnown: safeBoolean(stats.affliction_shared_source_known)
      },
      echoes: echoes
    };
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function field(label, value, className) {
    if (!hasContent(value)) return null;
    var node = el("article", "ac-field " + (className || ""));
    node.appendChild(el("h4", "", label));
    node.appendChild(el("p", "", value));
    return node;
  }

  function artwork(path, alt, fallbackText, className) {
    path = currentArtworkPath(path);
    var figure = el("figure", "ac-art " + (className || ""));
    var img = document.createElement("img");
    img.loading = "lazy";
    img.alt = alt || "";
    var fallback = el("div", "ac-art-fallback");
    fallback.hidden = true;
    fallback.innerHTML = '<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M16 62 34 41l12 13 8-9 12 17Z"/><circle cx="55" cy="25" r="8"/><rect x="9" y="9" width="62" height="62" rx="7"/></svg><span></span>';
    fallback.querySelector("span").textContent = fallbackText;
    function showFallback() {
      img.hidden = true;
      fallback.hidden = false;
      figure.classList.add("is-missing");
    }
    img.addEventListener("error", function () {
      if (!img.dataset.triedJpg && /\.png$/i.test(path || "")) {
        img.dataset.triedJpg = "true";
        img.src = path.replace(/\.png$/i, ".jpg");
        return;
      }
      showFallback();
    });
    figure.appendChild(img);
    figure.appendChild(fallback);
    if (path) img.src = path;
    else showFallback();
    return figure;
  }

  function divider(title) {
    var wrap = el("div", "ac-section-title");
    wrap.appendChild(el("span", "", title));
    return wrap;
  }

  function statTiles(data, language, withBars) {
    var grid = el("div", withBars ? "ac-attribute-grid has-bars" : "ac-attribute-grid");
    var labels = I18N[language].attributes;
    var values = data.attributes;
    var max = Math.max(1, values.neugier, values.offenheit, values.innereBalance, values.wyldVertrauen, values.verbundenheit, values.resonanz, values.authentizitaet, values.vorsicht);
    Object.keys(labels).forEach(function (key) {
      var value = safeNumber(values[key]);
      var tile = el("article", "ac-attribute-tile");
      tile.appendChild(el("span", "", labels[key]));
      tile.appendChild(el("strong", "", String(value)));
      if (withBars) {
        var bar = el("i", "ac-attribute-bar");
        bar.style.setProperty("--value", String(Math.max(0, Math.min(100, Math.round(value / max * 100)))));
        tile.appendChild(bar);
      }
      grid.appendChild(tile);
    });
    return grid;
  }

  function renderOracleCard(data, language, compact) {
    var oracle = data.oracle;
    if (!oracle.drawn) return el("p", "ac-empty", t(language, "noOracle"));
    var card = el("button", compact ? "ac-oracle-thumb" : "ac-oracle-record");
    card.type = "button";
    card.setAttribute("aria-label", oracle.title || t(language, "oracleProphecy"));
    card.appendChild(artwork(oracle.image, oracle.title, t(language, "oracleFallback"), compact ? "is-oracle-thumb" : "is-oracle-card"));
    if (!compact) {
      var copy = el("div", "ac-oracle-copy");
      copy.appendChild(el("p", "ac-eyebrow", t(language, "oracleProphecy")));
      copy.appendChild(el("h3", "", oracle.title || t(language, "oracleProphecy")));
      if (oracle.shortText) copy.appendChild(el("p", "ac-oracle-omen", oracle.shortText));
      if (oracle.prophecy) copy.appendChild(el("p", "", oracle.prophecy));
      copy.appendChild(el("small", "", t(language, "cardDrawn")));
      card.appendChild(copy);
    } else {
      card.appendChild(el("span", "", oracle.title || t(language, "oracleProphecy")));
    }
    card.addEventListener("click", function () { openOracleModal(data, language); });
    return card;
  }

  function openOracleModal(data, language) {
    var old = document.querySelector("[data-ananthara-fate-modal]");
    if (old) old.remove();
    var modal = el("div", "ac-modal");
    modal.setAttribute("data-ananthara-fate-modal", "");
    var dialog = el("section", "ac-modal-dialog");
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.appendChild(artwork(data.oracle.image, data.oracle.title, t(language, "oracleFallback"), "is-oracle-large"));
    dialog.appendChild(el("h2", "", data.oracle.title || t(language, "oracleProphecy")));
    if (data.oracle.shortText) dialog.appendChild(el("p", "ac-oracle-omen", data.oracle.shortText));
    dialog.appendChild(el("p", "", data.oracle.prophecy || data.oracle.shortText || t(language, "noOracle")));
    dialog.appendChild(el("small", "", t(language, "cardDrawn")));
    var close = el("button", "ac-close", t(language, "close"));
    close.type = "button";
    close.addEventListener("click", function () { modal.remove(); });
    dialog.appendChild(close);
    modal.appendChild(dialog);
    modal.addEventListener("click", function (event) { if (event.target === modal) modal.remove(); });
    document.body.appendChild(modal);
    close.focus({preventScroll:true});
  }

  function renderJourney(container, data, options) {
    var language = options.language;
    container.textContent = "";
    var shell = el("section", "ananthara-journey-log");
    shell.setAttribute("data-ananthara-journey-log", "");
    shell.appendChild(divider(t(language, "journeyTitle")));
    if (!data.echoes.length) {
      shell.appendChild(el("p", "ac-empty", t(language, "noEchoes")));
    } else {
      var timeline = el("ol", "aj-timeline");
      data.echoes.forEach(function (echo) {
        var item = el("li", "aj-entry is-" + echo.category);
        item.appendChild(el("span", "aj-icon", echo.icon || "✧"));
        var copy = el("div", "aj-copy");
        copy.appendChild(el("small", "", echo.category));
        copy.appendChild(el("h3", "", language === "en" ? echo.titleEn : echo.titleDe));
        copy.appendChild(el("p", "", echo.text));
        item.appendChild(copy);
        timeline.appendChild(item);
      });
      shell.appendChild(timeline);
    }
    container.appendChild(shell);
  }

  function questTypeLabel(language, type) {
    if (type === "main") return t(language, "questTypeMain");
    if (type === "personal") return t(language, "questTypePersonal");
    if (type === "examination") return t(language, "questTypeExamination");
    return t(language, "questTypeSide");
  }

  function questList(title, values) {
    if (!values.length) return null;
    var section = el("section", "aq-detail");
    section.appendChild(el("h4", "", title));
    var list = el("ul", "");
    values.forEach(function (value) { list.appendChild(el("li", "", value)); });
    section.appendChild(list);
    return section;
  }

  function renderQuestCard(quest, language) {
    var card = el("details", "aq-card is-" + quest.status + " is-" + quest.type);
    card.setAttribute("data-quest-id", quest.id);
    var header = el("summary", "aq-card-header");
    var heading = el("div", "aq-heading");
    heading.appendChild(el("small", "aq-type", questTypeLabel(language, quest.type)));
    heading.appendChild(el("h3", "", quest.title));
    header.appendChild(heading);
    var meta = el("span", "aq-meta");
    meta.appendChild(el("span", "aq-status", quest.status === "completed" ? t(language, "questStatusCompleted") : t(language, "questStatusActive")));
    meta.appendChild(el("span", "aq-toggle", "⌄"));
    header.appendChild(meta);
    card.appendChild(header);
    var body = el("div", "aq-card-body");
    if (quest.objective) {
      var objective = el("section", "aq-objective");
      objective.appendChild(el("h4", "", t(language, "currentObjective")));
      objective.appendChild(el("p", "", quest.objective));
      body.appendChild(objective);
    }
    appendIf(body, questList(t(language, "discoveries"), quest.discoveries));
    appendIf(body, questList(t(language, "relevantItems"), quest.items));
    appendIf(body, questList(t(language, "preservedNotes"), quest.notes || []));
    appendIf(body, questList(t(language, "openQuestions"), quest.questions));
    if (quest.rooms && quest.rooms.length) {
      var rooms = el("section", "aq-rooms");
      quest.rooms.forEach(function (room) {
        var sub = el("details", "aq-room is-" + room.status);
        var summary = el("summary", "aq-room-summary");
        summary.appendChild(el("strong", "", room.title));
        var roomStatus = room.status === "completed" ? t(language, "questStatusCompleted") : t(language, "questStatusActive");
        summary.appendChild(el("span", "", roomStatus));
        sub.appendChild(summary);
        var roomBody = el("div", "aq-room-body");
        if (room.objective) {
          var roomObjective = el("section", "aq-objective");
          roomObjective.appendChild(el("h4", "", t(language, "currentObjective")));
          roomObjective.appendChild(el("p", "", room.objective));
          roomBody.appendChild(roomObjective);
        }
        appendIf(roomBody, questList(t(language, "discoveries"), room.discoveries));
        appendIf(roomBody, questList(t(language, "relevantItems"), room.items));
        appendIf(roomBody, questList(t(language, "preservedNotes"), room.notes));
        if (roomBody.children.length) sub.appendChild(roomBody);
        rooms.appendChild(sub);
      });
      body.appendChild(rooms);
    }
    if (body.children.length) card.appendChild(body);
    return card;
  }

  function renderQuestGroup(shell, quests, status, language) {
    var matching = quests.filter(function (quest) { return quest.status === status; });
    if (!matching.length) return;
    var group = el("section", "aq-group is-" + status);
    group.appendChild(el("h2", "aq-group-title", status === "completed" ? t(language, "completedQuests") : t(language, "activeQuests")));
    var list = el("div", "aq-list");
    matching.forEach(function (quest) { list.appendChild(renderQuestCard(quest, language)); });
    group.appendChild(list);
    shell.appendChild(group);
  }

  function renderQuestLog(container, data, options) {
    var language = options.language;
    container.textContent = "";
    var shell = el("section", "ananthara-quest-log");
    shell.setAttribute("data-ananthara-quest-log", "");
    shell.appendChild(divider(t(language, "questLogTitle")));
    var quests = data.quests || [];
    if (!quests.length) shell.appendChild(el("p", "ac-empty", t(language, "noQuests")));
    else {
      renderQuestGroup(shell, quests, "active", language);
      renderQuestGroup(shell, quests, "completed", language);
    }
    container.appendChild(shell);
  }

  function renderAttributeOverview(container, data, options) {
    var language = options.language;
    container.textContent = "";
    var shell = el("section", "ananthara-attribute-overview");
    shell.setAttribute("data-ananthara-attributes", "");
    shell.appendChild(divider(t(language, "attributesTitle")));
    shell.appendChild(statTiles(data, language, true));
    container.appendChild(shell);
  }

  function renderItems(container, data, options) {
    var language = options.language;
    container.textContent = "";
    var shell = el("section", "ananthara-items-overview");
    shell.setAttribute("data-ananthara-items", "");
    shell.appendChild(divider(t(language, "itemsTitle")));
    if (!data.travelItems || !data.travelItems.length) shell.appendChild(el("p", "ac-empty", t(language, "noItems")));
    else {
      var grid = el("div", "ac-items-grid");
      data.travelItems.forEach(function (item) {
        var card = el("article", "ac-travel-item");
        card.appendChild(el("h3", "", item.name));
        if (item.description) card.appendChild(el("p", "", item.description));
        if (item.effect) card.appendChild(el("h4", "", t(language, "passiveEffect") + " — " + item.effect));
        if (item.effectText) card.appendChild(el("p", "", item.effectText));
        grid.appendChild(card);
      });
      shell.appendChild(grid);
    }
    container.appendChild(shell);
  }

  function ensureHtml2Canvas() {
    if (typeof window.html2canvas === "function") return Promise.resolve(window.html2canvas);
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector("script[data-ananthara-html2canvas]");
      function loaded() { typeof window.html2canvas === "function" ? resolve(window.html2canvas) : reject(new Error("html2canvas API unavailable")); }
      if (existing) { existing.addEventListener("load", loaded, {once:true}); existing.addEventListener("error", reject, {once:true}); return; }
      var script = document.createElement("script");
      script.src = "vendor/html2canvas.min.js";
      script.async = true; script.setAttribute("data-ananthara-html2canvas", "");
      script.addEventListener("load", loaded, {once:true}); script.addEventListener("error", reject, {once:true});
      document.head.appendChild(script);
    });
  }

  function canvasToPngBlob(canvas) {
    return new Promise(function (resolve, reject) {
      function fromDataUrl() {
        try {
          var parts = canvas.toDataURL("image/png").split(",");
          var bytes = atob(parts[1]);
          var output = new Uint8Array(bytes.length);
          for (var index = 0; index < bytes.length; index += 1) output[index] = bytes.charCodeAt(index);
          resolve(new Blob([output], {type:"image/png"}));
        } catch (error) { reject(error); }
      }
      if (typeof canvas.toBlob !== "function") { fromDataUrl(); return; }
      canvas.toBlob(function (value) { value ? resolve(value) : fromDataUrl(); }, "image/png");
    });
  }

  function showExportPreview(url, fileName, language) {
    var overlay = el("div", "ac-export-preview");
    var dialog = el("section", "ac-export-preview-dialog");
    dialog.setAttribute("role", "dialog"); dialog.setAttribute("aria-modal", "true");
    var image = document.createElement("img"); image.src = url; image.alt = language === "en" ? "Character Sheet preview" : "Vorschau des Charakterbogens";
    var actions = el("div", "ac-export-preview-actions");
    var save = el("a", "", language === "en" ? "Download PNG" : "PNG herunterladen");
    save.href = url; save.download = fileName; save.target = "_blank"; save.rel = "noopener";
    var close = el("button", "", language === "en" ? "Close" : "Schließen"); close.type = "button";
    close.addEventListener("click", function () { overlay.remove(); document.body.style.overflow = overlay.dataset.previousOverflow || ""; });
    actions.appendChild(save); actions.appendChild(close); dialog.appendChild(image); dialog.appendChild(actions); overlay.appendChild(dialog);
    overlay.dataset.previousOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; document.body.appendChild(overlay);
    close.focus({preventScroll:true});
  }

  function waitForExportAssets(root) {
    var images = Array.prototype.slice.call(root.querySelectorAll("img"));
    images.forEach(function (image) { image.loading = "eager"; image.removeAttribute("loading"); });
    var pending = Promise.all([
      document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve(),
      Promise.all(images.map(function (image) {
        if (image.complete) return Promise.resolve();
        var wait = new Promise(function (resolve) { image.addEventListener("load", resolve, {once:true}); image.addEventListener("error", resolve, {once:true}); });
        return Promise.race([wait, new Promise(function (resolve) { window.setTimeout(resolve, 2500); })]);
      }))
    ]);
    return Promise.race([pending, new Promise(function (resolve) {
      window.setTimeout(function () {
        console.warn("Character sheet export continued after the asset wait timeout.");
        resolve();
      }, 10000);
    })]);
  }

  async function exportCharacterSheet(data, language, button) {
    var original = button.closest(".ananthara-character-sheet") || document.querySelector(".ananthara-character-sheet");
    if (!original) return;
    var wrapper;
    var exportDev = /(?:\?|&)devtools=1(?:&|$)/.test(window.location.search);
    function exportLog(step, details) { if (exportDev) console.info("[CharacterExport] " + step, details || ""); }
    var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    var mobile = ios || window.matchMedia("(max-width: 699px), (pointer: coarse)").matches;
    try {
      exportLog("1. start", {mobile:mobile});
      var html2canvas = await ensureHtml2Canvas();
      exportLog("2. html2canvas available", typeof html2canvas);
      var captureTarget;
      var captureRect;
      if (mobile) {
        var clone = original.cloneNode(true);
        clone.classList.add("is-export-clone"); clone.setAttribute("data-export-mode", "true");
        wrapper = el("div", "character-sheet-export-wrapper"); wrapper.appendChild(clone); document.body.appendChild(wrapper);
        captureTarget = clone;
        captureRect = clone.getBoundingClientRect();
        exportLog("3. mobile clone created");
      } else {
        // Capture the real, rendered desktop sheet. Chromium can reject very
        // tall nodes positioned far outside the viewport before rasterizing.
        original.setAttribute("data-character-export-source", "true");
        captureTarget = original;
        captureRect = original.getBoundingClientRect();
        exportLog("3. desktop source selected");
      }
      exportLog("4. capture dimensions", {width:captureRect.width, height:captureRect.height});
      if (!captureRect.width || !captureRect.height) throw new Error("Character sheet export source has no dimensions");
      await waitForExportAssets(captureTarget);
      exportLog("5. assets ready");
      await new Promise(function (resolve) { requestAnimationFrame(function () { requestAnimationFrame(resolve); }); });
      // The sheet has grown considerably. A fixed desktop scale of 2 can
      // exceed browser canvas limits on tall characters while mobile scale 1
      // still succeeds. Keep desktop sharp, but cap both height and pixels.
      var exportScale = 1;
      if (!mobile) {
        var heightScale = 12000 / captureRect.height;
        var pixelScale = Math.sqrt(24000000 / (captureRect.width * captureRect.height));
        exportScale = Math.max(1, Math.min(1.5, heightScale, pixelScale));
      }
      exportLog("6. render start", {scale:exportScale});
      var canvasOptions = {
        backgroundColor:"#030a18",
        scale:exportScale,
        useCORS:true,
        allowTaint:false,
        logging:false,
        scrollX:0,
        scrollY:0,
        ignoreElements:function (element) {
          if (!element || !element.matches) return false;
          if (element.matches("button, .ac-download-sheet")) return true;
          return element.tagName === "CANVAS" && (!element.width || !element.height);
        }
      };
      if (mobile) {
        canvasOptions.windowWidth = 1120;
        canvasOptions.width = 1120;
      } else {
        canvasOptions.windowWidth = Math.max(1280, document.documentElement.clientWidth);
        canvasOptions.onclone = function (clonedDocument) {
          // html2canvas 1.4 can call createPattern with a zero-sized internal
          // canvas when a hidden background/mask asset is present elsewhere
          // in the ChoiceScript document. The dossier uses real <img> nodes
          // for its artwork, so removing CSS image layers only in this cloned
          // document is safe and leaves the visible game untouched.
          var exportStyle = clonedDocument.createElement("style");
          exportStyle.textContent = "html[data-character-export-render] *,html[data-character-export-render] *::before,html[data-character-export-render] *::after{background-image:none!important;-webkit-mask-image:none!important;mask-image:none!important}html[data-character-export-render] canvas[width='0'],html[data-character-export-render] canvas[height='0']{display:none!important}";
          clonedDocument.documentElement.setAttribute("data-character-export-render", "true");
          clonedDocument.head.appendChild(exportStyle);
          var clonedSource = clonedDocument.querySelector('[data-character-export-source="true"]');
          if (!clonedSource) return;
          clonedSource.classList.add("is-export-clone");
          clonedSource.setAttribute("data-export-mode", "true");
          var clonedDownload = clonedSource.querySelector(".ac-download-sheet");
          if (clonedDownload) clonedDownload.style.display = "none";
          clonedSource.style.animation = "none";
          clonedSource.style.transition = "none";
        };
      }
      var canvas = await html2canvas(captureTarget, canvasOptions);
      exportLog("7. canvas dimensions", {width:canvas.width, height:canvas.height});
      var blob = await canvasToPngBlob(canvas);
      exportLog("8. blob created", {size:blob.size});
      if (!blob.size) throw new Error("Character sheet export created an empty PNG blob");
      var url = URL.createObjectURL(blob);
      exportLog("9. object URL created", url);
      var safeName = (data.identity.name || "Seeker").replace(/[^a-z0-9_-]+/gi, "_").replace(/^_+|_+$/g, "");
      var fileName = "Ananthara_" + (safeName || "Seeker") + "_Character_Sheet.png";
      if (mobile) {
        var file = typeof File === "function" ? new File([blob], fileName, {type:"image/png"}) : null;
        if (file && navigator.share && navigator.canShare && navigator.canShare({files:[file]})) {
          try { await navigator.share({files:[file], title:fileName}); }
          catch (shareError) { if (shareError && shareError.name !== "AbortError") showExportPreview(url, fileName, language); }
        } else showExportPreview(url, fileName, language);
      } else {
        var link = document.createElement("a");
        link.href = url; link.download = fileName; link.rel = "noopener";
        document.body.appendChild(link);
        exportLog("10. anchor appended", {download:fileName});
        if ("download" in link) {
          link.click();
          exportLog("11. anchor click invoked");
          window.setTimeout(function () { link.remove(); exportLog("12. cleanup", "anchor removed"); }, 10000);
          // Browsers can silently reject a programmatic Blob download after
          // asynchronous canvas work. Keep a user-initiated download link and
          // the rendered PNG available as a deterministic desktop fallback.
          window.setTimeout(function () { showExportPreview(url, fileName, language); }, 450);
        } else {
          link.remove();
          showExportPreview(url, fileName, language);
        }
      }
      window.setTimeout(function () { URL.revokeObjectURL(url); exportLog("12. cleanup", "object URL revoked"); }, 120000);
    } catch (error) {
      console.error("Character sheet export failed", {error:error, message:error && error.message, stack:error && error.stack});
      var reason = error && error.message ? "\n\n" + error.message : "";
      window.alert((language === "en" ? "The character sheet could not be exported." : "Der Charakterbogen konnte nicht exportiert werden.") + reason);
    } finally {
      original.removeAttribute("data-character-export-source");
      if (wrapper) wrapper.remove();
      button.disabled = false; button.textContent = t(language, "downloadSheet");
    }
  }

  function renderCharacterSheet(container, characterData, options) {
    options = Object.assign({mode: "full", language: characterData.language || "de", showAttributes: true, showOracle: true, showStory: true}, options || {});
    var language = languageOf(null, options.language);
    var data = characterData;
    container.querySelectorAll("[data-ananthara-character-sheet]").forEach(function (node) { node.remove(); });

    var sheet = el("article", "ananthara-character-sheet");
    sheet.setAttribute("data-ananthara-character-sheet", "");
    sheet.setAttribute("data-mode", options.mode);

    var header = el("header", "ac-header");
    var seal = el("div", "ac-seal");
    seal.setAttribute("aria-hidden", "true");
    seal.innerHTML = '<img src="Assets/ui/itharkael_seal.png" alt=""><svg viewBox="0 0 80 80" hidden><circle cx="40" cy="40" r="31"/><circle cx="40" cy="40" r="22"/><path d="M40 14v52M14 40h52M23 23l34 34M57 23 23 57"/><circle cx="40" cy="40" r="6"/></svg>';
    var sealImage = seal.querySelector("img");
    var sealSvg = seal.querySelector("svg");
    sealImage.addEventListener("error", function () { sealImage.hidden = true; sealSvg.hidden = false; }, {once: true});
    header.appendChild(seal);
    header.appendChild(el("p", "ac-eyebrow", t(language, "archive")));
    header.appendChild(el("h2", "ac-title", t(language, "dossier")));
    header.appendChild(el("strong", "ac-name", data.identity.name || t(language, "unnamed")));
    header.appendChild(el("div", "ac-divider", "◆"));
    sheet.appendChild(header);

    if (options.mode === "status") {
      var download = el("button", "ac-download-sheet", t(language, "downloadSheet"));
      download.type = "button";
      download.addEventListener("click", function () {
        download.disabled = true;
        download.textContent = t(language, "preparingDownload");
        exportCharacterSheet(data, language, download);
      });
      sheet.appendChild(download);
    }

    var reveal = el("section", "ac-character-reveal");
    reveal.setAttribute("data-character-section", "identity");
    reveal.appendChild(artwork(data.identity.race.image, data.identity.race.title, t(language, "raceFallback"), "is-race-portrait"));
    var revealCopy = el("div", "ac-character-copy");
    revealCopy.appendChild(el("p", "ac-eyebrow", t(language, "race")));
    revealCopy.appendChild(el("h3", "", data.identity.race.title || t(language, "race")));
    if (data.identity.race.lore) revealCopy.appendChild(el("p", "ac-lede", data.identity.race.lore));
    if (options.showStory) {
      appendIf(revealCopy, field(t(language, "personalHistory"), data.identity.history.text, "is-story-field"));
      appendIf(revealCopy, field(t(language, "reason"), data.identity.seekerReason.text, "is-reason-field"));
    }
    reveal.appendChild(revealCopy);
    sheet.appendChild(reveal);

    var facts = el("dl", "ac-fact-strip");
    [
      [t(language, "homeland"), data.identity.homeland.title],
      [t(language, "guildRank"), data.guild.rank],
      [t(language, "stability"), data.thalithara.stability],
      [t(language, "origin"), data.identity.origin.title]
    ].forEach(function (pair) {
      if (!hasContent(pair[1])) return;
      var wrap = el("div");
      wrap.appendChild(el("dt", "", pair[0]));
      wrap.appendChild(el("dd", "", pair[1]));
      facts.appendChild(wrap);
    });
    if (facts.children.length) sheet.appendChild(facts);

    var identity = el("section", "ac-section");
    identity.appendChild(divider(t(language, "homeland")));
    var worldGrid = el("div", "ac-world-grid");
    var homelandCard = el("article", "ac-world-card");
    homelandCard.classList.add("is-homeland-profile");
    homelandCard.appendChild(artwork(data.identity.homeland.image, data.identity.homeland.title, t(language, "homelandFallback"), "is-homeland"));
    var homelandCopy = el("div");
    homelandCopy.appendChild(el("p", "ac-eyebrow", t(language, "homeland")));
    homelandCopy.appendChild(el("h3", "", data.identity.homeland.title || t(language, "homeland")));
    if (data.identity.homeland.lore) homelandCopy.appendChild(el("p", "", data.identity.homeland.lore));
    homelandCard.appendChild(homelandCopy);
    worldGrid.appendChild(homelandCard);
    identity.appendChild(worldGrid);
    sheet.appendChild(identity);

    var thal = el("section", "ac-magic-profile");
    thal.setAttribute("data-character-section", "thalithara");
    thal.innerHTML = '<div class="ac-magic-heading"><div class="ac-magic-symbol"></div><div><p class="ac-eyebrow"></p><h3></h3></div></div>';
    thal.querySelector(".ac-magic-symbol").innerHTML = thalIcons[data.thalithara.archetype] || thalIcons.Seeker || "";
    thal.querySelector(".ac-eyebrow").textContent = t(language, "thalProfile");
    thal.querySelector("h3").textContent = data.thalithara.title || t(language, "thal");
    if (data.thalithara.callingDescription) thal.appendChild(el("p", "ac-magic-description", data.thalithara.callingDescription));
    var magicFacts = el("dl", "ac-magic-facts");
    var resonanceCopy = [data.thalithara.resonanceTitle, data.thalithara.resonanceDescription].filter(Boolean).join(" — ");
    [
      [t(language, "affinity"), data.thalithara.affinity],
      [t(language, "currentResonance"), resonanceCopy],
      [t(language, "manifestation"), data.thalithara.manifestationDescription, "is-manifestation"],
      [t(language, "stability"), data.thalithara.stability],
      [t(language, "legacyThal"), data.thalithara.legacyNote]
    ].forEach(function (pair) {
      if (!hasContent(pair[1])) return;
      var item = el("div");
      if (pair[2]) item.className = pair[2];
      item.appendChild(el("dt", "", pair[0]));
      item.appendChild(el("dd", "", pair[1]));
      magicFacts.appendChild(item);
    });
    if (magicFacts.children.length) thal.appendChild(magicFacts);
    if (data.thalithara.openNote) thal.appendChild(el("p", "ac-magic-note", data.thalithara.openNote));
    sheet.appendChild(thal);

    if (options.showOracle) {
      var oracleSection = el("section", "ac-section ac-prophecy-section");
      oracleSection.appendChild(divider(t(language, "oracleProphecy")));
      oracleSection.appendChild(renderOracleCard(data, language, false));
      sheet.appendChild(oracleSection);
    }

    if (options.showAttributes) {
      var attrSection = el("section", "ac-section ac-attributes-section");
      attrSection.appendChild(divider(t(language, "attributesTitle")));
      attrSection.appendChild(statTiles(data, language, false));
      sheet.appendChild(attrSection);
    }

    container.appendChild(sheet);
  }

  function enhance(scene) {
    var stats = scene.stats || {};
    var language = languageOf(stats);
    document.body.classList.add("ana-stats-active");
    window.setTimeout(function () {
      var text = document.getElementById("text");
      if (!text || text.querySelector(".ananthara-game-ui")) return;

      Array.prototype.forEach.call(text.children, function (child) {
        child.classList.add("ana-native-stat-chart");
      });

      var data = getCharacterData(stats);
      var root = el("div", "ananthara-game-ui");
      root.classList.add("ana-expanded-stats");
      root.setAttribute("data-ananthara-stats-root", "");

      var nav = el("nav", "as-tabs");
      nav.setAttribute("aria-label", language === "en" ? "Status sections" : "Statusbereiche");
      var panel = el("div", "as-panel");
      panel.setAttribute("data-ananthara-stats-panel", "");

      var backButton = el("button", "as-back-button", language === "en" ? "Back" : "Zurück");
      backButton.type = "button";
      backButton.addEventListener("click", function () {
        document.body.classList.remove("ana-stats-active");
        if (typeof window.returnFromStats === "function") {
          // The custom back control bypasses ChoiceScript's stats header button.
          // Reset its data-return state before restoring the game; otherwise the
          // next normal Show Stats click is mistaken for a second return action.
          if (typeof window.setButtonTitles === "function") window.setButtonTitles();
          window.returnFromStats();
          return;
        }
        var statsButton = document.getElementById("statsButton");
        if (statsButton) statsButton.click();
      });

      var tabs = [
        {id: "character", label: t(language, "tabs.character")},
        {id: "quests", label: t(language, "tabs.quests")},
        {id: "journey", label: t(language, "tabs.journey")},
        {id: "items", label: t(language, "tabs.items")}
      ];

      function activate(tabId) {
        Array.prototype.forEach.call(nav.querySelectorAll("button"), function (button) {
          var active = button.dataset.characterTab === tabId;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-selected", active ? "true" : "false");
        });
        panel.textContent = "";
        if (tabId === "quests") renderQuestLog(panel, data, {language: language});
        else if (tabId === "journey") renderJourney(panel, data, {language: language});
        else if (tabId === "items") renderItems(panel, data, {language: language});
        else window.AnantharaCharacterSheet.render(panel, data, {mode: "status", language: language, showAttributes: false, showOracle: true, showStory: true});
      }

      tabs.forEach(function (tab, index) {
        var button = el("button", "", tab.label);
        button.type = "button";
        button.dataset.characterTab = tab.id;
        button.setAttribute("role", "tab");
        button.addEventListener("click", function () { activate(tab.id); });
        nav.appendChild(button);
        if (index === 0) button.classList.add("is-active");
      });

      root.appendChild(backButton);
      root.appendChild(nav);
      root.appendChild(panel);
      text.appendChild(root);
      activate("character");
    }, 0);
  }

  function identityAdvance(scene, label) {
    scene.goto(label);
    scene.finished = false;
    scene.resetPage();
  }

  var interactionSvgs = {
    tree: '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="51" opacity=".22"/><circle cx="60" cy="48" r="9"/><path d="M60 39C48 16 35 24 42 43c-20-7-27 8-7 18-14 15-2 27 15 14 2 22 18 22 20 0 17 13 29 1 15-14 20-10 13-25-7-18 7-19-6-27-18-4Z"/><path d="M60 57v47M60 82c-10-12-20-13-29-7 8 10 17 14 29 13m0 3c10-12 20-13 29-7-8 10-17 14-29 13"/></svg>',
    sun: '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="48" opacity=".28"/><circle cx="60" cy="60" r="22"/><circle cx="60" cy="60" r="10"/><path d="M60 8v22m0 60v22M8 60h22m60 0h22M23 23l16 16m42 42 16 16M97 23 81 39M39 81 23 97"/><path d="m60 2 5 9-5 9-5-9Zm58 58-9 5-9-5 9-5ZM60 118l-5-9 5-9 5 9ZM2 60l9-5 9 5-9 5Z"/></svg>',
    crystal: '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="51" opacity=".22"/><path d="M60 10 70 43 102 30 77 54 110 60 77 66 102 90 70 77 60 110 50 77 18 90 43 66 10 60 43 54 18 30 50 43Z"/><path d="m60 43 15 9v16l-15 9-15-9V52Z"/></svg>',
    book: '<svg viewBox="0 0 140 100" aria-hidden="true"><path d="M70 84C53 69 34 66 13 70V15c23-3 42 4 57 18v51Zm0 0c17-15 36-18 57-14V15c-23-3-42 4-57 18v51Z"/><path d="M70 34v49"/></svg>',
    aegisSeal: '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="49" opacity=".22"/><path d="M60 13 28 31v27c0 21 12 37 32 49 20-12 32-28 32-49V31L60 13Z"/><path d="M42 61h36M60 43v36"/><circle cx="60" cy="61" r="25"/><path d="m36 29 8 8M84 29l-8 8M36 91l8-8M84 91l-8-8"/></svg>',
    seekerTrace: '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="48" opacity=".2"/><circle cx="60" cy="60" r="31"/><path d="M60 12v22l20 12-20 14-20-14 20-12M60 60v48M12 60h28M80 60h28M30 30l16 16M90 30 74 46M30 90l16-16M90 90 74 74"/><path d="m60 46 10 14-10 14-10-14 10-14Z"/><circle cx="60" cy="60" r="4"/></svg>'
  };

  function finishInteraction(scene, overlay, options) {
    if (overlay.dataset.complete === "true") return;
    overlay.dataset.complete = "true";
    overlay.classList.add("is-complete");
    if (options.stateField) scene.stats[options.stateField] = true;
    scene.save("");
    window.setTimeout(function () {
      overlay.remove();
      identityAdvance(scene, options.nextLabel);
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 20 : 420);
  }

  function mountHold(scene, options) {
    options = options || {};
    scene.finished = true;
    scene.save("");
    var en = scene.stats.language === "en";
    var old = document.querySelector(".ana-attunement-overlay");
    if (old) old.remove();
    var overlay = el("div", "ana-attunement-overlay is-" + (options.kind || "book"));
    var dialog = el("section", "ana-attunement-dialog");
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    var kicker = options.kicker !== undefined ? options.kicker : (en ? "THAL’ITHARA ATTUNEMENT" : "THAL’ITHARA-EINSTIMMUNG");
    var title = options.title !== undefined ? options.title : (en ? "Establish the connection" : "Stelle die Verbindung her");
    if (kicker) dialog.appendChild(el("p", "ana-attunement-kicker", kicker));
    if (title) dialog.appendChild(el("h2", "", title));
    dialog.appendChild(el("p", "ana-attunement-prompt", options.prompt || (options.kind === "book"
      ? (en ? "Let your Thal’ithara flow into the exposed channel." : "Lass dein Thal’ithara in die freigelegte Bahn fließen.")
      : (en ? "Press and hold to let your Thal’ithara flow into the destination signature." : "Halte gedrückt, um dein Thal’ithara in die Zielsignatur fließen zu lassen."))));
    var hold = el("button", "ana-attunement-hold");
    hold.type = "button";
    hold.setAttribute("aria-label", en ? "Press and hold to establish the connection" : "Gedrückt halten, um die Verbindung herzustellen");
    hold.innerHTML = options.svg || interactionSvgs[options.kind] || interactionSvgs.book;
    hold.appendChild(el("span", "ana-attunement-progress"));
    dialog.appendChild(hold);
    var portalKind = options.kind !== "book";
    var accessible = el("button", "ana-attunement-accessible", options.accessibleText || (portalKind
      ? (en ? "Establish the connection without gesture." : "Verbindung ohne Geste herstellen.")
      : (en ? "Invoke Thal’ithara without gesture." : "Thal’ithara ohne Geste wirken lassen.")));
    accessible.type = "button";
    dialog.appendChild(accessible);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    var timer = 0;
    var activePointer = null;
    function releasePointer() { if (activePointer !== null && hold.hasPointerCapture && hold.hasPointerCapture(activePointer)) hold.releasePointerCapture(activePointer); activePointer = null; }
    function cancel() { if (timer) window.clearTimeout(timer); timer = 0; hold.classList.remove("is-holding"); releasePointer(); }
    function begin(event) {
      if (event) event.preventDefault();
      cancel();
      if (event && event.pointerId !== undefined && hold.setPointerCapture) { activePointer = event.pointerId; hold.setPointerCapture(activePointer); }
      hold.classList.add("is-holding");
      timer = window.setTimeout(function () { finishInteraction(scene, overlay, options); }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 1400);
    }
    hold.addEventListener("pointerdown", begin);
    ["selectstart", "dragstart", "contextmenu"].forEach(function (type) { hold.addEventListener(type, function (event) { event.preventDefault(); }); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (type) { hold.addEventListener(type, cancel); });
    hold.addEventListener("keydown", function (event) { if (!event.repeat && (event.key === " " || event.key === "Enter")) begin(event); });
    hold.addEventListener("keyup", function (event) { if (event.key === " " || event.key === "Enter") cancel(); });
    accessible.addEventListener("click", function () { finishInteraction(scene, overlay, options); }, {once:true});
    hold.focus({preventScroll:true});
  }

  function mountRoom2ThalInteraction(scene, options) {
    options = options || {};
    var archetype = thalKey(options.archetype) || thalKey(scene.stats.thal_archetype) || "Seeker";
    var en = scene.stats.language === "en";
    mountHold(scene, {
      kind: "room2-thalithara",
      svg: thalIcons[archetype] || thalIcons.Seeker,
      nextLabel: options.nextLabel || (archetype.toLowerCase() + "_after_interaction"),
      kicker: "",
      title: "THAL’ITHARA",
      prompt: en ? "Attune your Thal’ithara to the mural." : "Stimme deine Thal’ithara auf das Wandbild ein.",
      accessibleText: en ? "Invoke Thal’ithara without gesture." : "Thal’ithara ohne Geste wirken lassen."
    });
  }

  function keepsakeContent(stats, en) {
    if (stats.personal_keepsake_id === "missing_drawing") return {
      name: en ? "Drawing of " + stats.missing_person_name : "Zeichnung von " + stats.missing_person_name,
      description: en ? "A small drawing of the person whose disappearance once led you to Ithar’kael. You know every line—and still search for what is missing." : "Eine kleine Zeichnung des Menschen, dessen Verschwinden dich einst nach Ithar’kael führte. Du kennst jede Linie – und suchst trotzdem noch immer nach dem, was fehlt.",
      effect: en ? "Familiar Trace" : "Vertraute Spur",
      effectText: en ? "May open additional memory or conversation possibilities in certain personal situations." : "Kann in bestimmten persönlichen Situationen zusätzliche Erinnerungs- oder Gesprächsmöglichkeiten eröffnen."
    };
    if (stats.personal_keepsake_id === "affliction_notebook") return {
      name: en ? "Research Notebook" : "Forschungsnotizbuch",
      description: en ? "Years of copies, observations, discarded suspicions and open questions about the illness that struck your homeland." : "Jahre voller Abschriften, Beobachtungen, verworfener Vermutungen und offener Fragen über die Krankheit, die deine Heimat heimgesucht hat.",
      effect: en ? "Collected Observations" : "Gesammelte Beobachtungen",
      effectText: en ? "May open additional investigation or conversation possibilities involving illness, alchemy or related traces." : "Kann bei Krankheiten, Alchemie oder verwandten Spuren zusätzliche Untersuchungs- oder Gesprächsmöglichkeiten eröffnen."
    };
    return {
      name: en ? "Memory Journal" : "Erinnerungsjournal",
      description: en ? "A personal journal in which you preserve impressions, dreams and fragments you do not fully trust—precisely because you do not want to lose them again." : "Ein persönliches Journal, in dem du Eindrücke, Träume und Fragmente festhältst, denen du nicht vollständig vertraust – gerade deshalb, weil du sie nicht wieder verlieren willst.",
      effect: en ? "Recorded Traces" : "Festgehaltene Spuren",
      effectText: en ? "May allow new impressions to be compared with memory fragments already known." : "Kann ermöglichen, neue Eindrücke mit bereits bekannten Erinnerungsfragmenten zu vergleichen."
    };
  }

  function mountItem(scene) {
    scene.finished = true;
    scene.save("");
    var en = scene.stats.language === "en";
    var data = keepsakeContent(scene.stats, en);
    var overlay = el("div", "ana-item-overlay");
    var dialog = el("section", "ana-item-dialog");
    dialog.setAttribute("role", "dialog"); dialog.setAttribute("aria-modal", "true");
    dialog.appendChild(el("p", "ana-item-kicker", en ? "PERSONAL ITEM ACQUIRED" : "PERSÖNLICHER GEGENSTAND ERHALTEN"));
    dialog.appendChild(el("h2", "", data.name));
    dialog.appendChild(el("p", "ana-item-description", data.description));
    dialog.appendChild(el("h3", "", (en ? "Passive Effect — " : "Passiver Effekt — ") + data.effect));
    dialog.appendChild(el("p", "ana-item-effect", data.effectText));
    var next = el("button", "ana-identity-continue", en ? "Continue" : "Weiter"); next.type = "button";
    next.addEventListener("click", function () { scene.stats.personal_keepsake_popup_seen = true; scene.save(""); overlay.remove(); identityAdvance(scene, "room_loop"); }, {once:true});
    dialog.appendChild(next); overlay.appendChild(dialog); document.body.appendChild(overlay); next.focus({preventScroll:true});
  }

  function mountDiscovery(scene, options) {
    options = options || {};
    scene.finished = true;
    scene.save("");
    var en = scene.stats.language === "en";
    var old = document.querySelector(".ana-discovery-overlay");
    if (old) old.remove();
    var overlay = el("div", "ana-discovery-overlay");
    var dialog = el("section", "ana-discovery-dialog");
    dialog.setAttribute("role", "dialog"); dialog.setAttribute("aria-modal", "true");
    dialog.appendChild(el("p", "ana-item-kicker", options.kind || (en ? "INSIGHT" : "ERKENNTNIS")));
    dialog.appendChild(el("h2", "", options.title || ""));
    dialog.appendChild(el("p", "ana-discovery-copy", options.body || ""));
    var next = el("button", "ana-identity-continue", en ? "Continue" : "Weiter"); next.type = "button";
    next.addEventListener("click", function () { overlay.remove(); identityAdvance(scene, options.nextLabel || "detail_menu"); }, {once:true});
    dialog.appendChild(next); overlay.appendChild(dialog); document.body.appendChild(overlay); next.focus({preventScroll:true});
  }

  function mountReplica(scene, options) {
    options = options || {};
    scene.finished = true; scene.save("");
    var en = scene.stats.language === "en";
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var overlay = el("div", "ana-replica-overlay");
    var video = document.createElement("video");
    video.className = "ana-replica-video";
    video.src = "Assets/video/buch_kodexeintrag.mp4";
    video.autoplay = true; video.muted = true; video.playsInline = true; video.preload = "auto";
    var dialog = el("section", "ana-replica-dialog");
    dialog.setAttribute("role", "dialog"); dialog.setAttribute("aria-modal", "true");
    dialog.tabIndex = -1;
    dialog.innerHTML = '<div class="ana-replica-book"><div class="ana-replica-page"><div class="ana-replica-name"></div><div class="ana-replica-title"></div><div class="ana-replica-subtitle"></div></div></div>';
    var nameNode = dialog.querySelector(".ana-replica-name");
    var titleNode = dialog.querySelector(".ana-replica-title");
    var subtitleNode = dialog.querySelector(".ana-replica-subtitle");
    var pageNode = dialog.querySelector(".ana-replica-page");
    var copy = el("p", "ana-replica-copy", en
      ? "According to legend, the Chronicles preserve the memory of the world—what was, what is and perhaps even what might be. This replica does not possess the knowledge of the original. It can answer only with what you bring into it: your knowledge, your memories and the possibilities that arise from them."
      : "Den Legenden nach bewahren die Chroniken die Erinnerung der Welt — an das, was war, was ist und vielleicht sogar an das, was sein könnte. Diese Replik besitzt nicht das Wissen des Originals. Sie kann nur mit dem antworten, was du in sie hineinbringst: mit deinem Wissen, deinen Erinnerungen und den Möglichkeiten, die daraus entstehen.");
    var questionPrompt = el("div", "ana-replica-instructions ana-replica-question");
    questionPrompt.appendChild(el("p", "", en ? "Ask a single question." : "Stelle eine einzige Frage."));
    var instructions = el("div", "ana-replica-instructions");
    [en ? "Consider the answer." : "Bedenke die Antwort.", en ? "And decide what you will do with the knowledge." : "Und entscheide, was du mit dem Wissen tun wirst."].forEach(function (line) { instructions.appendChild(el("p", "", line)); });
    questionPrompt.hidden = true; copy.hidden = true; instructions.hidden = true;
    pageNode.appendChild(copy); dialog.appendChild(questionPrompt); dialog.appendChild(instructions);
    var controls = el("div", "ana-replica-controls");
    var next = el("button", "is-primary", en ? "Continue" : "Weiter"); next.type = "button"; next.hidden = true;
    controls.appendChild(next); dialog.appendChild(controls);
    var videoStage = el("div", "ana-replica-video-stage");
    var videoSkip = el("button", "ana-replica-video-skip", en ? "SKIP" : "ÜBERSPRINGEN"); videoSkip.type = "button";
    videoStage.appendChild(video); videoStage.appendChild(videoSkip);
    dialog.hidden = true; overlay.appendChild(videoStage); overlay.appendChild(dialog); document.body.appendChild(overlay); overlay.tabIndex = -1; overlay.focus({preventScroll:true});
    var timers = [], finished = false, videoCleaned = false;
    function later(fn, delay) { var id = window.setTimeout(fn, delay); timers.push(id); }
    function finish() {
      if (finished) return; finished = true; timers.forEach(window.clearTimeout);
      nameNode.textContent = "";
      titleNode.textContent = en ? "REPLICA OF THE CHRONICLES" : "REPLIK DER CHRONIKEN";
      subtitleNode.textContent = en ? "THE MEMORY OF CREATION" : "DAS GEDÄCHTNIS DER SCHÖPFUNG";
      copy.hidden = false; copy.classList.add("is-visible"); questionPrompt.hidden = false; questionPrompt.classList.add("is-visible"); instructions.hidden = false; instructions.classList.add("is-visible"); next.hidden = false; next.focus({preventScroll:true});
    }
    function typeText(node, value, done) {
      var index = 0; node.textContent = "";
      function step() { node.textContent = value.slice(0, index++); if (index <= value.length) later(step, 42); else later(done, 180); }
      step();
    }
    function typeName() {
      var name = safeString(scene.stats.name, "—"), index = 0;
      nameNode.textContent = "│";
      function step() { nameNode.textContent = name.slice(0, index++) + (index <= name.length ? "│" : ""); if (index <= name.length) later(step, 95); else later(function () {
        nameNode.classList.add("is-fading");
        later(function () { nameNode.textContent = ""; typeText(titleNode, en ? "REPLICA OF THE CHRONICLES" : "REPLIK DER CHRONIKEN", function () { typeText(subtitleNode, en ? "THE MEMORY OF CREATION" : "DAS GEDÄCHTNIS DER SCHÖPFUNG", function () {
          copy.hidden = false;
          requestAnimationFrame(function () { copy.classList.add("is-visible"); });
          later(function () {
            questionPrompt.hidden = false;
            requestAnimationFrame(function () { questionPrompt.classList.add("is-visible"); });
            later(function () {
              instructions.hidden = false;
              requestAnimationFrame(function () { instructions.classList.add("is-visible"); });
              later(finish, 460);
            }, 460);
          }, 460);
        }); }); }, 450);
      }, 650); }
      later(step, 220);
    }
    var revealStarted = false;
    function beginReplicaReveal() {
      if (revealStarted) return;
      revealStarted = true;
      if (!videoCleaned) {
        videoCleaned = true;
        video.removeEventListener("ended", beginReplicaReveal);
        video.removeEventListener("error", beginReplicaReveal);
        video.pause();
      }
      video.classList.add("is-leaving");
      videoSkip.disabled = true;
      window.setTimeout(function () {
        video.removeAttribute("src"); video.load(); videoStage.remove(); dialog.hidden = false;
        requestAnimationFrame(function () { dialog.classList.add("is-revealed"); });
        if (reduced) finish(); else { typeName(); dialog.focus({preventScroll:true}); }
      }, reduced ? 0 : 360);
    }
    video.addEventListener("ended", beginReplicaReveal, {once:true});
    video.addEventListener("error", beginReplicaReveal, {once:true});
    videoSkip.addEventListener("click", beginReplicaReveal, {once:true});
    timers.push(window.setTimeout(beginReplicaReveal, 6500));
    next.addEventListener("click", function () { overlay.remove(); identityAdvance(scene, options.nextLabel || "replica_after_reveal"); }, {once:true});
    if (reduced) beginReplicaReveal();
    else {
      var playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") playAttempt.catch(beginReplicaReveal);
    }
  }

  function manifestationClass(type) {
    var key = safeString(type, "Seeker");
    var animationClasses = {
      Veilwalker: "veil-walker",
      Llifari: "soul-whisperer",
      Seeker: "pattern-seeker",
      Artisari: "resonant-creator",
      Vanguard: "preserver",
      Aegis: "empathic-conduit"
    };
    return "is-" + (animationClasses[key] || key.toLowerCase().replace(/^the\s+/, "").replace(/\s+/g, "-"));
  }

  function mountThalReveal(scene) {
    scene.finished = true;
    scene.save("");
    var stats = scene.stats;
    var en = stats.language === "en";
    var data = getCharacterData(stats);
    var thal = data.thalithara;
    var old = document.querySelector(".ana-thal-overlay");
    if (old) old.remove();
    var overlay = document.createElement("div");
    overlay.className = "ana-thal-overlay " + manifestationClass(thal.archetype);
    var dialog = document.createElement("section");
    dialog.className = "ana-thal-reveal";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.innerHTML =
      '<div class="ana-thal-icon"></div>' +
      '<p class="ana-thal-kicker"></p><h2></h2>' +
      '<p class="ana-thal-description"></p>' +
      '<details class="ana-thal-detail"><summary><span></span></summary><p></p></details>' +
      '<details class="ana-thal-detail"><summary><span></span></summary><p></p></details>' +
      '<details class="ana-thal-detail"><summary><span></span></summary><p></p></details>' +
      '<p class="ana-thal-quote"><span></span></p>' +
      '<div class="ana-thal-gesture"><button type="button" class="ana-thal-interaction-symbol"></button><p></p><div class="ana-thal-progress"></div><button type="button" class="ana-thal-accessible"></button></div>' +
      '<button type="button" class="ana-identity-continue"></button>';
    dialog.querySelector(".ana-thal-icon").innerHTML = thalIcons[thal.archetype] || thalIcons.Seeker || "";
    dialog.querySelector(".ana-thal-kicker").textContent = en ? "YOUR SOUL REVEALS ITSELF THROUGH" : "DEINE SEELE OFFENBART SICH DURCH";
    dialog.querySelector("h2").textContent = thal.title || (en ? "Thal’ithara" : "Thal’ithara");
    dialog.querySelector(".ana-thal-description").textContent = thal.popupDescription || thal.callingDescription || thal.legacyNote || "";
    var details = dialog.querySelectorAll(".ana-thal-detail");
    details[0].querySelector("summary span").textContent = en ? "INNATE AFFINITY" : "ANGEBORENE AFFINITÄT";
    details[0].querySelector("p").textContent = thal.affinity || "—";
    details[1].querySelector("summary span").textContent = en ? "CURRENT RESONANCE" : "AKTUELLE RESONANZ";
    details[1].querySelector("p").textContent = [thal.resonanceTitle, thal.resonanceDescription].filter(Boolean).join(" — ") || "—";
    details[2].querySelector("summary span").textContent = en ? "THAL’ITHARA MANIFESTATION" : "THAL’ITHARA-MANIFESTATION";
    details[2].querySelector("p").textContent = thal.manifestationDescription || "—";
    dialog.querySelector(".ana-thal-quote span").textContent = en
      ? "In Ananthara, magic is never chosen. It simply responds to what already exists within the soul."
      : "In Ananthara wird Magie niemals gewählt. Sie reagiert auf das, was tief in deiner Seele bereits existiert.";
    var next = dialog.querySelector("button");
    next = dialog.querySelector(".ana-identity-continue");
    next.textContent = en ? "Continue" : "Weiter";
    next.hidden = true;
    var icon = dialog.querySelector(".ana-thal-icon");
    var gesture = dialog.querySelector(".ana-thal-gesture");
    var interactionIcon = gesture.querySelector(".ana-thal-interaction-symbol");
    interactionIcon.innerHTML = thalIcons[thal.archetype] || thalIcons.Seeker || "";
    var instruction = gesture.querySelector("p");
    var accessible = gesture.querySelector(".ana-thal-accessible");
    var singleTouch = thal.archetype === "Aegis" || thal.archetype === "Seeker";
    instruction.textContent = thal.archetype === "Aegis"
      ? (en ? "Touch and trace the seal to awaken its resonance." : "Berühre das Siegel und führe seine Linie nach, um seine Resonanz zu wecken.")
      : thal.archetype === "Seeker"
        ? (en ? "Touch the visible lines and connect the pattern." : "Berühre die sichtbaren Linien und verbinde das Muster.")
        : (en ? "Press and hold the sign until your connection becomes stable." : "Halte das Zeichen gedrückt, bis deine Verbindung stabil wird.");
    accessible.textContent = en ? "Invoke Thal’ithara without gesture." : "Thal’ithara ohne Geste wirken lassen.";
    interactionIcon.setAttribute("aria-label", instruction.textContent);
    var completed = false, activating = false, timer = 0, activePointer = null;
    function releasePointer() { if (activePointer !== null && interactionIcon.hasPointerCapture && interactionIcon.hasPointerCapture(activePointer)) interactionIcon.releasePointerCapture(activePointer); activePointer = null; }
    function completeReveal() {
      if (completed) return;
      completed = true;
      activating = false;
      releasePointer();
      interactionIcon.classList.remove("is-holding", "is-activating"); interactionIcon.classList.add("is-attuned");
      icon.classList.add("is-attuned");
      gesture.classList.add("is-complete"); next.hidden = false; next.focus({preventScroll:true});
    }
    function cancelHold() {
      if (singleTouch || activating) return;
      if (timer) window.clearTimeout(timer);
      timer = 0;
      interactionIcon.classList.remove("is-holding");
      releasePointer();
    }
    function activateGesture(event) {
      if (event) event.preventDefault();
      if (completed || activating) return;
      if (event && event.pointerId !== undefined && interactionIcon.setPointerCapture) { activePointer = event.pointerId; interactionIcon.setPointerCapture(activePointer); }
      if (singleTouch) {
        activating = true;
        interactionIcon.classList.add("is-activating");
        timer = window.setTimeout(completeReveal, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 75 : 780);
        return;
      }
      cancelHold(); interactionIcon.classList.add("is-holding");
      timer = window.setTimeout(completeReveal, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 1400);
    }
    interactionIcon.addEventListener("pointerdown", activateGesture);
    ["selectstart", "dragstart", "contextmenu"].forEach(function (type) { interactionIcon.addEventListener(type, function (event) { event.preventDefault(); }); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (type) { interactionIcon.addEventListener(type, cancelHold); });
    interactionIcon.addEventListener("keydown", function (event) { if (!event.repeat && (event.key === " " || event.key === "Enter")) activateGesture(event); });
    interactionIcon.addEventListener("keyup", function (event) { if (!singleTouch && (event.key === " " || event.key === "Enter")) cancelHold(); });
    accessible.addEventListener("click", completeReveal, {once:true});
    next.addEventListener("click", function () {
      overlay.classList.add("is-closing");
      window.setTimeout(function () {
        overlay.remove();
        identityAdvance(scene, "identity_story");
      }, 280);
    }, {once: true});
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    dialog.tabIndex = -1;
    window.requestAnimationFrame(function () {
      dialog.scrollTop = 0;
      dialog.focus({preventScroll:true});
    });
  }

  function mountIdentityStory(scene, story) {
    scene.finished = true;
    scene.save("");
    var stats = scene.stats;
    var en = stats.language === "en";
    var text = document.getElementById("text");
    if (!text) return;
    text.innerHTML = "";
    var page = document.createElement("section");
    page.className = "ana-identity-story";
    page.innerHTML =
      '<p class="ana-story-kicker">Ithar\'kael</p><h2></h2>' +
      '<p class="ana-story-text"></p>' +
      '<div class="ana-guild-oath"></div>' +
      '<div class="ana-signature"><h3></h3><button type="button" class="ana-signature-line" aria-describedby="anaSignatureHint"><span></span></button><p id="anaSignatureHint"></p></div>' +
      '<p class="ana-archive-recognition" hidden></p>' +
      '<button type="button" class="ana-identity-continue" hidden></button>';
    page.querySelector("h2").textContent = en ? "Your Story" : "Deine Geschichte";
    page.querySelector(".ana-story-text").textContent = story;
    var oath = page.querySelector(".ana-guild-oath");
    var oathLines = en
      ? ["I do not join Ithar'kael to rule Ananthara.", "I join to listen.", "To understand.", "To preserve hidden truths.", "And to walk the path my soul reveals before me."]
      : ["Ich trete Ithar'kael nicht bei, um Ananthara zu beherrschen.", "Ich trete bei, um zuzuhören.", "Um zu verstehen.", "Um verborgene Wahrheiten zu bewahren.", "Und um den Weg zu gehen, den meine Seele vor mir offenbart."];
    oathLines.forEach(function (line) { oath.appendChild(addText(document.createElement("p"), line)); });
    page.querySelector(".ana-signature h3").textContent = en ? "Signature" : "Unterschrift";
    page.querySelector("#anaSignatureHint").textContent = en ? "Tap the golden line to sign the record." : "Berühre die goldene Linie, um die Akte zu unterzeichnen.";
    var line = page.querySelector(".ana-signature-line");
    var writtenName = line.querySelector("span");
    var recognition = page.querySelector(".ana-archive-recognition");
    var next = page.querySelector(".ana-identity-continue");
    recognition.textContent = en ? "The archives of Ithar'kael recognize your name." : "Die Archive von Ithar'kael erkennen deinen Namen an.";
    next.textContent = en ? "Continue" : "Weiter";

    line.addEventListener("click", function () {
      line.disabled = true;
      writtenName.textContent = stats.name;
      line.classList.add("is-signed");
      var finished = false;
      function finishSignature() {
        if (finished) return;
        finished = true;
        recognition.hidden = false;
        next.hidden = false;
        next.focus({preventScroll:true});
      }
      writtenName.addEventListener("animationend", finishSignature, {once: true});
      window.setTimeout(finishSignature, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 850);
    }, {once: true});
    next.addEventListener("click", function () { identityAdvance(scene, "identity_complete"); }, {once: true});
    text.appendChild(page);
  }

  function choiceArtwork(info, name, en) {
    var media = document.createElement("span");
    media.className = "ana-choice-card-media is-" + info.kind;
    var image = document.createElement("img");
    image.alt = "";
    image.loading = "eager";
    image.decoding = "async";
    var fallback = document.createElement("span");
    fallback.className = "ana-choice-card-fallback";
    fallback.hidden = true;
    fallback.innerHTML = '<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M16 62 34 41l12 13 8-9 12 17Z"/><circle cx="55" cy="25" r="8"/><rect x="9" y="9" width="62" height="62" rx="7"/></svg><span></span>';
    fallback.querySelector("span").textContent = en ? name + " artwork unavailable" : "Darstellung von " + name + " nicht verfügbar";
    image.addEventListener("error", function () {
      if (!image.dataset.triedJpg && /\.png$/i.test(info.image)) {
        image.dataset.triedJpg = "true";
        image.src = info.image.replace(/\.png$/i, ".jpg");
        return;
      }
      image.hidden = true;
      fallback.hidden = false;
    });
    image.src = info.image;
    media.appendChild(image);
    media.appendChild(fallback);
    return media;
  }

  function enhanceIdentityChoices() {
    var main = document.querySelector("#container1 #main");
    if (!main) return;
    var choice = main.querySelector(".choice");
    main.classList.toggle("ana-choice-screen", !!choice);
    var next = main.querySelector(".next");
    var nextText = next ? (next.textContent || next.value || "").trim().toLowerCase() : "";
    main.classList.toggle("ana-attunement-intro", nextText === "einstimmung beginnen" || nextText === "begin the attunement");
    if (!choice) return;

    // Distinguish a deliberate tap from a touch scroll.  ChoiceScript
    // rebuilds the choice markup on navigation, so install this guard on
    // the current main surface only and let native radio/change behavior
    // remain the source of truth.
    if (!main.dataset.anantharaChoiceScrollGuard) {
      var activeGesture = null;
      main.addEventListener("pointerdown", function (event) {
        var label = event.target && event.target.closest ? event.target.closest(".choice label") : null;
        if (!label) { activeGesture = null; return; }
        activeGesture = {label: label, pointerId: event.pointerId, x: event.clientX, y: event.clientY, didScroll: false};
      }, {passive: true});
      main.addEventListener("pointermove", function (event) {
        if (!activeGesture || activeGesture.pointerId !== event.pointerId || activeGesture.didScroll) return;
        if (Math.hypot(event.clientX - activeGesture.x, event.clientY - activeGesture.y) > 9) activeGesture.didScroll = true;
      }, {passive: true});
      main.addEventListener("pointercancel", function (event) {
        if (activeGesture && activeGesture.pointerId === event.pointerId) activeGesture = null;
      }, {passive: true});
      main.addEventListener("pointerup", function (event) {
        if (!activeGesture || activeGesture.pointerId !== event.pointerId) return;
        // Native click follows pointerup in the same task. Clear afterward so
        // a completed choice gesture can never affect a later action button.
        window.setTimeout(function () {
          if (activeGesture && activeGesture.pointerId === event.pointerId) activeGesture = null;
        }, 0);
      }, {passive: true});
      main.addEventListener("click", function (event) {
        var label = event.target && event.target.closest ? event.target.closest(".choice label") : null;
        if (!label || !activeGesture || activeGesture.label !== label) return;
        var wasScroll = activeGesture.didScroll;
        activeGesture = null;
        if (wasScroll) { event.preventDefault(); event.stopImmediatePropagation(); }
      }, true);
      main.addEventListener("change", function (event) {
        var input = event.target;
        if (!input || !input.matches || !input.matches(".choice input")) return;
        var group = input.closest(".choice");
        if (!group) return;
        group.querySelectorAll("label").forEach(function (label) {
          var radio = label.querySelector("input");
          label.classList.toggle("is-selected", !!(radio && radio.checked));
        });
      });
      main.dataset.anantharaChoiceScrollGuard = "true";
    }

    Array.prototype.forEach.call(main.querySelectorAll(".ana-choice-question"), function (paragraph) {
      paragraph.classList.remove("ana-choice-question");
    });
    var sceneName = safeString(window.stats && window.stats.sceneName).toLowerCase();
    if (sceneName === "de_00_identity") {
      var questionCandidates = Array.prototype.filter.call(main.querySelectorAll("#text > p"), function (paragraph) {
        return (paragraph.textContent || "").trim() && !paragraph.classList.contains("ana-exam-section-heading");
      });
      if (questionCandidates.length) questionCandidates[questionCandidates.length - 1].classList.add("ana-choice-question");
    }

    var en = !window.stats || window.stats.language === "en";
    var decorated = false;
    Array.prototype.forEach.call(choice.querySelectorAll("label:not(.ana-visual-choice)"), function (label) {
      var raw = (label.textContent || "").trim();
      if (/^(Zurück|Back)(\b|\s|\.)/i.test(raw)) {
        label.classList.add("ana-submenu-back");
        if (label.parentElement) label.parentElement.classList.add("ana-submenu-back-row");
      }
      var divider = raw.indexOf("—");
      var name = (divider === -1 ? raw : raw.slice(0, divider)).trim();
      var info = identityChoiceCards[name];
      if (!info) return;
      decorated = true;
      var description = divider === -1 ? "" : raw.slice(divider + 1).trim();
      var input = label.querySelector("input");
      Array.prototype.forEach.call(label.childNodes, function (node) {
        if (node !== input) label.removeChild(node);
      });

      label.classList.add("ana-visual-choice");
      label.classList.add("is-" + info.kind);
      label.appendChild(choiceArtwork(info, name, en));
      var copy = document.createElement("span");
      copy.className = "ana-choice-card-copy";
      copy.appendChild(addText(document.createElement("strong"), name));
      copy.appendChild(addText(document.createElement("span"), description));
      label.appendChild(copy);

      function syncSelected() {
        label.classList.toggle("is-selected", !!(input && input.checked));
      }
      if (input) input.addEventListener("change", syncSelected);
      label.addEventListener("click", function () {
        if (input && !input.disabled) input.checked = true;
        window.setTimeout(syncSelected, 0);
      });
      syncSelected();
    });
    if (decorated || choice.querySelector(".ana-visual-choice")) choice.classList.add("ana-visual-choice-grid");
  }

  function enhanceNarrativeTypography() {
    var text = document.getElementById("text");
    if (!text || text.querySelector(".ananthara-game-ui")) return;
    Array.prototype.forEach.call(text.querySelectorAll(":scope > p, :scope > form > p"), function (paragraph) {
      if (paragraph.classList.contains("ana-exam-section-heading") || paragraph.classList.contains("ana-choice-question")) return;
      paragraph.classList.add("ana-narrative-prose");
      var source = (paragraph.textContent || "").trim();
      var keyInsights = {
        "Etwas wird gegeben. Etwas schlägt Wurzeln und wächst.": true,
        "Getrenntes verbindet sich. Dann legt sich ein Schleier darüber.": true,
        "A gift. Something that grows from it.": true,
        "Something that finds its way together. And finally, something that lays itself over all of it.": true,
        "Don wuvurep dêkh posehkund sundaykh, elvip wuvurep dêkh posehkund duldaykh.": true,
        "„Was verborgen wurde, offenbart sich nicht dem Auge, sondern dem Licht.“": true,
        "“What was hidden reveals itself not to the eye, but to the light.”": true,
        "„Erinnere dich an das, was gegeben wurde. Zeige, was daraus geworden ist.“": true,
        "“Remember what was given. Show what became of it.”": true,
        "Pîn reip kalztarkaikh duldid sêmîk.": true
      };
      var tehandTexts = {
        "Don wuvurep dêkh posehkund sundaykh, elvip wuvurep dêkh posehkund duldaykh.": true,
        "„Was verborgen wurde, offenbart sich nicht dem Auge, sondern dem Licht.“": true,
        "“What was hidden reveals itself not to the eye, but to the light.”": true,
        "„Erinnere dich an das, was gegeben wurde. Zeige, was daraus geworden ist.“": true,
        "“Remember what was given. Show what became of it.”": true,
        "Pîn reip kalztarkaikh duldid sêmîk.": true
      };
      if (keyInsights[source]) paragraph.classList.add("ana-key-insight");
      if (tehandTexts[source]) paragraph.classList.add("ana-tehand-text");
    });
  }

  function installIdentityChoiceEnhancer() {
    var scheduled = false;
    var examHeadings = {
      "VERBORGENE WAHRHEIT": true,
      "DIE GABE DES LICHTS": true,
      "WAS WIR IN UNS TRAGEN": true,
      "HIDDEN TRUTH": true,
      "THE GIFT OF LIGHT": true,
      "WHAT WE CARRY WITHIN": true
    };
    var registrationHeadings = {
      "REGISTRIERUNG ZUR ABSCHLUSSPRÜFUNG": true,
      "FINAL EXAMINATION REGISTRATION": true
    };
    function enhanceExamHeadings() {
      var text = document.getElementById("text");
      if (!text) return;
      var isRegistration = false;
      Array.prototype.forEach.call(text.querySelectorAll("p"), function (paragraph) {
        var heading = (paragraph.textContent || "").trim();
        if (examHeadings[heading]) paragraph.classList.add("ana-exam-section-heading");
        if (registrationHeadings[heading]) {
          isRegistration = true;
          paragraph.classList.add("ana-exam-section-heading", "ana-registration-heading");
        }
      });
      var main = document.getElementById("main");
      if (main) main.classList.toggle("ana-registration-screen", isRegistration);
    }
    function schedule() {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(function () {
        scheduled = false;
        enhanceIdentityChoices();
        enhanceExamHeadings();
        enhanceNarrativeTypography();
        document.body.classList.toggle("ana-stats-active", !!document.querySelector(".ananthara-game-ui"));
      });
    }
    Object.keys(identityChoiceCards).forEach(function (name) {
      var source = identityChoiceCards[name] && identityChoiceCards[name].image;
      if (!source) return;
      var preload = new Image();
      preload.src = source;
    });
    schedule();
    if (window.MutationObserver) {
      new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installIdentityChoiceEnhancer, {once: true});
  else installIdentityChoiceEnhancer();

  window.AnantharaCharacter = {getCharacterData: getCharacterData};
  window.AnantharaCharacterSheet = {render: renderCharacterSheet};
  window.AnantharaQuestLog = {
    config: QUEST_CONFIG,
    personalDiscoveryConfig: PERSONAL_DISCOVERY_CONFIG,
    getQuestData: getQuestData,
    render: renderQuestLog
  };
  window.AnantharaThalitharaData = AnantharaThalitharaData;
  window.AnantharaStats = {enhance: enhance};
  window.AnantharaIdentity = {mountThalReveal: mountThalReveal, mountIdentityStory: mountIdentityStory};
  window.AnantharaInteractions = {mountHold: mountHold, mountRoom2ThalInteraction: mountRoom2ThalInteraction, mountItem: mountItem, mountDiscovery: mountDiscovery, mountReplica: mountReplica, keepsakeContent: keepsakeContent};
})();
