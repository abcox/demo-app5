import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPageAddComponent } from './client-page-add.component';

describe('ClientPageAddComponent', () => {
  let component: ClientPageAddComponent;
  let fixture: ComponentFixture<ClientPageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPageAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientPageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
