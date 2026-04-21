# 🌾 Zayeliac Finds

A curated directory of gluten-free food products available in the UK.

## Features

- **Search** - Find products by name, brand, or description
- **Filter by category** - Bread, Bakery, Pasta, Snacks, Sweets, Breakfast, Ready Meals, Baking
- **Niche Finds** - Highlighted hard-to-find products
- **Stockist info** - See where to buy each product
- **Responsive** - Works on mobile, tablet, and desktop

## Live Site

Visit: [https://onsmirnov.gitlab.io/zayeliac-finds](https://onsmirnov.gitlab.io/zayeliac-finds)

## Adding Products

Edit `data/products.json` to add or update products:

```json
{
  "id": 21,
  "name": "Product Name",
  "brand": "Brand Name",
  "category": "Bread|Bakery|Pasta|Snacks|Sweets|Breakfast|Ready Meals|Baking",
  "niche": true,
  "description": "Short description of the product",
  "image": "https://...",
  "stockists": ["Tesco", "Sainsbury's"],
  "url": "https://brand-website.com"
}
```

## Development

This is a static site - just open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Deployment

Automatically deploys to GitLab Pages on push to `main` branch.

## License

MIT
