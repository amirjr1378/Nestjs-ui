export type EntityType = {
  name?: string;
};

export type EntityRecordType = {
  id?: number;
  [key: string]: any;
};

export type EntityRecordPropertyType = {
  propertyName: string;
  type: string;
  isRelationField?: boolean;
};
