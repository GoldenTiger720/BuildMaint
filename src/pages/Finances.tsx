import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { 
  CurrencyDollarIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  CalendarIcon,
  PlusIcon,
  BanknotesIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'overdue';
  callId?: string;
  clientName?: string;
}

interface Budget {
  id: string;
  callId: string;
  clientName: string;
  description: string;
  estimatedCost: number;
  actualCost: number;
  status: 'draft' | 'approved' | 'invoiced' | 'paid';
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    category: 'Service Payment',
    description: 'Electrical repair - Building A',
    amount: 1500,
    date: '2024-01-15',
    status: 'completed',
    callId: 'CALL-001',
    clientName: 'ABC Corporation'
  },
  {
    id: '2',
    type: 'expense',
    category: 'Materials',
    description: 'Electrical components',
    amount: 300,
    date: '2024-01-14',
    status: 'completed'
  },
  {
    id: '3',
    type: 'income',
    category: 'Service Payment',
    description: 'HVAC maintenance',
    amount: 800,
    date: '2024-01-20',
    status: 'pending',
    callId: 'CALL-002',
    clientName: 'XYZ Industries'
  },
  {
    id: '4',
    type: 'expense',
    category: 'Labor',
    description: 'Technician overtime',
    amount: 450,
    date: '2024-01-18',
    status: 'pending'
  },
  {
    id: '5',
    type: 'income',
    category: 'Service Payment',
    description: 'Plumbing repair',
    amount: 600,
    date: '2024-01-10',
    status: 'overdue',
    callId: 'CALL-003',
    clientName: 'DEF Building'
  }
];

const mockBudgets: Budget[] = [
  {
    id: '1',
    callId: 'CALL-004',
    clientName: 'ABC Corporation',
    description: 'Complete electrical system upgrade',
    estimatedCost: 5000,
    actualCost: 4800,
    status: 'paid',
    date: '2024-01-25'
  },
  {
    id: '2',
    callId: 'CALL-005',
    clientName: 'XYZ Industries',
    description: 'HVAC system maintenance',
    estimatedCost: 1200,
    actualCost: 0,
    status: 'approved',
    date: '2024-01-28'
  },
  {
    id: '3',
    callId: 'CALL-006',
    clientName: 'DEF Building',
    description: 'Plumbing emergency repair',
    estimatedCost: 800,
    actualCost: 0,
    status: 'draft',
    date: '2024-01-30'
  }
];

export const Finances: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [transactionFilter, setTransactionFilter] = useState<string>('all');
  const [budgetFilter, setBudgetFilter] = useState<string>('all');
  const { toast } = useToast();

  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const overdueAmount = transactions
    .filter(t => t.status === 'overdue')
    .reduce((sum, t) => sum + t.amount, 0);

  const filteredTransactions = transactions.filter(transaction => {
    if (transactionFilter === 'all') return true;
    return transaction.status === transactionFilter;
  });

  const filteredBudgets = budgets.filter(budget => {
    if (budgetFilter === 'all') return true;
    return budget.status === budgetFilter;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      pending: 'secondary',
      overdue: 'destructive',
      paid: 'default',
      approved: 'secondary',
      invoiced: 'outline',
      draft: 'outline'
    };
    return <Badge variant={variants[status as keyof typeof variants] as any}>{status}</Badge>;
  };

  const getAmountColor = (type: string) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finances</h1>
          <p className="text-muted-foreground">Manage budgets, accounts, and financial reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Transaction
          </Button>
          <Button className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Create Budget
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Income</CardTitle>
            <BanknotesIcon className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${pendingIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different financial views */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 gap-4">
                  <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transactions</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          {transaction.callId && (
                            <div className="text-sm text-muted-foreground">{transaction.callId}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.category}</Badge>
                      </TableCell>
                      <TableCell>{transaction.clientName || '-'}</TableCell>
                      <TableCell className={getAmountColor(transaction.type)}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budgets" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="invoiced">Invoiced</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budgets ({filteredBudgets.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Call ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Estimated Cost</TableHead>
                    <TableHead>Actual Cost</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBudgets.map((budget) => {
                    const variance = budget.actualCost - budget.estimatedCost;
                    const variancePercentage = budget.actualCost > 0 
                      ? ((variance / budget.estimatedCost) * 100).toFixed(1)
                      : '-';
                    
                    return (
                      <TableRow key={budget.id}>
                        <TableCell className="font-medium">{budget.callId}</TableCell>
                        <TableCell>{budget.clientName}</TableCell>
                        <TableCell>{budget.description}</TableCell>
                        <TableCell>${budget.estimatedCost.toLocaleString()}</TableCell>
                        <TableCell>
                          {budget.actualCost > 0 
                            ? `$${budget.actualCost.toLocaleString()}`
                            : '-'
                          }
                        </TableCell>
                        <TableCell>
                          {budget.actualCost > 0 ? (
                            <span className={variance >= 0 ? 'text-red-600' : 'text-green-600'}>
                              {variance >= 0 ? '+' : ''}${variance.toLocaleString()} ({variancePercentage}%)
                            </span>
                          ) : '-'}
                        </TableCell>
                        <TableCell>{getStatusBadge(budget.status)}</TableCell>
                        <TableCell>{budget.date}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Revenue</span>
                    <span className="font-bold text-green-600">${totalIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Expenses</span>
                    <span className="font-bold text-red-600">${totalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-bold">Net Profit</span>
                    <span className="font-bold text-primary">
                      ${(totalIncome - totalExpenses).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profit Margin</span>
                    <span className="font-bold">
                      {((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outstanding Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Pending Payments</span>
                    <span className="font-bold text-yellow-600">${pendingIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overdue Payments</span>
                    <span className="font-bold text-red-600">${overdueAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-bold">Total Outstanding</span>
                    <span className="font-bold">
                      ${(pendingIncome + overdueAmount).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Service Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Electrical Services</span>
                  <span className="font-bold">$1,500 (65%)</span>
                </div>
                <div className="flex justify-between">
                  <span>HVAC Services</span>
                  <span className="font-bold">$800 (35%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};