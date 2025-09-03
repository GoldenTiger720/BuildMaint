import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import {
  HomeIcon,
  PhoneIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const getNavigation = (t: (key: string) => string) => [
  { name: t('navigation.dashboard'), href: '/dashboard', icon: HomeIcon },
  { name: t('navigation.maintenanceCalls'), href: '/calls', icon: PhoneIcon },
  { name: t('navigation.clients'), href: '/clients', icon: UsersIcon },
  { name: t('navigation.technicians'), href: '/technicians', icon: WrenchScrewdriverIcon },
  { name: t('navigation.services'), href: '/services', icon: BuildingOfficeIcon },
  { name: t('navigation.finances'), href: '/finances', icon: CurrencyDollarIcon },
  { name: t('navigation.reports'), href: '/reports', icon: ChartBarIcon },
  { name: t('navigation.settings'), href: '/settings', icon: CogIcon },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const navigation = getNavigation(t);

  return (
    <div className={cn(
      "flex flex-col bg-card border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <BuildingOfficeIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gradient">{t('app.name')}</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRightIcon className="h-4 w-4" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
                collapsed && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
              {!collapsed && item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};