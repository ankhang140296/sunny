import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfStatusComponent } from './type-of-status.component';

describe('TypeOfStatusComponent', () => {
  let component: TypeOfStatusComponent;
  let fixture: ComponentFixture<TypeOfStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
