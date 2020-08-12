import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientenuevoComponent } from './clientenuevo.component';

describe('ClientenuevoComponent', () => {
  let component: ClientenuevoComponent;
  let fixture: ComponentFixture<ClientenuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientenuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientenuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
