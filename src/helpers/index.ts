import * as path from 'path';
const csvWriter = require('csv-writer');
import { Coordinate, CsvOutput } from '../types';

export const getDistanceBetweenTwoPoints = (
  cord1: Coordinate,
  cord2: Coordinate,
): number => {
  if (cord1.latitude == cord2.latitude && cord1.longitude == cord2.longitude) {
    return 0;
  }

  const radlat1 = (Math.PI * cord1.latitude) / 180;
  const radlat2 = (Math.PI * cord2.latitude) / 180;

  const theta = cord1.longitude - cord2.longitude;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; //convert miles to km

  return dist;
};

export const convertToCSV = async (data: CsvOutput[]) => {
  const writer = csvWriter.createObjectCsvWriter({
    path: path.resolve(__dirname, '../attachement/places.csv'),
    header: [
      { id: 'id', title: 'ID' },
      { id: 'name', title: 'Name' },
      { id: 'address', title: 'Address' },
      { id: 'image', title: 'Image' },
      { id: 'distance', title: 'Distance' },
    ],
  });

  return await writer.writeRecords(data);
};
