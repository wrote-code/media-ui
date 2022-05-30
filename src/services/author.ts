import request from '@/utils/request';

export async function fetchAuthorList(data: any) {
  return request('/api/author/fetchAuthorList', {
    body: data,
    method: 'POST',
  });
}

export async function addAuthor(data: any) {
  return request('/api/author/addAuthor', {
    body: data,
    method: 'POST',
  });
}

export async function deleteAuthor(data: any) {
  return request('/api/author/deleteAuthor' + data.id, {
    body: data,
    method: 'GET',
  });
}
