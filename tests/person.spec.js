import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { Person } from '../src/Person'; // предполагаем, что у вас есть класс Person

// Массив с данными для теста
const damageDataProvider = [
  { damage: 1, expectedHp: 9 },
  { damage: 2, expectedHp: 8 },
  { damage: 3, expectedHp: 7 },
  { damage: 4, expectedHp: 6 },
];

test.describe('Проверка получения урона', () => {
  // Используем обычный цикл for для параметризации
  for (const { damage, expectedHp } of damageDataProvider) {
    test(`JS Нанесение урона ${damage} (Ожидаемый HP: ${expectedHp})`, async () => {
      // Устанавливаем описание и параметры в Allure
      allure.owner('Alex');
      allure.epic('Боевая система');
      allure.feature('Получение урона');
      allure.story('Чистый урон');
      allure.parameter('damage', String(damage));
      allure.parameter('expectedHp', String(expectedHp));

      // Шаг 1: Создание персонажа
      const person = new Person('Alex');
      await allure.step('Шаг 1. Проверяем, что создан объект персонажа', () => {
        expect(person.getName()).toBe('Alex');
        expect(person.getHp()).toBe(10);
      });

      // Шаг 2: Проверка стартового HP
      await allure.step('Шаг 2. Проверяем, что базовое здоровье 10', () => {
        allure.attachment(
          'Лог операции',
          `Создан персонаж ${person.getName()} с ${person.getHp()} HP`,
          'text/plain'
        );
        expect(person.getHp()).toBe(10);
      });

      // Шаг 3: Нанесение урона
      await allure.step('Шаг 3. Проверяем, что урон проходит', () => {
        person.takeTrueDamage(damage);
        allure.attachment(
          'Лог операции',
          `Персонажу ${person.getName()} нанесен урон ${damage}, осталось HP: ${person.getHp()}`,
          'text/plain'
        );
        expect(person.getHp()).toBe(expectedHp);
      });

      // Шаг 4: Случайная ошибка (20% шанс)
      await allure.step('Шаг 4. Генерация случайной ошибки', () => {
        if (Math.random() < 0.2) {
          const ERROR_TYPES = ['IndexError', 'ValueError', 'TypeError', 'KeyError'];
          const errorType = ERROR_TYPES[Math.floor(Math.random() * ERROR_TYPES.length)];
          throw new Error(`Случайная ошибка: ${errorType}`);
        }
      });
    });
  }
});
