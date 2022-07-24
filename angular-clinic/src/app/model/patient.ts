export interface Patient {
  id?: number;
  name?: string;
  gender?: string;
  phoneNumber?: string;
  yearOfBirth?: string;
  createdDate?: string;
  address?: string;
  weight?: number;
  height?: number;
  examinationHistory?: History[];
}
