import {
  CheckCircleIcon,
  FingerPrintIcon,
  InboxIcon,
} from '@heroicons/react/24/solid'

export default function About() {
  return (
    <>
      <div className="w-full pt-24 bg-gray-50 text-black pb-16">
        <div className="container justify-center flex flex-col mx-auto items-center px-4 md:px-6">
          <div className="flex flex-col gap-4 md:gap-8 lg:gap-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Welcome to PennyWise
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                At PennyWise, we&apos;re on a mission to revolutionise the way
                you manage your finances. Our AI-powered platform empowers
                individuals like you to take control of your financial future,
                providing personalized insights, expert advice, and intuitive
                tools to help you achieve your monetary goals with confidence.
              </p>
            </div>
            <div className="grid gap-4 md:gap-8 lg:gap-12">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Our Services</h2>
                <p className="max-w-prose text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Discover an AI Powered Tool designed to meet your financial
                  needs. From budget planning to analytics, PennyWise offers the
                  tools and resources you need to navigate your financial
                  journey with ease.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Our Story</h2>
                <p className="max-w-prose text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  PennyWise was born from a vision to empower individuals to
                  make smarter financial decisions. Founded by a team of
                  passionate innovators, we&apos;ve dedicated ourselves to
                  creating a platform that combines cutting-edge technology with
                  expert financial knowledge to help you unlock your financial
                  potential.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Our Commitment</h2>
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Innovation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Excellence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Integrity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Empowerment</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Contact Us</h2>
                <p className="max-w-prose text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Ready to embark on your journey to financial success? Connect
                  with us today and discover how PennyWise can help you turn
                  your financial dreams into reality.
                </p>
                <div className="grid gap-2 md:grid-cols-2 pb-8">
                  <div className="flex items-center gap-2">
                    <InboxIcon className="w-4 h-4 text-gray-500" />
                    <a
                      href="mailto:info@pennywise.com"
                      className="font-medium text-black hover:font-bold over:scale-105 hover:underline"
                    >
                      info@pennywise.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FingerPrintIcon className="w-4 h-4 text-gray-500" />
                    <a
                      href="https://github.com/CheezyLeezy1/pennywise"
                      className="font-medium text-black hover:font-bold over:scale-105 hover:underline"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
