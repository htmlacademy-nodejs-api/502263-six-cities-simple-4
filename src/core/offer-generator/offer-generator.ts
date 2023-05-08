import dayjs from 'dayjs';

import { OfferGeneratorInterface } from './offer-generator.interface';
import { MockData } from '../../types/mock-data.type';
import {
  getRandomIntFromMinMaxTuple,
  getRandomArrItem,
  getRandomBoolean,
  getRandomLengthArr,
  TSV_SEPARATOR,
} from '../helpers/index.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate() {
    const mock = this.mockData;

    const currentCity = getRandomArrItem(mock.cities);

    const title = getRandomArrItem<string>(mock.titles);
    const description = getRandomArrItem<string>(mock.descriptions);
    const postedAt = dayjs()
      .subtract(getRandomIntFromMinMaxTuple(mock.minMax.weekdays), 'day')
      .toISOString();
    const city = currentCity.name;
    const mainPhoto = getRandomArrItem<string>(mock.photos);
    const offerPhotos = mock.photos.join(TSV_SEPARATOR.String);
    const isPremium = getRandomBoolean();
    const rating = getRandomIntFromMinMaxTuple(mock.minMax.rating);
    const housingType = getRandomArrItem<string>(mock.housingType);
    const bedroomsAmount = getRandomIntFromMinMaxTuple(
      mock.minMax.bedrooms
    );
    const capacity = getRandomIntFromMinMaxTuple(mock.minMax.capacity);
    const price = getRandomIntFromMinMaxTuple(mock.minMax.price);
    const features = getRandomLengthArr(mock.features).join(
      TSV_SEPARATOR.String
    );
    const host = [
      getRandomArrItem<string>(mock.host.names),
      getRandomArrItem<string>(mock.host.emails),
      getRandomArrItem<string>(mock.host.userpics),
      getRandomArrItem<string>(mock.host.passwords),
    ].join(TSV_SEPARATOR.String);
    const commentsAmount = getRandomIntFromMinMaxTuple(mock.minMax.comments);
    const location = currentCity.coords.join(TSV_SEPARATOR.String);

    return [
      title,
      description,
      postedAt,
      city,
      mainPhoto,
      offerPhotos,
      isPremium,
      rating,
      housingType,
      bedroomsAmount,
      capacity,
      price,
      features,
      host,
      commentsAmount,
      location,
    ].join(TSV_SEPARATOR.Tab);
  }
}
