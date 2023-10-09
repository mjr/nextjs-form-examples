import { sql } from '@vercel/postgres'
import { AddForm } from '@/app/add-form'
import { DeleteForm } from '@/app/delete-form'

export const runtime = 'edge'
export const preferredRegion = 'home'

export default async function Home() {
  let data = await sql`SELECT * FROM todos`
  const { rows: todos } = data

  return (
    <main className="flex flex-col gap-4">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Todos</h3>
          <AddForm />
        </div>
      </div>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <ul role="list" className="divide-y divide-gray-100">
            {todos.map(todo => (
              <li key={todo.id} className="flex items-center justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{todo.text}</p>
                  </div>
                </div>
                <DeleteForm id={todo.id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
