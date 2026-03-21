
"use client";

import { useState, useEffect } from "react";
import { Calculator, Wallet, Percent, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { PieChart, Pie } from "recharts";

export default function EMICalculator() {
  const [price, setPrice] = useState(150000);
  const [downPayment, setDownPayment] = useState(30000);
  const [interest, setInterest] = useState(9.5);
  const [tenure, setTenure] = useState(24);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const principal = price - downPayment;
    const monthlyRate = interest / 12 / 100;
    const n = tenure;

    if (principal > 0 && monthlyRate > 0) {
      const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
      const totalPayable = emiValue * n;
      const interestPayable = totalPayable - principal;

      setEmi(Math.round(emiValue));
      setTotalInterest(Math.round(interestPayable));
      setTotalAmount(Math.round(totalPayable));
    } else if (principal > 0 && monthlyRate === 0) {
      const emiValue = principal / n;
      setEmi(Math.round(emiValue));
      setTotalInterest(0);
      setTotalAmount(principal);
    } else {
      setEmi(0);
      setTotalInterest(0);
      setTotalAmount(0);
    }
  }, [price, downPayment, interest, tenure]);

  const chartConfig = {
    principal: {
      label: "Principal Amount",
      color: "hsl(var(--primary))",
    },
    interest: {
      label: "Interest Amount",
      color: "hsl(var(--accent))",
    },
  } satisfies ChartConfig;

  const chartData = [
    { name: "principal", value: price - downPayment, fill: "var(--color-principal)" },
    { name: "interest", value: totalInterest, fill: "var(--color-interest)" },
  ];

  return (
    <div className="container mx-auto px-4 py-20 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">EMI <span className="text-primary">Calculator</span></h1>
        <p className="text-muted-foreground">Plan your dream ride with our easy-to-use financing tool. Instant estimates for your monthly payments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Input Controls */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Calculate Your Installments</CardTitle>
            <CardDescription>Adjust the sliders to find a plan that fits your budget.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /> Vehicle Price (₹)</Label>
                <span className="font-bold text-primary">₹ {price.toLocaleString()}</span>
              </div>
              <Slider value={[price]} onValueChange={(v) => setPrice(v[0])} min={50000} max={1000000} step={5000} />
              <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2"><Wallet className="h-4 w-4 text-accent" /> Down Payment (₹)</Label>
                <span className="font-bold text-accent">₹ {downPayment.toLocaleString()}</span>
              </div>
              <Slider value={[downPayment]} onValueChange={(v) => setDownPayment(v[0])} min={0} max={price} step={1000} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="flex items-center gap-2"><Percent className="h-4 w-4 text-primary" /> Interest Rate (%)</Label>
                  <span className="font-bold text-primary">{interest}%</span>
                </div>
                <Slider value={[interest]} onValueChange={(v) => setInterest(v[0])} min={5} max={25} step={0.1} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Tenure (Months)</Label>
                  <span className="font-bold text-primary">{tenure} Months</span>
                </div>
                <Slider value={[tenure]} onValueChange={(v) => setTenure(v[0])} min={6} max={60} step={6} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Monthly EMI</p>
                <p className="text-4xl font-bold text-primary">₹ {emi.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Interest</p>
                <p className="text-4xl font-bold text-accent">₹ {totalInterest.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card flex flex-col items-center p-8">
            <h3 className="text-xl font-bold mb-8">Payment Breakdown</h3>
            <ChartContainer config={chartConfig} className="w-full h-[300px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                />
              </PieChart>
            </ChartContainer>
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Principal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground">Interest</span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border w-full text-center">
              <p className="text-sm text-muted-foreground">Total Payable Amount</p>
              <p className="text-3xl font-bold">₹ {totalAmount.toLocaleString()}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
