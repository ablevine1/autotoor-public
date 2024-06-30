import { Controller, Get, Query } from '@nestjs/common';
import {
  DistanceUnit,
  LocalLandmarkCriteria,
  LocalLandmarkDetails,
} from '../common';
import { LandmarkService } from './landmark.service';

@Controller('landmark/v1')
export class LandmarkController {
  private readonly landmarkService: LandmarkService;

  constructor(landmarkService: LandmarkService) {
    this.landmarkService = landmarkService;
  }

  @Get('/landmark/local')
  public async getLocalLandmarks(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('distanceUnit') distanceUnit: DistanceUnit,
    @Query('maxCount') maxCount: number,
  ): Promise<LocalLandmarkDetails[]> {
    const criteria: LocalLandmarkCriteria = {
      coordinates: {
        latitude,
        longitude,
      },
      maxCount,
      distanceUnit,
    };
    console.log(
      'Request made to LandmarkController.getLocalLandmarks with criteria',
      criteria,
    );
    return this.landmarkService.getLocalLandmarks(criteria);
  }
}
