import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona.model'; 
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiUrl = environment.apiUrl;
  apiKey = environment.apiKey;
  personEndpoint = 'personas'; 

  constructor(private http: HttpClient) { }

  getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${this.personEndpoint}/get/${id}`);
  }

  getAllPersonas(page: number, size: number): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}/${this.personEndpoint}/getAll?page=${page}&size=${size}`);
  }

  addPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.apiUrl}/${this.personEndpoint}/add`, persona, httpOptions);
  }

  updatePersona(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}/${this.personEndpoint}/update/${id}`, persona, httpOptions);
  }

  deletePersona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.personEndpoint}/delete/${id}`);
  }
}
