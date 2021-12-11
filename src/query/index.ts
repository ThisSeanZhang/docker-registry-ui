import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';

const TIME_OUT_MAX = 5000;

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
  public query<D>(
    option: {url: string, data?: any, method?: Method } = { url: '', data: {}, method: 'GET' },
  ): AxiosPromise<D> {
    return axios.create({
      timeout: TIME_OUT_MAX,
    })(convert2Config(option))
      .then((res: any) => {
        const error = { ...res };
        if (res.data.errors) {
          error.data.errors = res.data.errors.map((e: { message: string }) => e.message).join(' ');
        }
        return error;
      })
      .catch(err => {
        throw err;
      });
  }
}

export default new Query();
