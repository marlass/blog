---
layout: post
title: Immutable.js w reduktorach
tags: dajsiepoznac2017
date: 2017-04-07
path: /immutable-js-reducers
---

Przy ostatnich pracach nad aplikacją i pisaniu reduktorów nie podobało mi się zwracanie za każdym razem nowego obiektu i braku mutacji w aktualnym stanie. Dodawanie atrybutów do obiektu z pomocą Object.assign jest całkiem przyjemne, natomiast usuwanie atrybutu z obiektu już nie wygląda w kodzie tak ładnie i wymaga trochę uwagi przy zarządzaniu stanem. Wtedy pojawił się pomysł na użycie Immutable.js. Dzisiaj pokażę, co z tego wyszło i sądzę, że zachowanie stanu aplikacji z niemutowalnymi obiektami jest całkiem proste.

<!--more-->

Zaczynamy od instalacji, wystarczy `npm install immutable --save` i możemy używać Immutable.js w Redux.

Potem tylko `import Immutable from 'immutable'` i można podpiąć zamiast pustego obiektu JS do domyślnego stanu reduktora pustą niemodyfikowalną mapę: `state = Immutable.Map({})`.

Główne metody, które musimy poznać do Map to: `set()`, `get()` i `delete()`. Za pomocą funkcji `set()` ustawiamy wartość atrybutu lub tworzymy nowy atrybut z wartością. Żeby odczytać z mapy wartość wykorzystujemy funkcję `get()` do której przekazujemy klucz. Do usuwania atrybutu służy polecenie `delete()`. Z tymi informacjami możemy zabierać się za przerobienie naszego reduktora.

Na początku wszystkie miejsca, gdzie przypisuję obiekt zamieniam na przypisania do Immutable.Map().

```javascript
case types.ADD_PROJECT:
      return state.set(action.payload, Immutable.Map({
        id: action.payload,
        name: '',
        description: '',
        categories: Immutable.Map({})
      }))
```

Następnie przekształcam po kolei reduktory. Usuwanie projektu z obiektu z starej wersji z użyciem biblioteki lodash zamieniam z:

```javascript
return _.omit(state, [action.payload]);
```

na:

```javascript
return state.delete(action.payload);
```

Przy zmianie wartości wewnętrznych obiektu jest trochę więcej zmian. Poprzedni kod:

```javascript
return Object.assign({},
        _.set(state,
          `[${action.payload.projectId}].name`,
          action.payload.name))
```

Kod z Immutable.js:

```javascript
return state.set(action.payload.projectId,
        state
          .get(action.payload.projectId)
          .set('name',action.payload.name));
```

Mi bardzo przypadła do gustu biblioteka Immutable.js i korzystanie z niej jest znacznie prostsze niż rokminianie, jak zrobić immutability z dostępnymi w języku metodami. Składnia jest bardzo prosta i dostaję gwarancję, że nie zmodyfikuję przypadkowo obiektu. W przyszłości postaram się zwiększyć użycie Immutable.js w reszcie projektu i zobaczę jakie będą tego efekty.
