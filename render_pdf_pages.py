import fitz  # PyMuPDF
import os

def render_pdf_to_images(pdf_path, output_dir, prefix):
    print(f"Rendering {pdf_path}...")
    doc = fitz.open(pdf_path)
    os.makedirs(output_dir, exist_ok=True)
    
    for i in range(len(doc)):
        page = doc[i]
        # Use a zoom factor of 2.0 for higher resolution (approx 150-200 DPI depending on PDF size)
        zoom = 2.0
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat)
        
        output_file = os.path.join(output_dir, f"{prefix}_page_{i+1}.png")
        pix.save(output_file)
        print(f"Saved {output_file}")

# Render Stationery catalog
render_pdf_to_images(
    "/Users/deeptanubhunia/Desktop/tulsi/ui_reference/Page 24 Catalogue.pdf STATIONERY.pdf",
    "/Users/deeptanubhunia/Desktop/tulsi/public/product_images/pages",
    "stationery"
)

# Render Housekeeping catalog
render_pdf_to_images(
    "/Users/deeptanubhunia/Desktop/tulsi/ui_reference/Tulsi_Office_Solution_Housekeeping_Catalogue.pdf",
    "/Users/deeptanubhunia/Desktop/tulsi/public/product_images/pages",
    "housekeeping"
)

print("Done rendering pages!")
