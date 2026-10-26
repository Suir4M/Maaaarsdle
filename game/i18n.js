/*
 * Marsdle i18n
 * Add a locale file in game/locales/<code>.json and register its code in SUPPORTED.
 * New/updated components should use MarsdleI18n.t("namespace.key").
 *
 * The legacy text bridge keeps older game engines translated while they are
 * progressively migrated to explicit translation keys. It can be removed once
 * all renderers use t().
 */
(function () {
  "use strict";

  const SUPPORTED = ["fr", "en"];
  const DEFAULT_LANGUAGE = "fr";
  const STORAGE_KEY = "marsdle-lang";
  const scriptUrl = document.currentScript ? document.currentScript.src : "";
  const localeBase = new URL("locales/", scriptUrl || location.href);
  const dictionaries = {};
  let currentLanguage = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
  if (!SUPPORTED.includes(currentLanguage)) currentLanguage = DEFAULT_LANGUAGE;

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let applyingLegacyTranslations = false;

  function interpolate(value, variables) {
    return String(value).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) =>
      variables && variables[key] !== undefined ? variables[key] : `{{${key}}}`
    );
  }

  function getKey(dictionary, key) {
    return key.split(".").reduce((value, part) => value && value[part], dictionary);
  }

  function t(key, variables = {}) {
    const dictionary = dictionaries[currentLanguage] || dictionaries[DEFAULT_LANGUAGE] || {};
    const fallback = dictionaries[DEFAULT_LANGUAGE] || {};
    const value = getKey(dictionary, key);
    const defaultValue = getKey(fallback, key);
    return interpolate(value ?? defaultValue ?? key, variables);
  }

  function translateLegacyText(text) {
    if (currentLanguage === DEFAULT_LANGUAGE || !dictionaries.en) return text;
    const en = dictionaries.en;
    if (en.legacy && en.legacy[text]) return en.legacy[text];

    let result = text;
    const substitutions = [
      ...Object.entries(en.legacy || {}),
      ...Object.entries(en.names || {})
    ].sort((a, b) => b[0].length - a[0].length);

    for (const [source, translated] of substitutions) {
      if (source && source !== translated) result = result.split(source).join(translated);
    }
    return result;
  }

  function translateLegacyTree(root) {
    if (currentLanguage === DEFAULT_LANGUAGE || !root || applyingLegacyTranslations) return;
    applyingLegacyTranslations = true;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      node.nodeValue = translateLegacyText(source);
    }

    const elements = root.nodeType === Node.ELEMENT_NODE ? [root, ...root.querySelectorAll("*")] : [];
    for (const element of elements) {
      if (["SCRIPT", "STYLE"].includes(element.tagName)) continue;
      let saved = originalAttributes.get(element);
      if (!saved) {
        saved = {};
        for (const attr of ["placeholder", "title", "aria-label"]) {
          if (element.hasAttribute(attr)) saved[attr] = element.getAttribute(attr);
        }
        originalAttributes.set(element, saved);
      }
      for (const [attr, value] of Object.entries(saved)) {
        element.setAttribute(attr, translateLegacyText(value));
      }
    }
    applyingLegacyTranslations = false;
  }

  function translateName(name) {
    if (currentLanguage !== "en") return name;
    return (dictionaries.en && dictionaries.en.names && dictionaries.en.names[name]) || name;
  }

  function canonicalName(name) {
    if (currentLanguage !== "en" || !dictionaries.en || !dictionaries.en.names) return name;
    const entry = Object.entries(dictionaries.en.names).find(([, english]) => english === name);
    return entry ? entry[0] : name;
  }

  function setLanguage(language) {
    if (!SUPPORTED.includes(language)) return;
    currentLanguage = language;
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    location.reload();
  }

  function addLanguageButton() {
    if (document.getElementById("language-toggle")) return;
    const button = document.createElement("button");
    button.id = "language-toggle";
    button.type = "button";
    button.className = "language-btn";
    button.setAttribute("aria-label", t("common.switchLanguage"));
    button.title = t("common.switchLanguage");
    button.textContent = currentLanguage === "en" ? "🇬🇧 EN" : "🇫🇷 FR";
    button.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "fr" : "en"));
    document.body.append(button);

    const style = document.createElement("style");
    style.textContent = `
      .language-btn{position:fixed;top:calc(env(safe-area-inset-top,0px) + 12px);right:max(12px,calc(50vw - 340px));z-index:51;height:44px;padding:0 12px;border-radius:24px;border:1px solid var(--bd,#2c4a4c);background:var(--card,rgba(13,32,34,.92));color:var(--gold,#e6cf94);font-weight:700;cursor:pointer;box-shadow:0 6px 18px #0005}
      .language-btn:focus-visible{outline:2px solid var(--gold,#e6cf94);outline-offset:3px}
      @media print{.language-btn{display:none}}
    `;
    document.head.append(style);
  }

  async function init() {
    await Promise.all(SUPPORTED.map(async language => {
      try {
        const response = await fetch(new URL(`${language}.json`, localeBase));
        if (response.ok) dictionaries[language] = await response.json();
      } catch (error) {
        console.warn(`[Marsdle i18n] Could not load locale "${language}".`, error);
      }
    }));

    if (!dictionaries[DEFAULT_LANGUAGE]) dictionaries[DEFAULT_LANGUAGE] = {};
    if (!dictionaries.en) dictionaries.en = {};
    document.documentElement.lang = currentLanguage;
    addLanguageButton();
    translateLegacyTree(document.body);

    // Compatibility bridge for existing game renderers; new code should use t().
    const observer = new MutationObserver(records => {
      if (applyingLegacyTranslations || currentLanguage === DEFAULT_LANGUAGE) return;
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) translateLegacyTree(node);
          else if (node.nodeType === Node.TEXT_NODE) {
            if (!originalText.has(node)) originalText.set(node, node.nodeValue);
            node.nodeValue = translateLegacyText(originalText.get(node));
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.MarsdleI18n = {
    t,
    setLanguage,
    getLanguage: () => currentLanguage,
    getSupportedLanguages: () => [...SUPPORTED],
    translateName,
    canonicalName
  };
  window.marsdleEnglishName = translateName;
  window.marsdleCanonicalName = canonicalName;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
