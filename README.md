# Angular Planner

Полноценный тоду-менеджер на Angular 22 с авторизацией, папками, поиском и модальным редактированием.

## Стек

- Angular 22 (Signals, Standalone Components)
- TypeScript 6
- pnpm
- SCSS
- localStorage для персистентности

## Запуск

```bash
pnpm install
pnpm start
```

Откроется на `http://localhost:4200`

## Тестовые аккаунты

| Email | Пароль | Роль |
|-------|--------|------|
| `admin@test.com` | `123456` | Администратор |
| `user@test.com` | `qwerty` | Пользователь |

## Функционал

### Авторизация
Липовая авторизация через Angular Guard и Interceptor. Токен хранится в localStorage, добавляется к HTTP-запросам через `authInterceptor`.

### Управление задачами
- Добавление задач в выбранные папки
- Редактирование через модальное окно (название + перенос в другую папку)
- Отметка выполненных задач
- Удаление задач
- Поиск по названию

### Управление папками
- Создание папок с выбором цвета
- Редактирование названия и цвета
- Удаление папок (вместе с задачами)
- Счётчик задач в каждой папке

### Нотификации
Всплывающие уведомления при каждом действии: добавлении, удалении, редактировании, перемещении задач и папок.

## Архитектура

```
src/app/
├── auth/                    # Сервис авторизации
│   └── auth.service.ts
├── guards/                  # Route guards
│   └── auth.guard.ts        # authGuard + guestGuard
├── interceptors/            # HTTP interceptors
│   └── auth.interceptor.ts  # Добавляет Bearer токен
├── models/
│   └── todo.model.ts        # Интерфейсы Todo, Folder
├── services/
│   └── todo.service.ts      # Управление состоянием (Signals)
├── components/
│   ├── sidebar/             # Боковая панель папок
│   ├── todo-list/           # Список задач + модалка
│   ├── todo-item/           # Элемент задачи
│   ├── add-todo/            # Форма добавления
│   ├── search-bar/          # Поиск
│   ├── modal/               # Модальное окно редактирования
│   └── notif/               # Система нотификаций
└── pages/
    ├── login/               # Страница входа
    └── home/                # Главная страница
```

## Скриншоты

### Страница входа

![Login page](docs/screenshots/01-login-page.png)

### Заполненная форма логина

![Login filled](docs/screenshots/02-login-filled.png)

### Главная страница

![Main page](docs/screenshots/03-main-page.png)

### Выбранная папка

![Folder selected](docs/screenshots/04-folder-selected.png)

### Добавление задачи

![Add todo](docs/screenshots/05-add-todo.png)

### Задача добавлена

![Todo added](docs/screenshots/06-todo-added.png)

### Поиск задач

![Search](docs/screenshots/07-search.png)

### Задача выполнена

![Todo completed](docs/screenshots/08-todo-completed.png)

### Модальное окно редактирования

![Edit modal](docs/screenshots/09-edit-modal.png)

### Создание папки

![Add folder](docs/screenshots/10-add-folder.png)

### Папка создана

![Folder created](docs/screenshots/11-folder-created.png)

### Полный вид приложения

![Full app](docs/screenshots/12-full-app.png)
