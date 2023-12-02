[![Actions Status](https://github.com/FTSx0/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/FTSx0/frontend-project-46/actions)
[![Actions Status](https://github.com/FTSx0/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/FTSx0/frontend-project-46/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/68b5ca739eef12fa4a2f/maintainability)](https://codeclimate.com/github/FTSx0/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/68b5ca739eef12fa4a2f/test_coverage)](https://codeclimate.com/github/FTSx0/frontend-project-46/test_coverage)

> # Проект: ["Вычислитель отличий"](https://ru.hexlet.io/programs/frontend/projects/46 '| Хекслет | Проект №2 | Frontend-разработчик |')
>
> Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.
>
> **Возможности утилиты:**
>
> - Поддержка разных входных форматов: yaml, json
> - Генерация отчета в виде plain text, stylish и json

---

> **Установка:**
>
> ```bash
> $ make install
> ```
>
> **Пример использования:**
>
> _# формат plain_
>
> ```bash
> gendiff --format plain path/to/file.yml another/path/file.json
>
> Property 'common.follow' was added with value: false
> Property 'group1.baz' was updated. From 'bas' to 'bars'
> Property 'group2' was removed
> ```
>
> _# формат stylish_
>
> ```bash
> gendiff filepath1.json filepath2.json
>
> {
>  + follow: false
>    setting1: Value 1
>  - setting2: 200
>  - setting3: true
>  + setting3: {
>        key: value
>    }
>  + setting4: blah blah
>  + setting5: {
>        key5: value5
>    }
> }
> ```

---

> **Демонстрация работы проекта:**
>
> - https://asciinema.org/a/617275
> - https://asciinema.org/a/623515
> - https://asciinema.org/a/624259
> - https://asciinema.org/a/624325
> - https://asciinema.org/a/624327
