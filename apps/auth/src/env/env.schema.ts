import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  DATABASE_URL: z.string(),
  COOKIE_SECRET: z.string().optional().default('secret'),
  COOKIE_NAME: z.string().optional().default('connect.sid'),
  IS_SECURE_COOKIE: z.coerce.boolean().optional().default(false),
});

export const validateEnv = (env: Record<string, unknown>) => {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    throw new Error(`❌ Invalid environment variables:\n${JSON.stringify(result.error.flatten().fieldErrors, null, 2)}`);
  }
  return result.data;
};

export type Env = z.infer<typeof envSchema>;
