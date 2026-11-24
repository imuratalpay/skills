// type-taste audit. Paste into DevTools, or run with Playwright: page.evaluate(fs.readFileSync("audit.js", "utf8")).
// Checks review-checklist lines 1–11 and 14–16 of SKILL.md against computed styles. Run once per color scheme.
// Lines 12–13 and 17–23 are by eye.
(() => {
  const dark = matchMedia("(prefers-color-scheme: dark)").matches;
  const rgb = (h) => `rgb(${[1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).join(", ")})`;
  const ladder = (dark
    ? ["#eeeeee", "#dadada", "#b6b6b6", "#7c7c7c", "#3a3a3a"]
    : ["#202020", "#424242", "#6f6f6f", "#a0a0a0", "#c7c7c7"]).map(rgb);
  const cs = (e) => getComputedStyle(e);
  const px = (v) => parseFloat(v) || 0;
  const near = (a, b, d = 0.01) => Math.abs(a - b) <= d;
  const kind = (e) => {
    const f = cs(e).fontFamily.split(",")[0].toLowerCase().replace(/[^a-z]/g, "");
    return f.includes("geistmono") ? "mono" : f.includes("newsreader") ? "serif"
      : f.includes("caveat") ? "script" : f.includes("inter") ? "sans" : f;
  };
  const all = [...document.body.querySelectorAll("*")].filter((e) => e.getClientRects().length);
  const text = all.filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
  const at = (e, got) => `<${e.tagName.toLowerCase()}> "${e.textContent.trim().slice(0, 24)}": ${got}`;
  const pass = [], fail = [];
  const check = (n, rule, bad) => (bad.length ? fail : pass).push({ n, rule, ...(bad.length && { bad: bad.slice(0, 4) }) });

  const scripts = text.filter((e) => kind(e) === "script");
  check(1, "Families: Inter, Newsreader, Geist Mono; Caveat on one element at most", [
    ...text.filter((e) => !["sans", "serif", "mono", "script"].includes(kind(e))).map((e) => at(e, kind(e))),
    ...(scripts.length > 1 ? [`Caveat on ${scripts.length} elements`] : [])]);

  check(2, "Inter computes cv01 + ss03", text.filter((e) => kind(e) === "sans"
    && !(/cv01/.test(cs(e).fontFeatureSettings) && /ss03/.test(cs(e).fontFeatureSettings))).map((e) => at(e, cs(e).fontFeatureSettings)));

  check(3, "No weight >= 600 on sans or mono", text.filter((e) => ["sans", "mono"].includes(kind(e))
    && px(cs(e).fontWeight) >= 600).map((e) => at(e, cs(e).fontWeight)));

  const prose = [...document.querySelectorAll("article p, main p")];
  const body = px(cs(prose[0] ?? document.body).fontSize);
  check(4, "Prose 15–17px, line-height 1.6–1.625, width <= 672px", prose.filter((e) => {
    const c = cs(e), r = px(c.lineHeight) / px(c.fontSize);
    return px(c.fontSize) < 15 || px(c.fontSize) > 17 || r < 1.599 || r > 1.626 || e.getBoundingClientRect().width > 672;
  }).map((e) => at(e, `${cs(e).fontSize}/${cs(e).lineHeight}, ${e.getBoundingClientRect().width | 0}px wide`)));

  const isStep = (c) => px(c.fontSize) === 24 && px(c.lineHeight) === 32 && px(c.letterSpacing) === -0.3;
  const isDisplay = (c) => px(c.fontSize) === 48 && px(c.lineHeight) === 48 && near(px(c.letterSpacing) / 48, -0.022, 0.0005);
  const heads = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")];
  const displays = heads.filter((e) => isDisplay(cs(e)));
  check(5, "Headings: h2–h6 at body size; h1 same-size, step or display; one display max", [
    ...heads.filter((e) => {
      const c = cs(e), same = px(c.fontSize) === body;
      return e.tagName === "H1" ? !(same || isStep(c) || isDisplay(c)) : !same;
    }).map((e) => at(e, `${cs(e).fontSize}/${cs(e).lineHeight} ${cs(e).letterSpacing}`)),
    ...(displays.length > 1 ? [`${displays.length} display headings`] : [])]);

  const caps = (e) => cs(e).textTransform === "uppercase";
  check(6, "Caps: mono, 12px, +0.3 to +0.66px; other text under 24px untracked", [
    ...text.filter(caps).filter((e) => kind(e) !== "mono" || px(cs(e).fontSize) !== 12
      || px(cs(e).letterSpacing) < 0.3 || px(cs(e).letterSpacing) > 0.66),
    ...text.filter((e) => !caps(e) && px(cs(e).fontSize) < 24 && px(cs(e).letterSpacing) !== 0),
  ].map((e) => at(e, `${kind(e)} ${cs(e).fontSize} ${cs(e).letterSpacing}`)));

  check(7, `Text is fg-1, fg-2 or fg-3 of the ${dark ? "dark" : "light"} ladder; never rgb(0, 0, 0)`,
    text.filter((e) => !e.matches(":disabled") && !ladder.slice(0, 3).includes(cs(e).color))
      .map((e) => at(e, cs(e).color)));

  const wrap = (e) => cs(e).textWrapStyle || cs(e).textWrap || "";
  check(8, "p pretty, h1–h3 balance, digits in td/time/.num tabular", [
    ...prose.filter((e) => !wrap(e).includes("pretty")).map((e) => at(e, wrap(e))),
    ...[...document.querySelectorAll("h1, h2, h3")].filter((e) => !wrap(e).includes("balance")).map((e) => at(e, wrap(e))),
    ...[...document.querySelectorAll("td, time, .num")].filter((e) => /\d/.test(e.textContent)
      && !cs(e).fontVariantNumeric.includes("tabular-nums")).map((e) => at(e, cs(e).fontVariantNumeric))]);

  const b = cs(document.body);
  check(9, "em is Newsreader italic 430 at 1.07em; font-synthesis none", [
    ...[...document.querySelectorAll("em")].filter((e) => kind(e) !== "serif" || cs(e).fontStyle !== "italic"
      || px(cs(e).fontWeight) !== 430 || !near(px(cs(e).fontSize) / px(cs(e.parentElement).fontSize), 1.07))
      .map((e) => at(e, `${kind(e)} ${cs(e).fontStyle} ${cs(e).fontWeight} ${cs(e).fontSize}`)),
    ...(b.fontSynthesisWeight === "none" && b.fontSynthesisStyle === "none" ? [] : [`body font-synthesis: ${b.fontSynthesis}`])]);

  check(10, "No fonts from fonts.googleapis.com / fonts.gstatic.com", performance.getEntriesByType("resource")
    .map((r) => r.name).filter((u) => /fonts\.(googleapis|gstatic)\.com/.test(u)));

  check(11, "Underlines: 1px, 2px offset, fg-5", all.filter((e) => e.matches("a") && cs(e).textDecorationLine.includes("underline"))
    .filter((e) => cs(e).textDecorationThickness !== "1px" || cs(e).textUnderlineOffset !== "2px" || cs(e).textDecorationColor !== ladder[4])
    .map((e) => at(e, `${cs(e).textDecorationThickness} ${cs(e).textUnderlineOffset} ${cs(e).textDecorationColor}`)));

  // A 1×1 canvas turns any computed color (rgb, lab, oklch, color()) into sRGB bytes.
  const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  const rgba = (c) => {
    probe.clearRect(0, 0, 1, 1); probe.fillStyle = "#000"; probe.fillStyle = c; probe.fillRect(0, 0, 1, 1);
    const [r, g, bl, a] = probe.getImageData(0, 0, 1, 1).data;
    return [r, g, bl, a / 255];
  };
  const over = (top, under) => [0, 1, 2].map((i) => top[i] * top[3] + under[i] * (1 - top[3]));
  const darkCanvas = dark && /dark/.test(cs(document.documentElement).colorScheme
    + (document.querySelector('meta[name="color-scheme"]')?.content ?? ""));
  const backdrop = (e) => {
    const layers = [];
    for (let n = e; n; n = n.parentElement) {
      if (cs(n).backgroundImage !== "none") return null;
      const l = rgba(cs(n).backgroundColor);
      if (l[3] > 0) layers.push(l);
      if (l[3] === 1) break;
    }
    return layers.reduceRight((under, l) => over(l, under), darkCanvas ? [18, 18, 18] : [255, 255, 255]);
  };
  const lum = (c) => c.map((v) => (v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
    .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
  const contrast = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
  const large = (c) => px(c.fontSize) >= 24 || (px(c.fontSize) >= 18.66 && px(c.fontWeight) >= 700);
  const css = (c) => `rgb(${c.map(Math.round).join(", ")})`;
  check(14, "Readable text >= 4.5:1 on its computed background (3:1 at large size); disabled and image-backed text skipped",
    text.filter((e) => cs(e).visibility === "visible" && !e.closest(":disabled, [aria-disabled='true']")).flatMap((e) => {
      const fg = rgba(cs(e).color), bg = backdrop(e);
      if (!bg || fg[3] === 0) return [];
      const shown = over(fg, bg), r = contrast(shown, bg);
      return r < (large(cs(e)) ? 3 : 4.5) ? [at(e, `${r.toFixed(2)}:1, ${css(shown)} on ${css(bg)}`)] : [];
    }));

  const fields = all.filter((e) => e.matches("textarea, select, [contenteditable]:not([contenteditable='false']), "
    + "input:not([type=checkbox], [type=radio], [type=range], [type=color], [type=file], [type=button], [type=submit], [type=reset], [type=image], [type=hidden])"));
  const viewport = document.querySelector('meta[name="viewport"]')?.content ?? "";
  check(15, `Inputs >= 16px (run at ${innerWidth}px wide; judge the viewport); viewport meta keeps zoom`, [
    ...fields.filter((e) => px(cs(e).fontSize) < 16)
      .map((e) => `<${e.tagName.toLowerCase()}${e.type ? ` type=${e.type}` : ""}${e.name ? ` name=${e.name}` : ""}>: ${cs(e).fontSize}`),
    ...(/maximum-scale\s*=\s*1(?:\.0+)?(?![\d.])|user-scalable\s*=\s*(?:no|0)/i.test(viewport) ? [`<meta name="viewport"> "${viewport}"`] : [])]);

  check(16, "Font files are woff2: none end in .ttf or .otf", performance.getEntriesByType("resource")
    .map((r) => r.name).filter((u) => /\.(ttf|otf)$/i.test(u.split(/[?#]/)[0])));

  return { scheme: dark ? "dark" : "light", failed: fail.length, fail, pass: pass.map((p) => `${p.n}. ${p.rule}`) };
})();
