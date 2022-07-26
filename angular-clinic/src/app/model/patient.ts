export interface Patient {
  id?: number;
  name?: string;
  gender?: string;
  phoneNumber?: string;
  monthOfBirth?: string;
  yearOfBirth?: string;
  createdDate?: string;
  address?: string;
  weight?: string;
  height?: string;
  examinationHistory?: History[];
}
