import { ApplicationError } from "./types";

export function badRequestError(): ApplicationError {
  return {
    name: "BadRequestError",
    message: "Your request is invalid",
  };
}