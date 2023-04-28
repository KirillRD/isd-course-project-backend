import { CreateImageDto } from './dto/create-image.dto';
import { ImageEntity } from './entities/image.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ImageKit from 'imagekit';
import { Exception } from 'src/exceptions';
import crypto from 'crypto';

@Injectable()
export class ImageKitService {
  private readonly imageKit: ImageKit;

  constructor(private readonly config: ConfigService) {
    this.imageKit = new ImageKit({
      publicKey: config.get('IMAGE_API_PUBLIC_KEY'),
      privateKey: config.get('IMAGE_API_PRIVATE_KEY'),
      urlEndpoint: config.get('IMAGE_API_URL_ENDPOINT'),
    });
  }

  async uploadImage(imageDto: CreateImageDto): Promise<ImageEntity> {
    try {
      const res = await this.imageKit.upload({
        fileName: imageDto.fileName,
        file: imageDto.file,
      });
      return { fileId: res.fileId, url: res.url };
    } catch (error) {
      throw new UnprocessableEntityException(Exception.IMAGE_UPLOAD);
    }
  }

  async uploadImages(files: string[]): Promise<ImageEntity[]> {
    return await Promise.all(
      files.map(async (file) => {
        return await this.uploadImage({ fileName: crypto.randomUUID(), file });
      }),
    );
  }

  async deleteImages(fileIds: string[]): Promise<void> {
    if (fileIds.length) {
      try {
        await this.imageKit.bulkDeleteFiles(fileIds);
      } catch (error) {
        throw new UnprocessableEntityException(Exception.IMAGES_DELETE);
      }
    }
  }
}
