import { Component, OnInit, Input } from '@angular/core';
import { Resultado } from 'src/app/models/resultado.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  @Input() resultado: Resultado = {
    iofValor: null,
    dolarComImposto: null,
    dolarSemImposto: null,
    impostoEstado: null,
    realComImposto: null,
    realSemImposto: null
  };

  constructor() { }

  ngOnInit() {
  }

}
