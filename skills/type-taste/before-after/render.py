"""Render the before/after PNGs and run references/audit.js on every page. Exits 1 if after.html fails a check."""
import shutil
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

d = Path(__file__).parent.resolve()
root = d.parent
shutil.copy(root / "tokens.css", d / "tokens.css")
audit = (root / "references" / "audit.js").read_text()
failed_after = 0

with sync_playwright() as p:
    b = p.chromium.launch()
    for name, scheme in [("before", "light"), ("after", "light"), ("after", "dark")]:
        pg = b.new_page(viewport={"width": 900, "height": 400}, device_scale_factor=2, color_scheme=scheme)
        pg.goto((d / f"{name}.html").as_uri())
        pg.evaluate("document.fonts.ready.then(() => 0)")
        pg.screenshot(path=str(d / f"{name}{'-dark' if scheme == 'dark' else ''}.png"), full_page=True)
        r = pg.evaluate(audit)
        print(f"{name} ({scheme}): {r['failed']} of {r['failed'] + len(r['pass'])} checks fail")
        for f in r["fail"]:
            print(f"  {f['n']}. {f['rule']}\n     " + "\n     ".join(f["bad"]))
        if name == "after":
            failed_after += r["failed"]
        pg.close()

    (d / "compare.html").write_text("""<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="tokens.css"><style>
body { margin: 0; padding: 24px; display: flex; gap: 40px; align-items: start; background: #ececec; }
.label { margin: 0 0 10px; }
img { width: 880px; display: block; box-shadow: 0 0 0 1px rgb(0 0 0 / 0.08); }
</style></head><body class="mt">
<figure style="margin:0"><figcaption class="label">Before · browser defaults</figcaption><img src="before.png" alt=""></figure>
<figure style="margin:0"><figcaption class="label">After · type-taste</figcaption><img src="after.png" alt=""></figure>
</body></html>
""")
    pg = b.new_page(viewport={"width": 1888, "height": 300}, device_scale_factor=1, color_scheme="light")
    pg.goto((d / "compare.html").as_uri())
    pg.evaluate("Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode())]).then(() => 0)")
    pg.screenshot(path=str(d / "compare.png"), full_page=True)
    b.close()

sys.exit(1 if failed_after else 0)
