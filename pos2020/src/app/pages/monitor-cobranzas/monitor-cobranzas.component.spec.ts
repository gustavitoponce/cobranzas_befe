import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorCobranzasComponent } from './monitor-cobranzas.component';

describe('MonitorCobranzasComponent', () => {
  let component: MonitorCobranzasComponent;
  let fixture: ComponentFixture<MonitorCobranzasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorCobranzasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorCobranzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
