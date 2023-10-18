import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import axios from 'axios';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('diagnosis')
export class DiagnosisController {
  private readonly logger = new Logger(DiagnosisController.name);

  @Get()
  getDiagnosis(@Res() res: Response): void {
    const reactAppPath = join(
      __dirname,
      '..',
      '..',
      'client/build',
      'index.html',
    );
    const reactAppHtml = fs.readFileSync(reactAppPath, 'utf8');
    res.send(reactAppHtml);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file) {
    try {
      const buffer = Buffer.from(file.buffer);
      const blob = new Blob([buffer], { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('image', blob, file.originalname);

      const res = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(formData);
      return res.data;
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      return { error: '이미지 업로드 중 오류 발생' };
    }
  }
}
