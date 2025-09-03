import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { 
  ChartBarIcon, 
  DocumentArrowDownIcon, 
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';

interface ReportData {
  totalCalls: number;
  completedCalls: number;
  pendingCalls: number;
  totalRevenue: number;
  averageCallDuration: string;
  topTechnician: string;
  topService: string;
  customerSatisfaction: number;
}

const mockReportData: ReportData = {
  totalCalls: 145,
  completedCalls: 128,
  pendingCalls: 17,
  totalRevenue: 45680,
  averageCallDuration: '2.5 hours',
  topTechnician: 'John Smith',
  topService: 'Electrical Repair',
  customerSatisfaction: 4.7
};

const callsByMonth = [
  { month: 'Jan', calls: 32, revenue: 8450 },
  { month: 'Feb', calls: 28, revenue: 7320 },
  { month: 'Mar', calls: 35, revenue: 9150 },
  { month: 'Apr', calls: 31, revenue: 8280 },
  { month: 'May', calls: 19, revenue: 5480 },
];

const serviceBreakdown = [
  { service: 'Electrical', calls: 45, percentage: 31, revenue: 15680 },
  { service: 'Plumbing', calls: 38, percentage: 26, revenue: 12450 },
  { service: 'HVAC', calls: 32, percentage: 22, revenue: 11800 },
  { service: 'Cleaning', calls: 20, percentage: 14, revenue: 3950 },
  { service: 'Security', calls: 10, percentage: 7, revenue: 1800 },
];

const technicianPerformance = [
  { name: 'John Smith', calls: 35, rating: 4.8, revenue: 12450 },
  { name: 'Maria Garcia', calls: 32, rating: 4.7, revenue: 11680 },
  { name: 'David Johnson', calls: 28, rating: 4.6, revenue: 9850 },
  { name: 'Sarah Wilson', calls: 25, rating: 4.5, revenue: 8450 },
  { name: 'Mike Brown', calls: 25, rating: 4.4, revenue: 7250 },
];

export const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');
  const [reportType, setReportType] = useState<string>('overview');
  const { toast } = useToast();

  const handleExportReport = (format: string) => {
    toast({
      title: "Report exported",
      description: `Report has been exported as ${format.toUpperCase()}.`,
    });
  };

  const generateReport = () => {
    toast({
      title: "Report generated",
      description: "Custom report has been generated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights and performance analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExportReport('pdf')} className="gap-2">
            <DocumentArrowDownIcon className="h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExportReport('excel')} className="gap-2">
            <DocumentArrowDownIcon className="h-4 w-4" />
            Export Excel
          </Button>
          <Button onClick={generateReport} className="gap-2">
            <ChartBarIcon className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Report Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              
              {selectedPeriod === 'custom' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        "Pick a date range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              )}

              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <WrenchScrewdriverIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReportData.totalCalls}</div>
            <p className="text-xs text-muted-foreground">+15% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CurrencyDollarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockReportData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Call Duration</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReportData.averageCallDuration}</div>
            <p className="text-xs text-muted-foreground">-5% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <UserGroupIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReportData.customerSatisfaction}/5.0</div>
            <p className="text-xs text-muted-foreground">+0.2 from last period</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calls">Call Analytics</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Call Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {callsByMonth.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="font-medium">{month.month}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{month.calls} calls</span>
                        <span className="font-bold">${month.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceBreakdown.map((service) => (
                    <div key={service.service} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{service.service}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{service.calls} calls</Badge>
                          <span className="text-sm font-bold">{service.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${service.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Call Status Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{mockReportData.completedCalls}</div>
                  <div className="text-sm text-muted-foreground">Completed Calls</div>
                  <div className="text-xs text-muted-foreground">
                    {((mockReportData.completedCalls / mockReportData.totalCalls) * 100).toFixed(1)}% completion rate
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{mockReportData.pendingCalls}</div>
                  <div className="text-sm text-muted-foreground">Pending Calls</div>
                  <div className="text-xs text-muted-foreground">
                    {((mockReportData.pendingCalls / mockReportData.totalCalls) * 100).toFixed(1)}% pending
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{mockReportData.totalCalls}</div>
                  <div className="text-sm text-muted-foreground">Total Calls</div>
                  <div className="text-xs text-muted-foreground">All time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calls" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Call Volume by Service Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceBreakdown.map((service) => (
                  <div key={service.service} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <BuildingOfficeIcon className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{service.service}</div>
                        <div className="text-sm text-muted-foreground">{service.calls} total calls</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${service.revenue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{service.percentage}% of total</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceBreakdown.map((service) => (
                    <div key={service.service} className="flex justify-between">
                      <span>{service.service}</span>
                      <span className="font-bold">${service.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total Revenue</span>
                    <span>${serviceBreakdown.reduce((sum, s) => sum + s.revenue, 0).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {callsByMonth.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="font-medium">{month.month} 2024</span>
                      <div className="text-right">
                        <div className="font-bold">${month.revenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          ${(month.revenue / month.calls).toFixed(0)} avg per call
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technician Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {technicianPerformance.map((tech, index) => (
                  <div key={tech.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{tech.name}</div>
                        <div className="text-sm text-muted-foreground">{tech.calls} calls completed</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${tech.revenue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        {tech.rating}/5.0 ⭐
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">{mockReportData.topTechnician}</div>
                  <div className="text-muted-foreground">Best overall performance</div>
                  <Badge variant="default">⭐ 4.8/5.0 Rating</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Popular Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">{mockReportData.topService}</div>
                  <div className="text-muted-foreground">Highest demand service</div>
                  <Badge variant="default">45 calls this month</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};