'use server'

import { z } from 'zod'

import { sleep } from '@/app/utils'

const formSchema = z.object({
  name: z.string().min(1),
  message: z.string().min(3),
})

export async function action(_, payload) {
  await sleep(500)
  const data = Object.fromEntries(payload.entries())
  const result = formSchema.safeParse(data)

  if (result.success) {
    return {
      type: 'success',
      message: `Name=${result.data.name}; Value=${result.data.message}`,
    }
  }

  return {
    type: 'error',
    data: { name: data.name, message: data.message },
    errors: result.error.flatten().fieldErrors,
  }
}
