import { Expose } from 'class-transformer';

export class UploadPreviewResponse {
  @Expose()
  public preview!: string;
}

export class UploadImagesResponse {
  @Expose()
  public photos!: string;
}
