---
layout: post
title: Visual Studio Code
tags: dajsiepoznac2017
date: 2017-05-04
path: /visual-studio-code
---

W tym poście chcę coś opowiedzieć o swoim podstawowym edytorze - Visual Studio Code. Jest to nowy edytor stworzony przez Microsoft w 2015 roku i od oficjalnego wypuszczenia edytora w marcu 2016 rozwijany jako projekt Open Source. Ja zacząłem korzystać z VS Code 1,5 roku temu, gdy jeszcze był w wersji Beta i jeszcze nie znalazłem powodu, żeby go zamienić na jakikolwiek inny.

<!--more-->

Edytor ten jest bardzo lekki. Jest oparty na silniku Electron, na którym można tworzyć aplikacje desktopowe korzystające z Node.js i silnika Blink. Na tym samym silniku działa również inny popularny edytor - Atom. Od pierwszego publicznego wypuszczenia VS Code jest on regularnie, co miesiąc aktualizowany o masę nowych funkcjonalności i z miesiąca na miesiąc coraz bardziej dojrzeje.

Za co lubię VS Code:

- bardzo schludny i prosty interfejs
- dobry system rozszerzeń
- dobre wsparcie dla Javascript
- wbudowany Debugger JS
- świetna integracja z GIT

Oprócz wyżej wymienionych zalet bardzo dobrze działa dzielenie edytora na wiele grup zakładek, wbudowany Emmet, łatwość konfiguracji i paletę komend. Te rzeczy są wykorzystywane wielokrotnie każdego dnia i działają bez zarzutu, i bardzo ułatwiają pracę. Przez to, że edytor jest pisany w JS mogę w przyszłości wesprzeć jego rozwój, czy stworzyć potrzebny plugin. A co do pluginów - to naprawdę ciężko wpaść na pomysł pluginu, bo społeczność tworzy je bardzo szybko i większosć z nich jest bardzo dobrej jakości. Jeśli wchodzi jakaś nowa biblioteka czy framework to Visual Studio Code ma wcześnie dostępny plugin jako jeden z niewielu edytorów.

A jeśli mowa o pluginach to mogę wspomnieć kilka, które są warte uwagi i mi się bardzo przydały:

- pluginy do wsparcia języków: PostCSS syntax, Docker, Handlebars
- Settings Sync - mój plugin no. 1 - to dzięki niemu wszystkie moje urządzenia zawsze mają te same wersje rozszerzeń i ustawienia są przenoszone między edytorami. Dzięki niemu instalacja edytora z wszystkimi ustawieniami i rozszerzeniami zajmuje tylko 5 minut.
- markdownlint
- vscode-icons - ikony dla różnych plików pozwalają naprawdę sprawnie poruszać się w drzewie katalogów
- SVG Viewer
- Path Intellisense - importy wszystkich plików są dzięki niemu banalne
- Prettier - Javascript formatter

Chcę jeszcze wspomnieć o powodzie, dla którego naprawdę polubiłem ten edytor - integracja z GIT. Dzięki temu byłem w stanie wyrobić w sobie praktykę częstych commitów, pracowania na osobnych branchach dla zadań oraz bardzo prosto synchronizowałem wszystko z centralnymi serwerami. Jedynej rzeczy, której mi tutaj brakuje to dobry mechanizm obsługi konfliktów, ale do ręcznej pracy na konfliktach da się przyzwyczaić. W końcu nie ma ich tak dużo.

Ja z mojej stronę chcę bardzo polecić Visual Studio Code. Jeśli piszecie dużo Javascriptu i frontendowych rzeczy to jest to edytor stworzony pod te potrzeby. Dodatkowo polecem wspominaną integrację z GIT oraz mnóstwo dobrej jakości pluginów do najróżniejszych potrzeb.
