import { z } from 'zod';

/* The code is defining a schema for a Supplementary Family form. The schema is created
using the `zod` library, which is a TypeScript runtime type checking library. */
export const createSupplementaryFamilyFormSchema = z.object({
  maritalStatus: z.string(),
  spouseName: z
    .string()
    .min(3, 'O Nome do cônjuge precisa conter no mínimo 3 caracteres!')
    .transform(spouseName => {
      return spouseName
        .trim()
        .split(' ')
        .map(word => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(' ');
    }),
  weddingDate: z.string(),
  fatherName: z
    .string()
    .min(3, 'O Nome do cônjuge precisa conter no mínimo 3 caracteres!')
    .transform(fatherName => {
      return fatherName
        .trim()
        .split(' ')
        .map(word => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(' ');
    }),
  motherName: z
    .string()
    .min(3, 'O Nome do cônjuge precisa conter no mínimo 3 caracteres!')
    .transform(motherName => {
      return motherName
        .trim()
        .split(' ')
        .map(word => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(' ');
    }),
  /* schooling: z.string(),
  profession: z.string(), */
});

export type CreateSupplementaryFamilyFormData = z.infer<
  typeof createSupplementaryFamilyFormSchema
>;
