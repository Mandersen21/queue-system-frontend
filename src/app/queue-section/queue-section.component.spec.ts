import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueSectionComponent } from './queue-section.component';

describe('QueueSectionComponent', () => {
  let component: QueueSectionComponent;
  let fixture: ComponentFixture<QueueSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
