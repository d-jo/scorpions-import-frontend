import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IReport } from '../report/IReport';
import { FileServiceService } from '../shared/services/file-service.service';

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
    this.report = {
        academic_year: "2018-19",
        accreditation_body: "",
        additional_information: "",
        author: "Andrew W Swift",
        college: "Arts & Sciences",
        created: 1637691952,
        creator_id: "google-oauth2|101860098464380056734",
        date_range: "2016-2018",
        degree_level: "Masters",
        department: "Mathematics",
        has_been_reviewed: false,
        id: "1",
        last_accreditation_review: "",
        program: "MS",
        slos: [
            {
                accredited_data_analyses: [],
                bloom: "Application",
                collection_analyses: [],
                common_graduate_program_slo: "1",
                decision_actions: [],
                description: "Mastery of discipline content",
                id: 1,
                measures: [],
                methods: [],
                report_id: 1
            },
            {
                accredited_data_analyses: [],
                bloom: "Evaluation",
                collection_analyses: [],
                common_graduate_program_slo: "2",
                decision_actions: [],
                description: "Proficiency in analyzing, evaluating, and synthesizing information",
                id: 2,
                measures: [],
                methods: [],
                report_id: 1
            },
            {
                accredited_data_analyses: [],
                bloom: "Evaluation",
                collection_analyses: [],
                common_graduate_program_slo: "3",
                decision_actions: [],
                description: "Effective oral and written communication",
                id: 3,
                measures: [],
                methods: [],
                report_id: 1
            },
            {
                accredited_data_analyses: [],
                bloom: "Knowledge",
                collection_analyses: [],
                common_graduate_program_slo: "4",
                decision_actions: [],
                description: "Demonstrate knowledge of discipline’s ethics and standards",
                id: 4,
                measures: [],
                methods: [],
                report_id: 1
            }
        ],
        slos_meet_standards: "",
        stakeholder_involvement: "",
        title: "",
        valid: true
    }
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
        // console.log(this.report)
        console.log(
            {
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
            slos : [
                {
                    accredited_data_analyses: [],
                    bloom: '',
                    collection_analyses: [],
                    common_graduate_program_slo: '',
                    decision_actions: [],
                    description: '',
                    id: 25,
                    measures: [],
                    methods: [],
                    report_id: 7,
                }
            ]
        })
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
            slos : [
                {
                    accredited_data_analyses: [],
                    bloom: '',
                    collection_analyses: [],
                    common_graduate_program_slo: '',
                    decision_actions: [],
                    description: '',
                    id: 25,
                    measures: [],
                    methods: [],
                    report_id: 7,
                }
            ]
        }
    }
    
}
