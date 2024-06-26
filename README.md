# EUREKABPO.USER_PRIVILEGE_CHECKER

## Тестовое задание

Необходимо написать простое web-приложение с использованием node.js + node-addon-api (C++) + WinAPI для проверки привилегии пользователя (например, Администратор/Пользователь/Гость) в списке пользователей операционной системы Windows.

Приложение должно работать по следующему сценарию

1. Пользователь запускает web-сервер из корня проекта:
   server.bat
2. Автоматически открывается браузер с начальной web страницей, на которой отображаются
   - поле ввода имени пользователя
   - кнопка "Проверить"
3. Пользователь вводит любое имя пользователя и нажимает на "проверить"
4. Если введённый пользователь в списке пользователей имеет привилегию Администратор/Пользователь/Гость, отображается страница с надписью "Пользователь имя_введённого_пользователя имеет привилегию привилегия_введённого пользователя", иначе "Пользователя имя_введённого_пользователя нет". Под надписью есть кнопка "Назад", при нажатии на которую происходит возврат на начальную страницу.
5. Проверку привилегий осуществлять через WinAPI.

    Для самопроверки список пользователей для проверки можно получить через Управление компьютером->Служебные программы->Локальные пользователи и группы->Пользователи.

6. В корне проекта создать файл README.MD с текстом тестового задания в кодировке UTF-8

7. Проект с исходными кодами выложить на github.com (другие ресурсы не рассматриваются).

## Зависимости
Для работы:

```npm install node-gyp node-addon-api express```

Для тестов:

```npm install --save-dev jest jest-extended supertest```

## Сборка
```node-gyp configure build```

## Запуск
```.\server.bat```

## License
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />These projects are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

Developed by <b><a href="https://bezukh.wixsite.com/blog">Bezukh Vladimir</a></b>. All right reserved.
