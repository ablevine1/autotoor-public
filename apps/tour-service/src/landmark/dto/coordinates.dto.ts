import { IsNumber, Max, Min } from 'class-validator';
import { Coordinates } from '../../common';

export class CoordinatesDto implements Coordinates {
  @IsNumber()
  @Max(90, { message: 'latitude may not be greater than 90' })
  @Min(-90, { message: 'latitude may not be less than -90' })
  latitude: number;

  @IsNumber()
  @Max(180, { message: 'longitude may not be greater than 180' })
  @Min(-180, { message: 'longitude may not be less than -180' })
  longitude: number;
}
