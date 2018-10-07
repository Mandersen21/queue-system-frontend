import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Information2Component } from './information2.component';

describe('Information2Component', () => {
  let component: Information2Component;
  let fixture: ComponentFixture<Information2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Information2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Information2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
