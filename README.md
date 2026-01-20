# Хорарный астропроцессор

Статическое веб‑приложение для хорарной астрологии (Regiomontanus, Frawley, производные дома, рецепции, достоинства и поражения).

## Быстрый запуск на Android (рекомендуется)

### Вариант 0: APK из GitHub Actions (без сборки на телефоне)
1. Откройте вкладку **Actions** в репозитории GitHub.
2. Выберите workflow **Build Android APK** и дождитесь успешного запуска.
3. В **Artifacts** скачайте файл `horary-astro-debug.apk`.
4. Перенесите APK на телефон и установите (разрешите установку из неизвестных источников).

### Вариант 1: локальный сервер через Termux
1. Установите **Termux** из F-Droid: https://f-droid.org/packages/com.termux/
2. Откройте Termux и выполните:
   ```bash
   pkg update
   pkg install nodejs git
   git clone <URL_репозитория>
   cd <папка_проекта>
   npm run build
   npx serve -s .
   ```
3. В браузере Android откройте адрес из Termux (обычно `http://127.0.0.1:3000`).

### Вариант 2: любой статический хостинг
1. Загрузите репозиторий на GitHub.
2. Включите GitHub Pages или используйте Netlify/Vercel.
3. Откройте ссылку на телефоне.

### Вариант 3: открыть файл напрямую
Можно открыть `index.html` в браузере, **но** поиск локаций может не работать из‑за CORS.
В этом случае используйте Termux‑сервер или вручную вводите координаты.

## Локальный запуск на ПК
```bash
npm run build
npx serve -s .
```

## Сборка APK локально (Android Studio)
```bash
npm install
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
```
Готовый APK будет здесь:
`android/app/build/outputs/apk/debug/app-debug.apk`

## Примечания
- Поиск городов использует Nominatim (OpenStreetMap) и требует интернет.
- Если поиск недоступен, можно вручную ввести широту/долготу.
