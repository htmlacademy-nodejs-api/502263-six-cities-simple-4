import { TOffer } from '../../types/offer.type.js';
import { TCity } from '../../types/city.type.js';
import { THousing } from '../../types/housing.type.js';
import { TFeatures } from '../../types/features.type.js';
import { TOfferPhotos } from '../../types/offerPhotos.type.js';
import { TStringBool } from '../../types/string-bool.type.js';
import { TSV_SEPARATOR, stringBoolToBool } from './index.js';

export function createOffer(offerData: string): TOffer {
  const [
    title,
    description,
    postedAt,
    city,
    preview,
    allPhotos,
    isPremium,
    rating,
    housing,
    bedroomsAmount,
    capacity,
    price,
    features,
    user,
    commentsAmount,
    location,
  ] = offerData.replace('\n', '').split(TSV_SEPARATOR.Tab);

  const [name, email, userpic, password, userIsPro] = user.split(TSV_SEPARATOR.String);
  const [lat, lng] = location.split(TSV_SEPARATOR.String);

  return {
    title,
    description,
    postedAt: new Date(postedAt),
    city: city as TCity,
    photos: {
      preview,
      all: allPhotos.split(TSV_SEPARATOR.String) as TOfferPhotos,
    },
    isPremium: stringBoolToBool(isPremium as TStringBool),
    rating: Number(rating),
    housing: housing as THousing,
    bedroomsAmount: Number(bedroomsAmount),
    capacity: Number(capacity),
    price: Number(price),
    features: features.split(TSV_SEPARATOR.String) as TFeatures[],
    user: {
      name,
      email,
      userpic,
      password,
      isPro: stringBoolToBool(userIsPro as TStringBool),
    },
    commentsAmount: Number(commentsAmount),
    location: { lat: Number(lat), lng: Number(lng) },
  };
}
