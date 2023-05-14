import { ConfigInterface } from './config.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { config } from 'dotenv';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { inject, injectable } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';

@injectable()
export default class ConfigService implements ConfigInterface<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Не удалось прочитать .env файл, вероятнее всего он не существует.');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env файл найден и успешно прочитан.');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
