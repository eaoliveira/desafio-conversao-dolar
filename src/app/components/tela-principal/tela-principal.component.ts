import { Component, OnInit } from '@angular/core';
import { Resultado } from 'src/app/models/resultado.model';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.scss']
})
export class TelaPrincipalComponent implements OnInit {

  private resultado: Resultado;
  constructor() { }

  ngOnInit() {
  }

  //envia resultado emitido pelo output do calculo conversão para o resultados
  showResultado(resultado: Resultado) {
    this.resultado = resultado
  }

}
