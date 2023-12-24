import type { TagReferenceParam } from '@/models/types/request/tag';
import type { TableRequest } from '@/models/types/request/table';
import request from '@/utils/request';

export async function queryTagList(data: { name: string }) {
  return request('/api/tag/queryTagList', {
    method: 'POST',
    data: data,
  });
}

export async function queryTagReferenceList(data: TableRequest<any, TagReferenceParam, any>) {
  return request('/api/tag/queryTagReferenceList', {
    method: 'POST',
    data: data,
  });
}

export async function addTag(params: { resourceId: string; tagId: string }) {
  return request('/api/tag/addTag', {
    method: 'POST',
    data: params,
    requestType: 'form',
  });
}
