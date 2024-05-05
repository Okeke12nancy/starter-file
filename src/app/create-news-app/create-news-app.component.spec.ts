import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewsAppComponent } from './create-news-app.component';

describe('CreateNewsAppComponent', () => {
  let component: CreateNewsAppComponent;
  let fixture: ComponentFixture<CreateNewsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewsAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
