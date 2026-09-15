const { z } = require("zod");

const UpdateProfileSchema = z
  .object({
    fullName: z.string().min(1),
    email: z.string().email(),
    department: z.string(),
    jobTitle: z.string(),
    phoneNumber: z
      .string()
      .regex(/^[+]?[\d\s\-()]+$/, { message: "Invalid phone number format" })
      .optional()
      .or(z.literal("")),
    joinDate: z.string().optional().or(z.literal("")),
    biography: z.string().optional().or(z.literal("")),
    avatar: z.string().optional(),
    avatar_url: z.string().optional(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

const ProfileIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

module.exports = { UpdateProfileSchema, ProfileIdSchema };
