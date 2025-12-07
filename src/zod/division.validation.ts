import { z } from "zod";

export const createDivisionZodSchema = z.object({
    name: z.string().min(1, "Division name is required"),
    description: z.string().optional(),
});
