import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiagnosisModule } from './diagnosis/diagnosis.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/drssdb'),
    DiagnosisModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}