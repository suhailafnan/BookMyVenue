import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export interface ValidationRule {
  field: string;
  required?: boolean;
  type?: "string" | "number" | "boolean" | "date";
  validate?: (value: any) => boolean | string;
}

/**
 * Clean Request Validation Middleware to shield controllers from malformed inputs.
 * Takes a list of validation rules and returns an Express middleware.
 */
export const validateRequestBody = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    for (const rule of rules) {
      const value = req.body[rule.field];

      // 1. Missing Field Check
      if (rule.required && (value === undefined || value === null || value === "")) {
        return next(
          new AppError(`Request Validation Error: '${rule.field}' is required but was not supplied.`, 400)
        );
      }

      // 2. Type Checking
      if (value !== undefined && value !== null && value !== "") {
        if (rule.type) {
          if (rule.type === "date") {
            const timestamp = Date.parse(value);
            if (isNaN(timestamp)) {
              return next(
                new AppError(
                  `Request Validation Error: Field '${rule.field}' must be a valid ISO Date string format.`,
                  400
                )
              );
            }
          } else if (typeof value !== rule.type) {
            return next(
              new AppError(
                `Request Validation Error: Field '${rule.field}' must be of type '${rule.type}' instead of '${typeof value}'.`,
                400
              )
            );
          }
        }

        // 3. Custom Evaluation rule
        if (rule.validate) {
          const testResult = rule.validate(value);
          if (typeof testResult === "string") {
            return next(new AppError(`Request Validation Error: ${testResult}`, 400));
          } else if (!testResult) {
            return next(
              new AppError(`Request Validation Error: Value for '${rule.field}' is invalid.`, 400)
            );
          }
        }
      }
    }
    next();
  };
};
