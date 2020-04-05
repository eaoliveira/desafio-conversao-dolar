import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Resultado } from 'src/app/models/resultado.model';
import { CotacaoService } from 'src/app/services/cotacao.service';


const iofCartao = '1,1';
const iofDinheiro = '6,4';
@Component({
  selector: 'app-calculo-conversao',
  templateUrl: './calculo-conversao.component.html',
  styleUrls: ['./calculo-conversao.component.scss']
})

export class CalculoConversaoComponent implements OnInit {

  @Output() resultadoEmitido = new EventEmitter()
  private cotacaoForm: FormGroup;
  private cotacaoDia;

  constructor(private cotacaoService: CotacaoService) {
    this.cotacaoForm = new FormGroup({
      pagamento: new FormControl("", Validators.required),
      valorConversao: new FormControl("", Validators.required),
      valorTaxa: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

    this.cotacaoService.getCotacaoDia().subscribe(valor => {
      this.cotacaoDia = valor.USD.bid
    })
  }



  calcularResultado() {
    console.log(this.cotacaoForm.get('pagamento').value)

    var resultado: Resultado;
    this.cotacaoForm.markAllAsTouched()

    if (this.cotacaoForm.valid) {

      if (this.cotacaoForm.get('pagamento').value == 'dinheiro') {
        resultado.iofValor = String(Number(this.cotacaoForm.get('valorConversao').value) * Number(iofDinheiro))
      } else {
        resultado.iofValor = String(Number(this.cotacaoForm.get('valorConversao').value) * Number(iofCartao))
      }

      resultado.impostoEstado = this.cotacaoForm.get('valorTaxa').value

      resultado.dolarSemImposto = this.cotacaoForm.get('valorConversao').value

      resultado.dolarComImposto = String(Number(resultado.dolarSemImposto) + Number(resultado.dolarSemImposto) * Number(resultado.impostoEstado))

      resultado.realSemImposto = String(Number(resultado.dolarComImposto) * Number(this.cotacaoDia))
      resultado.realComImposto = String(Number(resultado.realSemImposto) + Number(resultado.realSemImposto) * Number(this.cotacaoDia))
      this.resultadoEmitido.emit(resultado)

    }
  }
}
