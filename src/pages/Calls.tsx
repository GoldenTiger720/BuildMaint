import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const mockCalls = [
  {
    id: '#2024-001',
    client: 'Sunset Plaza',
    service: 'HVAC Repair',
    technician: 'Mike Rodriguez',
    status: 'in-progress',
    priority: 'high',
    created: '2024-01-15',
    budget: '$2,500'
  },
  {
    id: '#2024-002',
    client: 'Green Valley Office',
    service: 'Electrical Maintenance',
    technician: 'Sarah Chen',
    status: 'open',
    priority: 'medium',
    created: '2024-01-14',
    budget: '$1,800'
  },
  {
    id: '#2024-003',
    client: 'Metro Shopping Center',
    service: 'Plumbing Repair',
    technician: 'David Park',
    status: 'completed',
    priority: 'low',
    created: '2024-01-13',
    budget: '$950'
  },
  {
    id: '#2024-004',
    client: 'Riverside Apartments',
    service: 'Cleaning Service',
    technician: 'Lisa Wong',
    status: 'open',
    priority: 'high',
    created: '2024-01-12',
    budget: '$600'
  },
  {
    id: '#2024-005',
    client: 'Downtown Office Complex',
    service: 'Security System',
    technician: 'James Kim',
    status: 'in-progress',
    priority: 'medium',
    created: '2024-01-11',
    budget: '$3,200'
  }
];


export const Calls: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="secondary" className="status-open">{t('status.open')}</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="status-progress">{t('status.inProgress')}</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="status-completed">{t('status.completed')}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">{t('priority.high')}</Badge>;
      case 'medium':
        return <Badge variant="secondary">{t('priority.medium')}</Badge>;
      case 'low':
        return <Badge variant="outline">{t('priority.low')}</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getServiceName = (service: string) => {
    switch (service) {
      case 'HVAC Repair':
        return t('services.hvacRepair');
      case 'Electrical Maintenance':
        return t('services.electricalMaintenance');
      case 'Plumbing Repair':
        return t('services.plumbingRepair');
      case 'Cleaning Service':
        return t('services.cleaningService');
      case 'Security System':
        return t('services.securitySystem');
      default:
        return service;
    }
  };

  const filteredCalls = mockCalls.filter(call => {
    const matchesSearch = call.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.technician.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusFilterLabel = (status: string) => {
    if (status === 'all') return t('calls.all');
    switch (status) {
      case 'open':
        return t('status.open');
      case 'in-progress':
        return t('status.inProgress');
      case 'completed':
        return t('status.completed');
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('calls.title')}</h1>
          <p className="text-muted-foreground">
            {t('calls.description')}
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <PlusIcon className="mr-2 h-4 w-4" />
          {t('calls.newCall')}
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>{t('calls.filterCalls')}</CardTitle>
          <CardDescription>
            {t('calls.filterDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('calls.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <FunnelIcon className="h-4 w-4" />
                  {t('calls.status')}: {getStatusFilterLabel(statusFilter)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{t('calls.filterByStatus')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  {t('calls.allStatuses')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('open')}>
                  {t('status.open')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('in-progress')}>
                  {t('status.inProgress')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('completed')}>
                  {t('status.completed')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Calls Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{t('calls.allCalls')} ({filteredCalls.length})</CardTitle>
              <CardDescription>
                {t('calls.completeList')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('calls.callId')}</TableHead>
                  <TableHead>{t('calls.client')}</TableHead>
                  <TableHead>{t('calls.service')}</TableHead>
                  <TableHead>{t('calls.technician')}</TableHead>
                  <TableHead>{t('common.status')}</TableHead>
                  <TableHead>{t('calls.priority')}</TableHead>
                  <TableHead>{t('calls.budget')}</TableHead>
                  <TableHead>{t('calls.created')}</TableHead>
                  <TableHead className="text-right">{t('calls.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.map((call) => (
                  <TableRow key={call.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{call.id}</TableCell>
                    <TableCell>{call.client}</TableCell>
                    <TableCell>{getServiceName(call.service)}</TableCell>
                    <TableCell>{call.technician}</TableCell>
                    <TableCell>{getStatusBadge(call.status)}</TableCell>
                    <TableCell>{getPriorityBadge(call.priority)}</TableCell>
                    <TableCell className="font-medium">{call.budget}</TableCell>
                    <TableCell>{call.created}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <EllipsisVerticalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{t('calls.actions')}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <EyeIcon className="mr-2 h-4 w-4" />
                            {t('calls.viewDetails')}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <PencilIcon className="mr-2 h-4 w-4" />
                            {t('calls.editCall')}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <TrashIcon className="mr-2 h-4 w-4" />
                            {t('calls.deleteCall')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};