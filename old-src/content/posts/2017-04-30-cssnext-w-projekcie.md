---
layout: post
title: CSSnext w projekcie
tags: dajsiepoznac2017
date: 2017-04-30
path: /cssnext-w-projekcie
---

Przy tworzeniu projektów z użyciem React odchodzi się od praktyki tworzenia jednego głównego arkusza styli na rzecz tworzenia styli indywidualnie dla każdego komponentu. Jak już opisałem w poprzednim poście o projekcie, że korzystam w nim z modułów CSS i nie korzystam z SCSS. Dzisiaj opiszę trochę cssnext, który usprawnia pracę z stylami w modułach i daje możliwość wykorzystania przyszłych funkcjonalności języka CSS.

<!--more-->

Od kilku lat korzystam z SCSS i stał się on jednym z moich podstawowych narzędzi do pisania styli, ale zawsze z chęcią poznaję nowości. Już jakiś czas temu usłyszałem o postcss i bardzo szybko w mój workflow wprowadziłem świetne narzędzie - autoprefixer. Nie wgłębiałem się natomiast w resztę możliwości jakie oferuje ekosystem. Teraz mam świetną okazję je poznać pisząc tę aplikację w React i mając już skonfigurowany projekt do obsługi cssnext i importów.

Głównymi funkcjonalnościami jakie używam w SCSS są zmienne, mixiny, importy oraz świetny nesting. Te funkcjonalności najbardziej usprawniają pracę i ciężko będzie mi bez nich pisać style. Po szybkim przejrzeniu dokumentacji cssnext okazuje się, że wszystko to mogę wykonać.

Na początku import. Tutaj składnia jest identyczna jak w przypadku SCSS i obsługiwana jest przez plugin `postcss-import`

``` css
@import "settings.css"
```

Następnie zmienne. Tutaj następuje spora zmiana, bo użycie zmiennych wymaga zmiany podejścia na nowe, które wprowadzone jest powoli do przeglądarek. Zmiennych w CSS. Zmienne definiujemy w elemencie `:root` i odwołujemy się do nich poprzez funkcję `var()`.

``` css
:root {
    --gray: #ddd;
}

.button {
    border-color: var(--gray);
}
```

Kolej na mixiny. Tutaj znowu są zauważalne różnice, ale jeśli potrafimy korzystać z zmiennych CSS to mixiny również nie powinny sprawiać problemów.

``` css
:root {
    --box: {
        width: 64px;
        height: 64px;
    }
}


.box {
    background-color: goldenrod;
    @apply --box;
}
```

Na koniec zostaje mój ulubiony nesting. Tutaj znacznie przyjemniej pracowało mi się z SCSS, ale można przywyknąć. Nesting media query zostaje taki sam. Prosty nesting również, jedynie w przypadku nestingu odwrotnego trzeba korzystać z dyrektywy @nest.

``` css
.box {
    & span {
        font-size: 1.2em;
    }

    @nest .container & {
        max-width: 34em;
    }

    @media (max-width: 30px) {
        height: 200px;
    }
}
```

Cssnext oferuje poza przedstawionymi wyżej funkcjonalnościami jeszcze parę innych smaczków: proste tworzenie customowych media queries, mnóstwo funkcji kolorów, wsparcie dla rem, wbudowany autoprefixer, korzystanie z pseudoklas i funkcje do resetu właściwości. Więcej możecie znaleźć w [dokumentacji cssnext](http://cssnext.io/features/).

Praca z cssnext w projekcie bardzo ułatwia pisanie styli i raczej zmienię swój sposób pisania z SCSS na rozszerzalnego postcssa i na korzystanie z przyszłych funkcjonalności CSS, zamiast korzystać z specjalnej składni preprocesora.
