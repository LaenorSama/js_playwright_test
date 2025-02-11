import { test } from "@playwright/test";
import { Person } from '../src/Person';
import { allure } from "allure-playwright"; // Используем правильный Allure плагин

// Набор тестовых данных
const damageDataProvider = [
  { damage: 1, expectedHp: 9 },
  { damage: 2, expectedHp: 8 },
  { damage: 3, expectedHp: 7 },
  { damage: 4, expectedHp: 8 }, // Этот пример сломается
];

// Один параметризованный тест
test('Проверка урона персонажа с параметрами', async () => {
  allure.epic('Боевая система');
  allure.feature('Получение урона');
  allure.story('Параметризованный тест урона');

  // Передаем каждый набор параметров в Allure
  for (const { damage, expectedHp } of damageDataProvider) {
    await allure.parameter('damage', String(damage));
    await allure.parameter('expectedHp', String(expectedHp));

    // Шаг 1: Создание персонажа
    const person = new Person('Alex');
    allure.step('Создаем персонажа', () => {
      expect(person.getName()).toBe('Alex');
      expect(person.getHp()).toBe(10);
    });

    // Шаг 2: Наносим урон
    allure.step(`Наносим урон: ${damage}, ожидаемое HP: ${expectedHp}`, () => {
      person.takeTrueDamage(damage);
      allure.attachment(
        'Лог урона',
        `Персонажу Alex нанесен урон ${damage}. Оставшееся HP: ${person.getHp()}`,
        'text/plain'
      );

      // Проверяем результат
      expect(person.getHp()).toBe(expectedHp);
    });

    // Шаг 3: Случайная ошибка (20% шанс)
    allure.step('Генерация случайной ошибки (20% шанс)', () => {
      if (Math.random() < 0.2) {
        throw new Error('Случайная ошибка произошла!');
      }
    });
  }
});
