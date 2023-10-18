import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiagnosisController } from './diagnosis.controller';

@Module({
  imports: [],
  controllers: [AppController, DiagnosisController],
  providers: [AppService, Logger],
})
export class AppModule { }
