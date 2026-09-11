import { z } from "zod";
export const requestListSchema=z.object({page:z.coerce.number().int().min(1).default(1),limit:z.coerce.number().int().min(1).max(100).default(20)});
export const requestActionSchema=z.object({remarks:z.string().trim().max(500).default("")});
