import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IPatient } from '../queue/queue.component';
import { IPatientOption } from './admin.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  public addPatient(name, infant, triage, queueType, queuePriority, queuePosition) {
    return this.http.post(environment.backend + '/api/patients',
      {
        "name": name,
        "age": infant == true ? 2 : 50,
        "triage": triage,
        "fastTrack": queueType,
        "queuePriority": queuePriority,
        "queuePosition": queuePosition
      })
  }

  public updatePatient(patientId, name, infant, triage, queueType, queuePriority, queuePosition) {
    return this.http.put(environment.backend + '/api/patients/' + patientId,
      {
        "name": name,
        "age": infant == true ? 2 : 50,
        "triage": triage,
        "fastTrack": queueType,
        "queuePriority": queuePriority,
        "queuePosition": Number(queuePosition)
      })
  }

  public getPatient(patientId) {
    return this.http.get(environment.backend + '/api/patients/' + patientId)
  }

  public getPatients() {
    return this.http.get<IPatient[]>(environment.backend + '/api/patients/');
  }

  public getOptions() {
    return this.http.get<IPatientOption[]>(environment.backend + '/api/options');
  }

  public updateOptions(acutePatients, message, fastTrackOpen) {
    return this.http.put(environment.backend + '/api/options',
      {
        "acutePatients": acutePatients,
        "acutePatientMessage": message,
        "fastTrackOpen": fastTrackOpen
      })
  }

  public deletePatient(patientId) {
    return this.http.delete(environment.backend + '/api/patients/' + patientId)
  }

  public deleteAllPatients() {
    return this.http.delete(environment.backend + '/api/patients')
  }
}
