import type { TableRequest } from '@/types/request/table';
import request from '@/utils/request';

export async function queryAlbumList(data: TableRequest<any, any, any>) {
  const url = '/api/album/queryAlbumList';
  return request(url, {
    data: data,
    method: 'POST',
  });
}

export async function addAlbum(data: { albumName: string }) {
  const url = '/api/album/addAlbum';
  return request(url, {
    data: data,
    method: 'POST',
    requestType: 'form',
  });
}
