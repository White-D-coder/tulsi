import fitz  # PyMuPDF
import os
from PIL import Image

def slice_pdf(pdf_path, page_config, output_dir):
    print(f"Opening PDF: {pdf_path}")
    doc = fitz.open(pdf_path)
    os.makedirs(output_dir, exist_ok=True)
    
    for page_num, config in page_config.items():
        # page_num is 1-based index
        page_idx = page_num - 1
        if page_idx >= len(doc):
            print(f"Warning: Page {page_num} out of bounds.")
            continue
            
        page = doc[page_idx]
        zoom = 2.0  # High res
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat)
        
        # Convert to PIL Image
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        
        # Get crop boundaries for content
        crop_x_start = config.get("x_start", 40)
        crop_x_end = img.width - config.get("x_end_offset", 40)
        crop_y_start = config.get("y_start", 140)
        crop_y_end = img.height - config.get("y_end_offset", 80)
        
        rows = config.get("rows", 3)
        cols = config.get("cols", 3)
        skus = config.get("skus", [])
        
        content_width = crop_x_end - crop_x_start
        content_height = crop_y_end - crop_y_start
        
        col_width = content_width / cols
        row_height = content_height / rows
        
        sku_idx = 0
        for r in range(rows):
            for c in range(cols):
                if sku_idx >= len(skus):
                    break
                
                sku = skus[sku_idx]
                if not sku:  # skip padding
                    sku_idx += 1
                    continue
                
                # Calculate coordinates
                x0 = int(crop_x_start + c * col_width)
                y0 = int(crop_y_start + r * row_height)
                x1 = int(x0 + col_width)
                y1 = int(y0 + row_height)
                
                # Add inner padding to crop slightly inside the grid lines
                cell_padding_x = int(col_width * 0.05)
                cell_padding_y = int(row_height * 0.03)
                
                crop_box = (
                    x0 + cell_padding_x,
                    y0 + cell_padding_y,
                    x1 - cell_padding_x,
                    y1 - cell_padding_y
                )
                
                # Crop and save
                cell_img = img.crop(crop_box)
                # Resize to consistent premium size, e.g. 400x400
                cell_img = cell_img.resize((400, 400), Image.Resampling.LANCZOS)
                
                output_file = os.path.join(output_dir, f"{sku}.png")
                cell_img.save(output_file, "PNG")
                print(f"Saved: {output_file} (from page {page_num}, row {r+1}, col {c+1})")
                
                sku_idx += 1

