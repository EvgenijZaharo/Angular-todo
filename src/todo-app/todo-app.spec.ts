import { TestBed } from '@angular/core/testing';
import { TodoApp } from './todo-app';

describe('TodoApp', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoApp],
    }).compileComponents();
  });

  it('should create the todos-app', () => {
    const fixture = TestBed.createComponent(TodoApp);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TodoApp);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, internship');
  });
});
