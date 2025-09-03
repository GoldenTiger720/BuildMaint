import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const mockClients = [
  {
    id: '1',
    name: 'Sunset Plaza',
    type: 'Commercial',
    contact: 'John Smith',
    phone: '+1 (555) 123-4567',
    email: 'john.smith@sunsetplaza.com',
    address: '123 Sunset Blvd, Los Angeles, CA 90028',
    activeCalls: 3,
    totalCalls: 15,
    status: 'active'
  },
  {
    id: '2',
    name: 'Green Valley Office',
    type: 'Office',
    contact: 'Sarah Wilson',
    phone: '+1 (555) 234-5678',
    email: 'sarah.wilson@greenvalley.com',
    address: '456 Green Valley Rd, Beverly Hills, CA 90210',
    activeCalls: 1,
    totalCalls: 8,
    status: 'active'
  },
  {
    id: '3',
    name: 'Metro Shopping Center',
    type: 'Retail',
    contact: 'Mike Johnson',
    phone: '+1 (555) 345-6789',
    email: 'mike.johnson@metroshopping.com',
    address: '789 Metro Ave, Santa Monica, CA 90401',
    activeCalls: 0,
    totalCalls: 22,
    status: 'active'
  },
  {
    id: '4',
    name: 'Riverside Apartments',
    type: 'Residential',
    contact: 'Lisa Chen',
    phone: '+1 (555) 456-7890',
    email: 'lisa.chen@riverside.com',
    address: '321 Riverside Dr, Burbank, CA 91505',
    activeCalls: 2,
    totalCalls: 12,
    status: 'active'
  },
  {
    id: '5',
    name: 'Downtown Office Complex',
    type: 'Commercial',
    contact: 'Robert Davis',
    phone: '+1 (555) 567-8901',
    email: 'robert.davis@downtown.com',
    address: '654 Downtown St, Los Angeles, CA 90013',
    activeCalls: 1,
    totalCalls: 18,
    status: 'inactive'
  }
];

const getTypeBadge = (type: string) => {
  const colors = {
    'Commercial': 'bg-primary-light text-primary-foreground',
    'Office': 'bg-secondary-light text-secondary-foreground',
    'Retail': 'bg-success-light text-success-foreground',
    'Residential': 'bg-warning-light text-warning-foreground'
  };
  
  return (
    <Badge variant="secondary" className={colors[type as keyof typeof colors] || 'bg-muted'}>
      {type}
    </Badge>
  );
};

const getStatusBadge = (status: string) => {
  return status === 'active' ? (
    <Badge variant="secondary" className="status-completed">Active</Badge>
  ) : (
    <Badge variant="outline">Inactive</Badge>
  );
};

export const Clients: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('clients.title')}</h1>
          <p className="text-muted-foreground">
            Manage your client database and relationships
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients by name, contact, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="card-hover card-interactive">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BuildingOfficeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription>{client.contact}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(client.status)}
              </div>
              <div className="flex gap-2">
                {getTypeBadge(client.type)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <PhoneIcon className="mr-2 h-4 w-4" />
                  {client.phone}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <EnvelopeIcon className="mr-2 h-4 w-4" />
                  {client.email}
                </div>
                <div className="flex items-start text-sm text-muted-foreground">
                  <MapPinIcon className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="leading-tight">{client.address}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between text-center pt-4 border-t border-border">
                <div>
                  <div className="text-2xl font-bold text-primary">{client.activeCalls}</div>
                  <div className="text-xs text-muted-foreground">Active Calls</div>
                </div>
                <div className="border-l border-border"></div>
                <div>
                  <div className="text-2xl font-bold">{client.totalCalls}</div>
                  <div className="text-xs text-muted-foreground">Total Calls</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  New Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};