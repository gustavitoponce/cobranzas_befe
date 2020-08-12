import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedornuevoComponent } from './proveedornuevo.component';

describe('ProveedornuevoComponent', () => {
  let component: ProveedornuevoComponent;
  let fixture: ComponentFixture<ProveedornuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedornuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedornuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
