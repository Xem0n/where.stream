import ServicesResult from '../types/ServicesResult';

async function loadData() {
  if (localStorage.getItem('services') !== null && localStorage.getItem('countries') !== null) {
    return;
  }

  const services = await fetchServices();

  populateServices(services);
  populateCountries(services);
}

async function fetchServices(): Promise<ServicesResult> {
  const url = 'https://streaming-availability.p.rapidapi.com/v2/services';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd8f31e989dmsh23bf5ea7462eb34p13be50jsn7e0152ef9e48',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  }

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

function getServices(): string[] {
  const services = localStorage.getItem('services') ?? '[]';

  return JSON.parse(services);
}

function getCountries(): string[] {
  const countries = localStorage.getItem('countries') ?? '[]';

  return JSON.parse(countries);
}

export {
  loadData,
  getServices,
  getCountries,
};
