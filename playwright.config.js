import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: './tests', // Путь к папке с тестами
  reporter: [
    ['list'], // Встроенный репортер для вывода в консоль
    ['allure-playwright', { resultsDir: './out/allure-results' }] // Указан путь к результатам
  ], // ← Запятая добавлена здесь
  use: {
    trace: 'on', // Включение трассировки для отладки
  },
});
