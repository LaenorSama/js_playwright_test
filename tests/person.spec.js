import { test, expect } from '@playwright/test';
import { Person } from '../src/Person';
import { allure } from "allure-playwright";

// Тестовые данные
const damageDataProvider = [
  { damage: 1, expectedHp: 9 },
  { damage: 2, expectedHp: 8 },
  { damage: 3, expectedHp: 7 },
  { damage: 4, expectedHp: 6 },
];

// Ошибки для случайного теста
const ERROR_TYPES = ['IndexError', 'ValueError', 'TypeError', 'KeyError'];

test.describe.parallel('Проверка получения урона', () => {
  damageDataProvider.forEach(({ damage, expectedHp }) => {
    test(`JS Нанесение урона ${damage} (Ожидаемый HP: ${expectedHp})`, async ({}) => {
      allure.owner('Alex');
      allure.epic('Боевая система');
      allure.feature('Получение урона');
      allure.story('Чистый урон');

      // Добавляем параметры в Allure
      allure.parameter('damage', String(damage));
      allure.parameter('expectedHp', String(expectedHp));

      // Создание персонажа
      const person = new Person('Alex');
      expect(person.getName()).toBe('Alex');

      allure.attachment(
        'Лог операции',
        `Создан персонаж ${person.getName()} с ${person.getHp()} HP`,
        'text/plain'
      );
      expect(person.getHp()).toBe(10);

      // Нанесение урона
      person.takeTrueDamage(damage);
      allure.attachment(
        'Лог операции',
        `Персонажу ${person.getName()} нанесен урон ${damage}, осталось HP: ${person.getHp()}`,
        'text/plain'
      );
      expect(person.getHp()).toBe(expectedHp);

      // Случайная ошибка (20% шанс)
      if (Math.random() < 0.2) {
        const errorType = ERROR_TYPES[Math.floor(Math.random() * ERROR_TYPES.length)];
        throw new Error(`Случайная ошибка: ${errorType}`);
      }
    });
  });
});
