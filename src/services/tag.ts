import request from '@/utils/request';

export async function queryTagList(data: { name: string }) {
  return request('/api/tag/queryTagList', {
    method: 'POST',
    data: data,
    requestType: 'form',
  });
}
