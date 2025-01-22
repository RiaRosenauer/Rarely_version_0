"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface BarChartProps {
  data: {
    name: string
    value: number
  }[]
}

export function BarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsBarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="#1E4D57" />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
} 