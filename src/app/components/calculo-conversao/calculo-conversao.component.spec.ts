import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoConversaoComponent } from './calculo-conversao.component';

describe('CalculoConversaoComponent', () => {
  let component: CalculoConversaoComponent;
  let fixture: ComponentFixture<CalculoConversaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculoConversaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoConversaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
