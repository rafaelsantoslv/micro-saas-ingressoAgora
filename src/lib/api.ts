export const api = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = '/api'

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }
  const response = await fetch(`${baseUrl}${endpoint}`, config)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'erro na requisição')
  }
  return response.json()
}
