export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  identity: Identity;
  gender: string;
  birthDate?: string;
  email?: string;
  phoneNumber?: string;
  nationality?: string;
  citizenship?: string;
  residence?: PatientAddressData;
  domicile?: PatientAddressData;
  sequence?: string;
  privacy?: boolean;
  idMpi?: string | null;
  userVerified: boolean;
  firstAccess: boolean;
};

export type Identity = {
  identity: string;
  id?: string;
};

export type PatientAddressData = {
  municipalityCode?: string;
  municipalityName?: string;
  street?: string;
  number?: string;
  zipCode?: string;
};
