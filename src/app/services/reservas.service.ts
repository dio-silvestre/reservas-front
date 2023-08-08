import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservas } from '../models/reservas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Reservas[]> {
    return this.http.get<Reservas[]>(this.baseUrl);
  }

  findOne(id: number): Observable<Reservas> {
    return this.http.get<Reservas>(this.baseUrl+`/${id}`);
  }

  deleteOne(item: any): Observable<Reservas> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers, body: JSON.stringify({ nomeHospede: item.nomeHospede, dataInicio: item.dataInicio, dataFim: item.dataFim, quantidadePessoas: item.quantidadePessoas, status: "CANCELADA" }) };
    return this.http.delete<Reservas>(this.baseUrl+`/${item.id}/cancelar`, options);
  }

  updateOnePending(item: any): Observable<Reservas> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers, body: JSON.stringify({ nomeHospede: item.nomeHospede, dataInicio: item.dataInicio, dataFim: item.dataFim, quantidadePessoas: item.quantidadePessoas, status: "PENDENTE" }) };
    return this.http.put<Reservas>(this.baseUrl+`/${item.id}`, options);
  }

  updateOneConfirm(item: any): Observable<Reservas> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers, body: JSON.stringify({ nomeHospede: item.nomeHospede, dataInicio: item.dataInicio, dataFim: item.dataFim, quantidadePessoas: item.quantidadePessoas, status: "CONFIRMADA" }) };
    return this.http.put<Reservas>(this.baseUrl+`/${item.id}`, options);
  }
}
