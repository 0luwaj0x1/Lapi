export interface Coordinate {
  longitude: number;
  latitude: number;
}

export interface PostCode {
  status: number;
  result: {
    postcode: string;
    quality: number;
    eastings: number;
    northings: number;
    country: string;
    nhs_ha: string;
    longitude: number;
    latitude: number;
    european_electoral_region: string;
    primary_care_trust: string;
    region: string;
    lsoa: string;
    msoa: string;
    incode: string;
    outcode: string;
    parliamentary_constituency: string;
    admin_district: string;
    parish: string;
    admin_county: string | null;
    admin_ward: string;
    ced: string | null;
    ccg: string;
    nuts: string;
    codes: {
      admin_district: string;
      admin_county: string;
      admin_ward: string;
      parish: string;
      parliamentary_constituency: string;
      ccg: string;
      ccg_id: string;
      ced: string;
      nuts: string;
      lsoa: string;
      msoa: string;
      lau2: string;
    };
  };
}

export type Category = {
  id: number;
  name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
};

export type Geocodes = {
  main: {
    latitude: number;
    longitude: number;
  };
  roof: {
    latitude: number;
    longitude: number;
  };
};

export type Location = {
  address: string;
  admin_region: string;
  country: string;
  cross_street: string;
  formatted_address: string;
  locality: string;
  post_town: string;
  postcode: string;
  region: string;
};

export type RelatedPlaces = {
  parent: {
    fsq_id: string;
    name: string;
  };
};

export type CsvOutput = {
  id: string;
  name: string;
  address: string;
  image: string;
  distance: string;
};

export interface Place {
  fsq_id: string;
  categories: Category[];
  distance: 1147;
  geocodes: Geocodes;
  link: string;
  location: Location;
  name: string;
  related_places: RelatedPlaces;
  timezone: string;
}
