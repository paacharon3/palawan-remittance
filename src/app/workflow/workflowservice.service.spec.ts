import { WorkflowService } from './workflow.service';
import { TestBed, inject } from '@angular/core/testing';


describe('WorkflowserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkflowService]
    });
  });

  it('should be created', inject([WorkflowService], (service: WorkflowService) => {
    expect(service).toBeTruthy();
  }));
});
