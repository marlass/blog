---
layout: post
title: Style w projekcie
tags: dajsiepoznac2017
date: 2017-04-25
path: /style-w-projekcie
---

Wszystkie moje prace do tej pory skupiały się na pisaniu kodu javascript. Dzisiaj trochę odskoczni - stylowanie komponentów z użyciem modułów CSS.

<!--more-->

Pakiet startowy na którym oparłem projekt ma wbudowane wsparcie dla modułów css i zobaczmy jak w tym się pisze style.
Na start zabieram się za pisanie styli dla formularza dodawania zadania. Mamy na nim dwa pola tekstowe z opisami oraz przycisk.
Zacznijmy od napisania prostych styli dla tych elementów. Korzystam z zwykłej składni CSS i nie wykorzystuję tutaj żadnych zaawansowanych opcji. Dostępny jest tu postCSS, ale narazie skupmy się na połączeniu styli z komponentem React.
Tworzę sobie plik o nazwie komponentu przy pliku komponentu, przez co nie muszę długo szukać plików podczas pracy nad jednym komponentem. Wszystkie pliki z nim związane są w jednym miejscu.

Styluję podstawowe komponenty:

``` css
.label {
    font-family: sans-serif;
    margin-bottom: 4px;
    display: inline-block;
}

.input {
    height: 32px;
    line-height: 28px;
    padding: 0 8px;
    border: 1px solid #333;
    font-family: sans-serif;
}

.button {
    height: 32px;
    line-height: 28px;
    padding: 0 20px;
    font-size: 1.2em;
    border: 2px solid #333;
    font-family: sans-serif;
    background-color: white;
    transition: border-color 0.2s ease-in-out;
    cursor: pointer;
}

.button:hover {
    border-color: royalblue;
}
```

Teraz pora na połączeniu styli z komponentem. Tutaj wykorzystujemy bibliotekę `classnames`. Zaczynam od importu tej biblioteki i importu styli.

``` javascript
import classNames from 'classnames/bind';
import styles from './new-todo.css';
```

Potem łączymy nasze klasy z styli z komponentem.

``` javascript
const cx = classNames.bind(styles);
```

Na końcu użycie styli jest banalnie proste. Przy elemencie dodajemy tylko atrybut `className` z naszą połączoną klasą.

``` javascript
<label className={cx('label')} htmlFor="name">Zadanie</label><br />
```

Użycie modułów CSS z biblioteką classnames jest banalnie proste i problem z globalnymi stylami zostaje rozwiązany. Teraz możemy pisać wyizolowane style dla każdego komponentu i nie martwić się ich wpływem na resztę dokumentu.
