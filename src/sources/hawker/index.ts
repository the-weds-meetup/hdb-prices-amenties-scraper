import { Hawker, HawkerRaw } from './model';
import dataGovApi from '../../util/data-gov-api';

const RESOURCE_ID = 'b80cb643-a732-480d-86b5-e03957bc82aa';

type HawkerCSV = {
  header: { id: string; title: string }[];
  data: Hawker[];
};

const CSV_HEADER = [
  { id: 'name', title: 'NAME' },
  { id: 'address', title: 'ADDRESS' },
  { id: 'longitude', title: 'LONGITUDE' },
  { id: 'latitude', title: 'LATITUDE' },
];

export default async function hawker(): Promise<HawkerCSV> {
  const params = {
    limit: 150,
  };
  const response = await dataGovApi<HawkerRaw>(RESOURCE_ID, params);
  const hawkersList = response?.result.records;

  const result = hawkersList.map((hawkerObj) => {
    return {
      name: hawkerObj.name,
      address: hawkerObj.address_myenv,
      longitude: hawkerObj.longitude_hc,
      latitude: hawkerObj.latitude_hc,
    };
  });

  console.log(`Fetched ${result.length} hawkers' results`);

  return { header: CSV_HEADER, data: result };
}
