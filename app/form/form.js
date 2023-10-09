'use client'

import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom'

import { action } from '@/app/form/action'

function Alert({ children }) {
  return (
    <div className="mt-4 rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">Successfully send</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Form() {
  const [state, dispatch] = useFormState(action, { message: null, type: undefined })

  return (
    <form action={dispatch}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">useFormState demo</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Disable javascript to test with progressive enhancement.</p>
          {state?.type === "success" && <Alert>{state.message}</Alert>}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6${state?.type === "error" && state?.errors?.name ? " accent-red-400" : ""}`}
                  placeholder="Jane Smith"
                  aria-describedby="name-error"
                  defaultValue={state?.data ? state.data.name : ''}
                />
              </div>
              {state?.type === "error" && state?.errors?.name && (
                <p className="mt-2 text-sm text-red-600" id="name-error">
                  {state.errors.name.join(",")}
                </p>
              )}
            </div>
            <div className="col-span-full">
              <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">Message</label>
              <div className="mt-2">
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6${state?.type === "error" && state?.errors?.message ? " accent-red-400" : ""}`}
                  aria-describedby="message-error"
                  defaultValue={state?.data ? state.data.message : ''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
              {state?.type === "error" && state?.errors?.message && (
                <p className="mt-2 text-sm text-red-600" id="message-error">
                  {state.errors.message.join(",")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <SubmitButton />
      </div>
    </form>
  )
}

function SubmitButton() {
  const status = useFormStatus()

  return (
    <button
      type="submit"
      aria-disabled={status.pending}
      onClick={(e) => {
        // prevent multiple submits
        if (status.pending) e.preventDefault()
      }}
      className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${status.pending ? "bg-indigo-300" : "bg-indigo-600"}`}
    >
      {status.pending ? "Submiting..." : "Submit"}
    </button>
  )
}
