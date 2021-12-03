import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IReport } from '../report/IReport';
import { IAccreditedData, ICollectionAnalyses, IDecisionAction, IMeasures, IMethod, ISlos } from "../report/ISlo";
import { FileServiceService } from '../shared/services/file-service.service';
import { getReportMockData } from './mock/report.mock';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
    
  report!:IReport;
  payload?:IReport;
  reportForm: any;
  auditLog: any;

  constructor(private formBuilder: FormBuilder,
            private activeRoute: ActivatedRoute,
            private route: Router,
            private service: FileServiceService) { }

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
        academic_year: new FormControl('', [Validators.required]),
        author: new FormControl('', [Validators.required]),
        college: new FormControl('', [Validators.required]),
        date_range: new FormControl('', [Validators.required]),
        degree_level: new FormControl('', [Validators.required]),
        department: new FormControl('', [Validators.required]),
        program: new FormControl('', [Validators.required]),
        // slos: this.formBuilder.array([this.createSLO(1)]), //TODO look at this later, may need to know slo length ahead of time
    });

    this.activeRoute.paramMap.subscribe(params => {
        const fileId = params.get('id');
        if (fileId) {
            this.getReportInfo(fileId);
            // this.mockReportInfo();
        }
    })

    this.activeRoute.paramMap.subscribe(params => {
        const fileId = params.get('id');
        if (fileId) {
            this.fileAuditHistory(fileId);
        }
    })

  }

  fileAuditHistory(fileId: string) {
    this.service.getFileAuditHistory(fileId)
        .subscribe((audit:any) => {
            this.auditLog = audit.audit_trail;
        });
  }

  mockReportInfo() {
    this.report = getReportMockData();
    this.editReport(this.report);
  }

  getReportInfo(fileId: string) {
    return this.service.getFile(fileId)
        .subscribe((result : IReport) => {
            this.report = result;
            this.editReport(result);
        });
  }


  editReport(reportData: IReport) {
    //   console.log(reportData.slos)
      this.reportForm.patchValue({
          academic_year : reportData.academic_year,
          accreditation_body : reportData.accreditation_body,
          additional_information : reportData.additional_information,
          author : reportData.author,
          college : reportData.college,
          created : reportData.created,
          date_range : reportData.date_range,
          degree_level : reportData.degree_level,
          department : reportData.department,
          has_been_reviewed : reportData.has_been_reviewed,
          id : reportData.id,
          last_accreditation_review : reportData.last_accreditation_review,
          program : reportData.program,
          slos_meet_standards : reportData.slos_meet_standards,
          stakeholder_involvement : reportData.stakeholder_involvement,
          title : reportData.title,
        //   slos : reportData.slos,
        //   slos : this.formBuilder.array([reportData.slos])
        })
        // console.log(this.report)
        // console.log(this.reportForm.get('slos'))
    }

  createSLO(numberOfSlos: number): FormGroup  {
        return this.formBuilder.group({
            bloom: new FormControl('', [Validators.required, Validators.maxLength(32)]),
            common_graduate_program_slo: new FormControl('', [Validators.required, Validators.maxLength(32)]),
            description: new FormControl('', [Validators.required, Validators.maxLength(32)]),
            id: new FormControl('', [Validators.required, Validators.maxLength(32)]),
            report_id: new FormControl('', [Validators.required, Validators.maxLength(32)])
        });
    }

