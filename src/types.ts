export type JobsState = {
  filteredJobs: Array<Job>;
  jobs: Array<Job>;
};

export type Job = {
  jdUid: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  maxJdSalary: number;
  minJdSalary: number | null;
  salaryCurrencyCode: 'USD' | 'INR';
  location: string;
  minExp: number;
  maxExp: number;
  jobRole: string;
  companyName: string;
  logoUrl: string;
};