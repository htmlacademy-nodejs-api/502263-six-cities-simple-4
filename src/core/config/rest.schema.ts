import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
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
  }
});
