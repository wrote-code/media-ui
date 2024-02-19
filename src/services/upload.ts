import request from 'umi-request';

export async function queryFileList(data: any) {
  return request('/api/file/queryFileList', {
    method: 'POST',
    data: data,
    requestType: 'form',
  });
}

export async function deleteFile(data: any) {
  return request('/api/file/deleteFile', {
    method: 'POST',
    data: data,
    requestType: 'form',
  });
}
