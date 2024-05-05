// * IDS
export const companyNameId = 'companyName';
export const minBasePayId = 'minBasePay';
export const experienceId = 'experience';
export const locationId = 'location';
export const rolesId = 'roles';

// * OPTIONS
export const minBasePayOptions = () => {
  const arr = [];
  for (let i = 0; i <= 70; i += 10) arr.push({ label: `${i}L`, value: i });
  return arr;
};
export const getExperienceOptions = () => {
  const arr = [];
  for (let i = 0; i <= 10; i++) arr.push({ label: `${i}`, value: i });
  return arr;
};
export const getLocationOptions = [
  { label: 'Remote', value: 'remote' },
  { label: 'In-office', value: 'in-office' }
];
export const getRolesOptions = ['Frontend', 'IOS', 'Android', 'Backend', 'Tech Lead'];
