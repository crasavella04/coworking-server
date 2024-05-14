import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { ImageServiceImplements } from './types/implements/service.implement';

@Injectable()
export class ImageService implements ImageServiceImplements {
  async addImg(image: Express.Multer.File): Promise<string> {
    try {
      const fileExtension = image.originalname.split('.').pop();

      const imgName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }

      fs.writeFileSync(path.resolve(filePath, imgName), image.buffer);
      return imgName;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteImg(image: string | null): Promise<void> {
    if (!image) return;

    const filePath = path.resolve(__dirname, '..', '..', 'static', image);

    try {
      // Проверяем, существует ли файл перед его удалением
      if (await fs.promises.stat(filePath).then((stats) => stats.isFile())) {
        // Удаляем файл
        await fs.promises.unlink(filePath);
      }
    } catch (error) {
      console.error('Ошибка при удалении файла:', error);
    }
  }
}
