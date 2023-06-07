import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesFormComponent } from './tables-form.component';

describe('TablesFormComponent', () => {
  let component: TablesFormComponent;
  let fixture: ComponentFixture<TablesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablesFormComponent]
    });
    fixture = TestBed.createComponent(TablesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
