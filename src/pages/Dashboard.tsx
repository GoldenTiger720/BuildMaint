import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  PhoneIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    title: 'Total Calls',
    value: '127',
    change: '+12.5%',
    trend: 'up',
    icon: PhoneIcon,
    color: 'primary'
  },
  {
    title: 'Open Calls',
    value: '24',
    change: '+8.2%',
    trend: 'up',
    icon: ClockIcon,
    color: 'warning'
  },
  {
    title: 'Active Clients',
    value: '89',
    change: '+5.1%',
    trend: 'up',
    icon: UsersIcon,
    color: 'secondary'
  },
  {
    title: 'Monthly Revenue',
    value: '$45,280',
    change: '+18.7%',
    trend: 'up',
    icon: CurrencyDollarIcon,
    color: 'success'
  }
];

const recentCalls = [
  {
    id: '#2024-001',
    client: 'Sunset Plaza',
    service: 'HVAC Repair',
    technician: 'Mike Rodriguez',
    status: 'in-progress',
    priority: 'high',
    created: '2 hours ago'
  },
  {
    id: '#2024-002',
    client: 'Green Valley Office',
    service: 'Electrical Maintenance',
    technician: 'Sarah Chen',
    status: 'open',
    priority: 'medium',
    created: '5 hours ago'
  },
  {
    id: '#2024-003',
    client: 'Metro Shopping Center',
    service: 'Plumbing Repair',
    technician: 'David Park',
    status: 'completed',
    priority: 'low',
    created: '1 day ago'
  },
  {
    id: '#2024-004',
    client: 'Riverside Apartments',
    service: 'Cleaning Service',
    technician: 'Lisa Wong',
    status: 'open',
    priority: 'high',
    created: '2 days ago'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'open':
      return <Badge variant="secondary" className="status-open">Open</Badge>;
    case 'in-progress':
      return <Badge variant="secondary" className="status-progress">In Progress</Badge>;
    case 'completed':
      return <Badge variant="secondary" className="status-completed">Completed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">High</Badge>;
    case 'medium':
      return <Badge variant="secondary">Medium</Badge>;
    case 'low':
      return <Badge variant="outline">Low</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
};

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your building maintenance operations
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <PlusIcon className="mr-2 h-4 w-4" />
          New Call
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 text-${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowTrendingUpIcon className="mr-1 h-3 w-3 text-success" />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Calls and Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Calls */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Maintenance Calls</CardTitle>
            <CardDescription>
              Latest service requests and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg card-interactive"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{call.id}</span>
                      {getStatusBadge(call.status)}
                      {getPriorityBadge(call.priority)}
                    </div>
                    <p className="font-semibold">{call.client}</p>
                    <p className="text-sm text-muted-foreground">{call.service}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <span>Assigned to {call.technician}</span>
                      <span className="mx-1">•</span>
                      <span>{call.created}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <PhoneIcon className="mr-2 h-4 w-4" />
                Create New Call
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UsersIcon className="mr-2 h-4 w-4" />
                Add Client
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircleIcon className="mr-2 h-4 w-4" />
                Schedule Maintenance
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CurrencyDollarIcon className="mr-2 h-4 w-4" />
                Generate Invoice
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2 p-3 bg-warning-light rounded-lg">
                <ExclamationTriangleIcon className="h-4 w-4 text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium">3 Overdue Calls</p>
                  <p className="text-xs text-muted-foreground">Require immediate attention</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-3 bg-primary-light rounded-lg">
                <ClockIcon className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">5 Scheduled Today</p>
                  <p className="text-xs text-muted-foreground">Maintenance appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};