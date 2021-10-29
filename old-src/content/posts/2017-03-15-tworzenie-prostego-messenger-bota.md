---
layout: post
title: Tworzenie prostego bota do Messengera
tags: dajsiepoznac2017
date: 2017-03-15
path: /tworzenie-prostego-messenger-bota
---

W Internecie pojawia się coraz więcej artykułów o nowym interfejsie, który ma zrewolucjonizować nasz sposób komunikacji z maszynami. Mowa tutaj o botach w komunikatorach. Kolejny rodzaj interfejsu, który ma upodobnić naszą komunikację z urządzeniami i usługami do komunikacji międzyludzkiej.

<!--more-->

Wiele popularnych komunikatorów internetowych (np. Messenger, Slack, Skype, Telegram) daje nam dostęp do API komunikatorów i otwiera nam nowe możliwości do komunikacji z naszymi użytkownikami. Dodatkowo ogromna popularność tych komunikatorów pozwala nam dotrzeć do dużej liczby odbiorców.

Stworzenie dobrego bota jest bardzo trudnym wyzwaniem. Wiąże się to z koniecznością prztwarzania języka naturalnego, zrozumienia komunikatów użytkownika, które są przekazane w bardzo swobodnej formie i wysłania odpowiedniej wiadomości zależnej od poprzednich wiadomości. Mimo, że stworzenie dobrego bota jest ciężkie, to rozpoczęcie przygody z tworzeniem botów jest banalnie proste.

