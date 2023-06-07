import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesViewComponent } from './tables-view.component';

describe('TablesViewComponent', () => {
  let component: TablesViewComponent;
  let fixture: ComponentFixture<TablesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablesViewComponent]
    });
    fixture = TestBed.createComponent(TablesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
