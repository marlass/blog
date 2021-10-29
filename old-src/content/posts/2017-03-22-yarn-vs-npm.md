---
layout: post
title: Yarn - lepszy klient npm?
tags: dajsiepoznac2017
date: 2017-03-22
path: /yarn-vs-npm
---

W październiku zeszłego roku został udostępniony światu nowy menedżer pakietów dla javascriptu - Yarn. Od tamtego czasu nowy klient zdobywa coraz większą popularność. Przy wielu bibliotekach, modułach w instrukcjach instalacyjnych zaczyna się pojawiać oprócz `npm install` komenda `yarn add`. Ja też już jakiś czas temu przerzuciłem się z klienta npm na Yarna. Opowiem trochę o moich doświadczeniach z nowym menedżerem i przedstawię trochę różnic między tymi klientami.

<!--more-->

Dla mnie głównym powodem, żeby skorzystać z Yarna były długie czasy instalacji pakietów, czy to przy stawianiu projektu, czy przy instalowaniu pojedynczych modułów. Yarn bardzo mocno reklamuje to, że jest znacznie szybszy od klienta npm. Moje subiektywne wrażenia przy instalacji również to potwierdzają. Wszystko działa znacznie szybciej niż npm, w informacje wyświetlane przy instalacji pakietów są bardziej czytelne. Według benchamrków Yarn jest zazwyczaj 2 razy szybszy niż npm.

Kolejną bardzo fajną funkcjonalnością Yarna jest plik `yarn.lock`, który blokuje nam pakiety na konkretnych wersjach. W pliku tym są informacje o wersji pakietu, miejsca z którego został pobrany i jego suma kontrolna. W npm też coś takiego istnieje i nazywa się `shrinkwrap`, ale obsługa tego w kliencie npm jest mniej przyjemna. Nie musimy pamiętać o tym pliku, o jego aktualizowaniu przy zmianie wersji. W Yarn każda instalacja pakietu, aktualizacja automatycznie zaktualizuje plik `yarn.lock`. Dzięki temu wszyscy zawsze mają takie same wersje pakietów. Problemy z różnymi wersjami pakietów czasem stwarzały problemy, zwłaszcza, jeśli twórca pakietu nie przestrzegał zasad wersjonowania według `semver`, na którym opiera się cały system npm.

Yarn ma jeszcze jedną drobną nowość, której brakuje w npm. Dzięki poleceniu `yarn licences ls` można wyświetlić listę wszystkich pakietów z ich licencjami. Drobnostka, a czasem może się przydać.

Start z Yarn jest bardzo prosty. Instalujemy klienta zgodnie z wskazówkami na [stronie](https://yarnpkg.com/en/docs/install) i możemy zacząć korzystać.

Poniżej lista najważniejszych komend npm i ich odpowiedników w Yarn:

| npm                            | Yarn                   |
|--------------------------------|------------------------|
| npm install                    | yarn                   |
| npm install --save react       | yarn add react         |
| npm install --save-dev webpack | yarn add --dev webpack |
| npm install --global yo        | yarn global add yo     |

Większa lista jest dostępna w [dokumentacji Yarna](https://yarnpkg.com/en/docs/migrating-from-npm).

Należy tutaj zauważyć, że z Yarn nie możemy zainstalować pakietu bez opcji `--save` lub `--save-dev`. Według mnie to duży plus, bo nigdy nie spotkamy się z sytuacją, że tworzymy projekt i instalujemy wszystkie zależności. Następnie dzielimy się projektem z kolegą, mówimy mu, żeby zrobił `npm install` i wszystko będzie działać. Tu natomiast dostajemy wiadomość, że coś nie działa i brakuje jakiegoś pakietu. Przez to, że w Yarn wszystko jest zawsze zapisywane w `package.json` unikamy tego powszechnego problemu. 

Yarn ma jeszcze parę fajnych funkcji i jeśli chcecie o nich poczytać, to wszystkie informacje znajdziecie na [stronie Yarna](https://yarnpkg.com/en/). Wszystko jest bardzo przejrzyście wyjaśnione i całkowite przejście z npm na Yarn dla mnie nie stanowiło żadnego problemu dzięki tej dokumentacji. Zachęcam każdego do sprawdzenia Yarna, choćby tylko dla szybszych instalacji. Może akurat też się wam tak spodoba, że już nie wrócicie do klienta npm.