Z pomocą przychodzi nam [Claudia Bot Builder](https://github.com/claudiajs/claudia-bot-builder). Ja z pomocą tego narzędzia byłem w stanie zrobić swojego bota do messengera w ciągu 10 minut. Poniżej pokaże jakie kroki trzeba wykonać, żeby stworzyć swojego pierwszego chat bota na platformę messenger. Finalny rezultat można znaleźć na [githubie](https://github.com/marlass/wyjazd-bot).

Na początku potrzebujemy zainstalować nasze zależności.

```bash
npm install claudia -g
npm install claudia-bot-builder --save
```

Kolejnym krokiem jest stworzenie kodu naszego bota. Tworzę plik `bot.js` z następującym kodem:

```javascript
const botBuilder = require('claudia-bot-builder');

module.exports = botBuilder(request => {
    return 'Hello world!';
});
```

Tak oto stworzyliśmy cały kod dla naszego pierwszego bota. A teraz przejdźmy do najlepszej części Claudia Bot Builder, czyli łatwgo wrzucania i konfiguracji bota. Nie będę opisywał, jak konfiguruje się dane do konta AWS lokalnie. Wszystko jest dostępne [tutaj](https://claudiajs.com/tutorials/installing.html).

Zaczynamy od wykonania polecenia:

```bash
claudia create --region eu-central-1 --api-module bot --configure-fb-bot
```

Polecenie wrzuca naszą aplikacją na AWS Lambda (w tym przypadku na serwer eu-central-1, który znajduje się w  Frankfurcie) i pozwala nam skonfigurować ją z facebookiem. Pod koniec wrzucania w konsoli dostaniemy informację o adresie url bota, jego klucz oraz zostaniemy poproszeni o token strony naszej aplikacji FB i secret.

Na stronie [developers.facebook.com](https://developers.facebook.com) tworzymy aplikację i wybieramy jej typ jako bot messenger. Następnie w panelu aplikacji w zakładce `Products->Messenger` tworzymy token dla wybranej strony oraz uzupełniamy dane w sekcji `webhook` informacjami, które zostały zwrócone w konsoli. W terminalu wprowadzamy wygenerowany token oraz secret dostępny w panelu aplikacji pod zakładką `Settings`. Po wykonaniu tych kroków nasz bot jest gotowy do działania.

Wchodzimy na stronę, do której pdopięliśmy bota i piszemy wiadomość. Na każdą wiadomość nasz bot powinien odpowiedzieć `Hello world!`.

Jak już mamy działającego bota to dodajmy trochę funkcjonalności. Nasz bot ma proponować listę reczy, którą mamy spakować na wyjazdy o różnej długości. Poniżej zamieszczam cały kod bota i już wyjaśniam, co za dziwne elementy tu widzimy.

```javascript
const botBuilder = require('claudia-bot-builder');
const fbTemplate = botBuilder.fbTemplate;

module.exports = botBuilder(request => {
    if (request.type === 'facebook') {
        if (request.text === 'Co zabrać na wyjazd?') {
            const newMsg = new fbTemplate.Text('Na jak długo wyjeżdżasz?');
            
            return newMsg
            .addQuickReply('1 dzień', '1 dzień')
            .addQuickReply('3-4 dni', '3-4 dni')
            .addQuickReply('tydzień', 'tydzień')
            .addQuickReply('2 tygodnie', '2 tygodnie')
            .addQuickReply('miesiąc', 'miesiąc')
            .addQuickReply('> niż miesiąc', '> niż miesiąc')
            .get();
        } else if (request.text === '1 dzień') {
            return 'przeżyjesz bez niczego :P'
        } else if (request.text === '3-4 dni') {
            return 'zabierz 4 koszulki,\nspodnie,\nładowarkę do telefonu,\nbieliznę,\nkosmetyczkę,\nbatony';
        } else if (request.text === 'tydzień') {
            return 'weź kilka koszulek,\n2 pary spodni,\nbieliznę,\nszampon,\nszczoteczkę,\npastę do zębów,\nżel pod prysznic,\nręczniki,\nsłodycze,\n 🐱';

        } else if (request.text === '2 tygodnie') {
            return 'przykro mi, jak wyjeżdżasz na 2 tygodnie to sobie znajdź inne źródła wiadomości z informacjami co trzeba spakować. Hue hue.';

        } else if (request.text === 'miesiąc') {
            return new fbTemplate.Generic()
                .addBubble('Kompletna lista do spakowania', 'Na tej stronie znajdziesz bardzo szczegółową listę rzeczy do spakowania.')
                .addButton('Kompletna lista', 'http://kropkinamapie.pl/zabrac-gory-morze-wakacje-wyjazd-check-lista.html')
                .addButton('Inna fajna lista', 'http://podrozniczo.pl/10-rzeczy-ktore-warto-zabrac-ze-soba-w-podroz/')
                .addButton('Dzięki', 'Dzięki')
                .get();

        } else if (request.text === '> niż miesiąc') {
            return 'kup tam mieszkanie,\nwszystko kup na miejscu,\nnie zapomnij wziąć pieniędzy,\nweź jeszcze więcej pieniędzy.\nTo wszystko.';
        } else if (request.text === 'Dzięki' || request.text === 'dzięki' || request.text === 'thx' || request.text === 'Dziękuję') {
            return 'Proszę. Taka moja praca :)'
        } else {
            return 'Żeby rozpocząć zadaj mi pytanie: Co zabrać na wyjazd?';
        }
    }
});
```

Na samej górze funkcji owijam wszystko w warunek `request.type === 'facebook'`. Jako, że Claudia pozwala nam tworzyć jeden kod na wiele różnych komunikatór jednocześnie musimy specjalne funkcjonalności chatów oferować tylko odpowiednim komunikatorom. Mój bot ma działać tylko na platformie messenger, przez co korzystam z bardziej zaawansowanych elementów, takich jak szybkie odpowiedzi, czy szablony. Kolejnym atrybutem zmiennej `request` jest `text` i to właśnie w tym atrybucie dostajemy wiadomość wysłaną nam przez użytkownika. Mój bot w przypadku pytania 'Co zabrać na wyjazd?' zaoferuje kilka szybkich odpowiedzi, dla których zostały przygotowane listy.

W moim przykładzie użyłem specjalnych funkcjonalności messengera, czyli szybkich odpowiedzi i szablonów. Dokładna specyfikacja tych funkcji jest dostępna na stronie [dokumentacji claudia-bot-buildera](https://github.com/claudiajs/claudia-bot-builder/blob/master/docs/FB_TEMPLATE_MESSAGE_BUILDER.md#list-template). Te funkcjonalności pozwalają nam na większą kontrolę komunikacji z użytkownikiem. Oferując mu szybkie odpowiedzi możemy dostawać zdefiniowane przez nas komunikaty, a nie odpowiadać na literówki wiadomością `Nie rozumiem. W czym mogę pomóc?`. Szablony natomiast pozwalają nam przekazać dużo opcji użytkownikowi i pokazanie bardziej multimedialnych komunikatów. Możemy wysyłać załączniki, wiadomości audio, filmy, zdjęcia, linki, a nawet paragony. Bardzo polecam korzystanie z tych elementów, bo jest to jeden z prostszych sposobów, których możemy użyć, żeby nasz bot pomagał użytkowikowi wykonać zadanie, a nie go frustrować.

Zapraszam wszystkich do eksperymentowania z chat botami, bo start naprawdę jest bardzo szybki i łatwy, a można znaleźć do nich kilka bardzo fajnych zastosowań.
