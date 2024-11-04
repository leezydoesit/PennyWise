export default function LoadingComponent() {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400"></div>
          <p className="text-gray-500 dark:text-gray-400">
            Setting up PennyWise...
          </p>
        </div>
      </div>
    </>
  )
}
