import { test, expect } from '@playwright/test';
import { Person } from '../src/Person';

// Массив с тестовыми данными
const damageDataProvider = [
  { damage: 1, expectedHp: 9 },
  { damage: 2, expectedHp: 8 },
  { damage: 3, expectedHp: 7 },
  { damage: 4, expectedHp: 6 },
];

// Список случайных ошибок
const ERROR_TYPES = ['IndexError', 'ValueError', 'TypeError', 'KeyError'];

test.describe('Проверка получения урона', () => {
  // Используем test.each для параметризации теста с одинаковым названием для всех тестов
  test.each(damageDataProvider)(
    'JS Тест повреждения', // Статичное название для всех тестов
    async ({ damage, expectedHp }) => {
      allure.owner('Alex');
      allure.epic('Боевая система');
      allure.feature('Получение урона');
      allure.story('Чистый урон');

      // Шаг 1: Создание персонажа
      const person = new Person('Alex');
      expect(person.getName()).toBe('Alex');
      expect(person.getHp()).toBe(10);

      // Добавляем параметры в отчет Allure
      allure.parameter('damage', String(damage));
      allure.parameter('expectedHp', String(expectedHp));

      // Шаг 2: Нанесение урона
      person.takeTrueDamage(damage);
      expect(person.getHp()).toBe(expectedHp);

      // Шаг 3: Генерация случайной ошибки (20% шанс)
      if (Math.random() < 0.2) {
        const errorType = ERROR_TYPES[Math.floor(Math.random() * ERROR_TYPES.length)];
        throw new Error(`Случайная ошибка: ${errorType}`);
      }
    }
  );
});
