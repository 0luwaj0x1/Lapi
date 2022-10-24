import { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { api } from '../config/http';
import { Coordinate, CsvOutput, Place, PostCode } from '../types';
import { convertToCSV, getDistanceBetweenTwoPoints } from '../helpers';

const getCoordinate = async (postcode: string): Promise<Coordinate> => {
  const url = 'https://api.postcodes.io/postcodes';
  const { data } = await axios.get<PostCode>(`${url}/${postcode}`);
  const { longitude, latitude } = data.result;
  return { latitude, longitude };
};

const getNearbyLocations = async ({ longitude, latitude }: Coordinate) => {
  return api.get<{ results: Place[] }>(`/search?ll=${latitude},${longitude}`);
};

const locacationController = async (request: Request, response: Response) => {
  const postcode = request.query.postcode;
  if (!postcode) {
    response
      .status(422)
      .send({ message: 'please pass a postcode query parameter' });
    return;
  }
  try {
    const coordinate: Coordinate = await getCoordinate(postcode as string);
    const { data } = await getNearbyLocations(coordinate);

    const fommatedPlaces: CsvOutput[] = data.results.map((place) => {
      return {
        id: place.fsq_id,
        name: place.name,
        address: place.location.address,
        image: `${place.categories[0]?.icon.prefix}${place.categories[0]?.icon.suffix}`,
        distance: `${getDistanceBetweenTwoPoints(
          coordinate,
          place.geocodes.main,
        )} km`,
      };
    });
    convertToCSV(fommatedPlaces);
    response.setHeader('Content-Type', 'text/csv');
    response.attachment('../attachement/places.csv');
    response.send(fommatedPlaces);
  } catch (error: AxiosError | any) {
    response
      .status(error.response?.status)
      .send(error.response?.data.error || error.message);
  }
};

export default locacationController;
