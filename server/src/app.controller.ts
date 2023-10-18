import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  getRoot(@Res() res: Response): void {
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

  @Get('market')
  getMarket(@Res() res: Response): void {
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

  @Get('diary')
  getDiary(@Res() res: Response): void {
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

  @Get('diseapedia')
  getDiseapedia(@Res() res: Response): void {
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
}
