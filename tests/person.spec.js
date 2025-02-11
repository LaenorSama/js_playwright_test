import { test, expect } from '@playwright/test';
import { Person } from '../src/Person';
import { allure } from "allure-playwright"; // Используем правильный Allure плагин

// Массив с тестовыми данными
const damageDataProvider = [
  { damage: 1, expectedHp: 9 },
  { damage: 2, expectedHp: 8 },
  { damage: 3, expectedHp: 7 },
  { damage: 4, expectedHp: 8 }, // Этот пример сломается
];

test.describe('Тестирование персонажа', () => {
  // Параметризованный тест
  for (const { damage, expectedHp } of damageDataProvider) {
    test(`Персонаж получает ${damage} урона, ожидаемое HP: ${expectedHp}`, async ({}) => {
      // Указываем параметры для Allure
      allure.parameter('damage', String(damage));
      allure.parameter('expectedHp', String(expectedHp));

      // Шаг 1: Создание персонажа
      const person = new Person('Alex');
      expect(person.getName()).toBe('Alex');

      // Шаг 2: Проверка базового здоровья
      expect(person.getHp()).toBe(10);

      // Шаг 3: Нанесение урона
      person.takeTrueDamage(damage);
      expect(person.getHp()).toBe(expectedHp);

      // Шаг 4: Случайная ошибка (20% шанс)
      if (Math.random() < 0.2) {
        throw new Error('Случайная ошибка произошла!');
      }
    });
  }
});
