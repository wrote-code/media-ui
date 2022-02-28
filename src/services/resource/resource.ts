import request from '@/utils/request';

export async function fetchResourceList(data: any) {
  console.log("data", data);
  const url = "/api/resource/queryResourceList";
  return request(url, {
    data: data,
    method: 'POST',
  })
}

export async function fetchResourceListRequest(data: any) {
  console.log("data", data);
  const url = "/api/resource/queryResourceList";
  return request(url, {
    data: data,
    method: 'POST',
  })
}
