import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { r2 } from '@/services/coudflare' // Ajuste o caminho conforme sua estrutura de diretórios

// Handler para geração de URL assinada para upload
export async function GET(req: Request) {
  try {
    // Gere a URL assinada para o upload do arquivo
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: 'agora-ticket', // Nome do seu bucket no Cloudflare R2
        Key: `file-${Date.now()}.mp4`, // Nome do arquivo dinâmico, pode ser ajustado conforme necessidade
        ContentType: 'video/mp4', // Tipo do arquivo a ser enviado
      }),
    )

    // Retorna a URL assinada como resposta
    return new Response(JSON.stringify({ signedUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error generating signed URL:', error)
    return new Response(
      JSON.stringify({ message: 'Error generating signed URL' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
