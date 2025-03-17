import { test, expect } from '@playwright/test';
import { Person } from '../src/Person';
import { allure } from "allure-playwright";

// Массив с тестовыми данными
const damageDataProvider = [
  { damage: 1, expectedHp: 9 },
  { damage: 2, expectedHp: 8 },
  { damage: 3, expectedHp: 7 },
  { damage: 4, expectedHp: 6 },
];

// Список случайных ошибок
const ERROR_TYPES = ['IndexError', 'ValueError', 'TypeError', 'KeyError'];

// Основной блок тестов
test.describe('Проверка получения урона', () => {
  test.each(damageDataProvider)(
    'JS Нанесение урона $damage (Ожидаемый HP: $expectedHp)', 
    async ({ damage, expectedHp }) => {
      allure.owner('Alex');
      allure.epic('Боевая система');
      allure.feature('Получение урона');
      allure.story('Чистый урон');

      // Добавляем параметры в отчет Allure
      allure.parameter('damage', String(damage));
      allure.parameter('expectedHp', String(expectedHp));

      // Шаг 1: Создание персонажа
      const person = new Person('Alex');
      expect(person.getName()).toBe('Alex');
      allure.attachment(
        'Лог операции',
        `Создан персонаж ${person.getName()} с ${person.getHp()} HP`,
        'text/plain'
      );
      expect(person.getHp()).toBe(10);

      // Шаг 2: Нанесение урона
      person.takeTrueDamage(damage);
      allure.attachment(
        'Лог операции',
        `Персонажу ${person.getName()} нанесен урон ${damage}, осталось HP: ${person.getHp()}`,
        'text/plain'
      );
      expect(person.getHp()).toBe(expectedHp);

      // Шаг 3: Генерация случайной ошибки (20% шанс)
      if (Math.random() < 0.2) {
        const errorType = ERROR_TYPES[Math.floor(Math.random() * ERROR_TYPES.length)];
        throw new Error(`Случайная ошибка: ${errorType}`);
      }
    }
  );
});
