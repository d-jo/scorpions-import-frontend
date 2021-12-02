import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IReport } from '../report/IReport';
import { ICollectionAnalyses, IDecisionAction, IMeasures, ISlos } from "../report/ISlo";
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

  constructor(private formBuilder: FormBuilder,
            private activeRoute: ActivatedRoute,
            private route: Router,
            private service: FileServiceService) { }

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
        academic_year: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        author: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        college: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        date_range: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        degree_level: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        department: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        program: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        // slos: this.formBuilder.array([this.createSLO(1)]), //TODO look at this later, may need to know slo length ahead of time
    });

    this.activeRoute.paramMap.subscribe(params => {
        const fileId = params.get('id');
        if (fileId) {
            this.getReportInfo(fileId);
            // this.mockReportInfo();
        }
    })
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
              console.log(error);
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
                console.log(error);
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
            // console.log(this.report.slos[sloFormIndex]['accredited_data_analyses'].length == 0 
            // ? ['empty'] : this.report.slos[sloFormIndex]['accredited_data_analyses'])
            let reportId = parseInt(this.report['id']);
            let sloId = this.report.slos[sloIndex]['id'];
            for (let collectionAnalysisIndex = 0; 
                collectionAnalysisIndex < this.report.slos[sloIndex].collection_analyses.length; 
                collectionAnalysisIndex++) {
                    
                // console.log('#SLO' + sloFormIndex + 'DataCollection' + (collectionAnalysisIndex + 1));
                const dataCollectionForm = document.querySelector('#SLO' + sloFormIndex + 'DataCollection' + (collectionAnalysisIndex + 1)) as HTMLFormElement;
                const dataCollection = new FormData(dataCollectionForm);
                // console.log(dataCollection.get('data_collection_date_range') as string)
                let analysis: ICollectionAnalyses;
                let analysisId = this.report.slos[sloIndex]['collection_analyses'][collectionAnalysisIndex]['id'];
                let tempCollectionAnaysis = this.report.slos[sloIndex]['collection_analyses'][collectionAnalysisIndex];
                // console.log(tempCollectionAnaysis);
                analysis = {
                    data_collection_date_range: dataCollection.get('data_collection_date_range') as string,
                    id: analysisId,
                    number_of_students_assessed: dataCollection.get('number_of_students_assessed') as string,
                    percentage_who_met_or_exceeded: dataCollection.get('percentage_who_met_or_exceeded') as string,
                    slo_id: sloId,
                }
                analysisArray.push(analysis);
            }

            let measure: IMeasures;
            measure = {
                description: "",
                domain: "",
                frequency_of_collection: "",
                id: 0,
                point_in_program: "",
                population_measured: "",
                proficiency_target: "",
                proficiency_threshold: "",
                slo_id: sloId,
                title: "",
                type: "",
            }

            let decsion: IDecisionAction;
            decsion = {
                content: "",
                id: 0,
                slo_id: sloId,
            }
            
            const form = document.querySelector('#mySLO' + sloFormIndex) as HTMLFormElement;
            const data = new FormData(form);
            slo = {
                accredited_data_analyses: [],
                bloom: data.get('bloom') as string,
                // collection_analyses: this.report.slos[sloFormIndex]['collection_analyses'],
                collection_analyses: analysisArray,
                common_graduate_program_slo: data.get('common_graduate_program_slo') as string,
                // decision_actions: this.report.slos[sloFormIndex]['decision_actions'],
                decision_actions: [],
                description: data.get('description') as string,
                id: sloId,
                measures: this.report.slos[sloIndex]['measures'],
                methods: this.report.slos[sloIndex]['methods'],
                report_id: reportId,
            }
            slosPayload.push(slo);
            console.log(slosPayload)
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
