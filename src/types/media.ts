export type Thumbnail = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  formats: Formats;
};

export type Medium = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
};

export type Small = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
};

export type Formats = {
  thumbnail: Thumbnail;
  medium: Medium;
  small: Small;
};

export type MediaType = {
  id: number;
  name: string;
  hash: string;
  sha256?: any;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  public_id?: any;
  created_at: Date;
  updated_at: Date;
  provider_metadata?: any;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
  formats: Formats;
  previewUrl?: any;
  created_by?: any;
  updated_by?: any;
};
