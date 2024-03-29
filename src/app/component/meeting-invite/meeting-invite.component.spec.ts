import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingInviteComponent } from './meeting-invite.component';

describe('MeetingInviteComponent', () => {
  let component: MeetingInviteComponent;
  let fixture: ComponentFixture<MeetingInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingInviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
