import { Module } from '@nestjs/common';
import { LandmarkModule } from './landmark/landmark.module';

@Module({
  imports: [LandmarkModule], // Importing other modules into the root module
  controllers: [],
  providers: [],
})
export class AppModule {}
