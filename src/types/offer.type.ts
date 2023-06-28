import { TCity } from './city.type';
import { TFeatures } from './features.type';
import { TUser } from './user.type';
import { THousing } from './housing.type';
import { TLocation } from './location.type';
import { TOfferPhotos } from './offerPhotos.type';

export type TOffer = {
  title: string;
  description: string;
  postedAt: Date;
  city: TCity;
  preview: string;
  photos: TOfferPhotos;
  isPremium: boolean;
  rating: number;
  housing: THousing;
  bedroomsAmount: number;
  capacity: number;
  price: number;
  features: TFeatures;
  user: TUser;
  commentsAmount: number;
  location: TLocation;
};
