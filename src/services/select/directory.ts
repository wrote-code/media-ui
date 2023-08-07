import request from '@/utils/request';

export async function queryRootDirectory(data: any) {
  return request('/api/directory/queryRootDirectory', {
    method: 'POST',
    data: data,
  });
}
