import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const languageOptions = [
  { 
    code: 'en' as Language, 
    name: 'English', 
    flag: '/flags/us.jpg' 
  },
  { 
    code: 'es' as Language, 
    name: 'Español', 
    flag: '/flags/spain.jpg' 
  },
  { 
    code: 'pt' as Language, 
    name: 'Português', 
    flag: '/flags/brazil.jpg' 
  }
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 gap-2">
          {currentLanguage && (
            <img 
              src={currentLanguage.flag} 
              alt={currentLanguage.name}
              className="w-4 h-3 object-cover rounded-sm"
            />
          )}
          <GlobeAltIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onClick={() => setLanguage(option.code)}
            className="flex items-center gap-2"
          >
            <img 
              src={option.flag} 
              alt={option.name}
              className="w-4 h-3 object-cover rounded-sm"
            />
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};