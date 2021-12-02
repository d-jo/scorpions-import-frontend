import { IReport } from "src/app/report/IReport";

export function getReportMockData(): IReport {
    return {
        academic_year: "2019-2020",
        accreditation_body: "",
        additional_information: "",
        author: "Christian Reza",
        college: "CPACS",
        created: 1638467668,
        creator_id: "some creator id",
        date_range: "Spring 2018-Fall 2019",
        degree_level: "Masters",
        department: "Gerontology",
        has_been_reviewed: false,
        id: "1",
        last_accreditation_review: "",
        program: "MA Gerontology",
        slos: [
            {
                accredited_data_analyses: [],
                bloom: "Analysis",
                collection_analyses: [
                    {
                        data_collection_date_range: "Spring 2018-Fall 2019",
                        id: 1,
                        number_of_students_assessed: "15",
                        percentage_who_met_or_exceeded: "Citations and references, 100%\nIntroduction, 93%\nSupporting documents, 100%\nProject evaluation, 100%",
                        slo_id: 1
                    },
                    {
                        data_collection_date_range: "Spring 2018-Fall 2019",
                        id: 2,
                        number_of_students_assessed: "Comps, 15\nThesis, 3",
                        percentage_who_met_or_exceeded: "Comps, 100% \n(33% had revisions)\nThesis, 100%",
                        slo_id: 1
                    },
                    {
                        data_collection_date_range: "Spring 2018-Fall 2019",
                        id: 3,
                        number_of_students_assessed: "16",
                        percentage_who_met_or_exceeded: "Report 1, 94%\nReport 2, 81%\nReport 3, 100%",
                        slo_id: 1
                    },
                    {
                        data_collection_date_range: "Spring 2018-Fall 2019",
                        id: 4,
                        number_of_students_assessed: "14",
                        percentage_who_met_or_exceeded: "Agency, 100%\nStudent, 100%",
                        slo_id: 1
                    }
                ],
                common_graduate_program_slo: "",
                decision_actions: [
                    {
                        content: "Decision making process: Based on our data reported, we achieved our proficiency target for this SLO. The project evaluation for the final paper, and the evaluation portion of the progress reports will be examined closely as we collect more data to ensure that our students are able to adequately evaluate their activities and performance in regard to disciplinary knowledge. It is important to us to ensure that students are able to integrate their knowledge, understanding and skills to analyze the information in a real world setting.  In regards to the comprehensive exam, we may choose to examine each question in regards to whether it focuses on this specific SLO and record whether a revision is needed for each individual question. While are sample size has increased, we remain cautious when making any decisions because our sample size is small for some of our indicators. \nDecision maker(s): Primarily the assessment and practicum coordinator, along with the graduate program chair; however, the entire faculty will be involved in this discussion and final decision at our next faculty meeting in Spring 2020.\nDecision timeline:  Preliminary decisions were made when preparing this report in January 2020; however, as indicated above, no final decisions will be made until our Spring 2020 faculty meeting. \nData used for decision: Data reported in the above table from Spring 2018 through Fall 2019.\nAction Timeline: Based on our Spring 2020 faculty meeting (and feedback from our EAB), we will make any changes beginning in Summer 2020, though we do not anticipate any major changes. We will continue to assess each semester to increase our sample size for analysis.",
                        id: 1,
                        slo_id: 1
                    }
                ],
                description: "Analyze fundamental interdisciplinary evidence-based knowledge and theories for competent gerontological practice.",
                id: 1,
                measures: [
                    {
                        description: "The final paper is scored with a rubric (see included below). The following domains are relevant to this ",
                        domain: "",
                        frequency_of_collection: "",
                        id: 1,
                        point_in_program: "",
                        population_measured: "",
                        proficiency_target: "Describe: 80% of students achieve the proficiency threshold.",
                        proficiency_threshold: "Describe: 80% of students meet or exceed expectations. Please see included rubrics with highlighted columns that show proficiency.",
                        slo_id: 1,
                        title: "Performance on final project paper",
                        type: ""
                    }
                ],
                methods: [],
                report_id: 1
            },
            {
                accredited_data_analyses: [],
                bloom: "Synthesis",
                collection_analyses: [
                    {
                        data_collection_date_range: "Spring 2018-Fall 2019",
                        id: 5,
                        number_of_students_assessed: "15",
                        percentage_who_met_or_exceeded: "Introduction, 93%\nProject planning, 100%\nProject description & content, 100%\nSupporting documents, 100%\nProject evaluation, 100%",
                        slo_id: 2
                    },
                    {
                        data_collection_date_range: "Spring 2018-Fall 2019",
                        id: 6,
                        number_of_students_assessed: "Comps, 15\nThesis, 3",
                        percentage_who_met_or_exceeded: "Comps, 100% \n(33% had revisions)\nThesis, 100%",
                        slo_id: 2
                    },
                    {
                        data_collection_date_range: "Spring 2018-Fall 2019",
                        id: 7,
                        number_of_students_assessed: "16",
                        percentage_who_met_or_exceeded: "Report 1, 94%\nReport 2, 81%\nReport 3, 100%",
                        slo_id: 2
                    }
                ],
                common_graduate_program_slo: "",
                decision_actions: [
                    {
                        content: "Decision making process: We also achieved proficiency for SLO 2, and are encouraged by the larger numbers showing proficiency. However, as with SLO 1, we will be mindful of our students’ progress on the project evaluation for the final paper, and the evaluation portion of the progress reports to ensure that our students are satisfactorily engaging in critical thinking when moving to the practicum experience, and writing their comprehensive exam responses. If there is reason for concern, we will aim to engage in more opportunities for discussion of concepts, theories and knowledge in class or on discussion boards, and also through writing assignments. \nDecision maker(s): Primarily the assessment and practicum coordinator, along with the graduate program chair; however, the entire faculty will be involved in this discussion and final decision at our next faculty meeting in Spring 2020.\nDecision timeline:  Preliminary decisions were made when preparing this report in January 2020; however, as indicated above, no final decisions will be made until our Spring 2020 faculty meeting. \nData used for decision: Data reported in the above table from Spring 2018 through Fall 2019.\nAction Timeline: Based on our Spring 2020 faculty meeting (and feedback from our EAB), we will make any changes beginning in Summer 2020, though we do not anticipate any major changes. We will continue to assess each semester to increase our sample size for analysis.",
                        id: 2,
                        slo_id: 2
                    }
                ],
                description: "Critique and analyze diverse and complex aging issues and outcomes from an interdisciplinary perspective.",
                id: 2,
                measures: [
                    {
                        description: "The final paper is scored with a rubric (see included below). The following domains are relevant to this ",
                        domain: "",
                        frequency_of_collection: "",
                        id: 2,
                        point_in_program: "",
                        population_measured: "",
                        proficiency_target: "Describe: Describe: 80% of students achieve the proficiency threshold.",
                        proficiency_threshold: "Describe: 80% of students meet or exceed expectations. Please see included rubrics with highlighted columns that show proficiency.",
                        slo_id: 2,
                        title: "Performance on final project paper",
                        type: ""
                    },
                    {
                        description: "The comprehensive exam consists of three content-based questions from the coursework the student has completed for the degree. Three different members of the gerontology faculty create and score these questions. The questions vary from student to student.",
                        domain: "",
                        frequency_of_collection: "",
                        id: 3,
                        point_in_program: "",
                        population_measured: "",
                        proficiency_target: "Describe: 90% of students achieve the proficiency threshold.",
                        proficiency_threshold: "Describe: 80% of students meet or exceed expectations.",
                        slo_id: 2,
                        title: "Performance on the comprehensive exam",
                        type: ""
                    },
                    {
                        description: ". The practicum progress reports are a subjective assessment of the student’s work completed during the practicum. This is turned in three times per semester (please see below for requirements.)",
                        domain: "",
                        frequency_of_collection: "",
                        id: 4,
                        point_in_program: "",
                        population_measured: "",
                        proficiency_target: "Describe: Describe: 80% of students achieve the proficiency threshold.",
                        proficiency_threshold: "Describe: 80% of students meet or exceed expectations. Please see included rubrics with highlighted columns that show proficiency.",
                        slo_id: 2,
                        title: "Responses on progress reports submitted in the practicum course.",
                        type: ""
                    }
                ],
                methods: [],
                report_id: 1
            },
        ],
        slos_meet_standards: "",
        stakeholder_involvement: "",
        title: "NON-ACCREDITED PROGRAM",
        valid: true
    }
}
