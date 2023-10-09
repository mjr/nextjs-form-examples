'use server'

import { revalidatePath } from 'next/cache'
import { sql } from '@vercel/postgres'
import { z } from 'zod'

// import { sleep } from '@/app/utils'

// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

export async function createTodo(prevState, formData) {
  const schema = z.object({
    todo: z.string().min(1),
  })
  const data = schema.parse({
    todo: formData.get('todo'),
  })

  try {
    // await sleep(2000)
    // throw new Error('Failed')

    await sql`
    INSERT INTO todos (text)
    VALUES (${data.todo})
  `

    revalidatePath('/')
    return { message: `Added todo ${data.todo}` }
  } catch (e) {
    return { message: 'Failed to create todo' }
  }
}

export async function deleteTodo(prevState, formData) {
  const schema = z.object({
    id: z.string().min(1),
  })
  const data = schema.parse({
    id: formData.get('id'),
  })

  try {
    // await sleep(2000)
    // throw new Error('Failed')

    await sql`
      DELETE FROM todos
      WHERE id = ${data.id};
    `

    revalidatePath('/')
    return { message: `Deleted todo ${data.todo}` }
  } catch (e) {
    // return { message: 'Failed to delete todo' }
    return { message: 'Failure' }
  }
}
