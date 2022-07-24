import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../model/patient';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  getAll(keyword: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(API_URL + `/patients/list?keyword=${keyword}`);
  }

  savePatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(API_URL + '/patients/new', patient);
  }

  findById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${API_URL}/patients/${id}`);
  }

  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${API_URL}/patients/${id}`, patient);
  }

  deletePatient(id: number): Observable<Patient> {
    return this.http.delete<Patient>(`${API_URL}/patients/${id}`);
  }
}
