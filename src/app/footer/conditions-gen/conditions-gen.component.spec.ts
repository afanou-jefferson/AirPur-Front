import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsGenComponent } from './conditions-gen.component';

describe('ConditionsGenComponent', () => {
  let component: ConditionsGenComponent;
  let fixture: ComponentFixture<ConditionsGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionsGenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
