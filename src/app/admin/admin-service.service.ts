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

  public addPatient(name, infant, triage, queueType) {
    return this.http.post(environment.backend + '/api/patients',
      {
        "name": name,
        "age": infant == true ? 2 : 50,
        "triage": triage,
        "fastTrack": queueType
      })
  }

  public updatePatient(patientId, name, infant, triage, queueType) {
    return this.http.put(environment.backend + '/api/patients/' + patientId,
      {
        "name": name,
        "age": infant == true ? 2 : 50,
        "triage": triage,
        "fastTrack": queueType
      })
  }

  public getPatient(patientId) {
    return this.http.get(environment.backend + '/api/patients/' + patientId)
  }

  public getPatients() {
    return this.http.get<IPatient[]>(environment.backend + '/api/patients/');
  }

  public getOptions() {
    return this.http.get<IPatientOption>(environment.backend + 'api/patients/options');
  }

  public updateOptions(acutePatients) {
    return this.http.post(environment.backend + 'api/patients/options',
      {
        acutePatients: acutePatients
      })
  }

  public deletePatient(patientId) {
    return this.http.delete(environment.backend + '/api/patients' + patientId)
  }
}
