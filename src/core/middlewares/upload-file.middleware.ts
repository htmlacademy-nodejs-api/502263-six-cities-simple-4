import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage, FileFilterCallback } from 'multer';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';
import { IMAGE_URL_REGEXP } from '../helpers/index.js';
import { MiddlewareInterface } from './middleware.interface';
import HttpError from '../errors/http-error.js';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
    private isArray: boolean = false,
  ) {
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const ext = extension(file.mimetype);
        const name = nanoid();

        callback(null, `${ name }.${ ext }`);
      },
    });

    const uploadFileMiddleware = multer({
      storage,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter(_req: Request, file: Express.Multer.File, callback: FileFilterCallback) {
        if (!IMAGE_URL_REGEXP.test(file.originalname)) {
          return callback(new HttpError(
            StatusCodes.UNSUPPORTED_MEDIA_TYPE,
            'Изображения могут быть только в форматах jpg и png',
            'UploadFileMiddleware',
          ));
        }

        callback(null, true);
      },
    })[this.isArray ? 'array' : 'single'](this.fieldName, 6);

    uploadFileMiddleware(req, res, next);
  }
}
