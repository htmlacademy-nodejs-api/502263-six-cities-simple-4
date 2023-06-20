import { TOffer } from '../../types/offer.type.js';
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
    city: city as TOffer['city'],
    photos: {
      preview,
      all: allPhotos.split(TSV_SEPARATOR.String) as TOffer['photos']['all'],
    },
    isPremium: stringBoolToBool(isPremium as TStringBool),
    rating: Number(rating),
    housing: housing as TOffer['housing'],
    bedroomsAmount: Number(bedroomsAmount),
    capacity: Number(capacity),
    price: Number(price),
    features: features.split(TSV_SEPARATOR.String) as unknown as TOffer['features'],
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
