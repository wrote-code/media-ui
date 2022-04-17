/**
 * 此类型用于connect使用，避免mapStateToProps报错。
 */
export interface DefaultStateType {
  working: boolean;
}

export interface AuthorVo {
  /**
   * ID
   */
  id: string;

  /**
   * 用户在站点注册时的id
   */
  userId?: string;

  /**
   * 用户名
   */
  username: string;

  /**
   * 注册站点ID
   */
  site: string;

  /**
   * 主页
   */
  homepage?: string;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 更新时间
   */
  updateTime?: Date;
}

export interface AlbumVo {
  /**
   * ID
   */
  id: string;

  /**
   * 专辑
   */
  albumName: string;

  /**
   * 专辑作者
   */
  author: AuthorVo;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 更新时间
   */
  updateTime?: Date;
}

export interface ResourceAlbumVo {
  /**
   * ID
   */
  id: string;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 更新时间
   */
  updateTime: Date;

  /**
   * 资源ID
   */
  resourceVo: ResourceVo;

  /**
   * 专辑ID
   */
  albumVo: AlbumVo;
}

export interface ResourceVo {
  /**
   * ID
   */
  id: string;

  /**
   * 文件名
   */
  filename: string;

  /**
   * 资源目录
   */
  dir: string;

  /**
   * 作者。
   */
  authorVo: AuthorVo;

  /**
   * 专辑。
   */
  albumVo?: AlbumVo;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 更新时间
   */
  updateTime: Date;
}

export interface ResourceTypeMapVo {
  /**
   * 主键
   */
  id: string;

  /**
   * 父类型
   */
  parentResourceTypeMapVo?: ResourceTypeMapVo;

  /**
   * 名称
   */
  name: string;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 更新时间
   */
  updateTime: Date;
}

export interface ResourceTypeVo {
  /**
   * ID
   */
  id: string;

  /**
   * 资源id
   */
  resourceVo: ResourceVo;

  /**
   * 类型id
   */
  resourceTypeMapVo: ResourceTypeMapVo;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 更新时间
   */
  updateTime: Date;
}

export interface SiteVo {
  /**
   * ID
   */
  id: string;

  /**
   * 网站名称
   */
  siteName: string;

  /**
   * 网站地址
   */
  url: string;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 更细时间
   */
  updateTime: Date;
}
