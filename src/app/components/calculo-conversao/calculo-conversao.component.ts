import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Resultado } from 'src/app/models/resultado.model';
import { CotacaoService } from 'src/app/services/cotacao.service';


const iofCartao = '1.1';
const iofDinheiro = '6.38';
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

    //declaração de form
    this.cotacaoForm = new FormGroup({
      pagamento: new FormControl("", Validators.required),
      valorConversao: new FormControl("", Validators.required),
      valorTaxa: new FormControl('', Validators.required)
    });

    //atualiza automaticamente valores mudados nos forms
    this.cotacaoForm.valueChanges.subscribe(a => { this.calcularResultado() })
  }

  ngOnInit() {
    //busca cotação
    this.cotacaoService.getCotacaoDia().subscribe(valor => {
      this.cotacaoDia = valor.USD.bid
    })
  }

  //para clicar nos labels dos radio buttons
  setRadio(valor) {
    this.cotacaoForm.get('pagamento').setValue(valor)
    this.cotacaoForm.markAsTouched()
  }

  calcularResultado() {

//somente executa se todos os campos estiverem válidos
    if (this.cotacaoForm.valid) {

      this.resultado.impostoEstado = this.cotacaoForm.get('valorTaxa').value

      this.resultado.dolarSemImposto = this.cotacaoForm.get('valorConversao').value

      this.resultado.dolarComImposto = String(Number(this.resultado.dolarSemImposto) + Number(this.resultado.dolarSemImposto) * (Number(this.resultado.impostoEstado)))

      this.resultado.realSemImposto = String(Number(this.resultado.dolarComImposto) * Number(this.cotacaoDia))
      if (this.cotacaoForm.get('pagamento').value == 'dinheiro') {
        this.resultado.iofValor = String(Number(this.resultado.realSemImposto) * (Number(iofDinheiro) / 100))
      } else {
        this.resultado.iofValor = String(Number(this.resultado.realSemImposto) * (Number(iofCartao) / 100))
      }
      this.resultado.realComImposto = String(Number(this.resultado.realSemImposto) + Number(this.resultado.iofValor))
      this.resultadoEmitido.emit(this.resultado)
      console.log(this.resultado)

    }
  }
}
