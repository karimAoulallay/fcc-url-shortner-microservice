**# URL Shortener API Microservice**

This project provides a simple URL Shortener API using Node.js, Express, and a basic in-memory storage for shortened URLs. It allows users to create short, memorable URLs that redirect to their original, longer counterparts.

**Key Features:**

- **URL Shortening:** Generates a unique, shortened URL for a given long URL.
- **URL Redirection:** Redirects users who access a shortened URL to the original, long URL.
- **URL Validation:** Ensures that submitted URLs are valid and have a reachable host.
- **Basic Error Handling:** Returns informative error messages for invalid URLs or issues during shortening.

**Getting Started:**

1. **Prerequisites:** Node.js and npm (or yarn) installed on your system.
2. **Clone this repository:** `git clone git@github.com:karimAoulallay/fcc-url-shortner-microservice.git`
3. **Install dependencies:** `npm install` (or `yarn install`)
4. **Create a `.env` file** in the root directory to store environment variables:
   ```
   PORT=3000  // (optional, defaults to 3000)
   ```
5. **Run the project:** `npm start` (or `yarn start`)

**API Endpoints:**

- **`POST /api/shorturl`:**
  - Creates a shortened URL for the provided long URL.
  - **Request body:** A JSON object with the property `url` containing the long URL.
  - **Response:** A JSON object containing:
    - `original_url`: The original, long URL.
    - `short_url`: The generated shortened URL.
- **`GET /api/shorturl/:shorturl`:**
  - Redirects to the original URL associated with the provided shortened URL.
