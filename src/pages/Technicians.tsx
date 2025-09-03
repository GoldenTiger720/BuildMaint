import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  PlusIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
  EnvelopeIcon,
  StarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const mockTechnicians = [
  {
    id: '1',
    name: 'Mike Rodriguez',
    specialization: 'HVAC Systems',
    phone: '+1 (555) 111-2222',
    email: 'mike.rodriguez@buildmaint.com',
    rating: 4.8,
    activeCalls: 3,
    completedCalls: 45,
    status: 'available',
    workingHours: '8:00 AM - 6:00 PM'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    specialization: 'Electrical',
    phone: '+1 (555) 222-3333',
    email: 'sarah.chen@buildmaint.com',
    rating: 4.9,
    activeCalls: 2,
    completedCalls: 52,
    status: 'busy',
    workingHours: '7:00 AM - 5:00 PM'
  },
  {
    id: '3',
    name: 'David Park',
    specialization: 'Plumbing',
    phone: '+1 (555) 333-4444',
    email: 'david.park@buildmaint.com',
    rating: 4.7,
    activeCalls: 1,
    completedCalls: 38,
    status: 'available',
    workingHours: '9:00 AM - 7:00 PM'
  },
  {
    id: '4',
    name: 'Lisa Wong',
    specialization: 'General Maintenance',
    phone: '+1 (555) 444-5555',
    email: 'lisa.wong@buildmaint.com',
    rating: 4.6,
    activeCalls: 4,
    completedCalls: 41,
    status: 'busy',
    workingHours: '8:00 AM - 6:00 PM'
  },
  {
    id: '5',
    name: 'James Kim',
    specialization: 'Security Systems',
    phone: '+1 (555) 555-6666',
    email: 'james.kim@buildmaint.com',
    rating: 4.8,
    activeCalls: 1,
    completedCalls: 29,
    status: 'off-duty',
    workingHours: '10:00 AM - 8:00 PM'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'available':
      return <Badge variant="secondary" className="status-completed">Available</Badge>;
    case 'busy':
      return <Badge variant="secondary" className="status-progress">Busy</Badge>;
    case 'off-duty':
      return <Badge variant="outline">Off Duty</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getSpecializationBadge = (specialization: string) => {
  const colors = {
    'HVAC Systems': 'bg-primary-light text-primary-foreground',
    'Electrical': 'bg-warning-light text-warning-foreground',
    'Plumbing': 'bg-secondary-light text-secondary-foreground',
    'General Maintenance': 'bg-success-light text-success-foreground',
    'Security Systems': 'bg-destructive-light text-destructive-foreground'
  };
  
  return (
    <Badge variant="secondary" className={colors[specialization as keyof typeof colors] || 'bg-muted'}>
      {specialization}
    </Badge>
  );
};

export const Technicians: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('technicians.title')}</h1>
          <p className="text-muted-foreground">
            Manage your technical staff and their assignments
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Technician
        </Button>
      </div>

      {/* Technicians Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockTechnicians.map((technician) => (
          <Card key={technician.id} className="card-hover card-interactive">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <WrenchScrewdriverIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{technician.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium ml-1">{technician.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {getStatusBadge(technician.status)}
              </div>
              <div className="flex gap-2">
                {getSpecializationBadge(technician.specialization)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <PhoneIcon className="mr-2 h-4 w-4" />
                  {technician.phone}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <EnvelopeIcon className="mr-2 h-4 w-4" />
                  {technician.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ClockIcon className="mr-2 h-4 w-4" />
                  {technician.workingHours}
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between text-center pt-4 border-t border-border">
                <div>
                  <div className="text-2xl font-bold text-primary">{technician.activeCalls}</div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
                <div className="border-l border-border"></div>
                <div>
                  <div className="text-2xl font-bold">{technician.completedCalls}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Assign Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};