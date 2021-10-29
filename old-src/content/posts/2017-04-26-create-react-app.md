---
layout: post
title: Create React App
tags: dajsiepoznac2017
date: 2017-04-26
path: /create-react-app
---

Od początku mojej podróży z React obijał się temat wymaganego środowiska, narzędzi budowania i całej konfiguracji wymaganej do odpalenia projektu korzystającego z nowych funkcjonalności ES6. Na szczęście bardzo szybko trafiłem na projekt Create React App, który pozwolił uniknąć mi mnóstwo problemów związanych z podstawową konfiguracją Webpack, Babel przydatnych przy pracy z React.

<!--more-->

[Create React App](https://github.com/facebookincubator/create-react-app) jest bardzo proste w użyciu, a instalacja wymaga tylko zainstalowania globalnego pakietu.

``` sh
yarn add create-react-app -g
```

Do utworzenia nowego projektu wystarczy tylko uruchomić jedną komendę i mamy postawiony nowy projekt z podstawowymi komponentami.

``` sh
create-react-app my-app
```

Odpalenie projektu to też jedna linijka, podobnie jak uruchomienie testów opartych na Jest oraz zbudowanie projektu na produkcję. Przy odpaleniu projektu stronę możemy podejrzeć pod podanym adresem przez Create React App.

``` sh
# Dev
yarn start

# Test
yarn test

# Build
yarn build
```

Dla mnie ten projekt bardzo ułatwił start z Reactem i gorąco go polecam. Mimo, że zaczynam się rozglądać za nowymi pakietami startowymi, które oferują renderowania po stronie serwera oraz hot module replacement (obiecująco wygląda [next.js](https://github.com/zeit/next.js)), to Create React App sprawdza się bardzo dobrze przy prostych projektach, które musimy szybko stworzyć i chcemy uniknąć problemów związanych ze środowiskiem. Jeśli potrzebujemy roszerzać naszą konfigurację, to mamy dostępną dobrą [dokumentację](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md), która podpowie jak np. podpiąć style pisane z SASS lub deployować na popularne platformy. Jeśli jeszcze nie poznaliście Reacta i chcecie szybko zacząć z nim pracę to Create React App zdecydowanie wam to ułatwi.
