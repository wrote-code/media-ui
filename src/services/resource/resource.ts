import request from '@/utils/request';

export async function fetchResourceList(data: any) {
  const url = '/api/resource/queryResourceList';
  return request(url, {
    data: data,
    method: 'POST',
  });
}

export async function addResource(payload: any) {
  return request('/api/resource/add', {
    data: payload,
    method: 'POST',
  });
}

export async function fetchResourceListRequest(data: any) {
  const url = '/api/resource/queryResourceList';
  return request(url, {
    data: data,
    method: 'POST',
  });
}

export async function deleteResource(payload: string) {
  return request('/api/resource/delete', {
    data: payload,
    method: 'POST',
  });
}
