---
layout: post
title: Struktura stanu aplikacji
tags: dajsiepoznac2017
date: 2017-03-28
path: /struktura-stanu-aplikacji
---

Zaczyna się prawdziwy etap tworzenia aplikacji. Podstawowy szkielet aplikacji już istnieje, narzędzia działają, podstawowe zadania można dodawać. Teraz pora implementować główne funkcjonalności. Ale zanim przejdę do pisania funkcjonalności, chcę zaplanować bardzo ważną część aplikacji - jej stan.

<!--more-->

Pisanie aplikacji w React to jedna ciągła refaktoryzacja. Cały czas wydziela się nowe komponenty, rozbija zakres odpowiedzalności aktualnych komponentów, niektóre komponenty przerabia się na prezentacyjne, inne stają się kontenerami. Jednak już na początku prac ważne jest dobre rozplanowanie stanu aplikacji w Redux. Zaprezentuję dzisiaj, jak sobie wyobrażam mój stan aplikacji do mojego MVP.

W skład MVP ma wchodzić definiowanie zadań. Każde zadanie może być jednorazowe lub może być zadaniem cyklicznym. Każde zadanie ma swoją wagę w punktach i możemy do zadania przypisać projekt i kategorię w projekcie. Takie są założenia do MVP menedżera życia. Przejdźmy więc do tworzenia struktury stanu aplikacji.

Zacznijmy od mniej skompilkowanej części - projektu.

```javascript
projects: {
    test: {
        id: "test",
        name: "Testowy projekt",
        description: "Projekt dla sąsiada testa"
        categories: {
            estimation: {
                id: "estimation",
                name: "Estymacja",
                description: "Kategoria dla szacunków"
            },
            development: {
                id: "development",
                name: "Programowani",
                description: "Prace programistyczne"
            }
        }
    },
    drugi_test: {
        id: "drugi_test",
        name: "Kolejny test",
        description: "Opis dla drugiego projektu",
        categories: {}
    }
}
```

Projekty i kategorie mają zostać w przyszłości użyte do generowania różnego rodzaju statystyk i raportów. Taka struktura powinna zapewnić łatwość dodawania kolejnych atrybutów do projektów, jak również zapewnić proste przeszukiwanie po stronie kodu. Nie zostały tutaj użyte żadne tablice. Do wszystkiego można się dostać po identyfikatorze, co pozwoli uniknąć przechodzenia po całej liście przy próbie znalezienia konkretnego projektu.

Przejdźmy teraz do definiowania zadań.

```javascript
tasks: {
    5: {
        id: 5,
        name: "Pierwsze zadanie",
        project: "test",
        project_category: "estimation",
        points: 15,
        cyclic: 3
        date: "2017-04-20",
        status: "todo"
    }
},
cyclic_tasks: {
    3: {
        id: 3,
        start_date: "2017-03-21",
        end_date: "2017-06-20",
        repeat: "*",
        name: "Pierwsze zadanie",
        project: "test",
        project_category: "estimation",
        points: 15
    }
}

```

Obiekt zadań będzie przechowywać wszystkie zadania. Każde zadanie ma swoje atrybuty: nazwę, status, datę i może mieć przypisany projekt i kategorię projektu. Kolejnym obiektem są cykliczne zadania. Tutaj definiujemy zadania cykliczne, jak często mają być powtarzane (* - każdy dzień, liczby 0-6 rozdzielone przecinkiem poszczególne dni tygodnia). Dodatkowo dajemy datę początkową zadań cyklicznych i końcową. Definiujemy także domyślną nazwę, punkty i dane projektu.

Dzięki takiemu rozwiązaniu będziemy mogli generować pojedyncze zadania do obiektu tasks, które będą miały przypisywane domyślne atrybuty. Każde pojedyncze zadanie będziemy mogli osobno modyfikować, jak również będziemy mogli zmienić wszystkie zadania z cyklicznej grupy. Podobnie działa taki mechanizm w kalendarzu Google. Przy edycji wydarzenia cyklicznego możemy edytować pojedyncze wydarzenie lub wszystkie wydarzenia w cyklu. Myślę, że to zapewni odpowiednią elastyczność i nie będzie wymagać dużych zmian w miarę rozwoju aplikacji.

W następnych postach zabierzemy się za implementację przemyślanego dzisiaj stanu aplikacji i zobaczymy, czy to co sobie wymyśliłem będzie działać dobrze.
