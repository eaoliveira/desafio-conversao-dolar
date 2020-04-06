import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Resultado } from 'src/app/models/resultado.model';
import { CotacaoService } from 'src/app/services/cotacao.service';


const iofCartao = '1.1';
const iofDinheiro = '06.4';
@Component({
  selector: 'app-calculo-conversao',
  templateUrl: './calculo-conversao.component.html',
  styleUrls: ['./calculo-conversao.component.scss']
})

export class CalculoConversaoComponent implements OnInit {

  @Output() resultadoEmitido = new EventEmitter()
  private cotacaoForm: FormGroup;
  private cotacaoDia;
  private resultado: Resultado = {
    iofValor: null,
    dolarComImposto: null,
    dolarSemImposto: null,
    impostoEstado: null,
    realComImposto: null,
    realSemImposto: null
  };


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

    this.cotacaoForm.markAllAsTouched()

    if (this.cotacaoForm.valid) {

      if (this.cotacaoForm.get('pagamento').value == 'dinheiro') {
        this.resultado.iofValor = String(Number(this.cotacaoForm.get('valorConversao').value) * Number(iofDinheiro))
      } else {
        this.resultado.iofValor = String(Number(this.cotacaoForm.get('valorConversao').value) * Number(iofCartao))
      }

      this.resultado.impostoEstado = this.cotacaoForm.get('valorTaxa').value

      this.resultado.dolarSemImposto = this.cotacaoForm.get('valorConversao').value

      this.resultado.dolarComImposto = String(Number(this.resultado.dolarSemImposto) + Number(this.resultado.dolarSemImposto) * (Number(this.resultado.impostoEstado)/100))

      this.resultado.realSemImposto = String(Number(this.resultado.dolarComImposto) * Number(this.cotacaoDia))
      this.resultado.realComImposto = String(Number(this.resultado.realSemImposto) + Number(this.resultado.realSemImposto) * Number(this.cotacaoDia))
      this.resultadoEmitido.emit(this.resultado)

    }
  }
}
