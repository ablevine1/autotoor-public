import { Module } from '@nestjs/common';
import { LandmarkService } from './landmark.service';
import { LandmarkController } from './landmark.controller';

@Module({
  providers: [LandmarkService],
  controllers: [LandmarkController],
})
export class LandmarkModule {}
