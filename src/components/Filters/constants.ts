// * IDS
export const companyNameId = 'companyName';
export const minBasePayId = 'minBasePay';

// * OPTIONS
export const minBasePayOptions = () => {
  const arr = [];
  for (let i = 0; i <= 70; i += 10) arr.push({ label: `${i}L`, value: i });
  return arr;
};
