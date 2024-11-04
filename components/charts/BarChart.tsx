'use client'

import React, { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import {
  TransactionsData,
  RevTransaction,
  AibTransaction,
  PtsbTransaction,
} from '@/lib/definitions'
import { groupTransactionsByMonth } from '@/lib/transaction-utils'

interface BarChartComponentProps {
  transactionsData: TransactionsData<
    RevTransaction | AibTransaction | PtsbTransaction
  >
}

interface ChartConfigItem {
  label: string
  color: string
}

interface ChartConfig {
  [key: string]: ChartConfigItem
}

const COLORS = ['#0088FE', '#00C49F']

export const BarChartComponent: React.FC<BarChartComponentProps> = ({
  transactionsData,
}) => {
  const { chartData, chartConfig } = useMemo(() => {
    // Group transactions by month
    const groupedByMonth = groupTransactionsByMonth(
      transactionsData.transactions.booked
    )

    // Generate chart data
    const chartData = Object.entries(groupedByMonth).map(
      ([month, transactions]) => ({
        month,
        transactionCount: transactions.length,
      })
    )

    // Sort the chart data by month
    chartData.sort(
      (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
    )

    // Generate chart configuration
    const chartConfig: ChartConfig = {
      transactionCount: {
        label: 'Transaction Count',
        color: COLORS[0],
      },
    }

    return { chartData, chartConfig }
  }, [transactionsData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Transactions Per Month</CardTitle>
        <CardDescription>
          Showing total transactions for the last few months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 7)} // Display month in yyyy-MM format
            />
            <Tooltip content={<ChartTooltipContent className="w-[150px]" />} />
            <Bar
              dataKey="transactionCount"
              fill={chartConfig.transactionCount.color}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BarChartComponent