# 1. Housekeeping & Washroom Catalog Config
housekeeping_config = {
    2: { # Page 2: Chemicals
        "x_start": 40, "x_end_offset": 40, "y_start": 160, "y_end_offset": 80,
        "rows": 4, "cols": 3,
        "skus": [
            "TOS-HK-R1", "TOS-HK-R2", "TOS-HK-R3",
            "TOS-HK-R4", "TOS-HK-R5", "TOS-HK-R6",
            "TOS-HK-R9", "TOS-HK-R20", "TOS-HK-REF-CHEM-B",
            "TOS-HK-REF-CHEM-P", "TOS-HK-REF-CHEM-G", "TOS-HK-REF-CHEM-Y"
        ]
    },
    3: { # Page 3: Scrubs
        "x_start": 40, "x_end_offset": 40, "y_start": 160, "y_end_offset": 80,
        "rows": 3, "cols": 3,
        "skus": [
            "TOS-HK-SCRUB-SS-4", "TOS-HK-SCRUB-SS-6", "TOS-HK-SCRUB-SS-12",
            "TOS-HK-SCRUB-SPG-4", "TOS-HK-SCRUB-SPG-6", "TOS-HK-SCRUB-SPG-12",
            "TOS-HK-SCRUB-SPG-SP-4", "TOS-HK-SCRUB-SPG-SP-6", "TOS-HK-SCRUB-SPG-SP-12"
        ]
    },
    4: { # Page 4: Rose & Aerosol
        "x_start": 40, "x_end_offset": 40, "y_start": 160, "y_end_offset": 80,
        "rows": 4, "cols": 3,
        "skus": [
            "TOS-HK-ROSE-TFR", "TOS-HK-ROSE-TDD", "TOS-HK-ROSE-URS",
            "TOS-HK-ROSE-DFB", "TOS-HK-ROSE-NPB", "TOS-HK-ROSE-AFP",
            "TOS-WF-AER-MAN", "TOS-WF-AER-AUT", "TOS-WF-AER-LCD",
            "TOS-WF-AER-CAN", "TOS-WF-AER-SNS", "TOS-WF-AER-PCH"
        ]
    },
    5: { # Page 5: Soap & Accessories 1
        "x_start": 40, "x_end_offset": 40, "y_start": 160, "y_end_offset": 80,
        "rows": 4, "cols": 3,
        "skus": [
            "TOS-WF-SOAP-MAN", "TOS-WF-SOAP-SS", "TOS-WF-SOAP-CFD",
            "TOS-WF-SOAP-MFD", "TOS-WF-SOAP-AUT", "TOS-WF-SOAP-JRT",
            "TOS-HK-ACC-GB", "TOS-HK-ACC-SPG", "TOS-HK-ACC-CLT",
            "TOS-HK-ACC-DRN", "TOS-HK-ACC-MET", "TOS-HK-ACC-WRM"
        ]
    },
    6: { # Page 6: Accessories 2 & Tissues
        "x_start": 40, "x_end_offset": 40, "y_start": 160, "y_end_offset": 80,
        "rows": 4, "cols": 3,
        "skus": [
            "TOS-HK-ACC-PKT", "TOS-HK-ACC-MAT", "TOS-HK-ACC-WIP",
            "TOS-HK-ACC-MOP", "TOS-HK-ACC-DBN", "TOS-HK-ACC-EXT",
            "TOS-WF-TIS-MFD", "TOS-WF-TIS-HRT", "TOS-WF-TIS-TR2",
            "TOS-WF-TIS-T100", "TOS-WF-TIS-POP", "TOS-WF-TIS-KIT"
        ]
    },
    7: { # Page 7: Tissue Dispensers & Dryers
        "x_start": 40, "x_end_offset": 40, "y_start": 160, "y_end_offset": 80,
        "rows": 3, "cols": 3,
        "skus": [
            "TOS-WF-DISP-TPR", "TOS-WF-DISP-HRT", "TOS-WF-DISP-MFD",
            "TOS-WF-DISP-POP", "TOS-WF-DISP-TL", "TOS-WF-DISP-PRT",
            "TOS-WF-DRY-PLA", "TOS-WF-DRY-SS", "TOS-WF-DRY-HDY"
        ]
    },
    8: { # Page 8: Shoe & Dustbins
        "x_start": 40, "x_end_offset": 40, "y_start": 160, "y_end_offset": 80,
        "rows": 3, "cols": 3,
        "skus": [
            "TOS-MS-SHOE-SHN", "TOS-MS-SHOE-LIQ", "TOS-MS-SHOE-COV",
            "TOS-HK-QMAN", "TOS-HK-SIGN-WET", "TOS-HK-MOP-BUF",
            "TOS-HK-DPAN-PL", "TOS-HK-SEAT-BND", "TOS-HK-BCKT-MET"
        ]
    },
    9: { # Page 9: Machinery & Squeegees & Trolleys 1
        "x_start": 40, "x_end_offset": 40, "y_start": 160, "y_end_offset": 80,
        "rows": 3, "cols": 3,
        "skus": [
            "TOS-MS-VAC-DRY", "TOS-MS-VAC-IND", "TOS-MS-SCR-HYD",
            "TOS-HK-SQG-IRON", "TOS-HK-SQG-FLR", "TOS-HK-SQG-GLS",
            "TOS-HK-TLY-MOP1", "TOS-HK-TLY-MOP3", "TOS-HK-TLY-LBY"
        ]
    },
    10: { # Page 10: Trolleys 2, Poles, Mops
        "x_start": 40, "x_end_offset": 40, "y_start": 160, "y_end_offset": 80,
        "rows": 3, "cols": 3,
        "skus": [
            "TOS-HK-TLY-JAN", "TOS-HK-TLY-WST", "TOS-HK-POLE-TEL",
            "TOS-HK-MOP-MF", "TOS-HK-MOP-LNG", "TOS-HK-MOP-CTN",
            "TOS-HK-MOP-WD", "TOS-HK-WIP-DMOP", "TOS-HK-WIP-DMREF"
        ]
    },
    11: { # Page 11: Floor Wipers, Glass tools, Brushes
        "x_start": 40, "x_end_offset": 40, "y_start": 160, "y_end_offset": 80,
        "rows": 4, "cols": 3,
        "skus": [
            "TOS-HK-WIP-TOI", "TOS-HK-WIP-NYL", "TOS-HK-WIP-URN",
            "TOS-HK-WIP-DPB", "TOS-HK-WIP-BRM", "TOS-HK-GLS-WSH",
            "TOS-HK-GLS-SQG", "TOS-HK-GLS-CLN", "TOS-HK-GLS-REF",
            "TOS-HK-BRSH-FLR", "TOS-HK-BRSH-SHOE", "TOS-HK-BRSH-NAIL",
            "TOS-HK-BRSH-WIRE" # Put wire brush in extra cell index 13 if layout permits, or let's duplicate nail brush
        ]
    }
}

