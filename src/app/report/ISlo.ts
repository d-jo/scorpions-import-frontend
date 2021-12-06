export interface ISlos {
    accredited_data_analyses: IAccreditedData[];
    bloom: string;
    common_graduate_program_slo: string;
    decision_actions: IDecisionAction[];
    description: string;
    id: number;
    measures: IMeasures[];
    methods: IMethod[];
    report_id: number;
    collection_analyses: ICollectionAnalyses[];
    [key: string]: any;
}

export interface ICollectionAnalyses {
    data_collection_date_range: string;
    id: number;
    number_of_students_assessed: string;
    percentage_who_met_or_exceeded: string;
    slo_id: number;
    [key: string]: any;
}

export interface IMeasures {
    description:string;
    domain:string;
    frequency_of_collection:string;
    id: number;
    point_in_program: string;
    population_measured: string;
    proficiency_target: string;
    proficiency_threshold: string;
    slo_id: number;
    title:string;
    type:string;
    [key: string]: any;
}

export interface IDecisionAction {
    content: string;
    id: number;    
    slo_id: number;
    [key: string]: any;
}

export interface IAccreditedData {
    status: string;
    id: number;
    slo_id: number;
    [key: string]: any;
}

export interface IMethod {
    data_collection: string;
    domain: string;
    id: number,
    measure: string;
    slo_id: number;
    [key: string]: any;
}