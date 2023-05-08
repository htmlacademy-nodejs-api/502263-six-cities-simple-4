import { Offer } from '../../types/offer.type.js';
import { City } from '../../types/city.type.js';
import { Housing } from '../../types/housing.type.js';
import { Features } from '../../types/features.type.js';
import { OfferPhotos } from '../../types/offerPhotos.type.js';
import { StringBool } from '../../types/string-bool.type.js';
import { TSV_SEPARATOR, stringBoolToBool } from './index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postedAt,
    city,
    preview,
    allPhotos,
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
  ] = offerData.replace('\n', '').split(TSV_SEPARATOR.Tab);

  const [name, email, userpic, password, hostIsPro] = host.split(TSV_SEPARATOR.String);
  const [lat, lng] = location.split(TSV_SEPARATOR.String);

  return {
    title,
    description,
    postedAt: new Date(postedAt),
    city: city as City,
    photos: {
      preview,
      all: allPhotos.split(TSV_SEPARATOR.String) as OfferPhotos,
    },
    isPremium: stringBoolToBool(isPremium as StringBool),
    rating: +rating,
    housingType: housingType as Housing,
    bedroomsAmount: +bedroomsAmount,
    capacity: +capacity,
    price: +price,
    features: features.split(TSV_SEPARATOR.String) as Features[],
    host: {
      name,
      email,
      userpic,
      password,
      isPro: stringBoolToBool(hostIsPro as StringBool),
    },
    commentsAmount: +commentsAmount,
    location: { lat: +lat, lng: +lng },
  };
}
