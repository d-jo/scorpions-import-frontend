import { ISlos } from "./ISlo";

export interface IReport {
    academic_year: string;
    accreditation_body: string;
    additional_information: string;
    author: string;
    college: string;
    created: number;
    date_range:  string;
    degree_level:  string;
    department:  string;
    has_been_reviewed: boolean;
    id: string;
    last_accreditation_review: string;
    program: string;
    slos_meet_standards: string;
    stakeholder_involvement: string;
    title: string;
    slos: ISlos[];
}