import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IReport } from '../report/IReport';
import { ISlos } from '../report/ISlo';



@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
    
  baseUrl = "http://localhost:5000";
  file: string = ''
  display = false
  slos:ISlos[] = []
  academic_year: string = ''
  accreditation_body: string = ''
  additional_information: string = ''
  author: string = ''
  college: string = ''
  created: string = ''
  date_range: string = ''
  degree_level: string = ''
  department: string = ''
  has_been_reviewed: string = ''
  id: string = ''
  last_accreditation_review: string = ''
  program: string = ''
  slos_meet_standards: string = ''
  stakeholder_involvement: string = ''
  title: string = ''
  reportForm: any;

  constructor(private httpClient: HttpClient,
            private formBuilder: FormBuilder,
            private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
        academic_year: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        author: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        college: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        date_range: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        degree_level: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        department: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        program: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        slos: this.formBuilder.array([this.createSLO()]),
    });

    this.activeRoute.paramMap.subscribe(params => {
        const fileId = params.get('id');
        if (fileId) {
            this.getReportInfo(fileId);
        }
    })
  }

  getReportInfo(fileId: string) {
    this.viewData(fileId).subscribe(
        (reportData: IReport) => this.editReport(reportData),
        (err: any) => console.log(err)
    );
  }


  editReport(reportData: IReport) {
      console.log(reportData.slos)
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
          slos : reportData.slos,
        //   slos : this.formBuilder.array([reportData.slos])
        })
        // console.log(this.reportForm.get('slos'))
    }


  viewData(fileId: string): Observable<IReport> {
    return this.httpClient.get<IReport>(this.baseUrl + "/view/" + fileId, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      }).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }

  createSLO(): FormGroup  {
      return this.formBuilder.group({
          bloom: new FormControl('', [Validators.required, Validators.maxLength(32)]),
          common_graduate_program_slo: new FormControl('', [Validators.required, Validators.maxLength(32)]),
          description: new FormControl('', [Validators.required, Validators.maxLength(32)]),
          id: new FormControl('', [Validators.required, Validators.maxLength(32)]),
          report_id: new FormControl('', [Validators.required, Validators.maxLength(32)])
        });
      }
  }
