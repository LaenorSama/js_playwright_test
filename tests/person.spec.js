import { test, expect } from '@playwright/test';
import { Person } from '../src/Person';
import { allure } from "allure-playwright";
//import * as allure from "allure-js-commons";

// Массив с тестовыми данными
const damageDataProvider = [
  { damage: 1, expectedHp: 9 },
  { damage: 2, expectedHp: 8 },
  { damage: 3, expectedHp: 7 },
  { damage: 4, expectedHp: 8 },
];

// Список случайных ошибок
const ERROR_TYPES = ['IndexError', 'ValueError', 'TypeError', 'KeyError'];

test.describe('Тестирование персонажа', () => {
  for (const { damage, expectedHp } of damageDataProvider) {
    test(`Персонаж получает ${damage} урона, ожидаемое HP: ${expectedHp}`, async () => {
      allure.owner("Alex");
      allure.epic('Боевая система');
      allure.feature('Получение урона');
      allure.story('Чистый урон');

      // Добавляем параметры в отчет Allure
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
    });
  }
});

test('Test Authentication', async () => {
  // Указываем, что тест является ручным в Allure
  await allure.label('ALLURE_MANUAL', 'true');

  // Шаг 1: Открыть страницу сайта
  await allure.step('Открыть страницу сайта', async () => {});

  // Шаг 2: Ввести логин
  await allure.step('Ввести логин', async () => {});

  // Шаг 3: Ввести пароль
  await allure.step('Ввести пароль', async () => {});

  // Шаг 4: Нажать "Войти"
  await allure.step('Нажать "Войти"', async () => {});

  // Шаг 5: Открылась домашняя страница пользователя
  await allure.step('Открылась домашняя страница пользователя', async () => {});
});
