StellarQuery is an AI-powered chatbot-style assistant that allows users to query astronomical datasets using natural language.
It converts plain English questions into structured queries (SQL or ADQL) and retrieves real-time data from NASA and ESA archives such as:

NASA Exoplanet Archive

ESA Gaia DR3 Database

Hubble & JWST image datasets

This project aims to make astronomy data accessible to students, educators, and researchers — without requiring deep knowledge of SQL or astronomy-specific data interfaces.

🧩 Problem Statement

Accessing and querying astronomical data requires technical knowledge of SQL, ADQL, and specialized tools.
Existing systems are often complex and non-intuitive.
Goal: Build a natural-language-based interface to make space data exploration simple and conversational.

💡 Proposed Solution

StellarQuery acts as a virtual astronomy assistant:

Accepts user input in natural language.

Classifies it into SQL, ADQL, Image, or General categories.

Converts it into machine-readable queries.

Fetches data directly from NASA APIs or provides conceptual explanations via LLMs.

🔑 Key Features

✅ Natural Language Understanding – Converts user input into SQL/ADQL queries
✅ Real-Time NASA Data Retrieval – Uses NASA Exoplanet Archive API
✅ Intelligent Classification – Detects intent using an LLM via OpenRouter API
✅ Gaia ADQL Integration – Supports ESA Gaia TAP queries
✅ Astronomy Q&A Mode – Handles general astronomy questions
✅ Error Handling – Provides fallback messages for API/network issues
