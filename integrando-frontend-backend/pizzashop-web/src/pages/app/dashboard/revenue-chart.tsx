import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 800 },
  { date: '12/12', revenue: 900 },
  { date: '13/12', revenue: 400 },
  { date: '14/12', revenue: 2300 },
  { date: '15/12', revenue: 800 },
  { date: '16/12', revenue: 640 },
]

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active: boolean | undefined
  payload: any
  label: any
}) {
  if (active && payload && payload.length) {
    return (
      <Card className="custom-tooltip ">
        <CardHeader className="p-3">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">{label}</CardTitle>
            <CardDescription>{`Receita: ${payload[0].value}`}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return null
}

export function RevenueChart() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={data}
            style={{
              fontSize: 12,
            }}
          >
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) => {
                return value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }}
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet['500']}
            />
            <Tooltip
              cursor={false}
              // wrapperStyle={{
              //   fontWeight: 'bold',
              // }}
              // contentStyle={{
              //   borderRadius: '6px',
              //   background: colors.zinc[50],
              //   opacity: 0.7,
              // }}
              content={(props) => (
                <CustomTooltip
                  active={props.active}
                  label={props.label}
                  payload={props.payload}
                  {...props}
                />
              )}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
