const prettyNames = new Map<string, string>();
prettyNames.set('apple', 'Apple TV+')
prettyNames.set('disney', 'Disney+');
prettyNames.set('hbo', 'HBO Max')
prettyNames.set('prime', 'Amazon Prime Video')

const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1);

const getServicePrettyName = (service: string) => 
  prettyNames.has(service) ? prettyNames.get(service) : capitalize(service);

export default getServicePrettyName;
