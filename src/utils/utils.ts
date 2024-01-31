import type { DataObject } from '@/models/global';
import { ProTableObject } from '@/types/entity';
import { TableResponse } from '@/types/response/table';
import { message } from 'antd';
import { response } from 'express';
import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * 解析相应数据，当响应代码不是200且message不为空时，显示message。
 * @param r1 响应数据
 * @returns 操作成功返回true,失败返回false。
 */
export const parseResponse = (r1: DataObject<T>): boolean => {
  if (r1.statusCode !== '00000000') {
    message.error(r1.statusCode + ' ' + r1.message);
    // 报错情况下，若data是string，则显示报错信息，比如没有通过hibernate-validate校验
    if (typeof r1.data == 'string') {
      message.warn(r1.data);
    }
    return false;
  }
  return true;
};

export const parseTableResponse = (r2: ProTableObject<T>| TableResponse<T>): boolean => {
  if (!r2.success) {
    message.error(r2.message);
    return false;
  }
  return true;
};
