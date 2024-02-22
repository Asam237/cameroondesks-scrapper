#!/bin/bash

# Run scraping script
echo "🚀 Initiating the scraping process..."
npm run scrapping

# Wait for user input
read -p $'\e[32m✅ Scraping completed successfully! Press Enter to fire up the server...\e[0m'

# Run server script
echo "🚀 Starting the server..."
npm run server

