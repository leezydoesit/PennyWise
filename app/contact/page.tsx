'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import buttonStyle from '@/app/styles/button.module.css'
import { z } from 'zod'
import { ContactFormData, ContactFormErrors } from '@/lib/definitions'

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [showPopup, setShowPopup] = useState(false)
  const router = useRouter()

  // Define the Zod schema
  const schema = z.object({
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(20, 'First name must be at most 20 characters'),
    lastName: z
      .string()
      .min(2, 'Last name must be at least 2 characters')
      .max(30, 'Last name must be at most 30 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setFormData((prevData) => ({ ...prevData, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form data
    try {
      schema.parse(formData)
      // If validation passes, show success popup and redirect
      setErrors({})
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
        router.push('/') // Redirect to homepage
      }, 3000) // Show popup for 3 seconds
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: ContactFormErrors = {}
        err.errors.forEach((error) => {
          const fieldName = error.path[0] as keyof ContactFormErrors
          fieldErrors[fieldName] = error.message
        })
        setErrors(fieldErrors)
      }
    }
  }

  return (
    <div className="flex items-center min-h-[87vh] bg-gray-50 text-black">
      <div className="w-full max-w-5xl p-10 border rounded-lg shadow-lg mx-auto space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold ">Contact Support</h1>
          <p className="text-gray-500">
            Fill out the form below and we will get back to you as soon as
            possible.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="firstName"
              >
                First name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="lastName"
              >
                Last name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              id="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          <button type="submit" className={buttonStyle.button}>
            Send message
          </button>
        </form>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-2 flex items-center justify-center">
              Success <span className="ml-2">✅</span>
            </h2>
            <p>Your message has been sent successfully!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
