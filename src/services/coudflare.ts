import { S3Client } from '@aws-sdk/client-s3'

import { env } from '../env'
export const r2 = new S3Client({
  region: 'auto',
  endpoint: env.CLOUDFLARE_ENPOINT, // Certifique-se de que está correto no .env
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID, // Verifique se a chave está correta
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY, // Verifique se a chave secreta está correta
  },
})
