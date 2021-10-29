---
layout: post
title: Redux - zapis stanu do lokalnej pamięci
tags: dajsiepoznac2017
date: 2017-03-18
path: /redux-lokalny-zapis-stanu
---

Od ostatniego postu o projekcie dodałem do aplikacji możliwość ustawienia projektu do każdego zadania oraz usuwanie zadań. Podczas prac bardzo irytowało mnie to, że przy każdym odświeżeniu strony cały stan aplikacji był tracony. Aktualnie planuję rozwijać tylko część frontendową aplikacji, więc implementacja backendu nie wchodziła w grę. Z pomocą przychodzi lokalna pamięć przeglądarki.

<!--more-->

Przeglądarka oferuje kilka możliwości przechowywaniu stanu. Wsród nich są `sessionStorage`, `localStorage`, `indexedDB` i ciasteczka. Moim wymaganiem było trzymanie stanu przez cały czas development, a nie tylko na czas sesji. Z tego powodu `sessionStorage` odpada. IndexedDB lepiej nadaje się do tworzenia lokalnych baz danych, a moim celem jest zapisanie pojedynczego obiektu - przez to `indexedDB` również odpada. Stan aplikacji ma być dostępny tylko dla klienta i nie musi być wysyłany do serwera, więc ciasteczka też się nie nadają. Tak oto pozostał nam `localStorage`.

LocalStorage ma bardzo proste API. Oferuje nam dwie metody: `setItem(key, value)` oraz `getItem(key)`.
Jak już znamy API, to możemy zabrać się do pracy. Naszym celem jest zapis przy każdej zmianie stanu aplikacji oraz odczyt stanu aplikacji przy ładowaniu strony.

Stan aplikacji zapiszę pod kluczem `reduxState`.
Tak więc odczyt stanu możemy zrealizować w następujący sposób.

```javascript
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
```

Przy odczycie zserializowany stan muszę przypisać do obiektu. Do parsowania JSON używam funkcji `JSON.parse()`.
Poniżej kod do zapisu stanu.

```javascript
localStorage.setItem('reduxState', JSON.stringify(store.getState()))
```

Analogicznie przy zapisie stanu do localStorage obiekt należy najpierw serializować funkcją `JSON.stringify()`.

Teraz zostaji mi tylko połączenie zapisu i odczytu do Redux. Zapis możemy wykonać korzystając z funkcji `subscribe()` na naszym stanie. Funkcja ta jest wywoływana przy każdej nowej akcji w Redux.

Finalny kod do zapisu stanu wygląda następująco:

```javascript
store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
```

Stan aplikacji odczytujemy tylko raz, przed inicjowaniem naszego stanu Redux. Przy tworzeniu naszego kontenera stanu jako drugi parametr możemy przekazać stan początkowy i tu własnie przekazujemy odczytany z lokalnej pamięci stan. Tak oto wygląda kod odczytu stanu:

```javascript
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
const store = createStore(rootReducer, persistedState)
```

Taki krótki kod wystarczy, żeby nasz stan był zapisywany w lokalnej pamięci i usprawniał nam proces tworzenia aplikacji. W moim projekcie jest również zaimplementowane renderowanie po stronie serwera. Tu trzeba trochę uważać i używać localStorage tylko po stronie klienta. Żeby sprawdzić środowisko wykonywania skryptu przydaje się sprawdzenie, czy obiekt `window` jest dostępny: `typeof window !== 'undefined'`.

Jeśli wspieramy starsze przeglądarki, warto przed użyciem funkcji `localStorage` sprawdzić, czy to API jest dostępne za pomocą warunku: `typeof(Storage) !== 'undefined'`. W ten sposób unikniemy błędów w starszych przeglądarkach i strona nadal będzie w nich użyteczna.
