# МАТВЕЙ — PWA

Экран максимально приближен к предоставленному скриншоту: чёрный фон, профиль, 4 точки, цифровая клавиатура и кнопка Face ID.

## Код
`4031`

## Face ID
Кнопка Face ID использует браузерный WebAuthn / platform authenticator. На совместимом устройстве это может открыть системную биометрическую проверку (например, Face ID). WebAuthn доступен только в защищённом контексте (HTTPS; `localhost` является исключением для разработки).

При первом нажатии создаётся локальный passkey для этого origin. В следующие разы используется уже созданный credential.

Пока идёт биометрическая проверка, поверх интерфейса появляется сильный blur и карточка Face ID. После успешной проверки blur снимается.

Важно: этот пример делает локальную проверку результата WebAuthn на клиенте для демонстрации UI. Для настоящей серверной аутентификации сервер должен генерировать challenge и проверять WebAuthn assertion и public key.

## Запуск
Для локального теста:

```bash
python3 server.py
```

Затем откройте `http://localhost:8000`.

Для установки PWA на iPhone разместите папку на HTTPS-домене, откройте сайт в Safari и добавьте его на экран «Домой». Возможность системной биометрии зависит от устройства, браузера и настроек.

Источники API:
- MDN Web Authentication API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API
- MDN Credential types / WebAuthn assertions: https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API/Credential_types
