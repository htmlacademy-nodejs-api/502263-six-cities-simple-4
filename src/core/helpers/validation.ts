/** Кортежи типа [минимальное значение, максимальное значение] для фиксации и валидации данных */
export const DATA_MIN_MAX = {
  titleLength: [10, 100],
  descLength: [20, 1024],
  rating: [1, 5],
  bedrooms: [1, 8],
  capacity: [1, 10],
  price: [100, 100_000],
  comments: [0, 30],
  weekdays: [1, 7],
  userNameLength: [1, 15],
  passwordLength: [1, 12],
  commentLength: [5, 1024],
} as const;

export const CITIES = [
  { name: 'Paris', coords: [48.85661, 2.351499] },
  { name: 'Cologne', coords: [50.938361, 6.959974] },
  { name: 'Brussels', coords: [50.846557, 4.351697] },
  { name: 'Amsterdam', coords: [52.370216, 4.895168] },
  { name: 'Hamburg', coords: [53.550341, 10.000654] },
  { name: 'Dusseldorf', coords: [51.225402, 6.776314] },
] as const;

export const CITY_NAMES = CITIES.reduce<string[]>((acc, it) => {
  acc.push(it.name);
  return acc;
}, []);

export const FEATURES = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge',
] as const;

export const HOUSING_TYPES = ['apartment', 'house', 'room', 'hotel'] as const;

export const IMAGE_URL_REGEXP = /\.(jpg|jpeg|png)(\?(.*))?$/gi;
