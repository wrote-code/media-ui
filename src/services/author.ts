import request from '@/utils/request';

export async function queryList(data: any) {
  return request('/api/author/queryList', {
    data: data,
    method: 'POST',
  });
}

export async function addAuthor(data: any) {
  return request('/api/author/add', {
    data: data,
    method: 'POST',
  });
}

export async function deleteAuthor(data: any) {
  return request('/api/author/deleteAuthor' + data.id, {
    data: data,
    method: 'GET',
  });
}