public isChecked(bloom:any, type:string):boolean {
    //cast to string in case of number
    return (bloom+"").toUpperCase().includes(type.toUpperCase())
}

  public updateReport(): void {
      this.payload = this.setPayload()
      this.service.updateReport(this.payload)
      .subscribe({
          error: (error: any) => {
              console.error(error);
            },
            next: () => {
                this.route.navigate(['/dashboard']);
            }
      })
  }

  public resetReport(): void {
    this.getReportInfo(this.report.id);
  }

  public cancelReview(): void {
    this.route.navigate(['/dashboard']);
  }

  public deleteReport(): void {
    if(confirm("Are you sure to delete " + this.report.id)) {
        this.service.deleteReport(this.report.id)
        .subscribe({
            error: (error: any) => {
                console.error(error);
            },
            next: () => {
                this.route.navigate(['/dashboard']);
            }
        })
    }
  }

  setPayload(): IReport {
      let slosPayload: ISlos[] = [];
      for (let sloFormIndex = 1; sloFormIndex <= this.report.slos.length; sloFormIndex++) {
          let sloIndex = sloFormIndex - 1;
          
          let slo: ISlos;
          let analysisArray: ICollectionAnalyses[] = [];
          let measureArray: IMeasures[] = [];
          let decsionArray: IDecisionAction[] = [];
          let accreditedArray: IAccreditedData[] = [];
          let methodArray: IMethod[] = [];
          // console.log(this.report.slos[sloFormIndex]['accredited_data_analyses'].length == 0 
          // ? ['empty'] : this.report.slos[sloFormIndex]['accredited_data_analyses'])
          let reportId = parseInt(this.report['id']);
          let sloId = this.report.slos[sloIndex]['id'];
          for (let collectionAnalysisIndex = 0; 
              collectionAnalysisIndex < this.report.slos[sloIndex].collection_analyses.length; 
              collectionAnalysisIndex++) {
                  
              const dataCollectionForm = document.querySelector('#SLO' + sloFormIndex + 'DataCollection' + (collectionAnalysisIndex + 1)) as HTMLFormElement;
              const dataCollection = new FormData(dataCollectionForm);
              let analysis: ICollectionAnalyses;
              let analysisId = this.report.slos[sloIndex]['collection_analyses'][collectionAnalysisIndex]['id'];
              analysis = {
                  data_collection_date_range: dataCollection.get('data_collection_date_range') === null 
                      ? '' : dataCollection.get('data_collection_date_range') as string,
                  id: analysisId,
                  number_of_students_assessed: dataCollection.get('number_of_students_assessed') === null 
                      ? '' : dataCollection.get('number_of_students_assessed') as string,
                  percentage_who_met_or_exceeded: dataCollection.get('percentage_who_met_or_exceeded') === null 
                      ? '' : dataCollection.get('percentage_who_met_or_exceeded') as string,
                  slo_id: sloId,
              }
              analysisArray.push(analysis);
          }
  
          for (let measureIndex = 0; 
              measureIndex < this.report.slos[sloIndex].measures.length; 
              measureIndex++) {
  
              const measureForm = document.querySelector('#SLO' + sloFormIndex + 'Measure' + (measureIndex + 1)) as HTMLFormElement;
              const measureData = new FormData(measureForm);
              let measureId = this.report.slos[sloIndex]['measures'][measureIndex]['id'];
  
              let measure: IMeasures;
              measure = {
                  description: measureData.get('description') === null 
                      ? '' : measureData.get('description') as string,
                  domain: measureData.get('domain') === null 
                      ? '' : measureData.get('domain') as string,
                  frequency_of_collection: measureData.get('frequency_of_collection') === null 
                      ? '' : measureData.get('frequency_of_collection') as string,
                  id: measureId,
                  point_in_program: measureData.get('point_in_program') === null 
                      ? '' : measureData.get('point_in_program') as string,
                  population_measured: measureData.get('population_measured') === null 
                      ? '' : measureData.get('population_measured') as string,
                  proficiency_target: measureData.get('proficiency_target') === null 
                      ? '' : measureData.get('proficiency_target') as string,
                  proficiency_threshold: measureData.get('proficiency_threshold') === null 
                      ? '' : measureData.get('proficiency_threshold') as string,
                  slo_id: sloId,
                  title: measureData.get('title') === null 
                      ? '' : measureData.get('title') as string,
                  type: measureData.get('type') === null 
                      ? '' : measureData.get('type') as string,
              }
              measureArray.push(measure);
          }
  
          for (let decisionIndex = 0; 
              decisionIndex < this.report.slos[sloIndex].decision_actions.length; 
              decisionIndex++) {
  
              const decisionForm = document.querySelector('#SLO' + sloFormIndex + 'DecisionAction' + (decisionIndex + 1)) as HTMLFormElement;
              const decisionData = new FormData(decisionForm);
              let decisionId = this.report.slos[sloIndex]['decision_actions'][decisionIndex]['id'];
  
              let decision: IDecisionAction;
              decision = {
                  content: decisionData.get('content') === null 
                      ? '' : decisionData.get('content') as string,
                  id: decisionId,
                  slo_id: sloId,
              }
              decsionArray.push(decision)
          }
  
          for (let accreditedIndex = 0; 
              accreditedIndex < this.report.slos[sloIndex].accredited_data_analyses.length; 
              accreditedIndex++) {
  
              const accreditedForm = document.querySelector('#SLO' + sloFormIndex + 'AccreditedData' + (accreditedIndex + 1)) as HTMLFormElement;
              const accreditedData = new FormData(accreditedForm);
              let accreditedId = this.report.slos[sloIndex]['accredited_data_analyses'][accreditedIndex]['id'];
  
              let accreditData: IAccreditedData;
              accreditData = {
                  status: accreditedData.get('status') === null 
                      ? '' : accreditedData.get('status') as string,
                  id: accreditedId,
                  slo_id: sloId,
              }
              accreditedArray.push(accreditData)
          }
  
          for (let methodIndex = 0; 
              methodIndex < this.report.slos[sloIndex].methods.length; 
              methodIndex++) {
  
              const methodForm = document.querySelector('#SLO' + sloFormIndex + 'AssessmentMethod' + (methodIndex + 1)) as HTMLFormElement;
              const methodData = new FormData(methodForm);
              let decisionId = this.report.slos[sloIndex]['methods'][methodIndex]['id'];
  
              let method: IMethod;
              method = {
                  data_collection: methodData.get('data_collection') === null 
                      ? '' : methodData.get('data_collection') as string,
                      domain: methodData.get('domain') === null 
                      ? '' : methodData.get('domain') as string,
                      measure: methodData.get('measure') === null 
                      ? '' : methodData.get('measure') as string,
                  id: decisionId,
                  slo_id: sloId,
              }
              methodArray.push(method)
          }
          
          const form = document.querySelector('#mySLO' + sloFormIndex) as HTMLFormElement;
          const data = new FormData(form);
          slo = {
              accredited_data_analyses: accreditedArray,
              bloom: data.get('bloom') === null 
                  ? '' : data.get('bloom') as string,
              collection_analyses: analysisArray,
              common_graduate_program_slo: data.get('common_graduate_program_slo') === null 
                  ? '' : data.get('common_graduate_program_slo') as string,
              decision_actions: decsionArray,
              description: data.get('description') === null 
                  ? '' : data.get('description') as string,
              id: sloId,
              measures: measureArray,
              methods: methodArray,
              report_id: reportId,
          }
          slosPayload.push(slo);
      }
      return {
          academic_year : this.reportForm.get('academic_year').value,
          creator_id: this.report['creator_id'],
          valid: this.report['valid'],
          accreditation_body : this.report['accreditation_body'],
          additional_information: this.report['additional_information'],
          author : this.reportForm.get('author').value,
          college : this.reportForm.get('college').value,
          created : this.report['created'],
          date_range : this.reportForm.get('date_range').value,
          degree_level : this.reportForm.get('degree_level').value,
          department : this.reportForm.get('department').value,
          has_been_reviewed : true,
          id : this.report['id'],
          last_accreditation_review: this.report['last_accreditation_review'],
          program : this.reportForm.get('program').value,
          slos_meet_standards : this.reportForm.get('slos_meet_standards') === null 
              ? '' : this.reportForm.get('slos_meet_standards').value,
          stakeholder_involvement: this.report['stakeholder_involvement'],
          title : this.report['title'],
          slos : slosPayload
      }
  }
    
}
