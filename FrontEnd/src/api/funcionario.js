import api from './index'
import {useGlobalStore} from '../stores/global';

export async function NewEmployee(data)
{
  const response = await api.post('/funcionario', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });  
  return response.data;
}

api.interceptors.request.use(config =>
{
    const global = useGlobalStore()
    global.setLoader(true)
    return config
},
error =>
{
    const global = useGlobalStore()
    global.setLoader(false)
    return Promise.reject(error)
});
api.interceptors.response.use(response =>
{
    const global = useGlobalStore()
    global.setLoader(false)
    global.setError(false);
    return response
},
error =>
{
    const global = useGlobalStore()
    global.setLoader(false);

    global.setError(true);
    global.setErrorMessage(error.response.data.error);
    return Promise.reject(error);
});
