'use client'

import React, { useMemo } from 'react'
import { Pie, PieChart, Cell } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  TransactionsData,
  RevTransaction,
  AibTransaction,
  PtsbTransaction,
} from '@/lib/definitions'

interface PieChartComponentProps {
  transactionsData: TransactionsData<
    RevTransaction | AibTransaction | PtsbTransaction
  >
}

interface ChartDataItem {
  type: string
  amount: number
  percentage: number
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

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
}: any) => {
  const radius = outerRadius * 1.1 // Position label outside the pie
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({
  transactionsData,
}) => {
  const { chartData, chartConfig } = useMemo(() => {
    const groupTransactionsByType = (
      transactions: (RevTransaction | AibTransaction | PtsbTransaction)[]
    ) => {
      return transactions.reduce(
        (acc, transaction) => {
          let type: string

          // Determine the type based on the transaction structure
          if (
            'proprietaryBankTransactionCode' in transaction &&
            transaction.proprietaryBankTransactionCode
          ) {
            type = transaction.proprietaryBankTransactionCode
          } else if (
            'merchantCategoryCode' in transaction &&
            transaction.merchantCategoryCode
          ) {
            type = transaction.merchantCategoryCode
          } else if ('remittanceInformationUnstructured' in transaction) {
            // For PTSB and AIB, use the first word of remittanceInformationUnstructured as type
            type = transaction.remittanceInformationUnstructured.split(' ')[0]
          } else if (
            'remittanceInformationUnstructuredArray' in transaction &&
            transaction.remittanceInformationUnstructuredArray.length > 0
          ) {
            // For Rev, use the first word of the first element in the array
            type =
              transaction.remittanceInformationUnstructuredArray[0].split(
                ' '
              )[0]
          } else {
            type = 'Unknown'
          }

          if (!acc[type]) {
            acc[type] = { count: 0, amount: 0 }
          }
          acc[type].count += 1
          acc[type].amount += Math.abs(
            parseFloat(transaction.transactionAmount.amount)
          )
          return acc
        },
        {} as Record<string, { count: number; amount: number }>
      )
    }

    const { booked: transactions } = transactionsData.transactions
    const grouped = groupTransactionsByType(transactions)

    const totalAmount = Object.values(grouped).reduce(
      (sum, { amount }) => sum + amount,
      0
    )

    const chartData: ChartDataItem[] = Object.keys(grouped).map((key) => ({
      type: key,
      amount: grouped[key].amount,
      percentage: (grouped[key].amount / totalAmount) * 100,
    }))

    // Sort by percentage descending
    chartData.sort((a, b) => b.percentage - a.percentage)

    // Group small percentages into "Other"
    const threshold = 1 // Adjust this value to change what's considered a "small" percentage
    const mainData = chartData.filter((item) => item.percentage >= threshold)
    const otherData = chartData.filter((item) => item.percentage < threshold)

    if (otherData.length > 0) {
      const otherAmount = otherData.reduce((sum, item) => sum + item.amount, 0)
      const otherPercentage = (otherAmount / totalAmount) * 100
      mainData.push({
        type: 'Other',
        amount: otherAmount,
        percentage: otherPercentage,
      })
    }

    const finalChartData = mainData

    const chartConfig: ChartConfig = finalChartData.reduce(
      (config, item, index) => {
        config[item.type] = {
          label: `${item.type} (${item.percentage.toFixed(2)}%)`,
          color: COLORS[index % COLORS.length],
        }
        return config
      },
      {} as ChartConfig
    )

    return { chartData: finalChartData, chartConfig }
  }, [transactionsData])

  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Transactions Pie Chart</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[600px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={160}
              paddingAngle={5}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {chartData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Showing total transactions for the last 6 months
        </div>
        <div className="leading-none text-muted-foreground">
          The chart displays the distribution of transaction types.
        </div>
      </CardFooter>
    </Card>
  )
}

export default PieChartComponent
