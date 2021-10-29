---
layout: post
title: Kilka słów o konfiguracji projektu
tags: dajsiepoznac2017
date: 2017-03-05
path: /kilka-slow-o-konfiguracji
---

W pierwszym poście opisywałem trochę narzędzia z których będę korzystał przy robieniu tego projektu. Postaram się teraz trochę bardziej opisać cały stos technologiczny projektu.

<!--more-->

Chcąc uniknąć tworzenia całej konfiguracji od początku postanowiłem skorzystać z [wyszukiwarki projektów startowych](http://andrewhfarmer.com/starter-project/) React. Chciałem stworzyć sobie bardzo przyjemne środowisko do pracy. Wsród moich wymagań były: hot module replacement, możliwość korzystania z ES6, renderowanie po stronie serwera, przygotowany linter i framework do testów oraz już zintegrowany redux i react router. Szukając po tych wymaganiach znalazłem [reactGo](https://github.com/reactGo/reactGo). Projekt ma ponad 2 tysiące gwiazdek na githubie, przez co zaufałem społeczności, że ten projekt będzie prosty do konfiguracji i będzie usprawniał pracę.

Instalacja jest bardzo prosta. Po prostu sobie klonujemy projekt lub pobieramy archiwum. Potem już w folderze projektu wykonujemy `npm install` i wszystkie wymagane zależności są zainstalowane. W projekcie jest przygotowanych kilka skryptów do budowy, testów, lintowania i do pracy. Po odpaleniu `npm run dev` pod adresem `localhost:3000` widzimy już przykładowy projekt nad którym możemy pracować.

Teraz zaczyna się trudniejsza część konfigurowania projektu. Usunięcie wszystkich rzeczy, których nie potrzebujemy, żeby móc zacząć budować właściwą aplikację. W projekcie jest już przygotowany routing, logowanie z użyciem Google i przykładowe komponenty z stylami. Postanowiłem wyrzucić to wszystko i rozpocząć od zrobienia prostego `Hello world`.  Po godzinie walki z częścią serwerową i frontową wyrzuciłem wszystkie nieistotne pliki i zakończyłem na prostej aplikacji z jedną stroną i napisem `Hello world`.

Początkowo planowałem skorzystać z SASS przy pisaniu CSS, natomiast projekt jest skonfigurowany do użycia modułów css i składni cssnext. Spróbuję zostać przy tej konfiguracji i nauczyć się przyszłościowej składni css i integrowania styli do komponentów zamiast pisania globalnych styli. Minusem może być flash strony bez styli przy renderowaniu serwerowym, ale może jeśli zostanie czasu to postaram się to naprawić.

W następnym poście opiszę prace nad pierwszą funkcjonalnością, a w międzyczasie lista blogów znajomych do odwiedzenia:

- [Andrzej Pawcenis](https://inkoguto.github.io/)
- [Filip Rakowski](https://github.com/dravek99/daj-sie-poznac)
- [Iwona Jóźwiak](http://iwona.giat.pl/)
- [Łukasz Marszałek](http://www.lmarszalek.pl/blog/)
- [Maciej Daniłowicz](http://maciej-danilowicz.pl/)
- [Marcin Kwiatkowski](http://marcin-kwiatkowski.com/)
- [Rafał Makara](https://rmakara.github.io/)
