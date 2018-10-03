import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IPatient } from './queue.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) { }

  getPatients() {
    return this.http.get<IPatient[]>('http://localhost:3000/api/patients')
  }

}

