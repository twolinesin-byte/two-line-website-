from PIL import Image
import os
import numpy as np

img_dir = "website/public/projects/bhavinbhai"

for filename in os.listdir(img_dir):
    if filename.lower().endswith(('.jpeg', '.jpg', '.png')):
        path = os.path.join(img_dir, filename)
        try:
            img = Image.open(path)
            img_data = np.array(img)
            
            if len(img_data.shape) == 3:
                gray = np.mean(img_data, axis=2)
            else:
                gray = img_data
                
            # Find rows/cols where 95% of pixels are darker than 15 (almost pure black)
            is_black_row = np.mean(gray < 15, axis=1) > 0.95
            is_black_col = np.mean(gray < 15, axis=0) > 0.95
            
            h, w = gray.shape
            top = 0
            while top < h and is_black_row[top]:
                top += 1
                
            bottom = h
            while bottom > top and is_black_row[bottom - 1]:
                bottom -= 1
                
            left = 0
            while left < w and is_black_col[left]:
                left += 1
                
            right = w
            while right > left and is_black_col[right - 1]:
                right -= 1
                
            # Let's add a bit of safety: only crop if the cropped image is still reasonably sized
            if (top > 0 or bottom < h or left > 0 or right < w) and (bottom - top > 50) and (right - left > 50):
                cropped_img = img.crop((left, top, right, bottom))
                cropped_img.save(path)
                print(f"Cropped {filename}: top margin={top}px, bottom margin={h-bottom}px, left margin={left}px, right margin={w-right}px")
            else:
                print(f"No significant black margins found for {filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")
