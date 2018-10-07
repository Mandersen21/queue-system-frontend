import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Information3Component } from './information3.component';

describe('Information3Component', () => {
  let component: Information3Component;
  let fixture: ComponentFixture<Information3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Information3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Information3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
