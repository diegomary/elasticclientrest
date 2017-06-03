import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElclientComponent } from './elclient.component';

describe('ElclientComponent', () => {
  let component: ElclientComponent;
  let fixture: ComponentFixture<ElclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
