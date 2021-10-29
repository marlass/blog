---
layout: post
title: Testowanie komponentów prezentacyjnych
tags: dajsiepoznac2017
date: 2017-03-11
path: /testowanie-komponentow-prezentacyjnych
---

Po skonfigurowaniu wszystkiego zaczynam dzisiaj właściwe prace nad projektem. Na początku zaczynam od prostego formularza do dodawania zadania i wyświetlania listy zadań. Następnym krokiem będzie możliwość edycji, usuwania zadań i filtrowania listy. Po skończeniu tego zajmę się trochę częścią serwerową, żeby nasze zadania były zapamiętywane na dłużej niż jedno wyświetlenie strony. Ale przejdźmy do dzisiejszego tematu - testowania.

<!--more-->

W momencie pisania tego posta w aplikacji są dwa kontenery (komponenty, które są powiązane z stanem aplikacji) i jeden bardzo prosty komponent prezentacyjny. Komponent prezentacyjny jest natomiast funkcją. Komponent prezentacyjny nie ma własnego stanu i korzysta jedynie z przekazanych atrybutów. Jako, że te komponenty są bardzo proste, to stwierdziłem, że są dobrym miejscem na start z pisaniem testów jednostkowych.

W projekcie mam skonfigurowany framework do testów [mocha](https://mochajs.org/) i jest uruchamiany z pomocą [Karmy](https://karma-runner.github.io/1.0/index.html). Odpalam polecenie `npm run test:watch` i wszystkie moje testy są odpalane za każdym razem, gdy zmieniamy kod aplikacji lub testy.

Pliki testów przechowuję w folderze `/app/tests` z rozszerzeniem `-test.jsx`. Poniżej zamieszczam kod testu do komponentu wyświetlania pojedynczego todo.

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TodoItem from './../components/todo-item.jsx';

describe('<TodoItem/>', function () {
  it('should have an li with todo', function () {
    const wrapper = shallow(<TodoItem>Hey</TodoItem>);
    expect(wrapper.find('li')).to.have.length(1);
  });

  it('should have an li with class todo-item', function () {
    const wrapper = shallow(<TodoItem>Hej</TodoItem>);
    expect(wrapper.find('li').props().className).to.include('todo-item');
  });

  it('should render a children', function () {
    const wrapper = shallow(<TodoItem><span>Hey</span></TodoItem>);
    expect(wrapper.contains(<span>Hey</span>)).to.equal(true);
  })
});
```

Przy pisaniu testów oprócz frameworka Mocha i Karmy używam jeszcze biblioteki do asercji [Chai](http://chaijs.com/) oraz bibliotekę do testowania komponentów [enzyme](http://airbnb.io/enzyme/) stworzoną przez Airbnb.

Mi bardzo odpowiada sposób asercji w stylu BDD, ale biblioteka Chai pozwala również na pisanie asercji w klasycznym sposobie (np. `assert('foo' !== 'bar', 'foo is not bar');`). Styl BDD mnie przekonał, bo testy z takimi asercjami czyta się jak zwykłe zdania. Dla mnie właśnie takie asercje BDD są najbardziej zbliżonym kodem do języka naturalnego. Czyta się je bardzo szybko i nie trzeba się zastanawiać co otrzymujemy.

Biblioteka enzyme natomiast bardzo pomaga testować pojedyńcze komponenty w izolacji. Do biblioteki React jest dodatkowa biblioteka wspomająca testowanie [React Test Utilities](https://facebook.github.io/react/docs/test-utils.html), ale ze względu na łatwe użycie pozostałem przy enzyme. Biblioteka oferujemy nam 3 główne metody `shallow`, `mount` i `render`. W [dokumentacji](http://airbnb.io/enzyme/docs/api/index.html) metody są bardzo dobrze opisane i przedstawione są przypadki użycia każdej z nich. Do testowania komponentów prezentacyjnych najczęściej używa się funkcji `shallow` oraz `render`. Każda funkcja zwraca nam obiekty odpowiedniego typy. Dla metody `shallow` dostajemy objekty typu `ShallowWrapper`, które oferują nam mnóstwo przydatnych funkcji. W moich testach wykorzystywałem tylko metod `find` i `contains`, ale pewnie inne funkcje do moich przypadków testowych nadają się lepiej.

Pisanie testów z wykorzystaniem tych dwóch bibliotek jest bardzo proste i przyjemne, ale to dopiero początek mojej drogi z pisaniem testów jednostkowych. Teraz zostało mi poznawanie innych funkcji tych bibliotek i znajdowanie odpowiednich zastosowań dla nich, by kod był jeszcze bardziej zrozumiały i prosty w utrzymaniu.
