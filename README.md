# Хорарный астропроцессор

Статическое веб‑приложение для хорарной астрологии (Regiomontanus, Frawley, производные дома, рецепции, достоинства и поражения).

## Быстрый запуск на Android (рекомендуется)

### Вариант 0: APK из GitHub Actions (без сборки на телефоне)
1. Откройте вкладку **Actions** в репозитории GitHub.
2. Выберите workflow **Build Android APK** и дождитесь успешного запуска.
3. В **Artifacts** скачайте:
   - `horary-astro-debug.apk` (debug)
   - `horary-astro-release-unsigned.apk` (release, без подписи)
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
./gradlew assembleRelease
```
Готовый APK будет здесь:
`android/app/build/outputs/apk/debug/app-debug.apk`
и release (unsigned):
`android/app/build/outputs/apk/release/app-release-unsigned.apk`

## Подписание release APK (если нужно опубликовать)
1. Создайте keystore:
   ```bash
   keytool -genkeypair -v -keystore horary-astro.keystore \
     -alias horaryastro -keyalg RSA -keysize 2048 -validity 10000
   ```
2. Подпишите APK:
   ```bash
   apksigner sign --ks horary-astro.keystore \
     android/app/build/outputs/apk/release/app-release-unsigned.apk
   ```
3. Проверка подписи:
   ```bash
   apksigner verify android/app/build/outputs/apk/release/app-release-unsigned.apk
   ```

## Примечания
- Поиск городов использует Nominatim (OpenStreetMap) и требует интернет.
- Если поиск недоступен, можно вручную ввести широту/долготу.
