import {
  BanknotesIcon,
  ChartPieIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid'

const FeatureSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="container px-4 md:px-6 mx-auto space-y-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-5xl">
              Unlock the Power of PennyWise🤖
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover <span className="font-bold underline">THE</span> tools to
              take control of your finances and achieve your goals
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-sm items-start gap-6 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4 text-black">
          <div className="flex flex-row items-start gap-4">
            <div className="flex items-center rounded-lg w-10 h-10 justify-center">
              <BanknotesIcon className="w-7 h-7 " />
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold ">Financial Insights</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gain deep financial insights into your spending habits and
                investment opportunities, all within PennyWise&apos;s intuitive
                interface.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-4">
            <div className="flex items-center rounded-lg w-10 h-10 justify-center">
              <ChatBubbleLeftRightIcon className="w-7 h-7 " />
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold ">AI Integration</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Integrated AI technology into your financial decision-making
                process, empowering you to make informed choices with ease.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-4">
            <div className="flex items-center rounded-lg w-10 h-10 justify-center">
              <ChartPieIcon className="w-7 h-7 " />
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold ">Budget Analytics</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Comprehensive budget analytics to track your expenses, optimize
                your savings, and achieve your financial goals effortlessly.
              </p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-4">
            <div className="flex items-center rounded-lg w-10 h-10 justify-center">
              <ShieldCheckIcon className="w-7 h-7 " />
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold ">Security</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                PennyWise prioritizes your security, providing robust measures
                to safeguard your financial data and transactions at every step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
