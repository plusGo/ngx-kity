import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
  });

  it(`should have as title 'ngx-kity'`, () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
  });

  it('should render title', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // fixture.detectChanges();
    // const compiled = fixture.debugElement.nativeElement;
    // expect(compiled.querySelector('.content span').textContent).toContain('ngx-kity app is running!');
  });
});
