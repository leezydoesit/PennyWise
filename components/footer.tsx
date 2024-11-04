import style from '@/app/styles/footer.module.css'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t text-black">
      {/* Container to center footer */}
      <div className="container mx-auto flex flex-col items-center justify-center py-6 text-center">
        <div className="flex flex-col gap-1">
          <div className="inline-block text-2xl font-semibold tracking-tighter md:text-3xl">
            PennyWise
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 PennyWise™ - By{' '}
            <a
              className={style.copyrightText}
              href={'https://github.com/CheezyLeezy1'}
            >
              {' '}
              @CheezyDevs{' '}
            </a>{' '}
          </div>
        </div>
      </div>
    </footer>
  )
}
