import { test, expect } from '@playwright/test';
import { Person } from '../src/Person';
import { allure } from "allure-playwright"; // Используйте `allure-playwright` для интеграции

// Массив с тестовыми данными
const damageDataProvider = [
  { damage: 1, expectedHp: 9 },
  { damage: 2, expectedHp: 8 },
  { damage: 3, expectedHp: 7 },
  { damage: 4, expectedHp: 8 }, // 4-й тест сломается
];

// Список случайных ошибок
const ERROR_TYPES = ['IndexError', 'ValueError', 'TypeError', 'KeyError'];

test.describe('Тестирование персонажа', () => {
  test('Параметризованный тест: проверка урона персонажа', async () => {
    allure.epic('Боевая система');
    allure.feature('Получение урона');
    allure.story('Чистый урон');

    // Создаем персонажа один раз для всех шагов
    const person = new Person('Alex');
    await allure.step('Шаг 1: Создание персонажа', async () => {
      expect(person.getName()).toBe('Alex');
    });

    // Перебираем все примеры из dataProvider
    for (const { damage, expectedHp } of damageDataProvider) {
      await allure.step(`Шаг: Проверка урона ${damage}, ожидаемое HP ${expectedHp}`, async () => {
        // Добавляем параметры в отчет
        allure.parameter('damage', String(damage));
        allure.parameter('expectedHp', String(expectedHp));

        // Проверка стартового здоровья
        allure.step('Шаг 2: Проверка начального здоровья', () => {
          expect(person.getHp()).toBe(10);
        });

        // Нанесение урона
        allure.step(`Шаг 3: Наносим ${damage} урона`, () => {
          person.takeTrueDamage(damage);
          allure.attachment(
            'Лог урона',
            `Нанесен урон: ${damage}. Остаток здоровья: ${person.getHp()}`,
            'text/plain'
          );
          expect(person.getHp()).toBe(expectedHp);
        });

        // Генерация случайной ошибки (20% шанс)
        allure.step('Шаг 4: Проверка на случайную ошибку', () => {
          if (Math.random() < 0.2) {
            const errorType = ERROR_TYPES[Math.floor(Math.random() * ERROR_TYPES.length)];
            throw new Error(`Случайная ошибка: ${errorType}`);
          }
        });
      });
    }
  });
});
