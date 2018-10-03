import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPatient } from './queue.component';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor() { }

  getPatients(): Observable<IPatient> {
    return null;
  }

}

