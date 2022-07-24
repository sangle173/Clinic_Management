import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Medicine} from '../model/Medicine';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) {
  }

  getAll(keyword: string): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(API_URL + `/medicines/list?keyword=${keyword}`);
  }

  saveMedicine(medicine: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(API_URL + '/medicines/new', medicine);
  }

  findById(id: number): Observable<Medicine> {
    return this.http.get<Medicine>(`${API_URL}/medicines/${id}`);
  }

  updateMedicine(id: number, medicine: Medicine): Observable<Medicine> {
    return this.http.put<Medicine>(`${API_URL}/medicines/${id}`, medicine);
  }

  deleteMedicine(id: number): Observable<Medicine> {
    return this.http.delete<Medicine>(`${API_URL}/medicines/${id}`);
  }
}
