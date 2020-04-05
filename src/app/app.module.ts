import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelaPrincipalComponent } from './components/tela-principal/tela-principal.component';
import { CotacaoDiaComponent } from './components/cotacao-dia/cotacao-dia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CotacaoService } from './services/cotacao.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalculoConversaoComponent } from './components/calculo-conversao/calculo-conversao.component';
import { IgxMaskModule } from 'igniteui-angular';
import { ResultadosComponent } from './components/resultados/resultados.component';

@NgModule({
  declarations: [
    AppComponent,
    TelaPrincipalComponent,
    CotacaoDiaComponent,
    CalculoConversaoComponent,
    ResultadosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IgxMaskModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [CotacaoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
