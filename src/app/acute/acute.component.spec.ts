import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuteComponent } from './acute.component';

describe('AcuteComponent', () => {
  let component: AcuteComponent;
  let fixture: ComponentFixture<AcuteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcuteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
