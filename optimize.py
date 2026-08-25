import os
from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
SRC_LOGO = os.path.join(BASE, "assets", "extracted_assets")
SRC_GAL = os.path.join(BASE, "assets", "gallery")
OUT = os.path.join(BASE, "img", "optimized")
os.makedirs(OUT, exist_ok=True)

def save(img, path, quality=82):
    img.save(path, "JPEG", quality=quality, optimize=True, progressive=True)

def fit(img, max_w, max_h):
    img.thumbnail((max_w, max_h), Image.LANCZOS)
    return img

# ---- Logos ----
# Primary logo (deep green bg -> transparent not reliable, keep as is but compress)
primary = Image.open(os.path.join(SRC_LOGO, "primary_logo.png")).convert("RGBA")
# Crop transparent padding
bbox = primary.getbbox()
if bbox:
    primary = primary.crop(bbox)
primary.thumbnail((500, 500), Image.LANCZOS)
primary.save(os.path.join(OUT, "logo.png"), "PNG", optimize=True)
print("logo.png", primary.size)

# Reversed (white) logo - trim and save
for name, out in [("logo_var_reversed", "logo-white"), ("logo_var_monochrome", "logo-mono"), ("logo_var_full_color", "logo-color")]:
    im = Image.open(os.path.join(SRC_LOGO, name + ".png")).convert("RGBA")
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.thumbnail((400, 400), Image.LANCZOS)
    im.save(os.path.join(OUT, out + ".png"), "PNG", optimize=True)
    print(out, im.size)

# Icon / brand mark
icon = Image.open(os.path.join(SRC_LOGO, "icon_brand_mark.png")).convert("RGBA")
bbox = icon.getbbox()
if bbox:
    icon = icon.crop(bbox)
icon.thumbnail((400, 400), Image.LANCZOS)
icon.save(os.path.join(OUT, "icon.png"), "PNG", optimize=True)
print("icon.png", icon.size)

# ---- Gallery ----
gal = [
    ("pineapple_harvest", (800, 900), 0.9),
    ("pineapple_nursery_ready_for_transplant", (800, 900), 0.9),
    ("pineapple_plantation_farm", (800, 900), 0.9),
    ("plantain_plantation", (1000, 640), 0.85),
    ("plantain_sucker_ready_for_sale", (900, 800), 0.85),
    ("plantain_sucker_showcase", (800, 900), 0.9),
]
for name, (w, h), q in gal:
    im = Image.open(os.path.join(SRC_GAL, name + ".png")).convert("RGB")
    im.thumbnail((w, h), Image.LANCZOS)
    save(im, os.path.join(OUT, name + ".jpg"), quality=int(q*100))
    print(name, im.size)

print("done")
