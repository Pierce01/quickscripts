export interface ISection {
  name: string,
  parent: number,
  description?: string,
  status?: number,
  workflow?: number,
  path?: string,
  "output-uri"?: string,
  "access-key"?: string,
  seo?: string,
  "file-name"?: string,
  show?: boolean,
  eForm?: boolean,
  archive?: boolean,
  printSequence?: number,
  contentSortMethod?: number,
  sectionSortMethod?: number,
  link?: boolean,
  channels?: IChannel[],
  userIDs?: number[],
  inheritedUserIDs?: number[],
  groupIDs?: number[],
  inheritedGroupIDs?: number[],
  viewUserIDs?: number[],
  viewGroupIDs?: number[],
  contentTypeScopes?: [],
  metaDatas?: any[],
  excludedMirrorSections?: [],
  accessControl?: IGeneric,
  metaData?: IGeneric,
  pathMembers?: number[],
  accessControlType?: number,
  metaDataType?: number,
  inheritedPageLayouts?: any,
  enableOutputUri?: boolean,
  enableOutputFilename?: boolean,
  enablePathAsOutputUri?: boolean,
  inheritedLinkSection?: boolean,
  accessControlEnabled?: boolean,
  accessControlInherited?: boolean,
}

export interface IChannel {
  id: number,
  pageLayout: number,
  inheritedPageLayout: number
}

export interface IContentTypeScope {
  id: number,
  scope: number,
  inherited: number
}

export interface IGeneric {
  id: number,
  type: number,
  enabled: boolean,
  active: boolean
}