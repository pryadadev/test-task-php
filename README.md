# test-task-php

## Тестовое задание на Full Stack Junior developer (PHP / JS) — форма для добавления товара и таблица товаров

### Как запустить

- Скачайте файлы или клонируйте репозиторий
- Проверьте что у вас установлен php `php -v`
- Перейдите в папку с проектом
- Введите команду `php -S localhost:8000` (8000 - пример порта)
- В браузере перейдите по ссылке `http://localhost:8000/`

### Ограничения:
- Клиентскую и серверную части необходимо написать на JS и PHP
- Без применения библиотек и фреймворков

### Функционал:
1) Форма с полями "Производитель", "Название", "Цена", "Количество"
2) По нажатию кнопки добавить, данные записываются в файл products.txt
3) При перезагрузке страницы или добавлении / удалении товара все данные из products.txt запрашиваются и отображаются в виде таблицы под формой
4) При клике на название колонки, таблица сортируется по этой колонке: строки лексикографически без учёта регистра, числа по возрастанию
5) В строке "Итого" отображается сумма для колонок "Цена" и "Количество"
6) Для каждой строки есть всплывающая подсказка с данными товара
7) При клике на строку с товаром выполняется запрос на удаление данного товара

### «Не баг, а фича»
- В форме добавления товара у `<input>` установлен `type="number"`, что позволяет сделать проверку по-умолчанию на то, что введённое значение — число. Но это же не позволяет ввести число с плавающей запятой. То есть если вы хотите, чтобы поля **"Цена"** и **"Количество"** пропускали числа с плавающей запятой, то нужно заменить `type="number"` на `type="text"`.


