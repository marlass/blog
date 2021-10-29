---
layout: post
title: Types, reducers, action creators
tags: dajsiepoznac2017
date: 2017-03-31
path: /types,reducers,actionCreators
---

W ostatnim poście na temat projektu opisywałem strukturę stanu aplikacji. Dzisiaj pora na kodzenie ostatnich ustaleń w projekcie. Pokażę, jak w projekcie wyglądają typy, kreatory akcji i reduktory.

<!--more-->

Skupię się tutaj na głównie na akcjach i ich kreatorach. Część akcji już ma jest zaimplementowana w reduktorze, ale nie wszystkie. W trakcie prac nie spodobał mi się kod reduktorów i muszę znaleźć lepszy sposób na ich pisanie. Tworzenie nowych obiektów, bez mutacji starych nie jest takie proste jak myślałem, więc może tu wykorzystam bibliotekę do immutability. Może będzie nią Immutability.js, ale to już opiszę w następnym poście.

Prace zacząłem od części stanu - projektów. Na początek zabieram się za pisanie akcji. Wszystkie typy akcji są przechowywane w projekcie w osobnym pliku, przez co powinienem uniknąć błędów z źle wprowadzonymi nazwami typów. Jest to polecana dobra praktyka przy organizacji stanu Redux i każdemu polecam jej używać. Dodatkowo dostajemy lepsze wsparcie w edytorze niż w przypadku ręcznie wpisywanych typów.

Dla projektów stworzyłem następujące typy:

```javascript
export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';
export const SET_PROJECT_DESCRIPTION = 'SET_PROJECT_DESCRIPTION';
export const ADD_PROJECT_CATEGORY = 'ADD_PROJECT_CATEGORY';
export const REMOVE_PROJECT_CATEGORY = 'REMOVE_PROJECT_CATEGORY';
export const SET_PROJECT_CATEGORY_NAME = 'SET_PROJECT_CATEGORY_NAME';
export const SET_PROJECT_CATEGORY_DESCRIPTION = 'SET_PROJECT_CATEGORY_DESCRIPTION';
export const EDIT_PROJECT_ID = 'EDIT_PROJECT_ID';
export const EXPORT_PROJECT_CATEGORY_ID = 'EDIT_PROJECT_CATEGORY_ID';
```

Teraz pora na kolejną część układanki - kreatory akcji. Kolejna rzecz, ktora może wydawać się niepotrzebna, jeśli zaczynamy pracę z Redux. Przecież przy wywoływaniu akcji zawsze ręcznie możemy sobie stworzyć obiekt akcji, to w takim razie po co nam kreatory akcji? Kreatory mają taką samą funkcję, co w przypadku zmiennych do typów. Mają nam ułatwić pracę i wyeliminować często popełniane błędy. Dzięki temu, że akcję deklarujemy w jednym miejscu nie mamy duplikacji kodu, a jeśli potrzebujemy wywołać akcję to wystarczy teraz tylko wywołać jedną funkcję, zamiast ręcznie tworzyć obiekt akcji.

