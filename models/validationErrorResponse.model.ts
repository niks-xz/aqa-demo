export interface ValidationErrorResponse {
    message: string;
    errors: ValidationError[];
}

export interface ValidationError {
    field: string;
    message: string;
}