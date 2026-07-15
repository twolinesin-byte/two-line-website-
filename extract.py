import fitz
import sys
import os

pdf_path = sys.argv[1]
output_dir = sys.argv[2]

doc = fitz.open(pdf_path)

# Pages to extract from (0-indexed)
# 7: Vikrambhai, 8: Casa Rivera, 12: Jigneshbhai, 13: Hitenbhai, 14: Bhavinbhai
pages_to_extract = {
    7: "vikrambhai",
    8: "casa_rivera",
    12: "jigneshbhai",
    13: "hitenbhai",
    14: "bhavinbhai"
}

os.makedirs(output_dir, exist_ok=True)

for page_num, name in pages_to_extract.items():
    page = doc[page_num]
    image_list = page.get_images(full=True)
    if image_list:
        # Get the largest image by area or just the first one
        # To avoid tiny logos, let's sort by width * height
        images_with_size = []
        for img in image_list:
            xref = img[0]
            try:
                base_image = doc.extract_image(xref)
                if base_image:
                    width = base_image.get("width", 0)
                    height = base_image.get("height", 0)
                    images_with_size.append((width * height, base_image))
            except:
                pass
        
        if images_with_size:
            # Sort by size descending
            images_with_size.sort(key=lambda x: x[0], reverse=True)
            best_image = images_with_size[0][1]
            image_bytes = best_image["image"]
            image_ext = best_image["ext"]
            with open(f"{output_dir}/{name}.{image_ext}", "wb") as f:
                f.write(image_bytes)
            print(f"Extracted {name}.{image_ext}")
