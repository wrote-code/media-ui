import { request } from 'umi';

export async function queryAuthorList(data: any) {
  const url = '/api/author/queryList';
  return request(url, {
    data: data,
    method: 'POST',
  });
}
