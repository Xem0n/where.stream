import ServicesResult from '../types/ServicesResult';
import Show from '../types/Show';
import ShowQuery from '../types/ShowQuery';

const API_KEY = process.env.REACT_APP_API_KEY as string;
const MAX_DAYS_INTERVAL = 3;

async function loadData() {
  if (!shouldFetchServices()) {
    return;
  }

  const services = await fetchServices();

  populateServices(services);
  populateCountries(services);

  localStorage.setItem('lastUpdate', new Date().toString());
}

function shouldFetchServices(): boolean {
  if (
    localStorage.getItem('services') === null ||
    localStorage.getItem('countries') === null
  ) {
    return true;
  }

  const lastUpdate = new Date(localStorage.getItem('lastUpdate') ?? '');

  if (!isFinite(+lastUpdate)) {
    return true;
  }

  const diff = new Date(+new Date() - +lastUpdate);

  return diff.getDate() > MAX_DAYS_INTERVAL;
}

async function fetchServices(): Promise<ServicesResult> {
  const url = 'https://streaming-availability.p.rapidapi.com/v2/services';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data.result;
  } catch (error: any) {
    console.error(error);
  }

  return {};
}

function populateServices(data: ServicesResult) {
  const services: string[] = [];

  for (const serviceID in data) {
    services.push(serviceID);
  }

  localStorage.setItem('services', JSON.stringify(services));
}

function populateCountries(data: ServicesResult) {
  let countries: string[] = [];

  for (const serviceID in data) {
    const _countries = Object.keys(data[serviceID].countries);

    countries = arrayUnion(countries, _countries);
  }

  countries.sort();

  localStorage.setItem('countries', JSON.stringify(countries));
}

function arrayUnion<T>(arr1: T[], arr2: T[]): T[] {
  // Set is used to omit duplicates
  return [...new Set([...arr1, ...arr2])];
}

async function fetchShows(query: ShowQuery): Promise<Show[]> {
  const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${query.title}&country=${query.country}&show_type=${query.type}&output_language=en`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data.result;
  } catch (e: any) {
    console.error(e);
  }

  return [];
}

function getServices(): string[] {
  const services = localStorage.getItem('services') ?? '[]';

  return JSON.parse(services);
}

function getCountries(): string[] {
  const countries = localStorage.getItem('countries') ?? '[]';

  return JSON.parse(countries);
}

export { loadData, fetchShows, getServices, getCountries };
