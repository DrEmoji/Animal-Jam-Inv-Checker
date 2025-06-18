# 🐾 Animal Jam Account Scraper (PoC)

> ⚠️ **Disclaimer:** This is a **proof of concept**. The code is basic, unoptimized, and built for experimental use only. It does **not** use any proxies — all requests are sent directly from your IP.

### 🧰 Features
- ✅ **Login Check** – Verifies account credentials.
- 🎒 **Inventory Checker** – Extracts the account’s clothing items.
- 👥 **Buddy List Extractor** – Dumps the full buddy list.
- 🏡 **Den Items Viewer** – Lists all den items on the account.

### 📁 Output
Results are dumped into `.txt` files inside a folder named after the screen name. These include:
- `clothing.txt`
- `buddies.txt`
- `den_items.txt`

### 📦 Clothing Inventory Tags
- **SPECIAL** – Items matched from a custom filter list (`utils.js`)
- **MEMBER** – Members-only items
- **REGULAR** – Common or general items available to all users

## 📜 License
This project is licensed under the [MIT License](LICENSE).  
You’re welcome to use, modify, and share it — just please provide credit.
