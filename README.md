This is a simple URL shortening service built using Node.js and Express. It allows users to encode long URLs into short ones and decode them back to their original URLs.

Features

Encode: Converts a long URL into a short URL.

Decode: Retrieves the original URL from a shortened one.

Uses in-memory storage (no database required).

Installation

Clone this repository:

git clone https://github.com/19muhamamdumair/url_shortening.git
cd url_shortening

Install dependencies:

npm install

Running the Service

To start the server, run:

npm start

The service will run on http://localhost:3000

API Endpoints

1. Encode a URL

Endpoint: POST /encode

Request Body:

{
  "originalUrl": "https://www.umair.com"
}

Response:

{
  "shortUrl": "http://short.est/C2d78h"
}

2. Decode a Short URL

Endpoint: POST /decode

Request Body:

{
  "shortUrl": "http://short.est/C2d78h"
}

Response:

{
    "originalUrl": "https://www.umair.com"
}