import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Info, Download, TrendingUp, DollarSign } from 'lucide-react';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    annualWaferDemand: 30000,
    waferCost: 8000,
    prepayment: 10,
    priceDiscount: 5,
    flexibilityBand: 30
  });

  const InputField = ({ label, name, value, explanation, unit }) => (
    <div className="mb-6">
      <div className="relative">
        <label className="text-sm font-medium text-gray-700 group inline-flex items-center">
          {label}
          <div className="group relative ml-2">
            <Info className="w-4 h-4 text-gray-400" />
            <div className="opacity-0 group-hover:opacity-100 absolute z-50 w-64 p-2 text-sm 
              bg-black text-white rounded shadow-lg bottom-full left-1/2 transform -translate-x-1/2 
              mb-2 pointer-events-none transition-opacity duration-200">
              {explanation}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-2 h-2 bg-black transform rotate-45"></div>
              </div>
            </div>
          </div>
        </label>
        <div className="mt-1 flex items-center">
          <input
            type="number"
            value={value}
            onChange={(e) => setInputs(prev => ({...prev, [name]: Number(e.target.value)}))}
            className="w-full p-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {unit && <span className="ml-2 text-gray-500">{unit}</span>}
        </div>
      </div>
    </div>
  );

  const calculateResults = () => {
    const baseCost = inputs.annualWaferDemand * inputs.waferCost;
    const prepaymentAmount = baseCost * (inputs.prepayment / 100);
    const costSavings = baseCost * (inputs.priceDiscount / 100);
    const flexibilityValue = baseCost * (inputs.flexibilityBand / 100) * 0.20;
    
    const baseROI = (costSavings / prepaymentAmount) * 100;
    const totalROI = ((costSavings + flexibilityValue) / prepaymentAmount) * 100;
    
    return {
      baseCost,
      prepaymentAmount,
      costSavings,
      flexibilityValue,
      baseROI,
      totalROI
    };
  };

  const results = calculateResults();

  const ResultCard = ({ label, value, explanation }) => (
    <div className="bg-white p-4 rounded-lg border shadow-sm group relative">
      <div className="flex justify-between">
        <div>
          <div className="text-sm text-gray-500">{label}</div>
          <div className="text-xl font-semibold text-gray-900">{value}</div>
        </div>
        <div className="group relative">
          <Info className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="opacity-0 group-hover:opacity-100 absolute z-50 w-64 p-2 text-sm 
            bg-black text-white rounded shadow-lg bottom-full right-0 
            mb-2 pointer-events-none transition-opacity duration-200">
            {explanation}
            <div className="absolute bottom-0 right-4 transform translate-y-full">
              <div className="w-2 h-2 bg-black transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader className="bg-blue-600 text-white p-6">
        <CardTitle className="text-2xl">ROI Calculator</CardTitle>
        <p className="text-sm opacity-90">Calculate the value of prepayment and capacity flexibility</p>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs defaultValue="calculator">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="explanation">How It Works</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Inputs */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Input Parameters</h3>
                  
                  <InputField
                    label="Annual Wafer Demand"
                    name="annualWaferDemand"
                    value={inputs.annualWaferDemand}
                    explanation="Expected yearly wafer demand based on customer forecasts. Most customers range from 10,000 to 50,000 wafers annually."
                    unit="wafers"
                  />
                  
                  <InputField
                    label="Wafer Cost"
                    name="waferCost"
                    value={inputs.waferCost}
                    explanation="Average cost per wafer. Industry range typically falls between $6,000-$25,000 depending on process node and complexity."
                    unit="$"
                  />
                  
                  <InputField
                    label="Prepayment"
                    name="prepayment"
                    value={inputs.prepayment}
                    explanation="Percentage of total cost paid upfront. Higher prepayments (10-30%) typically lead to better discounts and more flexibility."
                    unit="%"
                  />
                  
                  <InputField
                    label="Price Discount"
                    name="priceDiscount"
                    value={inputs.priceDiscount}
                    explanation="Discount received for prepayment. Typically ranges from 3-8% depending on prepayment amount and market conditions."
                    unit="%"
                  />
                  
                  <InputField
                    label="Flexibility Band"
                    name="flexibilityBand"
                    value={inputs.flexibilityBand}
                    explanation="Allowed variation in capacity (±%). Standard range is 20-40%. Higher flexibility helps manage demand uncertainty but may affect pricing."
                    unit="%"
                  />
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <ResultCard
                    label="Base ROI"
                    value={`${results.baseROI.toFixed(1)}%`}
                    explanation="Direct financial return from prepayment discount. Calculated as (Price Discount Savings ÷ Prepayment Amount) × 100%. This represents immediate, guaranteed returns."
                  />
                  <ResultCard
                    label="Total ROI"
                    value={`${results.totalROI.toFixed(1)}%`}
                    explanation="Complete ROI including both discount savings and flexibility value. Combines immediate financial returns with the strategic value of capacity flexibility."
                  />
                  <ResultCard
                    label="Cost Savings"
                    value={`$${(results.costSavings / 1e6).toFixed(1)}M`}
                    explanation="Direct financial savings from the prepayment discount. Calculated as Base Cost × Price Discount%. This represents immediate cash savings."
                  />
                  <ResultCard
                    label="Flexibility Value"
                    value={`$${(results.flexibilityValue / 1e6).toFixed(1)}M`}
                    explanation="Economic value of capacity flexibility. Based on ability to adjust capacity within the flexibility band, valued at industry standard margins."
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-4">ROI Comparison</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Base ROI', value: results.baseROI },
                        { name: 'Total ROI', value: results.totalROI }
                      ]}>
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'ROI']} />
                        <Bar dataKey="value" fill="#4F46E5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="explanation" className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">ROI Calculation Methodology</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">1. Base Cost Calculation</h4>
                  <p className="text-sm text-gray-600">Base Cost = Annual Wafer Demand × Wafer Cost</p>
                  <p className="text-xs text-gray-500 mt-1">This represents total procurement cost without any discounts</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">2. Prepayment Benefits</h4>
                  <p className="text-sm text-gray-600">Cost Savings = Base Cost × Price Discount%</p>
                  <p className="text-xs text-gray-500 mt-1">Direct savings from prepayment discount</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">3. Flexibility Value</h4>
                  <p className="text-sm text-gray-600">Flexibility Value = Base Cost × Flexibility Band% × Industry Margin</p>
                  <p className="text-xs text-gray-500 mt-1">Value of being able to adjust capacity up/down based on demand</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">4. ROI Calculation</h4>
                  <p className="text-sm text-gray-600">ROI = (Cost Savings + Flexibility Value) ÷ Prepayment Amount × 100%</p>
                  <p className="text-xs text-gray-500 mt-1">Return on investment including both direct savings and flexibility value</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Understanding ROI Components</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Base ROI</h4>
                  <p className="text-sm text-gray-600">Base ROI focuses on direct financial returns from prepayment:</p>
                  <ul className="list-disc ml-6 text-sm text-gray-600 space-y-2">
                    <li>Considers only the price discount savings</li>
                    <li>Shows immediate financial benefit</li>
                    <li>Easier to validate with finance teams</li>
                    <li>Typically ranges from 30-80% depending on discount level</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Total ROI</h4>
                  <p className="text-sm text-gray-600">Total ROI includes both financial and strategic benefits:</p>
                  <ul className="list-disc ml-6 text-sm text-gray-600 space-y-2">
                    <li>Combines price discount savings with flexibility value</li>
                    <li>Accounts for market conditions and demand variability</li>
                    <li>Reflects true business impact of the prepayment strategy</li>
                    <li>Usually 40-100% higher than Base ROI due to flexibility value</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Business Benefits</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium">Financial Benefits</h4>
                  <ul className="list-disc ml-6 text-sm text-gray-600 space-y-2">
                    <li>Immediate price discount on wafer costs</li>
                    <li>Protected pricing against market fluctuations</li>
                    <li>Improved cash flow predictability</li>
                    <li>Potential tax benefits from prepayment</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Strategic Benefits</h4>
                  <ul className="list-disc ml-6 text-sm text-gray-600 space-y-2">
                    <li>Priority access to capacity in constrained markets</li>
                    <li>Flexibility to adjust capacity within agreed bands</li>
                    <li>Stronger supplier relationships</li>
                    <li>Reduced risk of capacity shortages</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ROICalculator;
