import { z } from 'zod';

export const createEcclesiasticalMemberFormSchema = z.object({
  membership: z.string(),
  craft: z.string(),

  communities: z.string(),
  interests: z.string(),
});

export type CreateEcclesiasticalMemberFormData = z.infer<
  typeof createEcclesiasticalMemberFormSchema
>;
