import fitz
import os

pdf_path = "TWOLINES PORTFOLIO MAGAZINE.pdf"
output_dir = "website/public/casarivera"

doc = fitz.open(pdf_path)
os.makedirs(output_dir, exist_ok=True)

print(f"Total pages: {len(doc)}")

# Extract images from every page and save them with page info
for page_num in range(len(doc)):
    page = doc[page_num]
    image_list = page.get_images(full=True)
    
    for img_index, img in enumerate(image_list):
        xref = img[0]
        try:
            base_image = doc.extract_image(xref)
            if base_image:
                w = base_image.get("width", 0)
                h = base_image.get("height", 0)
                # Only extract images larger than 200x200 to skip icons
                if w > 200 and h > 200:
                    image_bytes = base_image["image"]
                    image_ext = base_image["ext"]
                    fname = f"p{page_num:02d}_img{img_index:02d}_{w}x{h}.{image_ext}"
                    with open(f"{output_dir}/{fname}", "wb") as f:
                        f.write(image_bytes)
                    print(f"Page {page_num}: {fname}")
        except Exception as e:
            print(f"Page {page_num}, img {img_index}: ERROR {e}")
