import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { IPatient } from './queue.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) { }

  getPatients(update) {
    return this.http.get<IPatient[]>(environment.backend + '/api/patients?update=' + update + '').pipe(share())
  }

}

