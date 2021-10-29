---
layout: post
title: Lighthouse
tags: dajsiepoznac2017
date: 2017-04-05
path: /lighthouse
---

Lighthouse. Co to takiego? Co ma wspólnego latarnia z IT?
Okazuje się, że coś wspólnego ma. Lighthouse to projekt o otwrtym kodzie źródłowym pozwalającym sprawdzić różne metryki strony internetowej. Dzięki niej możemy się dowiedzieć, czego brakuje naszej aplikacji do stania się Progresywną Aplikacją Webową.

<!--more-->

Korzystać z [Lighthouse](https://github.com/GoogleChrome/lighthouse) możemy na kilka sposobów. Dostepne jest rozszerzenie do przeglądarki Google Chrome i jako aplikacja konsolowa. Skupię się dzisiaj na rozszerzeniu i pokażę jak z pomocą tak prostego, łatwego w użyciu narzędzia możemy odkryć błędy naszej aplikacji oraz znaleźć potencjalne miejsca na ulepszenia.

Instrukcje instalacji są dostępne w [repozytorium projektu](https://github.com/GoogleChrome/lighthouse). Aplikacja jest dostępna w sklepie z rozszerzeniami Chrome i instalacja zajmuje krótką chwilkę. Po instalacji w oknie przeglądarki zostaje dodana ikona z latarnią i możemy zabrać się za sprawdzanie aplikacji webowych.

Wystarczy tylko przejść na stronę, którą chcemy przetestować, kliknąć ikonkę i przycisk "generate report" i po kilkunastu sekundach dostajemy ładny raport o stronie i ewentualnych błędach + ogólny wynik strony w 100 punktowej skali.

![Wynik lighthouse dla blog.marlas.pl](blog-marlas-pl-lighthouse.png)

Na blogu jest jeszcze parę rzeczy do poprawy i mój ogólny wynik wyniósł 38/100 punktów, ale nie jest najgorzej. Przy każdym błedzie jest dokładna informacja o przyczynie i o zalecanych krokach do naprawy tego problemu. Naprawdę polecam każdemu te rozszerzenie, bo pozwala złapać poważne błędy, które możemy czasem poprawić w bardzo krótkim czasie. Aktualnie blog nie ma pliku manifestu oraz service workera i przez to tracę masę punktów, ale reszta wyników jest bardzo dobra.

Nazwa lighthouse wzięła się z tego, że te narzędzie miało być latarnią, która prowadzi do Progresywnych Aplikacji Webowych. Działa bardzo dobrze i warto z niego korzystać, nawet jeśli nie tworzymy progresywnych aplikacji. Twórcy cały czas dorzucają nowe metryki i dzięki temu z czasem będziemy w stanie z Lighthouse wyłapać jeszcze więcej niedociągnięć strony.

Każdemu polecam sprawdzić swoje aplikacje z pomocą Lighthouse i dzięki temu poprawić swoje aplikacje.
