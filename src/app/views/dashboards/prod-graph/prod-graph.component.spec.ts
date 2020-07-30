import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdGraphComponent } from './prod-graph.component';

describe('ProdGraphComponent', () => {
  let component: ProdGraphComponent;
  let fixture: ComponentFixture<ProdGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
