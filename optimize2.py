import os
from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
SRC_LOGO = os.path.join(BASE, "assets", "extracted_assets")
OUT = os.path.join(BASE, "img", "optimized")
FAV = os.path.join(BASE, "favicon")

os.makedirs(FAV, exist_ok=True)

# Generate WebP gallery variants for extra compression
gal_files = [
    "pineapple_harvest", "pineapple_nursery_ready_for_transplant",
    "pineapple_plantation_farm", "plantain_plantation",
    "plantain_sucker_ready_for_sale", "plantain_sucker_showcase"
]
for name in gal_files:
    jp = os.path.join(OUT, name + ".jpg")
    if os.path.exists(jp):
        im = Image.open(jp).convert("RGB")
        im.save(os.path.join(OUT, name + ".webp"), "WEBP", quality=78, method=6)
        print("webp", name, os.path.getsize(os.path.join(OUT, name + ".webp"))//1024, "KB")

# Generate favicon PNGs from icon brand mark
icon = Image.open(os.path.join(SRC_LOGO, "icon_brand_mark.png")).convert("RGBA")
bbox = icon.getbbox()
if bbox:
    icon = icon.crop(bbox)
# place on rounded square with brand green bg for app icon
bg_size = 512
canvas = Image.new("RGBA", (bg_size, bg_size), (11, 94, 42, 255))
# Paste centered with padding
pad = int(bg_size * 0.18)
logo = icon.copy()
logo.thumbnail((bg_size - 2*pad, bg_size - 2*pad), Image.LANCZOS)
canvas.alpha_composite(logo, ((bg_size - logo.width)//2, (bg_size - logo.height)//2))

for size in [192, 512]:
    im = canvas.resize((size, size), Image.LANCZOS)
    im.save(os.path.join(FAV, f"app-icon-{size}.png"), "PNG", optimize=True)
    print("appicon", size)

# Favicon ico + png
for size in [16, 32, 48, 180]:
    im = canvas.resize((size, size), Image.LANCZOS)
    im.save(os.path.join(FAV, f"favicon-{size}.png"), "PNG", optimize=True)

# Build .ico
ico_sizes = [16, 32, 48]
ico = [canvas.resize((s, s), Image.LANCZOS).convert("RGB") for s in ico_sizes]
ico[0].save(os.path.join(FAV, "favicon.ico"), format="ICO", sizes=[(s, s) for s in ico_sizes])
print("favicon.ico")
print("done")
