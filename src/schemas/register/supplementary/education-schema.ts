import { z } from 'zod';

export const createSupplementaryEducationFormSchema = z.object({
  schooling: z.string(),
  profession: z.string(),
});

export type CreateSupplementaryEducationFormData = z.infer<
  typeof createSupplementaryEducationFormSchema
>;
