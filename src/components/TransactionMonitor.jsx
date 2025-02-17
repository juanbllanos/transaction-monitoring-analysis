import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample transaction data showing patterns over time
const sampleData = [
  { month: 'Jan', normal: 1000, suspicious: 3000, threshold: 2000 },
  { month: 'Feb', normal: 1200, suspicious: 2800, threshold: 2000 },
  { month: 'Mar', normal: 900, suspicious: 3200, threshold: 2000 },
  { month: 'Apr', normal: 1100, suspicious: 2700, threshold: 2000 },
  { month: 'May', normal: 1300, suspicious: 4500, threshold: 2000 },
  { month: 'Jun', normal: 1000, suspicious: 2900, threshold: 2000 }
];

const TransactionMonitor = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Handle hover on data points to show analysis
  const handleMouseOver = (data) => {
    if (data.activePayload) {
      const point = data.activePayload[0].payload;
      setSelectedPoint({
        month: point.month,
        analysis: point.suspicious > point.threshold * 1.5 
          ? 'High-risk pattern detected: Transaction volume significantly above threshold'
          : 'Normal transaction pattern detected'
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Transaction Pattern Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <LineChart
            width={700}
            height={300}
            data={sampleData}
            onMouseMove={handleMouseOver}
            onMouseLeave={() => setSelectedPoint(null)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="normal" stroke="#8884d8" name="Normal Transactions" />
            <Line type="monotone" dataKey="suspicious" stroke="#ff0000" name="Suspicious Pattern" />
            <Line type="monotone" dataKey="threshold" stroke="#82ca9d" name="Alert Threshold" strokeDasharray="5 5" />
          </LineChart>
        </div>
        {selectedPoint && (
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">{selectedPoint.month} Analysis:</h3>
            <p>{selectedPoint.analysis}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionMonitor;