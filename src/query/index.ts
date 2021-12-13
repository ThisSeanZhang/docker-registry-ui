import axios, {
  AxiosPromise,
  AxiosRequestConfig,
  Method,
  AxiosBasicCredentials,
  AxiosError,
} from 'axios';

const TIME_OUT_MAX = 5000;

function getAuth() :AxiosBasicCredentials {
  const auth: AxiosBasicCredentials = JSON.parse(localStorage.getItem('auth') || sessionStorage.getItem('auth') || '{}');
  return auth;
}
function convert2Config(
  option: {url: string, data?: Map<string, any>, method?: Method },
): AxiosRequestConfig<any> {
  const config: AxiosRequestConfig<any> = {
    method: option.method || 'GET',
    url: `v2/${option.url}`,
  };
  const query:any = {};
  if (option.data !== undefined) {
    option.data.forEach((key, value) => {
      if (value !== null || value !== '') query[key] = value;
    });
  }
  config[config.method === 'GET' || config.method === 'get' ? 'params' : 'data'] = query;
  return config;
}
class Query {
  public async query<D>(
    option: {url: string, data?: any, method?: Method } = { url: '', data: {}, method: 'GET' },
  ): Promise<D> {
    // return axios.create({
    //   timeout: TIME_OUT_MAX,
    //   auth: getAuth(),
    // })(convert2Config(option))
    //   .then((res: any) => {
    //     const error = { ...res };
    //     if (res.data.errors) {
    //       error.data.errors =
    // res.data.errors.map((e: { message: string }) => e.message).join(' ');
    //     }
    //     return error;
    //   })
    //   .catch((err:AxiosError) => {
    //     throw err;
    //   });
    const config = {
      timeout: TIME_OUT_MAX,
      auth: getAuth(),
    };
    const res = await axios.create(config)(convert2Config(option));
    return res.data;
    // try {
    //   const res = await axios.create(config)(convert2Config(option));
    //   return res.data;
    // } catch (err) {
    //   if (axios.isAxiosError(err) && err.response) {
    //     // Is this the correct way?
    //     console.log((err.response?.data).error);
    //     throw err;
    //   }
    //   return {};
    // }
  }
}

export default new Query();
