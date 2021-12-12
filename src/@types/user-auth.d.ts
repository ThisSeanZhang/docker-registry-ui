import { AxiosBasicCredentials } from 'axios';
export type UserAuth = {
  auth: AxiosBasicCredentials,
  keep: boolean,
};