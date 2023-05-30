import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { DB, createOffer, getCliTextColor, getErrorMessage, getMongoURI } from '../helpers/index.js';
import { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import { OfferServiceInterface } from '../../modules/offer/offer-service.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import ConsoleLoggerService from '../logger/console.service.js';
import OfferService from '../../modules/offer/offer.service.js';
import UserService from '../../modules/user/user.service.js';
import MongoClientService from '../database-client/mongo-client.service.js';
import { OfferModel } from '../../modules/offer/offer.entity.js';
import { DatabaseClientInterface } from '../database-client/database-client.interface.js';
import { UserModel } from '../../modules/user/user.entity.js';
import { CliCommandInterface } from './cli-comand.interface.js';
import { TOffer } from '../../types/offer.type.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveOffer(offer: TOffer) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DB.Default.UserPassword
    }, this.salt);

    await this.offerService.create({
      ...offer,
      ...user,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(getCliTextColor.success(`${count} рядов ипортировано.`));
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, user: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, user, DB.Default.Port, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Не удается прочитать файл: ${getErrorMessage(err)}`);
    }
  }
}
