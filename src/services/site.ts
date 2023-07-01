import request from '@/utils/request';

export async function querySiteList(data: any) {
  return request('/api/site/querySiteList', {
    data: data,
    method: 'POST',
  });
}

export async function addSite(data: any) {
  return request('/api/site/addSite', {
    data: data,
    method: 'POST',
  });
}

export async function deleteSite(data: any) {
  return request('/api/site/delete?id=' + data.id, {
    data: data,
    method: 'GET',
  });
}
