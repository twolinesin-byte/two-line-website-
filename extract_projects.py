import fitz
import os
import shutil

pdf_path = "TWOLINES PORTFOLIO MAGAZINE.pdf"
doc = fitz.open(pdf_path)

# Casa Rivera images: pages 8, 9, 10, 11
# Vikrambhai: pages 6, 7
# Jigneshbhai: pages 12
# Hitenbhai: pages 13
# Bhavinbhai: pages 14

projects = {
    "vikrambhai":  [6, 7],
    "casa_rivera": [8, 9, 10, 11],
    "jigneshbhai": [12],
    "hitenbhai":   [13],
    "bhavinbhai":  [14],
}

for project_name, pages in projects.items():
    output_dir = f"website/public/projects/{project_name}"
    os.makedirs(output_dir, exist_ok=True)
    img_counter = 0
    for page_num in pages:
        page = doc[page_num]
        image_list = page.get_images(full=True)
        images_with_size = []
        for img in image_list:
            xref = img[0]
            try:
                base_image = doc.extract_image(xref)
                if base_image:
                    w = base_image.get("width", 0)
                    h = base_image.get("height", 0)
                    if w > 300 and h > 300:
                        images_with_size.append((w*h, base_image))
            except:
                pass
        # Sort by size desc, skip background PNG (very large solid images)
        images_with_size.sort(key=lambda x: x[0], reverse=True)
        for size, base_image in images_with_size:
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            # Skip if it's likely a background texture (PNG and very large)
            if image_ext == "png" and size > 1000000:
                continue
            fname = f"{img_counter:02d}.{image_ext}"
            with open(f"{output_dir}/{fname}", "wb") as f:
                f.write(image_bytes)
            print(f"{project_name}: saved {fname} ({size//1000}k px)")
            img_counter += 1

print("Done!")
