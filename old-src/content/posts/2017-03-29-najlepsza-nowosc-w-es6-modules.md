---
layout: post
title: Najlepsza nowość w ES6 - modules
tags: dajsiepoznac2017
date: 2017-03-29
path: /najlepsza-nowosc-w-es6-modules
---

Już od długiego czasu w użyciu jest nowy standard dla javascriptu - ES6 (zwany również ES2015). Może jego użycia jeszcze nie widać w plikach wielu aplikacji, bo w większośći przypadków musi być on jeszcze transpilowany do wspieranego niemal wszędzie poprzedniego standardu ES5. Mimo tego standard ten szybko został zaadoptowany w społeczności programistów JS i ciężko natknąć się jeszcze na nowy kod JS, który nie jest pisany w tym standardzie. ES6 wnosi sporo fajnych usprawnień do języka, ale dzisiaj chcę omówić moją ulubioną część tego standardu - moduły.

<!--more-->

Moduły w języku JS pojawiły się już dawno temu, ale tylko w formie konwencji. Były moduły CommonJS i AMD, ale teraz mamy już dostęp do natywnych modułów zdefiniowanych już w standardzie javascript. Dzięki temu powinien zakończyć się odwieczny problem gigantycznych plików JS, w których znajduje się cały kod aplikacji. Pisanie prostego, modularnego kodu jest banalnie proste i moduły powinny być stosowane przy wszystkich nowych projektach. Jedyną aktualną wadą jest brak natywnego wsparcia modułów w przeglądarkach. Z pomocą przychodzi jednak webpack, który bez żadnej dodatkowej konfiguracji transpiluje nasz kod używający modułów ES6 do jednego pliku, który możemy wysłać do każdej przeglądarki. Więcej na temat webpacka i jego instalacji można znaleźć na [oficjalnej stronie](https://webpack.js.org/)

To teraz pora na przedstawienie składni modułów. Moduły opierają się na eksporcie i imporcie. Do eksportu używamy polecenia: `export`, a do importu `import`. Tak proste są moduły ES6. Pokażę teraz różne rodzaje eksportów: domyślne, nazywane i jak się je obsługuje.

```javascript
// plik a.js
export const INCREMENT = 5;

export default function (x) {
    return x + INCREMENT;
}

export function doubleIncrement () {
    return 2 * INCREMENT;
}

// plik b.js
import increment, { INCREMENT as b, doubleIncrement } from './a';

increment(3);
console.log(b);
doubleIncrement();


// plik c.js
import * as inc from './a'

inc.increment(3);
```

Na powyższym przykładzie pokazałem z czego najcześciej korzystam i co wystarczy, żeby zacząć korzystać z modułów.
W pliku a.js w pierwszej linii zdefiniowałem standardowy export zmiennej z pliku. Eksportować w ten sposób możemy funkcje, zmienne, klasy.

Kolejnym typem eksportu jest eksport domyślny. Żeby go użyć po słowie `export` używamy słowa `default`. Należy tutaj zauważyć, że w jednym pliku możemy tylko raz eksportować domyślnie i wtedy w przypadku zmiennych `const` i `let` nie definiujemy zmiennej, tylko zwracamy wartość(np. `export default 5`). Później eksportuję jeszcze jedną funkcję w taki sam sposób jak zmienną `INCREMENT`.

Zamiast tej składni możemy wszystkie rzeczy wyeksportować w innym miejscu kodu i nie potrzebujemy wtedy przy każdej zmiennej, czy funkcji pisać słowa `export`. Wtedy na przykład na końcu pliku deklarujemy `export { INCREMENT, doubleIncrement }`. Przy takiej deklaracji możemy również zmieniać nazwę eksportu (np. `export { INCREMENT as INC, doubleIncrement as default }`).

Przejdźmy teraz do tego w jaki sposób zaimportować to co wyeksportowaliśmy z innego pliku. Zaczynamy on słowa `import` potem deklarujemy co chcemy zaimportować z pliku, następnie słowo kluczowe `from` i definujemy ścieżkę pliku. W przypadku braku ścieżki plik będzie szukany wśród modułów w `node_modules`. Rozszerzenie `js` może zostać pominięte.

Jeśli potrzebujemy zaimportować tylko domyślny eksport to wystarczy nam `import nazwa from './plik'`. Nazwa może być jakakolwiek i pod nią będziemy móc się dostać do zaimportowanej zmiennej, funkcji, czy klasy. Jeśli chcemy zaimportować jeden z nazwanych eksportów - deklarujemy je w klamrach i podejemy nazwę elementu, który eksportujemy (np. `import { a, b as c } from './moj-plik'`). W tym przykładzie pokazałem, że nawany eksport można zaimportować pod konkretną nazwą z użyciem słowa `as`.

Został nam ostatni typ importu. `import * as inc from './a'` - przy tym imporcie zaimportowane zostaną wszystkie wyeksportowane elementy do obiektu o nazwie `inc`. Żeby wykonać wyeksportowaną funkcję b wykonujemy `inc.b()`.

Tak oto wygląda praca z modułami w ES6. Opanowanie ich nie jest ciężkie, a składnia jest bardzo prosta. Po poznaniu tej funkcji języka już nigdy nie wrócisz do pisania gigantycznych plików, a cały Twój kod będzie znacznie lepiej uporządkowany. Po więcej informacji na temat modułów zapraszam do [artykułu](http://2ality.com/2014/09/es6-modules-final.html) na blogu Dr. Axela Rauschmayer, który jest poświęcony nowym standardom JS.
