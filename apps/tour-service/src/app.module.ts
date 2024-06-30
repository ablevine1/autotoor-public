import { Module } from '@nestjs/common';
import { LandmarkModule } from './landmark/landmark.module';

@Module({
  imports: [LandmarkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
