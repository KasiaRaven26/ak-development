# Kasia Kruk — portfolio
React + TypeScript + Vite. Autorskie CSS, GSAP / ScrollTrigger i interaktywny Canvas.

## Uruchomienie
Wymagany Node.js 22.12+ (lub 24 LTS).

    npm ci
    npm run dev

## Produkcja
    npm run build
    npm run preview

## Vercel
1. Utwórz repozytorium na swoim GitHubie i dodaj zawartość tego folderu.
2. W Vercel wybierz Add New → Project i zaimportuj repozytorium.
3. Framework: Vite. Build: npm run build. Output: dist.
4. Kliknij Deploy. Konfiguracja jest również w vercel.json.

Formularz kontaktowy wymaga zmiennych środowiskowych opisanych poniżej. Projekt nie został jeszcze opublikowany ani połączony z Twoim GitHubem lub Vercel.

## Edycja
- src/components/Hero.tsx — główny nagłówek
- src/components/Work.tsx — podglądy projektów
- src/components/ProjectDialog.tsx — opisy i adresy projektów
- src/components/Playground.tsx — interaktywny eksperyment
- src/components/Contact.tsx — kontakt
- src/styles.css — wygląd i responsywność
- src/App.tsx — kompozycja strony i animacje scrollowania

Podglądy Odda i Indigo to przesłane zrzuty stron; podgląd Indigo jest tymczasowy.
Kontakt zawiera formularz wysyłany przez funkcję Vercel `/api/contact`.
Fonty pobierane są z Google Fonts. Przed finalną publikacją można je hostować lokalnie.
Animacje respektują prefers-reduced-motion i ręczne pauzowanie.

## Wysyłanie formularza
W Vercel skonfiguruj `RESEND_API_KEY`, `CONTACT_FROM` (nadawca z domeny zweryfikowanej w Resend) i opcjonalnie `CONTACT_TO` (domyślnie `hello@akdevelopment.co.uk`), następnie wdroż ponownie. Klucze pozostają na serwerze. Dokumentacja: https://resend.com/docs/api-reference/emails/send-email

`npm run dev` uruchamia sam frontend; do lokalnego sprawdzenia funkcji użyj Vercel CLI (`vercel dev`) ze zmiennymi środowiskowymi. Bez konfiguracji formularz wyświetli błąd wysyłania.
