# How to Add New Products

## Quick Method (Automatic)

### Step 1: Create Product Folder
Add a new folder in the appropriate directory:
- **T-Shirts**: `public/images/Oversized Tshirts/[Product Name]/`
- **Hoodies**: `public/images/Premium Hoodies/[Product Name]/`

### Step 2: Add Images
Place product images in the folder:
- `image1.jpg` (main image)
- `image2.jpg` (optional)
- `image3.jpg` (optional)
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

### Step 3: Add product.json (Optional)
Create `product.json` in the folder to customize:
```json
{
  "name": "Custom Product Name",
  "tag": "Anime",
  "featured": true,
  "price": 599,
  "mrp": 699,
  "stock": true,
  "discount": 15
}
```

If no `product.json` exists, defaults are used and tag is auto-detected.

### Step 4: Validate & Generate
Run the command:
```bash
npm run products
```

Or separately:
```bash
npm run validate-products  # Check for issues
npm run generate-products  # Generate products.js
```

---

## Example Structure

```
public/images/
├── Oversized Tshirts/
│   ├── Naruto Uzumaki/
│   │   ├── product.json
│   │   ├── front.jpg
│   │   ├── back.jpg
│   │   └── detail.jpg
│   └── Spiderman/
│       ├── image1.jpg
│       └── image2.jpg
└── Premium Hoodies/
    └── Sukuna JJK/
        ├── product.json
        └── main.jpg
```

---

## Default Values

### T-Shirts
- Price: ₹599
- MRP: ₹699
- Sizes: S, M, L, XL, XXL
- Series: "On The Go Series"

### Hoodies
- Price: ₹1099
- MRP: ₹1399
- Sizes: S, M, L, XL, XXL
- Series: "On The Hood Series"

---

## Tips

1. **Folder Name**: Use clear, descriptive names (becomes product ID)
2. **Image Order**: Images are sorted alphabetically
3. **Featured Products**: Set `"featured": true` in product.json
4. **Auto-Tags**: Tags are auto-detected from product names (Anime, Marvel, etc.)
5. **Validation**: Run `npm run validate-products` to check for issues
6. **Stock Management**: Set `"stock": false` to mark as out of stock
7. **Custom Pricing**: Override default prices in product.json

---

## Advanced Features

### Auto-Tag Detection
Products are automatically tagged based on keywords:
- **Anime**: naruto, sasuke, jjk, one piece, etc.
- **Marvel**: spiderman, avengers, iron man
- **Harry Potter**: potter, slytherin, hogwarts
- **Movies**: tmkoc, family man
- **Quotes**: akarshan, dhurandar

### Validation Checks
- Missing images
- Invalid JSON
- Naming issues
- Minimum 2 images recommended

### Bulk Operations
```bash
# Add 10 new products, then:
npm run products  # Validates + Generates
```
