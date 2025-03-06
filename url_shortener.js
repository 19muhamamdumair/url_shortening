const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = 3000;
const BASE_URL = "http://short.est/";
const urlDatabase = new Map();

app.use(express.json());

function generateShortCode(url) {
    return crypto.createHash("md5").update(url + Date.now()).digest("base64url").slice(0, 6);
}

app.post("/encode", (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl || typeof originalUrl !== "string") {
        return res.status(400).json({ error: "Invalid URL" });
    }

    let shortCode = generateShortCode(originalUrl);
    while (urlDatabase.has(shortCode)) {
        shortCode = generateShortCode(originalUrl); // Avoid collisions
    }

    urlDatabase.set(shortCode, originalUrl);
    res.json({ shortUrl: `${BASE_URL}${shortCode}` });
});

app.post("/decode", (req, res) => {
    const { shortUrl } = req.body;
    if (!shortUrl || typeof shortUrl !== "string" || !shortUrl.startsWith(BASE_URL)) {
        return res.status(400).json({ error: "Invalid shortened URL" });
    }

    const shortCode = shortUrl.replace(BASE_URL, "");
    const originalUrl = urlDatabase.get(shortCode);

    if (!originalUrl) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.json({ originalUrl });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;