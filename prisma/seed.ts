import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS = [
  // 1. IT / Printer Cartridges (Category: MS - Machines & IT)
  {
    sku: 'TOS-MS-12A',
    name: 'HP 12A Black LaserJet Toner Cartridge',
    description: 'High-yield toner cartridge for HP LaserJet printers. Yields up to 2,000 pages of crisp black text and graphics.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 1850.00,
    images: [{ url: '/static/placeholder.webp', alt: 'HP 12A Toner', isPrimary: true }]
  },
  {
    sku: 'TOS-MS-88A',
    name: 'HP 88A Black LaserJet Toner Cartridge',
    description: 'Reliable black toner cartridge designed for everyday business printing. Standard capacity, high reliability.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 2100.00,
    images: [{ url: '/static/placeholder.webp', alt: 'HP 88A Toner', isPrimary: true }]
  },
  {
    sku: 'TOS-MS-78A',
    name: 'HP 78A Black LaserJet Toner Cartridge',
    description: 'HP LaserJet 78A toner cartridges deliver professional-quality prints with bold text and sharp images.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 1950.00,
    images: [{ url: '/static/placeholder.webp', alt: 'HP 78A Toner', isPrimary: true }]
  },
  {
    sku: 'TOS-MS-110A',
    name: 'HP 110A Black LaserJet Toner Cartridge',
    description: 'HP 110A Black original toner cartridge for HP Laser 100/130 series printers. Yields up to 1,000 pages.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 3200.00,
    images: [{ url: '/static/placeholder.webp', alt: 'HP 110A Toner', isPrimary: true }]
  },
  {
    sku: 'TOS-MS-CAN328',
    name: 'Canon 328 Starter Toner Cartridge',
    description: 'Canon 328 black toner cartridge for Canon imageCLASS MF4410/MF4420/MF4450 multi-function printers.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 1750.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Canon 328 Toner', isPrimary: true }]
  },

  // 2. Computer Accessories (Category: MS - Machines & IT)
  {
    sku: 'TOS-MS-KBD',
    name: 'Dell USB Wired Keyboard KB216',
    description: 'Dell wired keyboard provides a convenient keyboard solution for everyday home or office computing uses.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 550.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Wired Keyboard', isPrimary: true }]
  },
  {
    sku: 'TOS-MS-MSE',
    name: 'Dell Optical Mouse MS116',
    description: 'Dell Optical Mouse features optical LED tracking and wired connectivity providing a stellar performance day after day.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 10,
    price: 299.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Optical Mouse', isPrimary: true }]
  },
  {
    sku: 'TOS-MS-HDS',
    name: 'Logitech H111 Stereo Headset with Mic',
    description: 'Simple way to start talking when using computers, smartphones and tablets. Features a standard 3.5mm audio jack.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 3,
    price: 850.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Logitech Headset', isPrimary: true }]
  },
  {
    sku: 'TOS-MS-HDMI',
    name: 'High-Speed HDMI Cable 3 Meters',
    description: 'Gold-plated connectors, 28 AWG copper conductors, foil-and-braid shielding for high quality transmission.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 250.00,
    images: [{ url: '/static/placeholder.webp', alt: 'HDMI Cable', isPrimary: true }]
  },

  // 3. Paper Products & Custom Printing (Category: PR - Printing)
  {
    sku: 'TOS-PR-A475',
    name: 'JK Copier Paper A4 75 GSM ream',
    description: 'Premium A4 photocopying paper, 75 GSM weight. 500 sheets per pack, standard copier finish.',
    category: 'PR' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 280.00,
    images: [{ url: '/static/placeholder.webp', alt: 'JK Copier Paper 75GSM', isPrimary: true }]
  },
  {
    sku: 'TOS-PR-A480',
    name: 'JK Easy Copier Paper A4 80 GSM ream',
    description: 'Thicker 80 GSM photocopying paper, ideal for double-sided document printing and official letter submissions.',
    category: 'PR' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 310.00,
    images: [{ url: '/static/placeholder.webp', alt: 'JK Copier Paper 80GSM', isPrimary: true }]
  },
  {
    sku: 'TOS-PR-ENV9',
    name: 'White Window Envelope 9x4 Inches',
    description: 'Official white office envelope with transparent address window. High-quality paper stock.',
    category: 'PR' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 450.00,
    images: [{ url: '/static/placeholder.webp', alt: 'White Envelope', isPrimary: true }]
  },
  {
    sku: 'TOS-PR-ENV12',
    name: 'Cloth Lined Green Envelope 12x10 Inches',
    description: 'Thick green ledger/cloth envelope for heavy file dispatches. Spill-safe and tear-resistant.',
    category: 'PR' as const,
    unit: 'BOX' as const,
    moq: 1,
    price: 950.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Cloth Envelope', isPrimary: true }]
  },
  {
    sku: 'TOS-PR-LTR',
    name: 'Custom Corporate Letterhead Printing',
    description: 'Letterheads custom printed with company logo and contact details on 100 GSM premium executive paper.',
    category: 'PR' as const,
    unit: 'SET' as const,
    moq: 1,
    price: 2500.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Letterhead Printing', isPrimary: true }]
  },

  // 4. Files & Folders (Category: ST - Stationery)
  {
    sku: 'TOS-ST-COB',
    name: 'Solo Cobra File Premium Spring Clip',
    description: 'Classic spring-loaded file folders for standard A4 documentation. Holds up to 150 sheets safely.',
    category: 'ST' as const,
    unit: 'PACK' as const,
    moq: 5,
    price: 450.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Solo Cobra File', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-DLX',
    name: 'Lever Arch File Deluxe Board',
    description: 'Thick board lever-arch files with metal edges for premium cataloguing and structural strength.',
    category: 'ST' as const,
    unit: 'PACK' as const,
    moq: 3,
    price: 900.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Lever Arch File', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-ZIP',
    name: 'Clear Mesh Zip Bag A4 Size',
    description: 'Plastic mesh file envelope with zipper closure. Water-resistant, transparent body.',
    category: 'ST' as const,
    unit: 'PACK' as const,
    moq: 5,
    price: 350.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Zip Bag A4', isPrimary: true }]
  },

  // 5. Office Essentials & Adhesives (Category: ST - Stationery)
  {
    sku: 'TOS-ST-GLU',
    name: 'Fevicol Squeeze Glue Bottle 100g',
    description: 'Standard white synthetic adhesive glue bottle. Excellent bonding for wood, paper, and cardboard.',
    category: 'ST' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 480.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Fevicol Glue Bottle', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-GST',
    name: 'Fevistik Super Glue Stick 15g',
    description: 'Easy-to-use solid glue stick. Ideal for envelope sealing and workspace paper crafts.',
    category: 'ST' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 360.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Fevistik Glue Stick', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-STP',
    name: 'Kangaroo Stapler HD-10 with Pin Boxes',
    description: 'Standard metal workspace stapler with 5 boxes of compatible steel pins. Fastens up to 20 sheets.',
    category: 'ST' as const,
    unit: 'BOX' as const,
    moq: 5,
    price: 650.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Kangaroo Stapler', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-STP45',
    name: 'Kangaroo Heavy Duty Stapler DS-45',
    description: 'Large-scale workspace stapler for thick reports. Handles up to 100 pages of copier paper.',
    category: 'ST' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 450.00,
    images: [{ url: '/static/placeholder.webp', alt: 'HD Stapler DS-45', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-PCH',
    name: 'Kangaroo Single Hole Punching Machine',
    description: 'Metal puncher with guide bar for center alignment. Clean punching holes for binder files.',
    category: 'ST' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 120.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Punching Machine', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-STK',
    name: 'Post-it Sticky Notes Yellow 3x3 Inches',
    description: 'Official Post-it sticky notes, bright yellow color. 100 sheets per pad, pack of 3 pads.',
    category: 'ST' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 240.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Post-it Sticky Notes', isPrimary: true }]
  },

  // 6. Pens & Writing (Category: ST - Stationery)
  {
    sku: 'TOS-ST-WBM',
    name: 'Luxor Whiteboard Marker Pen Set',
    description: 'Bright bullet-tip whiteboard markers. Assorted colors (Black, Blue, Red, Green). Pack of 10.',
    category: 'ST' as const,
    unit: 'BOX' as const,
    moq: 3,
    price: 300.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Whiteboard Markers', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-PMN',
    name: 'Luxor Permanent Marker Black',
    description: 'Luxor permanent bullet-tip markers. Waterproof, non-fade ink. Pack of 10.',
    category: 'ST' as const,
    unit: 'BOX' as const,
    moq: 4,
    price: 250.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Permanent Markers', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-GEL',
    name: 'Linc Glycer Gel Pen Blue',
    description: 'Smooth-flowing gel pen with comfortable grip. 0.7mm tip. Box of 50 pens.',
    category: 'ST' as const,
    unit: 'BOX' as const,
    moq: 5,
    price: 250.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Linc Glycer Gel Pen', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-BAL',
    name: 'Reynolds 045 Fine Carbure Ball Pen Blue',
    description: 'Classic office ballpoint pen. High writing length and smudge-free ink. Box of 50 pens.',
    category: 'ST' as const,
    unit: 'BOX' as const,
    moq: 5,
    price: 300.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Reynolds 045 Ball Pen', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-PCL',
    name: 'Apsara Platinum Extra Dark Pencil Box',
    description: 'Premium writing pencils with strong lead and high dark layout. Includes eraser and sharpener. Pack of 10 boxes.',
    category: 'ST' as const,
    unit: 'BOX' as const,
    moq: 10,
    price: 75.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Apsara Pencils', isPrimary: true }]
  },

  // 7. Whiteboards & Boards (Category: ST - Stationery)
  {
    sku: 'TOS-ST-WBD',
    name: 'Non-Magnetic Whiteboard 3x2 Feet',
    description: 'Sturdy whiteboard with anodised aluminium frame and double-sided resin coated sheet.',
    category: 'ST' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 850.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Whiteboard 3x2', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-WBD4',
    name: 'Magnetic Whiteboard 4x3 Feet',
    description: 'Premium magnetic write-on whiteboard. Accepts magnets, easy dry-wipe capability.',
    category: 'ST' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 1850.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Magnetic Whiteboard 4x3', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-DST',
    name: 'Magnetic Whiteboard Duster',
    description: 'Felt-lined whiteboard cleaner with built-in marker slots and magnetic backing.',
    category: 'ST' as const,
    unit: 'PIECE' as const,
    moq: 10,
    price: 65.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Board Duster', isPrimary: true }]
  },

  // 8. Desktop Accessories (Category: ST - Stationery)
  {
    sku: 'TOS-ST-ORG',
    name: 'Multi-Grid Metal Pen and Stationery Stand',
    description: 'Black mesh metal pen stand with divided grids. Holds markers, scissors, and notes cleanly.',
    category: 'ST' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 249.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Pen Stand', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-TRY',
    name: 'Three-Tier Plastic Document Tray A4',
    description: 'Desk tray organizer with three sliding tiers. Holds letters, documents, and copier sheets.',
    category: 'ST' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 450.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Document Tray', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-CLIP',
    name: 'Binder Clips Assorted Size 25mm',
    description: 'Tempered steel binder clips with metal handles. Holds up to 100 pages. Pack of 12 boxes.',
    category: 'ST' as const,
    unit: 'BOX' as const,
    moq: 5,
    price: 150.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Binder Clips', isPrimary: true }]
  },
  {
    sku: 'TOS-ST-CALC',
    name: 'Casio MJ-120D 12-Digit Desktop Calculator',
    description: 'Regular 12-digit commercial desktop calculator. Dual power solar/battery, tax check/correction features.',
    category: 'ST' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 495.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Casio Calculator', isPrimary: true }]
  },

  // 9. Housekeeping Cleaning Chemicals — Taski Diversey (Category: HK - Housekeeping)
  {
    sku: 'TOS-HK-R1',
    name: 'Taski Diversey R1 Bathroom Cleaner 5L',
    description: 'Concentrated bathroom cleaner cum sanitizer. Specially formulated for cleaning and sanitizing all bathroom surfaces (sinks, tubs, tiles, fittings). Leaves a pleasant fragrance.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 1550.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Taski Diversey R1', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-R2',
    name: 'Taski Diversey R2 Hard Surface Cleaner 5L',
    description: 'Highly concentrated, hygienic hard surface cleaner and sanitizer. Removes oil, grease, and tough workspace dirt from floors, walls, tables, and cabinets.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 1450.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Taski Diversey R2', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-R3',
    name: 'Taski Diversey R3 Glass Cleaner 5L',
    description: 'Concentrated glass and mirror cleaner. Easily removes fingerprints, dust, and grime, leaving window panes sparkling and streak-free.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 1350.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Taski Diversey R3', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-R4',
    name: 'Taski Diversey R4 Furniture Polish 5L',
    description: 'Ready-to-use furniture cleaner and polish. Restores, enhances, and protects wooden desks, doors, and panelings. Provides a high-gloss premium look.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 1650.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Taski Diversey R4', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-R5',
    name: 'Taski Diversey R5 Air Freshener 5L',
    description: 'Deodorizer and air freshener concentrate. Neutralizes foul odors and leaves a refreshing, long-lasting aroma in office lobbies, cabins, and washrooms.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 1250.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Taski Diversey R5', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-R6',
    name: 'Taski Diversey R6 Toilet Bowl Cleaner 5L',
    description: 'Thick heavy-duty acidic toilet bowl cleaner. Removes stubborn lime scale, organic stains, and bacteria, ensuring high hygiene standards.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 1150.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Taski Diversey R6', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-R9',
    name: 'Taski Diversey R9 Bathroom Descaler 5L',
    description: 'Concentrated bathroom tile and fixture descaler. Removes heavy lime scale, water stains, and mineral deposits from taps and tiles.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 1750.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Taski Diversey R9', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-R20',
    name: 'Taski Diversey R20 Floor Stripper 5L',
    description: 'Heavy-duty industrial floor stripper. Emulsifies old wax coatings and heavy soil build-up to prepare floors for polishing.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 1,
    price: 2200.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Taski Diversey R20', isPrimary: true }]
  },

  // 10. Housekeeping Cleaning Chemicals — Refreshing (Category: HK - Housekeeping)
  {
    sku: 'TOS-HK-REF-CHEM-B',
    name: 'Refreshing Housekeeping Floor Cleaner - Blue',
    description: 'Multi-surface disinfectant floor cleaner concentrate. Infused with fresh ocean breeze fragrance. Safe on marble, granite, and tiles.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 4,
    price: 380.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Floor Cleaner Blue', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-REF-CHEM-P',
    name: 'Refreshing Housekeeping Floor Cleaner - Pink',
    description: 'Delicately scented floral disinfectant liquid. Multi-purpose surface sanitizer for lobbies and desks.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 4,
    price: 380.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Floor Cleaner Pink', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-REF-CHEM-G',
    name: 'Refreshing Housekeeping Floor Cleaner - Green',
    description: 'Pine-scented commercial-grade floor wash and disinfectant. High-foaming deep cleaner.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 4,
    price: 380.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Floor Cleaner Green', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-REF-CHEM-Y',
    name: 'Refreshing Housekeeping Floor Cleaner - Yellow',
    description: 'Citrus lemon disinfectant liquid for corridors and high-traffic areas. Leaves a long-lasting zesty aroma.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 4,
    price: 380.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Floor Cleaner Yellow', isPrimary: true }]
  },

  // 11. Steel Scrub Set & Sponge Scrubbers (Category: HK - Housekeeping)
  {
    sku: 'TOS-HK-SCRUB-SS-4',
    name: '4-Steel Scrubber Cleaning Set',
    description: 'Pack of 4 stainless steel heavy-duty scrubbers. Ideal for removing tough stains and rust from kitchen utensils and grills.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 45.00,
    images: [{ url: '/static/placeholder.webp', alt: '4 Steel Scrubbers', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-SCRUB-SS-6',
    name: '6-Steel Scrubber Cleaning Set',
    description: 'Pack of 6 rust-resistant steel scrubbers for facilities and kitchen cleanup.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 65.00,
    images: [{ url: '/static/placeholder.webp', alt: '6 Steel Scrubbers', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-SCRUB-SS-12',
    name: '12-Steel Scrubber Cleaning Set',
    description: 'Value pack of 12 premium grade stainless steel wire scrubbers.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 5,
    price: 120.00,
    images: [{ url: '/static/placeholder.webp', alt: '12 Steel Scrubbers', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-SCRUB-SPG-4',
    name: '4-Sponge Scrubber Pack',
    description: 'Pack of 4 dual-action scrub sponges. Features a green abrasive pad for scrubbing and a soft yellow cellulose sponge.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 35.00,
    images: [{ url: '/static/placeholder.webp', alt: '4 Sponge Scrubbers', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-SCRUB-SPG-6',
    name: '6-Sponge Scrubber Pack',
    description: 'Pack of 6 kitchen and surface cleaning sponge scrubs.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 50.00,
    images: [{ url: '/static/placeholder.webp', alt: '6 Sponge Scrubbers', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-SCRUB-SPG-12',
    name: '12-Sponge Scrubber Pack',
    description: 'Bulk pack of 12 kitchen dual-sided scouring scrub sponges.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 5,
    price: 95.00,
    images: [{ url: '/static/placeholder.webp', alt: '12 Sponge Scrubbers', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-SCRUB-SPG-SP-4',
    name: '4-Scrubber with Sponge Set',
    description: 'Pack of 4 large sponge scrubbers with easy-grip design, protecting nails during hard cleaning.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 55.00,
    images: [{ url: '/static/placeholder.webp', alt: '4 Easy Grip Sponges', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-SCRUB-SPG-SP-6',
    name: '6-Scrubber with Sponge Set',
    description: 'Pack of 6 contoured handhold sponge scrubbers.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 75.00,
    images: [{ url: '/static/placeholder.webp', alt: '6 Easy Grip Sponges', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-SCRUB-SPG-SP-12',
    name: '12-Scrubber with Sponge Set',
    description: 'Value pack of 12 contoured easy-grip cleaning sponges.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 5,
    price: 140.00,
    images: [{ url: '/static/placeholder.webp', alt: '12 Easy Grip Sponges', isPrimary: true }]
  },

  // 12. Rose Products — Fresheners & Washroom Sanitizers (Category: HK - Housekeeping)
  {
    sku: 'TOS-HK-ROSE-TFR',
    name: 'Rose Toilet Freshener Block',
    description: 'Hanging rim toilet blocks that release a fresh rose scent with every flush. Cleans and prevents scale build-up.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 10,
    price: 180.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Toilet Block Rose', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ROSE-TDD',
    name: 'Rose Toilet Deodoriser Spray',
    description: 'Instant air freshener and deodoriser. Neutralizes washroom odors quickly and leaves a premium rose aroma.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 120.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Rose Spray', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ROSE-URS',
    name: 'Rose Scented Urinal Screen',
    description: 'Anti-splash urinal screen with long-lasting rose fragrance. Keeps drains clear and eliminates odors.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 350.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Urinal Screen Rose', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ROSE-DFB',
    name: 'Disinfectant Urinal Balls',
    description: 'Slow-dissolving disinfectant balls for urinal bowls. Prevents odor and keeps pipelines clean.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 5,
    price: 280.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Disinfectant Balls', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ROSE-NPB',
    name: 'Pure Naphthalene Balls',
    description: 'White naphthalene mothballs for washroom closets and sinks. Keeps pests and mildew away.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 5,
    price: 220.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Naphthalene Balls', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ROSE-AFP',
    name: 'Air Freshener Pouch Rose',
    description: 'Hanging gel air freshener pouch. Continuous fragrance release for washrooms and cabins. Lasts up to 30 days.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 180.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Rose Pouch', isPrimary: true }]
  },

  // 13. Aerosol Dispensers (Category: WF - Washroom)
  {
    sku: 'TOS-WF-AER-MAN',
    name: 'Manual Aerosol Dispenser',
    description: 'Wall-mountable manual push air freshener dispenser. Sturdy plastic construction.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 450.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Manual Aerosol', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-AER-AUT',
    name: 'Automatic Aerosol Dispenser',
    description: 'Timed automatic air freshener dispenser. Features adjustable interval settings (7.5, 15, or 30 minutes).',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 890.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Automatic Aerosol', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-AER-LCD',
    name: 'LCD Programmable Aerosol Dispenser',
    description: 'Premium programmable dispenser with LCD screen. Allows customized hours of operation and spray intervals.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 1250.00,
    images: [{ url: '/static/placeholder.webp', alt: 'LCD Aerosol', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-AER-CAN',
    name: 'Aerosol Refill Can 250ml',
    description: 'Standard size air freshener refill can. Compatible with auto and LCD dispensers. Choice of floral/citrus scents.',
    category: 'WF' as const,
    unit: 'BOX' as const,
    moq: 6,
    price: 950.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Aerosol Refill', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-AER-SNS',
    name: 'Sensit Air Freshener Spray',
    description: 'Dry aerosol air spray. Instantly cuts through smells and dampness. Safe for office rooms.',
    category: 'WF' as const,
    unit: 'BOX' as const,
    moq: 4,
    price: 680.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Sensit Spray', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-AER-PCH',
    name: 'Pouch Dispenser Unit',
    description: 'Wall mount cover casing for hanging gel air freshener pouches. Anti-theft locking design.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 250.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Pouch Casing', isPrimary: true }]
  },

  // 14. Soap & Hand Sanitizer Dispensers (Category: WF - Washroom)
  {
    sku: 'TOS-WF-SOAP-MAN',
    name: 'Manual Liquid Soap Dispenser 1L',
    description: 'Classic wall-mounted manual soap dispenser with clear viewing window to monitor soap level.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 380.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Manual Soap Dispenser', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-SOAP-SS',
    name: 'Stainless Steel Soap Dispenser',
    description: 'Heavy-duty wall-mounted soap dispenser made of polished stainless steel. Vandal-resistant locking cap.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 750.00,
    images: [{ url: '/static/placeholder.webp', alt: 'SS Soap Dispenser', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-SOAP-CFD',
    name: 'C-Fold Paper Dispenser',
    description: 'Sturdy wall-mounted paper towel dispenser for standard C-Fold tissues. Front level indicator.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 850.00,
    images: [{ url: '/static/placeholder.webp', alt: 'C-Fold Dispenser', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-SOAP-MFD',
    name: 'Multifold Paper Tissue Dispenser',
    description: 'Sleek ABS plastic dispenser for multifold paper towels. Dispenses single sheets to reduce waste.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 920.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Multifold Dispenser', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-SOAP-AUT',
    name: 'Touchless Automatic Soap Dispenser',
    description: 'Battery-operated automatic sensor soap dispenser. Promotes hands-free hygiene in corporate washrooms.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 1450.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Auto Soap Dispenser', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-SOAP-JRT',
    name: 'Jumbo Roll Tissue Dispenser',
    description: 'High-capacity dispenser for jumbo roll toilet papers. Ideal for public/commercial washrooms.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 1100.00,
    images: [{ url: '/static/placeholder.webp', alt: 'JRT Dispenser', isPrimary: true }]
  },

  // 15. Garbage Bags & Accessories (Category: HK - Housekeeping)
  {
    sku: 'TOS-HK-ACC-GB',
    name: 'Garbage Bags Heavy-Duty 75x95 cm',
    description: 'Large black bio-degradable garbage bags. Durable, leak-resistant, and high load capacity. Pack of 50 bags.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 280.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Garbage Bags 75x95', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ACC-SPG',
    name: 'Abrasive Sponge Scrubber (Green)',
    description: 'Heavy-duty green scrub pads. Perfect for removing grease and stubborn surface dirt. Pack of 10.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 120.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Abrasive Sponge Green', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ACC-CLT',
    name: 'Microfiber Cloth Duster',
    description: 'Premium microfiber cleaning cloths. Ultra-absorbent, lint-free, and scratch-free. Assorted colors. Pack of 5.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 5,
    price: 299.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Microfiber Cloth', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ACC-DRN',
    name: 'Drain Cleaner Powder',
    description: 'Powerful chemical drain opener. Instantly dissolves hair, grease, soap, and organic clogs in sinks.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 150.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Drain Cleaner', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ACC-MET',
    name: 'Metallic Wire Scrubber Pack',
    description: 'Heavy metal wire scrub pads for tough floor or pipe scrub requirements. Pack of 10.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 5,
    price: 180.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Metallic Scrubber', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ACC-WRM',
    name: 'Wringing Cotton Mop with Stick',
    description: 'Easy-wring cotton mop. Features a simple twist action handle to wring out excess water without dirtying hands.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 350.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Wringing Cotton Mop', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ACC-PKT',
    name: 'Air Pocket Freshener Gel',
    description: 'Individually packed hanging gel pocket deodorizers. Long lasting freshness. Box of 12.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 3,
    price: 540.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Air Pocket Gel', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ACC-MAT',
    name: 'Rubber Welcome Floor Mats',
    description: 'Heavy-duty entrance floor mats with scrape pattern. Traps dust and moisture. Size: 60x40 cm.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 250.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Rubber Mat', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ACC-WIP',
    name: 'Cut Blade Glass Wiper',
    description: 'Precision cut blade squeegee for mirrors and windows. Ergonomic handle.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 10,
    price: 99.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Cut Blade Wiper', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ACC-MOP',
    name: 'Cotton Mop Head Refill',
    description: 'Replacement cotton mop heads. High absorbency yarn for floor cleaning. Pack of 3.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 240.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Mop Head Refill', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ACC-DBN',
    name: 'Office Room Plastic Dustbin',
    description: 'Open-top small plastic dustbin for offices and desks. Capacity: 10L.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 10,
    price: 120.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Office Dustbin', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-ACC-EXT',
    name: 'Fire Extinguisher ABC Powder 2kg',
    description: 'ABC dry powder fire extinguisher. Wall mountable, ready-to-use with pressure gauge for safety compliance.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 1450.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Fire Extinguisher 2kg', isPrimary: true }]
  },

  // 16. Tissue Products (Category: WF - Washroom)
  {
    sku: 'TOS-WF-TIS-MFD',
    name: 'M-Fold Paper Tissue (2-Ply)',
    description: 'Premium soft absorbent M-fold paper towels. Dispensed one at a time. Pack of 20 bundles (125 sheets each).',
    category: 'WF' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 1150.00,
    images: [{ url: '/static/placeholder.webp', alt: 'M-Fold Tissues', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-TIS-HRT',
    name: 'HRT Roll Paper Tissue (Auto-Cut)',
    description: 'High Roll Hand Towel rolls. Strong when wet, excellent absorbency. Box of 6 large rolls.',
    category: 'WF' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 1650.00,
    images: [{ url: '/static/placeholder.webp', alt: 'HRT Paper Tissue', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-TIS-TR2',
    name: 'Toilet Paper Roll 2-Ply Soft',
    description: 'Premium quality toilet rolls, 2-ply soft paper. Individually wrapped. Pack of 48 rolls.',
    category: 'WF' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 1350.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Toilet Paper Roll 2Ply', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-TIS-T100',
    name: 'Toilet Paper Roll 100 Gms',
    description: 'Standard hotel grade 100-gram toilet rolls. High sheet count. Pack of 100 rolls.',
    category: 'WF' as const,
    unit: 'BOX' as const,
    moq: 1,
    price: 1950.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Toilet Roll 100g', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-TIS-POP',
    name: 'Pop-Up Paper Face Tissue',
    description: 'Soft pop-up facial tissues in cardboard box. Multi-purpose use. Pack of 10 boxes.',
    category: 'WF' as const,
    unit: 'PACK' as const,
    moq: 5,
    price: 480.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Pop-Up Face Tissue', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-TIS-KIT',
    name: 'Kitchen Towel Paper Rolls',
    description: 'Super absorbent kitchen/utility paper rolls. Embossed pattern for wiping oils. Pack of 12 rolls.',
    category: 'WF' as const,
    unit: 'PACK' as const,
    moq: 5,
    price: 550.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Kitchen Paper Rolls', isPrimary: true }]
  },

  // 17. Tissue Dispensers (Category: WF - Washroom)
  {
    sku: 'TOS-WF-DISP-TPR',
    name: 'Toilet Paper Roll Dispenser',
    description: 'Wall mount locking toilet roll cover dispenser. Durable ABS plastic.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 380.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Toilet Roll Dispenser', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-DISP-HRT',
    name: 'HRT Roll Paper Dispenser',
    description: 'Heavy duty auto-cut paper towel dispenser for high roll hand towels (HRT).',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 1850.00,
    images: [{ url: '/static/placeholder.webp', alt: 'HRT Dispenser', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-DISP-MFD',
    name: 'M-Fold Tissue Dispenser ABS',
    description: 'Standard size ABS plastic dispenser for multi-fold tissues. Sleek white finish.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 650.00,
    images: [{ url: '/static/placeholder.webp', alt: 'M-Fold ABS Dispenser', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-DISP-POP',
    name: 'Pop-Up Tissue Caddy Dispenser',
    description: 'Tabletop clear acrylic pop-up tissue holder for conference tables and office desks.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 290.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Pop-Up Caddy', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-DISP-TL',
    name: 'T-Light Paper Dispenser',
    description: 'Ultra-slim wall mount paper hand towel dispenser. Ideal for tight spaces.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 450.00,
    images: [{ url: '/static/placeholder.webp', alt: 'T-Light Dispenser', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-DISP-PRT',
    name: 'PR Toilet Paper Dispenser',
    description: 'Double roll commercial toilet paper dispenser with locking cover key.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 680.00,
    images: [{ url: '/static/placeholder.webp', alt: 'PR Toilet Dispenser', isPrimary: true }]
  },

  // 18. Hand Dryers (Category: WF - Washroom)
  {
    sku: 'TOS-WF-DRY-PLA',
    name: 'ABS Plastic Hand Dryer 1200W',
    description: 'Automatic plastic body hand dryer. Dries hands in 20-25 seconds. Budget friendly option.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 2100.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Plastic Hand Dryer', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-DRY-SS',
    name: 'Stainless Steel Hand Dryer 1500W',
    description: 'Polished stainless steel automatic hand dryer. Modern curved design, highly durable.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 4800.00,
    images: [{ url: '/static/placeholder.webp', alt: 'SS Hand Dryer', isPrimary: true }]
  },
  {
    sku: 'TOS-WF-DRY-HDY',
    name: 'Heavy Duty High Speed Hand Dryer',
    description: 'High-velocity air jet hand dryer. Dries hands in under 10 seconds. Ultra energy-efficient.',
    category: 'WF' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 8500.00,
    images: [{ url: '/static/placeholder.webp', alt: 'High Speed Hand Dryer', isPrimary: true }]
  },

  // 19. Shoe Polish & Machinery (Category: MS - Machines & IT)
  {
    sku: 'TOS-MS-SHOE-SHN',
    name: 'Automatic Shoe Shiner Machine',
    description: 'Floor standing electric shoe polish machine with infrared auto-sensor and dual polishing brushes.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 9500.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Auto Shoe Shiner', isPrimary: true }]
  },
  {
    sku: 'TOS-MS-SHOE-LIQ',
    name: 'Shoe Polish Machine Liquid 1L',
    description: 'Premium neutral liquid shoe wax refill for automatic shoe shining machines.',
    category: 'MS' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 450.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Shoe Polish Liquid', isPrimary: true }]
  },
  {
    sku: 'TOS-MS-SHOE-COV',
    name: 'Disposable Plastic Shoe Covers',
    description: 'Blue elastic disposable shoe covers for cleanroom and site maintenance. Pack of 100.',
    category: 'MS' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 150.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Shoe Covers Pack', isPrimary: true }]
  },

  // 20. Cleaning Machinery (Category: MS - Machines & IT)
  {
    sku: 'TOS-MS-VAC-DRY',
    name: 'Wet & Dry Vacuum Cleaner 30L',
    description: 'Industrial wet and dry vacuum cleaner with a 30L stainless steel drum. Includes complete nozzles and hoses.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 9800.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Wet & Dry Vacuum 30L', isPrimary: true }]
  },
  {
    sku: 'TOS-MS-VAC-IND',
    name: 'Heavy Duty Wet & Dry Vacuum 60L',
    description: 'Dual motor commercial vacuum cleaner. High suction power for industrial facility cleanup.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 16500.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Heavy Duty Vacuum 60L', isPrimary: true }]
  },
  {
    sku: 'TOS-MS-SCR-HYD',
    name: 'Hydraulic Floor Scrubber Buffer',
    description: 'Walk-behind electrical floor scrubbing and polishing machine. Restores marble/granite gloss.',
    category: 'MS' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 38000.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Floor Scrubber Buffer', isPrimary: true }]
  },

  // 21. Dustbin Plastic & Steel (Category: HK - Housekeeping)
  {
    sku: 'TOS-HK-QMAN',
    name: 'Stainless Steel Q-Manager Post',
    description: 'Queue manager queue post with 2-meter red retractable ribbon band. Heavy weighted base.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 4,
    price: 1450.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Q-Manager Post', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-SIGN-WET',
    name: 'A-Frame Wet Floor Caution Sign',
    description: 'Bright yellow double-sided plastic folding A-frame warning sign. Highly visible lettering.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 299.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Caution Wet Floor Sign', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-MOP-BUF',
    name: 'Buffing Floor Mop Head',
    description: 'Polyester floor polishing buffing pad. Compatible with scrubber machines. Pack of 5.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 2,
    price: 1200.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Buffing Mop Head', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-DPAN-PL',
    name: 'Heavy Duty Plastic Dustpan',
    description: 'Industrial plastic dustpan with comfortable hand grip and rubber contact lip.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 10,
    price: 95.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Plastic Dustpan', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-SEAT-BND',
    name: 'Sanitized Toilet Seat Band',
    description: 'Paper toilet bands for sanitary compliance in hospitality/office bathrooms. Pack of 1000.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 1,
    price: 480.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Toilet Seat Band', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-BCKT-MET',
    name: 'Galvanized Metallic Bucket 15L',
    description: 'Sturdy zinc-galvanized iron utility bucket. Rust-resistant, leakproof.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 320.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Metallic Bucket', isPrimary: true }]
  },

  // 22. Squeegees (Category: HK - Housekeeping)
  {
    sku: 'TOS-HK-SQG-IRON',
    name: 'Heavy Iron Floor Squeegee Wiper',
    description: 'Zinc-plated iron squeegee with thick double rubber wiper strip. Size: 24 inch.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 380.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Iron Floor Squeegee', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-SQG-FLR',
    name: 'ABS Floor Squeegee Wiper',
    description: 'Lightweight high-durability plastic floor squeegee wiper. Size: 18 inch.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 10,
    price: 240.00,
    images: [{ url: '/static/placeholder.webp', alt: 'ABS Floor Wiper', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-SQG-GLS',
    name: 'Dry Glass Squeegee Cleaner',
    description: 'Ergonomic window glass cleaning wiper. Streak-free rubber blade. Size: 12 inch.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 10,
    price: 120.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Glass Squeegee Wiper', isPrimary: true }]
  },

  // 23. Trolleys & Buckets (Category: HK - Housekeeping)
  {
    sku: 'TOS-HK-TLY-MOP1',
    name: 'Single Bucket Mop Wringer Trolley',
    description: 'Compact 20L cleaning wringer trolley with pressure squeezer. Easy rolling castor wheels.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 2400.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Single Bucket Trolley', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-TLY-MOP3',
    name: 'Triple Bucket Commercial Trolley',
    description: 'Large triple compartment janitorial bucket wringer trolley for commercial plazas.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 6800.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Triple Bucket Trolley', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-TLY-LBY',
    name: 'Lobby Dustpan with Long Broom',
    description: 'Self-closing lobby dustpan with tall upright handle broom. Sweep without bending.',
    category: 'HK' as const,
    unit: 'SET' as const,
    moq: 2,
    price: 850.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Lobby Dustpan Set', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-TLY-JAN',
    name: 'Janitorial Housekeeping Trolley',
    description: 'Large three-shelf cleaning trolley with vinyl bag holder for towels and chemical bottles.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 7200.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Janitorial Trolley', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-TLY-WST',
    name: 'Waist Bag Housekeeping Trolley',
    description: 'Compact canvas waste-collecting cart with durable steel framing.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 1,
    price: 3200.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Waist Bag Trolley', isPrimary: true }]
  },

  // 24. Poles & Mops (Category: HK - Housekeeping)
  {
    sku: 'TOS-HK-POLE-TEL',
    name: 'Telescopic Extension Pole 4m',
    description: 'Extendable aluminum pole for high-reach glass cleaning and ceiling dusting. Reaches up to 4 meters.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 1250.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Telescopic Pole 4m', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-MOP-MF',
    name: 'Microfiber Floor Flat Mop',
    description: 'Flat cleaning mop with reusable microfiber scrubbing pad. Removes dust electrostatically.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 590.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Microfiber Flat Mop', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-MOP-LNG',
    name: 'Long Handle Round Cotton Mop',
    description: 'Heavy duty looped-end cotton mop with tall composite handle. High water absorption.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 420.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Long Handle Cotton Mop', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-MOP-CTN',
    name: 'Looped-End Cotton Mop Refill',
    description: 'Refill looped-end cotton yarn head for standard round floor mops.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 150.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Cotton Mop Refill', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-MOP-WD',
    name: 'Wet & Dry Flat Microfiber Mop',
    description: 'Dual-function flat mop system. Ideal for both dry sweep dusting and wet surface washing.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 680.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Wet & Dry Microfiber Mop', isPrimary: true }]
  },

  // 25. Floor Wipers & Brushes (Category: HK - Housekeeping)
  {
    sku: 'TOS-HK-WIP-DMOP',
    name: 'Dust Mop Floor Wiper 36"',
    description: 'Extra-wide dust sweeping floor mop with cotton fringe. Ideal for large warehouse or lobby floor areas.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 2,
    price: 1100.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Dust Mop Floor Wiper', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-WIP-DMREF',
    name: 'Dust Mop Fringe Refill 36"',
    description: 'Replacement heavy cotton dust mop fringe pad. Fits standard 36-inch frames.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 5,
    price: 350.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Dust Mop Refill', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-WIP-TOI',
    name: 'Toilet Cleaning Brush with Holder',
    description: 'Durable plastic toilet brush with stiff bristles and convenient vertical holder stand.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 10,
    price: 85.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Toilet Brush with Stand', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-WIP-NYL',
    name: 'Nylon Cleaning Hand Brush',
    description: 'Stiff nylon bristles on ergonomic plastic block for carpet or surface stain scrubbing.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 10,
    price: 75.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Nylon Hand Brush', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-WIP-URN',
    name: 'Urinal Screen Cleaning Brush',
    description: 'Specially curved brush designed for cleaning under urinal rims and deep drain areas.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 10,
    price: 65.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Urinal Brush', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-WIP-DPB',
    name: 'Dustpan with Hand Brush Set',
    description: 'Mini hand brush and dustpan set. Ideal for quick dry spills and table dust.',
    category: 'HK' as const,
    unit: 'SET' as const,
    moq: 5,
    price: 140.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Dustpan Brush Set', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-WIP-BRM',
    name: 'Nylon Floor Sweep Broom',
    description: 'Soft nylon bristles floor sweeping broom with heavy duty metal handle rod.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 220.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Nylon Sweep Broom', isPrimary: true }]
  },

  // 26. Glass Cleaning Tools (Category: HK - Housekeeping)
  {
    sku: 'TOS-HK-GLS-WSH',
    name: 'Professional Window Washer 14"',
    description: 'Microfiber sleeve window washer. Excellent water retention for cleaning glass facades.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 420.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Window Washer 14 Inch', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-GLS-SQG',
    name: 'Professional Window Squeegee 14"',
    description: 'Stainless steel window squeegee with soft streak-free rubber blade. For spotless window glass.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 480.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Window Squeegee 14 Inch', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-GLS-CLN',
    name: 'Glass Cleaner Liquid Refill 5L',
    description: 'Concentrated commercial window glass cleaning solution. Cuts grease and grime without leaving residues.',
    category: 'HK' as const,
    unit: 'BOX' as const,
    moq: 2,
    price: 650.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Glass Cleaner 5L', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-GLS-REF',
    name: 'Microfiber Washer Sleeve Refill 14"',
    description: 'Replacement synthetic microfiber sleeve for 14-inch window washers.',
    category: 'HK' as const,
    unit: 'PACK' as const,
    moq: 10,
    price: 180.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Window Washer Sleeve Refill', isPrimary: true }]
  },

  // 27. Brushes & Dative (Category: HK - Housekeeping)
  {
    sku: 'TOS-HK-BRSH-FLR',
    name: 'Heavy Duty Floor Scrubbing Brush',
    description: 'Hard plastic bristles floor scrubbing head with metal screw handle connector.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 10,
    price: 180.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Floor Scrubbing Brush', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-BRSH-SHOE',
    name: 'Wooden Handle Shoe Brush',
    description: 'Genuine horsehair bristles shoe shining brush with polished wood handle. Premium quality.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 120.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Wooden Shoe Brush', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-BRSH-NAIL',
    name: 'Double Sided Nail Cleaning Brush',
    description: 'Sturdy plastic nail brush for cleaning hands and fingernails in facility washing zones.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 10,
    price: 45.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Double Nail Brush', isPrimary: true }]
  },
  {
    sku: 'TOS-HK-BRSH-WIRE',
    name: 'Iron Wire Heavy Scrub Brush',
    description: 'Carbon steel wire brush for heavy scale and rust removal from metal surfaces.',
    category: 'HK' as const,
    unit: 'PIECE' as const,
    moq: 5,
    price: 95.00,
    images: [{ url: '/static/placeholder.webp', alt: 'Iron Wire Brush', isPrimary: true }]
  }
];

async function main() {
  console.log('Starting seed operations...');
  
  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        name: product.name,
        description: product.description,
        category: product.category,
        unit: product.unit,
        moq: product.moq,
        price: product.price,
        images: product.images
      },
      create: product
    });
  }

  console.log(`Seeded database successfully with ${PRODUCTS.length} Tulsi Office Solution catalog items!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
