import React from 'react'

interface Insight {
  title: string
  description: string
}

interface DashAiProps {
  insights: Insight[]
}

export const DashAi: React.FC<DashAiProps> = ({ insights }) => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-12 mb-24 px-6 py-8 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">AI Recommendations</h2>
        <div className="grid gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md"
            >
              <h3 className="text-lg font-semibold">{insight.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DashAi
