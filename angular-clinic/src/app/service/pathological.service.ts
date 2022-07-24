import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pathological} from '../model/Pathological';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PathologicalService {

  constructor(private http: HttpClient) {
  }

  getAll(keyword: string): Observable<Pathological[]> {
    return this.http.get<Pathological[]>(API_URL + `/pathological/list?keyword=${keyword}`);
  }

  savePathological(pathological: Pathological): Observable<Pathological> {
    return this.http.post<Pathological>(API_URL + '/pathological/new', pathological);
  }

  findById(id: number): Observable<Pathological> {
    return this.http.get<Pathological>(`${API_URL}/pathological/${id}`);
  }

  updatePathological(id: number, pathological: Pathological): Observable<Pathological> {
    return this.http.put<Pathological>(`${API_URL}/pathological/${id}`, pathological);
  }
  deletePathological(id: number): Observable<Pathological> {
    return this.http.delete<Pathological>(`${API_URL}/pathological/${id}`);
  }

}
