import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
  JWT_SECRET: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Порт для входящих запросов',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Соль для хеширования пароля',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP адрес для БД (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  DB_USER: {
    doc: 'Имя пользователя, который подключается к БД',
    format: String,
    env: 'DB_USER',
    default: null, // используем `null`, это означает, что значения для этих переменных придётся явно прописать в файле `.env`, иначе возникнет ошибка.
  },
  DB_PASSWORD: {
    doc: 'Пароль для подключения к БД',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Порт, на котором соединяться с БД (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: '27017',
  },
  DB_NAME: {
    doc: 'Имя БД (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: 'six-cities'
  },
  UPLOAD_DIRECTORY: {
    doc: 'Путь для сохранения файлов от полльзователя',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
  },
  JWT_SECRET: {
    doc: 'Секрет для шифрования JWT токена',
    format: String,
    env: 'JWT_SECRET',
    default: null
  }
});
