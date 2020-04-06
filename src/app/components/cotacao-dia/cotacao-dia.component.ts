import { Component, OnInit } from '@angular/core';
import { CotacaoService } from 'src/app/services/cotacao.service';

@Component({
  selector: 'app-cotacao-dia',
  templateUrl: './cotacao-dia.component.html',
  styleUrls: ['./cotacao-dia.component.scss']
})
export class CotacaoDiaComponent implements OnInit {

  private cotacaoAutomatica;
  constructor(private cotacaoService: CotacaoService) {
    //chama service para buscar informação de cotação
    this.cotacaoService.getCotacaoDia().subscribe(valor => {
      this.cotacaoAutomatica = valor.USD.bid
    })
  }

  ngOnInit() {
  }



}
