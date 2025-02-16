import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().optional().default('secret'),
  JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS: z.coerce.number().optional().default(3600),
  BASE_PATH: z.string().optional(),
});

export const validateEnv = (env: Record<string, unknown>) => {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    throw new Error(`❌ Invalid environment variables:\n${JSON.stringify(result.error.flatten().fieldErrors, null, 2)}`);
  }
  return result.data;
};

export type Env = z.infer<typeof envSchema>;
