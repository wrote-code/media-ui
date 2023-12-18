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
  // todo 重复方法
  const url = '/api/resource/queryResourceList';
  return request(url, {
    data: data,
    method: 'POST',
  });
}

export async function deleteResource(payload: { resourceId: string; referenceId: string }) {
  return request('/api/resource/delete', {
    data: payload,
    method: 'POST',
  });
}

export async function queryTags(payload: { resourceId: string }) {
  return request('/api/resource/queryTags', {
    data: payload,
    requestType: 'form',
    method: 'POST',
  });
}

export async function deleteTag(payload: { resourceId: string; referenceId: string }) {
  return request('/api/resource/deleteTag', {
    data: payload,
    method: 'POST',
    requestType: 'form',
  });
}

export async function addTag(payload: { resourceId: string; tagName: string }) {
  return request('//api/resource/addTag', {
    data: payload,
    method: 'POST',
    requestType: 'form',
  });
}
