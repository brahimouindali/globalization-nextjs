import { format } from "date-fns/format";

export const dateTime = (date: string) => new Date(date).toISOString();

export const full = (date: string) => format(date, "MMMM D, YYYY");
