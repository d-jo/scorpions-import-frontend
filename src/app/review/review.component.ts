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
        // slos: this.formBuilder.array([this.createSLO()]),
    });

    this.activeRoute.paramMap.subscribe(params => {
        const fileId = params.get('id');
        if (fileId) {
            this.getReportInfo(fileId);
        }
    })
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
        console.log(this.report)
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
    this.getReportInfo(this.reportForm.get('program'));
  }

  public cancelReview(): void {
    this.route.navigate(['/dashboard']);
  }

  public deleteReport(): void {
    if(confirm("Are you sure to delete " + this.reportForm.get('id'))) {
        this.service.deleteReport(this.reportForm.get('id'))
        // .subscribe({
        //     error: (error: any) => {
        //         console.log(error);
        //     },
            // next: () => {
                this.route.navigate(['/dashboard']);
            // }
        // })
    }
  }

    setPayload(): IReport {
        return {
            academic_year : this.reportForm.get('academic_year'),
            accreditation_body : this.reportForm.get('accreditation_body'),
            additional_information : this.reportForm.get('additional_information'),
            author : this.reportForm.get('author'),
            college : this.reportForm.get('college'),
            created : this.reportForm.get('created'),
            date_range : this.reportForm.get('date_range'),
            degree_level : this.reportForm.get('degree_level'),
            department : this.reportForm.get('department'),
            has_been_reviewed : true,
            id : this.reportForm.get('id'),
            last_accreditation_review : this.reportForm.get('last_accreditation_review'),
            program : this.reportForm.get('program'),
            slos_meet_standards : this.reportForm.get('slos_meet_standards'),
            stakeholder_involvement : this.reportForm.get('stakeholder_involvement'),
            title : this.reportForm.get('title'),
            slos : [
                {
                    bloom: [
                        "Application"
                    ],
                    common_graduate_program_slo: [
                        "1"
                    ],
                    description: "Mastery of discipline content",
                    id: "565",
                    report_id: 1
                }
            ]
        }
    }
}
