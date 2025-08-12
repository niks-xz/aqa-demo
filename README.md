# Автотесты на Playwright
Автотесты на Playwright для демонстрационного проекта [OWASP Juice Shop](https://juice-shop.herokuapp.com).


## Быстрый старт
```bash
# Установка зависимостей
npm install

# Запуск всех тестов
npm run test

# Запуск тестов с UI (headed режим)
npm run test:headed

# Просмотр отчета
npm run report
```

## 📁 Структура проекта
```
aqa-demo/
├── 📁 config/                    # Конфигурация проекта
│   ├── index.config.ts           # Основная конфигурация
├── 📁 fixtures/                  # Playwright фикстуры
│   └── user.fixture.ts           # Фикстура для работы с пользователями
├── 📁 models/                    # Модели данных
│   └── user.model.ts             # Модель пользователя
├── 📁 pages/                     # Page Object Model
│   └── register.page.ts          # Страница регистрации
├── 📁 tests/                     # Тесты
│   └── ui/
│       └── register/
│           └── register.spec.ts  # Тесты регистрации
├── 📁 utils/                     # Утилиты
│   ├── api/
│   │   └── user.api.ts           # API для работы с пользователями
│   └── data/
│       └── generators/
│           └── user.generator.ts # Генераторы тестовых данных
├── .env                          # Переменные окружения
├── playwright.config.ts          # Конфигурация Playwright
└── tsconfig.json                 # Конфигурация TypeScript
```

## Архитектура

### Основные принципы
- **Page Object Model (POM)** — инкапсуляция логики страниц
- **Fixture Pattern** — переиспользуемые компоненты для тестов
- **Data Generators** — генерация тестовых данных

### Настройки Playwright
- **Параллельность:** `fullyParallel: true`
- **Воркеры:** CI: 4, локально: по количеству CPU
- **Ретраи:** CI: 3, локально: 0
- **Браузеры:** Chromium
- **Видео:** Только при падении тестов
- **Скриншоты:** Только при падении тестов
- **Трейс:** Только при падении тестов
- **Контекст:** Только при падении тестов
- **ForbidOnly:** Запрещает `.only()` в CI окружении
- **Таймаут:** Максимальное время выполнения теста
- **Expect Таймаут:** Максимальное время ожидания в expect

### Автоматический Cleanup
Все созданные через `userHelpers.getUserWithTrack()` пользователи автоматически удаляются после каждого теста.
