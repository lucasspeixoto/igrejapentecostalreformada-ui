import { z } from 'zod';

export const createEcclesiasticalBaptismFormSchema = z.object({
  baptism: z.string(),
  baptismDate: z.string(),
  baptismShepherd: z.string(),
});

export type CreateEcclesiasticalBaptismFormData = z.infer<
  typeof createEcclesiasticalBaptismFormSchema
>;
