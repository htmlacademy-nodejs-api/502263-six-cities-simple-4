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
  photosArrLength: [6, 6],
} as const;

export const CITY_NAMES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

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

export const IMAGE_URL_REGEXP = /\.(jpg|png)(\?(.*))?$/gi;
