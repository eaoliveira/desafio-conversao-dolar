import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cotacao } from '../models/cotacao.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotacaoService {
  private cotacao;
  constructor(private service: HttpClient) { }

  //codigo para buscar informação de cotação da API
  public  getCotacaoDia(): Observable<Cotacao> {
    return this.service.get<Cotacao>('https://economia.awesomeapi.com.br/all/USD-BRL')
  }

}
