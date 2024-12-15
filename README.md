# Download Manager + Converter (DataURL)

GH-PAGES: 

[![Build status](https://ci.appveyor.com/api/projects/status/p4q50tkooxuo8rsr?svg=true)](https://ci.appveyor.com/project/bugagi67/download-manager-converter)

Легенда
Вы делаете веб-интерфейс к облачному хранилищу данных (Dropbox, Google Drive, Yandex Disk, Mail.ru Облако), с которого можно скачивать книги (обратите внимание, никакого пиратского контента, только свободно распространяемый материал). И вам нужно реализовать интерфейс для скачивания средствами JS.

Подсказка: храните контент файлов предзашитым в виде DataURL в теле страницы (тяжёлые файлы специально убраны).

Но при этом также нужно показать пользователю, сколько мегабайт он уже скачал.

PDF-файлы для реализации вы найдёте в каталоге files данного репозитория.

Обратите внимание, что скачивание должно производиться средствами JS и подсчёт количества скачанных мегабайт должен производиться на базе реально скачанного контента (а не тех размеров, что указаны в табличке).

При этом если одна книжка скачивается дважды, то и учитываться в обьёме скачанного она должна также дважды.