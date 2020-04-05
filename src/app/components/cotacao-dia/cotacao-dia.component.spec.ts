import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotacaoDiaComponent } from './cotacao-dia.component';

describe('CotacaoDiaComponent', () => {
  let component: CotacaoDiaComponent;
  let fixture: ComponentFixture<CotacaoDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotacaoDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotacaoDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
