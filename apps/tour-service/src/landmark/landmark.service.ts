import { Injectable } from '@nestjs/common';
import {
  DistanceUnit,
  LocalLandmarkCriteria,
  LocalLandmarkDetails,
} from '../common';

@Injectable()
export class LandmarkService {
  public async getLocalLandmarks(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    criteria: LocalLandmarkCriteria,
  ): Promise<LocalLandmarkDetails[]> {
    console.log(
      'Request made to LandmarkService.getLocalLandmarks with criteria',
      criteria,
    );
    const landmarks: LocalLandmarkDetails[] = [
      {
        landmark: {
          id: 'lm_1',
          title: 'The First Landmark',
          url: 'https://en.wikipedia.org/wiki/Aaron_A._Sargent_House',
          imageUrl: 'http://img1.url',
          coordinates: {
            latitude: 39.2663886,
            longitude: -121.02655320000001,
          },
          provider: 'provider-1',
          readableSummary: 'The First Landmark Summary',
        },
        distance: 55,
        distanceUnit: DistanceUnit.FOOT,
      },
    ];
    console.log(
      'LandmarkService.getLocalLandmarks returning landmarks',
      landmarks,
    );
    return landmarks;
  }
}
