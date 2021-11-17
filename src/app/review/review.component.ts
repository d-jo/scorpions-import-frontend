import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
    
  @Input('fileId')
  fileId: string = '';
  
  [x: string]: any;
  baseUrl = "http://localhost:5000";
  file: string = ''
  display = false
  slos:any[] = []
  reports:any[] = []
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

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(this.fileId)
    this.reportForm = this.formBuilder.group({
        academic_year: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        author: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        college: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        date_range: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        degree_level: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        department: new FormControl('', [Validators.required, Validators.maxLength(32)]),
        program: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    });
  }

  get acaYear() {
      return this.reportForm.get('academic_year');
  }

  viewData(): any {
    return this.httpClient.post(this.baseUrl + "/view/", this.file, {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
  }

}
