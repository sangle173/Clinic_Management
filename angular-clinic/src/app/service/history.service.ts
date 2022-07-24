import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {History} from '../model/History';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) {
  }

  getAll(keyword: string): Observable<History[]> {
    return this.http.get<History[]>(API_URL + `/histories/list?keyword=${keyword}`);
  }

  saveHistory(history: History): Observable<History> {
    return this.http.post<History>(API_URL + '/histories/new', history);
  }

  findById(patientId: number): Observable<History[]> {
    return this.http.get<History[]>(`${API_URL}/histories/${patientId}`);
  }

  findNearlyById(patientId: number): Observable<History> {
    return this.http.get<History>(`${API_URL}/histories/nearly/${patientId}`);
  }

  updateHistory(id: number, history: History): Observable<History> {
    return this.http.put<History>(`${API_URL}/histories/${id}`, history);
  }

  deleteHistory(id: number): Observable<History> {
    return this.http.delete<History>(`${API_URL}/histories/${id}`);
  }
}
