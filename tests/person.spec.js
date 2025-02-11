import { test, expect } from '@playwright/test';
import { Person } from '../src/Person';
import { allure } from "allure-playwright"; // Правильный импорт

// Массив с тестовыми данными
const damageDataProvider = [
  { damage: 1, expectedHp: 9 },
  { damage: 2, expectedHp: 8 },
  { damage: 3, expectedHp: 7 },
  { damage: 4, expectedHp: 8 }, // Исправлено ожидаемое значение
];

// Список случайных ошибок
const ERROR_TYPES = ['IndexError', 'ValueError', 'TypeError', 'KeyError'];

test.describe('Тестирование персонажа', () => {
  for (const { damage, expectedHp } of damageDataProvider) {
    test(`Персонаж получает ${damage} урона, ожидаемое HP: ${expectedHp}`, async () => {
      allure.epic('Боевая система');
      allure.feature('Получение урона');
      allure.story('Чистый урон');

      // Добавляем параметры в отчет Allure
      allure.parameter('damage', String(damage));
      allure.parameter('expectedHp', String(expectedHp));

      // Шаг 1: Создание персонажа
      const person = new Person('Alex');
      step1CreatePerson(person, 'Alex');

      // Шаг 2: Проверка стартового HP
      step2CheckBaseHealth(person, 10);

      // Шаг 3: Нанесение урона
      step3ApplyDamage(person, damage, expectedHp);

      // Шаг 4: Случайная ошибка (20% шанс)
      step4IntroduceRandomError();
    });
  }
});

// Функции шагов для Allure

function step1CreatePerson(person, expectedName) {
  allure.step('Шаг 1. Проверяем, что создан объект персонажа', () => {
    expect(person.getName()).toBe(expectedName);
  });
}

function step2CheckBaseHealth(person, expectedHp) {
  allure.step('Шаг 2. Проверяем, что базовое здоровье 10', () => {
    allure.attachment(
      'Лог операции',
      `Создан персонаж ${person.getName()} с ${person.getHp()} HP`,
      'text/plain'
    );
    expect(person.getHp()).toBe(expectedHp);
  });
}

async function step3ApplyDamage(person, damage, expectedHp) {
  allure.step('Шаг 3. Проверяем, что урон проходит', () => {
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
}


function step4IntroduceRandomError() {
  allure.step('Шаг 4. Генерация случайной ошибки', () => {
    if (Math.random() < 0.2) { // Условие завершено
      const errorType = ERROR_TYPES[Math.floor(Math.random() * ERROR_TYPES.length)];
      throw new Error(`Случайная ошибка: ${errorType}`);
    }
  });
}
