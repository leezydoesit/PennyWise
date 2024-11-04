// app/page.tsx
import FeatureSection from '@/components/feature-section'
import IntroSection from '@/components/intro-section'

export default function Page({}) {
  return (
    <>
      <main className="flex min-h-fit bg-gray-50 flex-col p-6">
        <IntroSection />
        <FeatureSection />
      </main>
    </>
  )
}
