import fitz
import os

def extract_images_from_pdf(pdf_path, output_dir, prefix):
    doc = fitz.open(pdf_path)
    os.makedirs(output_dir, exist_ok=True)
    img_count = 0
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        images = page.get_images(full=True)
        print(f"Page {page_num+1} has {len(images)} embedded images")
        
        for img_idx, img_info in enumerate(images):
            xref = img_info[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            output_file = os.path.join(output_dir, f"{prefix}_img_{page_num+1}_{img_idx+1}.{image_ext}")
            with open(output_file, "wb") as f:
                f.write(image_bytes)
            img_count += 1
            if img_count < 10:
                print(f"  Extracted image {img_count}: {output_file} ({len(image_bytes)} bytes)")
                
    print(f"Total extracted from {prefix}: {img_count}")

# Extract from Stationery
extract_images_from_pdf(
    "/Users/deeptanubhunia/Desktop/tulsi/ui_reference/Page 24 Catalogue.pdf STATIONERY.pdf",
    "/Users/deeptanubhunia/Desktop/tulsi/public/product_images/extracted/stationery",
    "stationery"
)

# Extract from Housekeeping
extract_images_from_pdf(
    "/Users/deeptanubhunia/Desktop/tulsi/ui_reference/Tulsi_Office_Solution_Housekeeping_Catalogue.pdf",
    "/Users/deeptanubhunia/Desktop/tulsi/public/product_images/extracted/housekeeping",
    "housekeeping"
)
