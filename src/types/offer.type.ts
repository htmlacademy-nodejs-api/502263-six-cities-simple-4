import { TCity } from './city.type';
import { TFeatures } from './features.type';
import { TUser } from './user.type';
import { THousing } from './housing.type';
import { TLocation } from './location.type';
import { TOfferPhotos } from './offerPhotos.type';

export type TOffer = {
  title: string; // length === 10 — 100
  description: string; // length === 20 — 1024
  postedAt: Date;
  city: TCity;
  photos: {
    preview: string;
    all: TOfferPhotos;
  };
  isPremium: boolean;
  rating: number; // 1.0 — 5.0
  housing: THousing;
  bedroomsAmount: number; // 1 — 8
  capacity: number; // 1 — 10
  price: number; // 100 — 100_000
  features: TFeatures;
  user: TUser;
  commentsAmount: number;
  location: TLocation;
};
