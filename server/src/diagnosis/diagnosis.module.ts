import { Module } from '@nestjs/common';
import { DiagnosisController } from './diagnosis.controller';

@Module({
  controllers: [DiagnosisController],
})
export class DiagnosisModule {}