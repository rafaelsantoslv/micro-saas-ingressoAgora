import { z } from 'zod'

const envSchema = z.object({
  NEXTAUTH_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  CLOUDFLARE_ENPOINT: z.string().url(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  DATABASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
