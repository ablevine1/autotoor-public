import { Module } from '@nestjs/common';
import { LandmarkService } from './landmark.service';
import { LandmarkController } from './landmark.controller';

@Module({
  providers: [LandmarkService], // Providers (services) that can be injected into other components
  controllers: [LandmarkController], // Controller(s) that belong to this module
  exports: [LandmarkService], // Services available for injection outside this module
  imports: [], // Where other modules this module depends on are included
})
export class LandmarkModule {}
