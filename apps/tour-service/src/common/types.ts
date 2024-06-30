export interface Coordinates {
  latitude: number;
  longitude: number;
}

export enum DistanceUnit {
  FOOT = 'FOOT',
  KILOMETER = 'KILOMETER',
  METER = 'METER',
  MILE = 'MILE',
}

export interface LocalLandmarkCriteria {
  /**
   * The coordinates to search from
   */
  coordinates: Coordinates;

  /**
   * The maximum number of results
   */
  maxCount: number;

  /**
   * The unit of distance to use for the search radius and results.
   */
  distanceUnit: DistanceUnit;
}

export interface LandmarkDetails {
  /**
   * The id of the landmark
   */
  id: string;

  /**
   * The title of the landmark.
   */
  title: string;

  /**
   * URL where more info can be found
   */
  url: string;

  /**
   * The url of the image to display for the landmark.
   */
  imageUrl: string;

  /**
   * The summary of the landmark to read.
   */
  readableSummary: string;

  /**
   * The location of the landmark.
   */
  coordinates: Coordinates;

  /**
   * The provider of landmark data
   */
  provider: string;
}

export interface LocalLandmarkDetails {
  landmark: LandmarkDetails;

  /**
   * The distance of the landmark from the location.
   */
  distance: number;

  /**
   * The distance unit of the distance.
   */
  distanceUnit: DistanceUnit;
}
