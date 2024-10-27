/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { DistanceUnit } from '../../common';
import { LocalLandmarkSearchCriteria } from '../landmark';

import { CoordinatesDto } from './coordinates.dto';

export class LocalLandmarkSearchCriteriaDto
  extends CoordinatesDto
  implements LocalLandmarkSearchCriteria
{
  @IsEnum(DistanceUnit)
  @IsOptional()
  distanceUnit: DistanceUnit = DistanceUnit.MILE;

  @IsInt()
  @IsOptional()
  maxCount: number = 10;
}
