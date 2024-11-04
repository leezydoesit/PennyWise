'use client'

import React, { useMemo } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

interface CumulativeAreaChartComponentProps {
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

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#A4DE6C',
  '#D0ED57',
  '#FFC658',
  '#FFB3BA',
]

export const CumulativeAreaChartComponent: React.FC<
  CumulativeAreaChartComponentProps
> = ({ transactionsData }) => {
  const { chartData, chartConfig } = useMemo(() => {
    const groupedByMonth = groupTransactionsByMonth(
      transactionsData.transactions.booked
    )

    // Calculate the cumulative total for each month
    const cumulativeTotals = Object.entries(groupedByMonth).map(
      ([month, transactions]) => ({
        date: month,
        cumulativeTotal: transactions.reduce((total, transaction) => {
          const amount = parseFloat(transaction.transactionAmount.amount)
          return total + (amount < 0 ? Math.abs(amount) : 0) // Only consider negative amounts as expenses
        }, 0),
      })
    )

    // Sort the cumulative totals by date to ensure the chart displays them in order
    cumulativeTotals.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    // Generate chart configuration dynamically
    const chartConfig: ChartConfig = {
      cumulativeTotal: {
        label: 'Cumulative Total',
        color: COLORS[0], // Set color for the line/area
      },
    }

    return { chartData: cumulativeTotals, chartConfig }
  }, [transactionsData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Cumulative Spending Over Time</CardTitle>
        <CardDescription>
          {`Showing cumulative spending for the last few months`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[600px]"
        >
          <AreaChart
            data={chartData}
            margin={{ left: 20, right: 12 }} // Increased left margin for padding
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleString('default', { month: 'short' })
              }
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="cumulativeTotal"
              type="linear" // You can switch to "natural" for a smooth curve
              fill={chartConfig.cumulativeTotal.color} // Customize color as needed
              fillOpacity={0.4}
              stroke={chartConfig.cumulativeTotal.color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Showing total cumulative spending for the last few months
        </div>
        <div className="leading-none text-muted-foreground">
          The chart displays the cumulative spending trend over the selected
          period.
        </div>
      </CardFooter>
    </Card>
  )
}

export default CumulativeAreaChartComponent
