# How to Add New Products from Folders

When you add a **new folder** of images inside `public/images/Hoodie` or `public/images/Oversized Tshirts`, you can add it as a product on the website by running the **add-new-products** script.

---

## Steps (always the same)

### 1. Add your image folder

- For **hoodies**: add a new folder under `public/images/Hoodie/`, e.g.  
  `public/images/Hoodie/New Design/`
- For **t-shirts**: add a new folder under `public/images/Oversized Tshirts/`, e.g.  
  `public/images/Oversized Tshirts/New Design/`

Put at least one image (`.jpg`, `.jpeg`, `.png`, or `.webp`) in the folder. You can use subfolders (e.g. `post/`); all images will be included.

**Use the exact folder name** you want (including spaces and capitals). The script uses it for the product name and URL slug.

### 2. Run the script

From the project root:

```bash
npm run add-new-products
```

- If there are **new folders** that don’t have a product yet, the script adds one product per folder and prints what it added.
- If **nothing is new**, it prints:  
  `No new folders to add. All product folders already have entries.`

### 3. Check the site

- Run the app: `npm run dev`
- Open **Shop** and confirm the new product(s) appear and images load.
- Optionally run a build to be sure nothing breaks:

```bash
npm run build
```

---

## What the script does (safe, repeatable)

- **Reads** `src/data/products.js`.
- **Finds** which folders already have a product (by matching image paths).
- **Scans** `public/images/Hoodie` and `public/images/Oversized Tshirts` for folders.
- **Adds** one new product per folder that doesn’t have an entry yet.
- **Does not** remove or change existing products.
- **Does not** touch folder names or image files.

You can run it every time you add new folders; it only adds missing ones.

---

## New product defaults

| Field    | Source |
|----------|--------|
| **Name** | Folder name (e.g. `New Design`) |
| **ID**   | `hoodie-<slug>` or `tee-<slug>` (slug from folder name) |
| **Tag**  | Folder name (you can edit later in `products.js`) |
| **Series** | Hoodie: "On The Hood Series" / Tee: "On The Go Series" |
| **Price** | Hoodie: ₹1099 (MRP ₹1399) / Tee: ₹599 (MRP ₹699) |
| **Sizes** | XS, S, M, L, XL, XXL, XXXL |
| **Images** | All images in the folder (and subfolders), in file order |

To change name, tag, price, or featured after running the script, edit `src/data/products.js` for that product.

---

## If something goes wrong

1. **Script says it can’t find the products array**  
   - Don’t remove or rename `export const brandInfo` in `src/data/products.js`.  
   - If you edited the end of the file, restore the structure:  
     `];` then a blank line then `export const brandInfo`.

2. **New product doesn’t show or images don’t load**  
   - Confirm the folder is directly under `Hoodie` or `Oversized Tshirts` (not in a subfolder of a subfolder).  
   - Confirm there is at least one image with extension `.jpg`, `.jpeg`, `.png`, or `.webp`.  
   - Paths are case-sensitive; folder name in the filesystem must match what you expect.

3. **Build fails after adding products**  
   - Open `src/data/products.js` and check the last product entry for missing commas or quotes.  
   - Fix any syntax error and run `npm run add-new-products` again only if you added another new folder; otherwise just fix the file and run `npm run build`.

---

## Quick reference

| Task              | Command                  |
|-------------------|--------------------------|
| Add new products  | `npm run add-new-products` |
| Run site          | `npm run dev`            |
| Production build  | `npm run build`          |
