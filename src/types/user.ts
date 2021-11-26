import type { MediaType } from '.';

export type DoctorStatus = 'active' | 'deactive' | 'notRegister';

export type SpecialityType = {
  id?: number;
  name?: string;
  description?: string;
  slug?: string;
};

export type StudyType = {
  id?: number;
  name?: string;
  slug?: string;
};

export type LocationType = {
  id?: number;
  name?: string;
  slug?: string;
  type?: string;
};

export type DoctorType = {
  id?: number;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  identityNumber?: string | number;
  website?: string;
  status?: DoctorStatus;
  about?: string;
  metaTitle?: string;
  metaDescription?: string;
  statusQa?: string;
  voiceConversationStatus?: 'active' | 'inactive';
  pricingQa?: number | string;
  responseTimeQa?: number;
  defaultMessageQa?: string;
  gallery?: [];
  doctormetas?: [
    {
      id: number;
      meta: {
        id: number;
        type?: string;
        name?: string;
      };
    },
  ];
  user?: UserType;
  socialAdress?: {
    instagram: string;
    telegram: string;
    linkedin: string;
    twitter: string;
  };
  cover?: any;
  services?: string;
  secondDefaultMessage?: string;
  specialities?: SpecialityType[];
  locations?: LocationType[];
  studies?: StudyType[];
};

export type UserType = {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phoneNumber?: string;
  avatar?: MediaType;
  role?: {
    type?: 'authenticated' | 'guest' | 'admin' | 'doctor' | 'healthcenter';
    id: string | number;
  };
  doctor?: DoctorType;
  created_at?: string | undefined;
  gender?: 'man' | 'women' | null;
  smsCode?: string | number;
  note?: string;
  wallet?: {
    amount?: string | number | null;
    created_at?: string;
    id?: number | string;
    updated_at?: string;
    user?: number | string;
  };
};
