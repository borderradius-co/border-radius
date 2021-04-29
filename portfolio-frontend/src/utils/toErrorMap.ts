import { FieldError } from "../generated/graphql";

export const toErrorMap:any = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({field, message}) => {
        errorMap[field] = message
        
    });

    return errorMap;
}