```javascript
import { ADD_PROJECT, REMOVE_PROJECT, SET_PROJECT_NAME,
    SET_PROJECT_DESCRIPTION, ADD_PROJECT_CATEGORY, REMOVE_PROJECT_CATEGORY,
    SET_PROJECT_CATEGORY_NAME, SET_PROJECT_CATEGORY_DESCRIPTION,
    EDIT_PROJECT_ID, EDIT_PROJECT_CATEGORY_ID
} from './../types';

export function addProject(projectId) {
    return {
        type: ADD_PROJECT,
        payload: projectId
    }
}

export function removeProject(projectId) {
    return {
        type: REMOVE_PROJECT,
        payload: projectId
    }
}

export function setProjectName(projectId, name) {
    return {
        type: SET_PROJECT_NAME,
        payload: {
            projectId,
            name
        }
    }
}

export function setProjectDescription(projectId, description) {
    return {
        type: SET_PROJECT_DESCRIPTION,
        payload: {
            projectId,
            description
        }
    }
}

export function addProjectCategory(projectId, categoryId) {
    return {
        type: ADD_PROJECT_CATEGORY,
        payload: {
            projectId,
            categoryId
        }
    }
}

export function removeProjectCategory(projectId, categoryId) {
    return {
        type: REMOVE_PROJECT_CATEGORY,
        payload: {
            projectId,
            categoryId
        }
    }
}

export function setProjectCategoryName(projectId, categoryId, name) {
    return {
        type: SET_PROJECT_CATEGORY_NAME,
        payload: {
            projectId,
            categoryId,
            name
        }
    }
}

export function setProjectCategoryDescription(projectId, categoryId, description) {
    return {
        type: SET_PROJECT_CATEGORY_DESCRIPTION,
        payload: {
            projectId,
            categoryId,
            description
        }
    }
}

export function editProjectId(projectId, id) {
    return {
        type: EDIT_PROJECT_ID,
        payload: {
            projectId,
            id
        }
    }
}

export function editProjectCategoryId(projectId, categoryId, id) {
    return {
        type: EDIT_PROJECT_CATEGORY_ID,
        payload: {
            projectId,
            categoryId,
            id
        }
    }
}
```

Każdą akcję mamy dobrze przygotowaną, widzimy jakie parametry otrzymamy w naszym reduktorze, więc możemy zabierać się za jego implementację.

```javascript
import _ from 'lodash';
import { ADD_PROJECT, REMOVE_PROJECT, SET_PROJECT_NAME,
    SET_PROJECT_DESCRIPTION, ADD_PROJECT_CATEGORY, REMOVE_PROJECT_CATEGORY,
    SET_PROJECT_CATEGORY_NAME, SET_PROJECT_CATEGORY_DESCRIPTION,
    EDIT_PROJECT_ID, EDIT_PROJECT_CATEGORY_ID
} from '../types';

const projectsReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case ADD_PROJECT:
      return Object.assign({},state,{[action.payload]: {
        id: action.payload,
        name: '',
        description: '',
        categories: {}
      }});
    case REMOVE_PROJECT:
      return _.omit(state, [action.payload]);
    case SET_PROJECT_NAME:
      return Object.assign({},
        _.set(state,
          `[${action.payload.projectId}].name`,
          action.payload.name))
    case SET_PROJECT_DESCRIPTION:
      return Object.assign({},
        _.set(state,
          `[${action.payload.projectId}].description`,
          action.payload.description))
    case ADD_PROJECT_CATEGORY:
    case REMOVE_PROJECT_CATEGORY:
    case SET_PROJECT_CATEGORY_NAME:
    case SET_PROJECT_CATEGORY_DESCRIPTION:
    case EDIT_PROJECT_ID:
    case EDIT_PROJECT_CATEGORY_ID:
      return state;
    default:
      return state;
  }
};

export default projectsReducer;
```

Reduktor zawsze powinien zwracać nam nowy obiekt, przez co używam `Object.assign`. Jest to nowa metoda z ES6, która pomaga w tworzeniu nowych obiektów na podstawie istniejących. Przy usuwaniu atrybutów z obiektu korzystam z `_.omit`. Ta funkcja biblioteki lodash pozwala usuwac z obiektu pojedyncze atrybuty i wynik zwraca w postaci nowego obiektu, przez co nie jest tutaj wymagana metoda `assign` dla obiektu. Nieobsłużone przypadki zwracają poprzedni stan zgodnie z dobrą praktyką przy korzystaniu z Redux.

Tak wygląda moje podejście do zarządzania akcjami w Redux. Sam nie miałem jeszcze dużej praktyki z Redux i moje rozwiązania mogą nie być optymalne, więc jeśli możecie coś poradzić, to czekam na komentarze. W następnym poście wrócę do reduktorów i spróbuję podejść do nich z niemutowalnymi obiektami.
