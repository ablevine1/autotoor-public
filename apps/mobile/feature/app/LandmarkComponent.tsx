import { DistanceUnit, LocalLandmark } from '@autotoor/tour-common';
import axios from 'axios';
import * as Location from 'expo-location';
import { LocationAccuracy, LocationObject } from 'expo-location';
import { useEffect, useState } from 'react';

import { LandmarkDisplayScreen } from './LandmarkDisplayScreen';
import { GeoService, SpeechService } from '../../service';
import { locToCoords } from '../../service/geo/util';

export interface LandmarkComponentProps {
  speechService: SpeechService;
  geoService: GeoService;
}
export const LandmarkComponent = (props: LandmarkComponentProps) => {
  const { speechService, geoService } = props;
  const baseUrl = 'http://10.0.0.19:3333/api/tour/landmark/v1/landmark/local';
  // const baseUrl = 'http://192.168.214.22:3333/api/tour/landmark/v1/landmark/local';
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [unreadLandmarks, setUnreadLandmarks] = useState<LocalLandmark[]>([]);
  const [visitedLandmarks, setVisitedLandmarks] = useState<LocalLandmark[]>([]);
  const [currentLandmark, setCurrentLandmark] = useState<LocalLandmark | null>(null);
  const [isReadyForNext, setIsReadyForNext] = useState(false);

  const alertsEnabled = false;
  const debug = (s: string) => {
    if (alertsEnabled) {
      alert(s);
    }
  };

  /**
   * This periodically updates the currentLocation
   */
  useEffect(() => {
    updateCurrentLocation().catch(console.error);
    const interval = setInterval(() => {
      updateCurrentLocation().catch(console.error);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [setCurrentLocation]);

  /**
   * This checks to see if location should be updated when currentLocation changes
   * It updates location of currentLocation is further away than the threshold from location
   */
  useEffect(() => {
    if (currentLocation !== null) {
      if (location === null) {
        setLocation(currentLocation);
      } else {
        const distance = geoService.calculateDistance(
          locToCoords(location),
          locToCoords(currentLocation),
          DistanceUnit.METER
        );
        if (distance > 2000) {
          debug(`Setting location, distance change: ${distance}`);
          setLocation(currentLocation);
        } else {
          debug(`The distance: ${distance}`);
        }
      }
    }
  }, [currentLocation, location]);

  /**
   * This updates the list of landmarks when the location changes
   */
  useEffect(() => {
    (async () => {
      if (location !== null) {
        try {
          setIsError(false);
          setIsLoading(true);
          const landmarks: LocalLandmark[] = (
            await axios.get(baseUrl, {
              params: { latitude: location.coords.latitude, longitude: location.coords.longitude },
            })
          ).data;
          setUnreadLandmarks(landmarks);
          // we need to trigger ready for next if this is the first time we are doing this
          if (!currentLandmark) setIsReadyForNext(true);
        } catch (e) {
          setErrorMsg('There was an error loading landmarks near you');
          setIsError(true);
        }
        setIsLoading(false);
      }
    })().catch(console.error);
  }, [location]);

  /**
   * Called when the isReadyForNext changed
   */
  useEffect(() => {
    if (isReadyForNext) {
      debug('setting current landmark');
      advanceLandmark();
      setIsReadyForNext(false);
    }
  }, [isReadyForNext]);

  /**
   * Updates the presentation when the current landmark is set
   */
  useEffect(() => {
    (async () => {
      // start reading the landmark summary if not paused
      if (currentLandmark !== null && !isPaused) {
        const text = currentLandmark.landmark.readableSummary;
        if (text !== null) {
          await speechService.stop();
          await speechService.speak(text, onSpeechDone);
        }
      }
    })().catch(console.error);
  }, [currentLandmark]);

  const advanceLandmark = (): void => {
    const landmark = unreadLandmarks.shift();
    if (landmark) {
      setUnreadLandmarks(unreadLandmarks);
      // TODO - compare landmark to those already visited and skip forward if we have already seen it recently
      setCurrentLandmark(landmark);
      setVisitedLandmarks((visited) => {
        visited.push(landmark);
        return visited;
      });
    }
  };

  const updateCurrentLocation = async (): Promise<void> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      setIsError(true);
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: LocationAccuracy.BestForNavigation,
    });
    setCurrentLocation(currentLocation);
  };

  const onSpeechDone = () => {
    // incrementLandmarkIndex();
    setIsReadyForNext(true);
  };

  const onPause = async () => {
    if (isPaused) {
      if (currentLandmark) {
        await speechService.resume(currentLandmark.landmark.readableSummary, onSpeechDone);
      }
      setIsPaused(false);
    } else {
      await speechService.pause();
      setIsPaused(true);
    }
  };

  const onNext = async () => {
    advanceLandmark();
  };

  let landmarkText = '';
  let title: string = '';
  let imageUrl = '';
  if (!currentLandmark) {
    landmarkText = 'Loading...';
  } else {
    landmarkText = currentLandmark.landmark.readableSummary;
    imageUrl = currentLandmark.landmark.imageUrl;
    title = currentLandmark.landmark.title;
  }
  return (
    <LandmarkDisplayScreen
      landmarkText={landmarkText}
      title={title}
      imageUrl={imageUrl}
      isError={isError}
      isPaused={isPaused}
      isLoading={isLoading}
      errorMessage={errorMsg}
      onPause={onPause}
      onNext={onNext}
    />
  );
};
