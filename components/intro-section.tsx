import Link from 'next/link'
import buttonStyle from '@/app/styles/button.module.css'
import Image from 'next/image'

export default function IntroSection() {
  return (
    <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 text-black border-b border-gray-300">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <Image
            alt="Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            height="310"
            src="/placeholder.svg"
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl ">
                Unlock Your Financial Potential with PennyWise
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Welcome to PennyWise, your trusted financial advisor application
                designed to empower you on your journey to financial success.
                With PennyWise, you can effortlessly manage your finances, gain
                valuable insights, and make informed decisions to achieve your
                monetary goals.
              </p>
            </div>
            <div className="flex flex-col  items-center gap-2 min-[400px]:flex-row">
              <Link className={buttonStyle.button} href="#">
                Explore PennyWise
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
