#!/bin/bash
show_message() {
    echo
    echo -e "\e[1m$1\e[0m"  
    echo
}

show_success() {
    echo
    echo -e "\e[32m✅ $1\e[0m"  
    echo
}

initiate_scraping() {
    show_message "🚀 Initiating the scraping process..."
    npm run scrapping
}

initiate_mail_sending() {
    show_success "Scraping completed successfully! Press Enter to send vacancies via email..."
    read -p ""
    show_message "🚀 Sending emails with the latest vacancies..."
    npm run node-mailer
}

initiate_server_startup() {
    show_success "Email sent successfully! Press Enter to start the server..."
    read -p ""
    show_message "🚀 Starting the server..."
    npm run server
}

initiate_scraping
initiate_mail_sending
initiate_server_startup

