'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@repo/ui/components/command';
import { ChevronDown, PlusCircle } from 'lucide-react';

import { authClient } from '@/clients/authClient';
import { useNavigate } from '@tanstack/react-router';
import type { AuthClient } from '@repo/auth/client';
import { useTranslation } from '@repo/intl/react';

export default function AccountSwitcher({
  sessions,
}: {
  sessions: AuthClient['$Infer']['Session'][];
}) {
  const { t } = useTranslation();
  const { data: currentUser } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={t('SELECT_USER')}
          className="w-[250px] justify-between"
        >
          <Avatar className="mr-2 h-6 w-6">
            <AvatarImage
              src={currentUser?.user.image || ''}
              alt={currentUser?.user.name}
            />
            <AvatarFallback>{currentUser?.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {currentUser?.user.name}
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandGroup heading={t('CURRENT_ACCOUNT')}>
              <CommandItem
                onSelect={() => {}}
                className="text-sm w-full justify-between"
                key={currentUser?.user.id}
              >
                <div className="flex items-center">
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={currentUser?.user.image || ''}
                      alt={currentUser?.user.name}
                    />
                    <AvatarFallback>
                      {currentUser?.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {currentUser?.user.name}
                </div>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={t('SWITCH_ACCOUNT')}>
              {sessions
                .filter((s) => s.user.id !== currentUser?.user.id)
                .map((u, i) => (
                  <CommandItem
                    key={i}
                    onSelect={async () => {
                      await authClient.multiSession.setActive({
                        sessionToken: u.session.token,
                      });
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage src={u.user.image || ''} alt={u.user.name} />
                      <AvatarFallback>{u.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p>{u.user.name}</p>
                        <p className="text-xs">({u.user.email})</p>
                      </div>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  navigate({ to: '/login' });
                  setOpen(false);
                }}
                className="cursor-pointer text-sm"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                {t('ADD_ACCOUNT')}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