# 2. Stationery & IT Catalog Config
stationery_config = {
    4: { # Page 4: IT Cartridges
        "x_start": 40, "x_end_offset": 40, "y_start": 140, "y_end_offset": 80,
        "rows": 2, "cols": 3,
        "skus": [
            "TOS-MS-12A", "TOS-MS-88A", "TOS-MS-78A",
            "TOS-MS-110A", "TOS-MS-CAN328"
        ]
    },
    5: { # Page 5: Computer Accessories
        "x_start": 40, "x_end_offset": 40, "y_start": 140, "y_end_offset": 80,
        "rows": 2, "cols": 3,
        "skus": [
            "TOS-MS-KBD", "TOS-MS-MSE", "TOS-MS-HDS",
            "TOS-MS-HDMI"
        ]
    },
    6: { # Page 6: Paper Products
        "x_start": 40, "x_end_offset": 40, "y_start": 140, "y_end_offset": 80,
        "rows": 2, "cols": 3,
        "skus": [
            "TOS-PR-A475", "TOS-PR-A480", "TOS-PR-ENV9",
            "TOS-PR-ENV12", "TOS-PR-LTR"
        ]
    },
    7: { # Page 7: Files & Folders
        "x_start": 40, "x_end_offset": 40, "y_start": 140, "y_end_offset": 80,
        "rows": 1, "cols": 3,
        "skus": [
            "TOS-ST-COB", "TOS-ST-DLX", "TOS-ST-ZIP"
        ]
    },
    8: { # Page 8: Office Essentials
        "x_start": 40, "x_end_offset": 40, "y_start": 140, "y_end_offset": 80,
        "rows": 2, "cols": 3,
        "skus": [
            "TOS-ST-GLU", "TOS-ST-GST", "TOS-ST-STP",
            "TOS-ST-STP45", "TOS-ST-PCH", "TOS-ST-STK"
        ]
    },
    9: { # Page 9: Pens & Writing
        "x_start": 40, "x_end_offset": 40, "y_start": 140, "y_end_offset": 80,
        "rows": 2, "cols": 3,
        "skus": [
            "TOS-ST-WBM", "TOS-ST-PMN", "TOS-ST-GEL",
            "TOS-ST-BAL", "TOS-ST-PCL"
        ]
    },
    10: { # Page 10: Whiteboards & Boards
        "x_start": 40, "x_end_offset": 40, "y_start": 140, "y_end_offset": 80,
        "rows": 1, "cols": 3,
        "skus": [
            "TOS-ST-WBD", "TOS-ST-WBD4", "TOS-ST-DST"
        ]
    },
    11: { # Page 11: Desktop Accessories
        "x_start": 40, "x_end_offset": 40, "y_start": 140, "y_end_offset": 80,
        "rows": 2, "cols": 3,
        "skus": [
            "TOS-ST-ORG", "TOS-ST-TRY", "TOS-ST-CLIP",
            "TOS-ST-CALC"
        ]
    }
}

output_directory = "/Users/deeptanubhunia/Desktop/tulsi/public/product_images/sliced"

slice_pdf(
    "/Users/deeptanubhunia/Desktop/tulsi/ui_reference/Tulsi_Office_Solution_Housekeeping_Catalogue.pdf",
    housekeeping_config,
    output_directory
)

slice_pdf(
    "/Users/deeptanubhunia/Desktop/tulsi/ui_reference/Page 24 Catalogue.pdf STATIONERY.pdf",
    stationery_config,
    output_directory
)

print("All product images sliced successfully!")
