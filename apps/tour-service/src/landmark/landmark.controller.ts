import { Controller, Get, Query } from '@nestjs/common';
import { LocalLandmarkDetails } from '../common';
import { LocalLandmarkSearchCriteriaDto } from './dto/local-landmark-search-criteria.dto';
import { LandmarkService } from './landmark.service';

@Controller('landmark/v1')
export class LandmarkController {
  private readonly landmarkService: LandmarkService;

  // Injection via constructor
  constructor(landmarkService: LandmarkService) {
    this.landmarkService = landmarkService;
  }

  @Get('/landmark/local')
  public async getLocalLandmarks(
    @Query() criteria: LocalLandmarkSearchCriteriaDto,
  ): Promise<LocalLandmarkDetails[]> {
    console.log(
      'Request made to LandmarkController.getLocalLandmarks with criteria',
      criteria,
    );
    return this.landmarkService.getLocalLandmarks({
      ...criteria,
      // our internal LocalLandmarkCriteria interface has a coordinates as a property
      coordinates: { ...criteria },
    });
  }
}
