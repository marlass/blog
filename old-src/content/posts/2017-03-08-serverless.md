---
layout: post
title: Serverless
tags: dajsiepoznac2017
date: 2017-03-08
path: /serverless
---

Dzisiaj zamiast postu o projekcie opowiem trochę o czymś takim, co określa się jako "serverless". Od jakiegoś czasu natrafiam na to pojęcie w Internecie, a ostatnio miałem również okazję usłyszeć prezentację Michała Kurzeji na konferencji "Boiling Frogs". Opiszę dzisiaj moje spostrzeżenia na ten temat i jak wyglądało moje pierwsze starcie z "serverless".

<!--more-->

Pierwszy raz spotkałem się z tym pojęciem w [artykule o pisaniu chat botów w node.js](https://www.smashingmagazine.com/2016/10/how-to-develop-a-chat-bot-with-node-js/) na Smashing Magazine. Pojawiło się pojęcie Lambdy - usługi Amazonu opierającej całe swoje działanie na wrzucaniu swojej aplikacji jako funkcji, która może być dynamicznie uruchamiana, gdy jej potrzebujemy. Wokół tego opiera się cały model płatności, gdzie płacimy tylko za wykonywanie funkcji, a czas bezczynności jest bezpłatny. Brzmi to bardzo dobrze, gdy tworzymy usługi, które czasem mogą być używane przez ogromną liczbę osób, a czasem stoją bezczynne(AWS Lambda odpowiada również za skalowanie, żeby funkcja była stanie obsłużyć duży ruch). Dla przykładu obsługa 2 mln wywołań funkcji kosztuje nas około 0.20$. Pierwszy 1mln wywołań w miesiącu jest za darmo. Dokładny cennik jest przedstawiony [tutaj](https://aws.amazon.com/lambda/pricing/).

Przy prostych aplikacjach na własny użytek nie ma prawie szans, żeby wykorzystać bezpłatny limit. Po wstępnym entuzjaźmie co do tej usługi zacząłem się zastanawiać, a gdzie w takim razie mam przechować wszystkie dane, gdzie mam przechowywać pliki? Przez te wątpliwości przestałem się interesować tematem i widziałem zastosowanie tego tylko w prostych przypadkach, takich jak chat boty i proste bezstanowe usługi do przetwarzania danych.

Po długiej przerwie temat powrócił na konferencji "Boiling Frogs". Prezentacja odpowiedziała na moje poprzednie wątpliwości i teraz dopiero zrozumiałem, że "serverless" nie opiera się tylko i wyłącznie na AWS Lambda. Całe podejście "serverless" to nie korzystanie z jednej usługi, a całego ekosystemu usług przystosowanego do współpracy między sobą. Aktualnie najpopularniejszy taki ekosystem ma Amazon. Gdy potrzebujemy korzystać z bazy danych do Lambdy podpinamy DynamoDB, potrzebujemy przechowywać pliki - używamy Simple Storage Service, nazywanego S3. Nasze funkcje chcemy udostępnić jako API - korzystamy z API Gateway. Ekosystem jest tak rozbudowany, że każdy rzeczywisty przypadek, ktory powinien obsługiwać nasz serwer może być zrealizowany za pomocą odpowiedniego łączenia wszystkich narzędzi.

Postanowiłem trochę pobawić się tym ekosystemem z wykorzystaniem frameworka [serverless](https://serverless.com/). Pierwsze spotkanie było bardzo przyjemne. Po założeniu konta na AWS po 10 minutach byłem w stanie zobaczyć w przeglądarce `Hello World` wysłane z serwera w Frankfurcie. Dodanie kolejnych funkcji i podpięcie ich pod konkretne adresy url jest bardzo proste. Wszystko opiera się na zmianie konfiguracji w pliku `serverless.yml` i zrobieniu deploya. Przy zmianie konfiguracji deploy chwilkę trwa, ale jeśli tylko aktualizujemy konkretną funkcję, zmiana jest błyskawiczna. Korzystanie z API Gateway nie mogło być prostsze.

Potem postanowiłem zrobić przykładowe API z zapisywaniem elementu do bazy i wyświetlaniem rekordów. Samo podpięcie dynamoDB nie jest ciężkie i API jest dostępne w przeglądarce, natomiast dostawałem błędy związane z uprawnieniami mojej funkcji do bazy danych. Walczyłem z tych 30 minut, ale bezskutecznie. Na tym zakończę opis moich dzisiejszych doświadczeń. Widzę duży potencjał w tym podejściu do budowania i hostowania aplikacji. Taka architektura wymaga na nas myślenie o usługach w bardziej granualny sposób i dobrze łączy się z mikro usługami. W najbliższym czasie będę jeszcze eksperymentował z "serverless" i postaram sie zintegrować z dynamoDB, S3 i zrobić jakąś użyteczną apkę.
