import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { Person } from '../src/Person';  // Импортируем класс Person

// Массив с тестовыми данными
const damageDataProvider = [
  { damage: 1, expectedHp: 9 },
  { damage: 2, expectedHp: 8 },
  { damage: 3, expectedHp: 7 },
  { damage: 4, expectedHp: 8 },
];

// Список случайных ошибок
const ERROR_TYPES = ['IndexError', 'ValueError', 'TypeError', 'KeyError'];

// Тест с параметризацией
test('JS Нанесение урона с разными параметрами', async () => {
  // Добавляем параметры в отчет Allure
  allure.owner('Alex');
  allure.epic('Боевая система');
  allure.feature('Получение урона');
  allure.story('Чистый урон');

  for (const { damage, expectedHp } of damageDataProvider) {
    // Добавляем параметры для каждого теста в Allure
    allure.parameter('damage', String(damage));
    allure.parameter('expectedHp', String(expectedHp));

    // Шаг 1: Создание персонажа
    await allure.step('Шаг 1. Проверяем, что создан объект персонажа', () => {
      const person = new Person('Alex');
      expect(person.getName()).toBe('Alex');
      return person; // Возвращаем объект персонажа
    }).then(async (person) => {
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
        if (Math.random() < 0.95) {
          person.takeTrueDamage(damage);
        }
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
          const errorType = ERROR_TYPES[Math.floor(Math.random() * ERROR_TYPES.length)];
          throw new Error(`Случайная ошибка: ${errorType}`);
        }
      });
    });
  }
});
