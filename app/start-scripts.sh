#!/bin/bash
echo
echo "🚀 Initiating the scraping process..."
echo
npm run scrapping
echo
read -p $'\e[32m✅ Scraping completed successfully! Press Enter to fire up the server...\e[0m'
echo
echo "🚀 Starting the server..."
echo
npm run server
echo

