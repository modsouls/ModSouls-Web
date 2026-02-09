# How To Add New Products

This project includes a script that automatically:
- Renames images in a new product folder to `FolderName_1.ext` ... `FolderName_n.ext`
- Adds the product to `src/data/products.js`

## 1. Add Your Images

Place a new folder in one of these locations:
- `public/images/Oversized Tshirts/<Folder Name>/`
- `public/images/Hoodie/<Folder Name>/`

Put all images directly inside the folder (no nested subfolders).

Example:
```
public/images/Oversized Tshirts/Sukuna/
  Sukuna_sketch.png
  Sukuna_back.png
```

## 2. (Recommended) Add product.json

Create `product.json` inside the same folder to set correct metadata:

```json
{
  "name": "Product Display Name",
  "tag": "Anime",
  "featured": false,
  "price": 599,
  "mrp": 699,
  "sizes": ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  "series": "On The Go Series"
}
```

Notes:
- `tag` is used for search and category matching.
- `series` should be `On The Go Series` (tees) or `On The Hood Series` (hoodies).
- If you skip `product.json`, the folder name is used as `name` and `tag`.

## 3. Run the Script

```bash
node scripts/add-new-products.cjs
```

The script will:
- Rename images to `FolderName_1.ext` etc.
- Add any missing product entries to `src/data/products.js`

## 4. Verify

Run the app and check the Shop page:
```bash
npm run dev
```

If anything looks off, edit the product entry in `src/data/products.js` and rerun.
