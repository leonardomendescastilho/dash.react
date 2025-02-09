import { api } from '@/lib/axios'

interface UpdateProfileParams {
  name: string
  description?: string
}

export default async function updateProfile({
  name,
  description,
}: UpdateProfileParams) {
  await api.put('/profile', { name, description })
}
