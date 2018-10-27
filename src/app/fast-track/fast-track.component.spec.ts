import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastTrackComponent } from './fast-track.component';

describe('FastTrackComponent', () => {
  let component: FastTrackComponent;
  let fixture: ComponentFixture<FastTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
