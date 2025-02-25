'use client';

import { ChevronDownIcon, PlusIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import CopyButton from '@repo/ui/components/copy-button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';

import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, MailPlus } from 'lucide-react';
import { useState, useEffect, use } from 'react';
import { toast } from 'sonner';

import type { AuthClient } from '@repo/auth/client';
import { authClient } from '@/clients/authClient';
import { useTranslation } from '@repo/intl/react';

type ActiveOrganization = ReturnType<
  typeof authClient.organization.getFullOrganization
>;

export function OrganizationCard(props: {
  session: AuthClient['$Infer']['Session'] | null;
  activeOrganization: ActiveOrganization | null;
}) {
  const { t } = useTranslation();
  const { data: organizations } = authClient.useListOrganizations();

  const optimisticOrg = props.activeOrganization;
  const [isRevoking, setIsRevoking] = useState<string[]>([]);
  const inviteVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
  };

  const { data } = authClient.useSession();
  const session = data || props.session;

  const currentMember = optimisticOrg?.members?.find(
    (member: any) => member.userId === session?.user.id,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('ORGANIZATION')}</CardTitle>
        <div className="flex justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer">
                <p className="text-sm">
                  <span className="font-bold"></span>{' '}
                  {optimisticOrg?.name || t('PERSONAL')}
                </p>

                <ChevronDownIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                className=" py-1"
                onClick={async () => {
                  authClient.organization.setActive({
                    organizationId: null,
                  });
                }}
              >
                <p className="text-sm sm">{t('PERSONAL')}</p>
              </DropdownMenuItem>
              {organizations?.map((org) => (
                <DropdownMenuItem
                  className=" py-1"
                  key={org.id}
                  onClick={async () => {
                    if (org.id === optimisticOrg?.id) {
                      return;
                    }

                    const { data } = await authClient.organization.setActive({
                      organizationId: org.id,
                    });
                  }}
                >
                  <p className="text-sm sm">{org.name}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <CreateOrganizationDialog />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="rounded-none">
            <AvatarImage
              className="object-cover w-full h-full rounded-none"
              src={optimisticOrg?.logo || ''}
            />
            <AvatarFallback className="rounded-none">
              {optimisticOrg?.name?.charAt(0) || 'P'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{optimisticOrg?.name || t('PERSONAL')}</p>
            <p className="text-xs text-muted-foreground">
              {optimisticOrg?.members.length || 1} {t('MEMBERS')}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="flex flex-col gap-2 flex-grow">
            <p className="font-medium border-b-2 border-b-foreground/10">
              {t('MEMBERS')}
            </p>
            <div className="flex flex-col gap-2">
              {optimisticOrg?.members.map((member: any) => (
                <div
                  key={member.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="sm:flex w-9 h-9">
                      <AvatarImage
                        src={member.user.image || ''}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {member.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{member.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.role === 'owner'
                          ? t('OWNER')
                          : member.role === 'member'
                            ? t('MEMBER')
                            : t('ADMIN')}
                      </p>
                    </div>
                  </div>
                  {member.role !== 'owner' &&
                    (currentMember?.role === 'owner' ||
                      currentMember?.role === 'admin') && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          authClient.organization.removeMember({
                            memberIdOrEmail: member.id,
                          });
                        }}
                      >
                        {currentMember?.id === member.id
                          ? t('LEAVE')
                          : t('REMOVE')}
                      </Button>
                    )}
                </div>
              ))}
              {!optimisticOrg?.id && (
                <div>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={session?.user.image || ''} />
                      <AvatarFallback>
                        {session?.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{session?.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t('OWNER')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <p className="font-medium border-b-2 border-b-foreground/10">
              {t('INVITES')}
            </p>
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {optimisticOrg?.invitations
                  .filter((invitation: any) => invitation.status === 'pending')
                  .map((invitation: any) => (
                    <motion.div
                      key={invitation.id}
                      className="flex items-center justify-between"
                      variants={inviteVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <div>
                        <p className="text-sm">{invitation.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {invitation.role === 'owner'
                            ? t('OWNER')
                            : invitation.role === 'member'
                              ? t('MEMBER')
                              : t('ADMIN')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          disabled={isRevoking.includes(invitation.id)}
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            authClient.organization.cancelInvitation(
                              {
                                invitationId: invitation.id,
                              },
                              {
                                onRequest: () => {
                                  setIsRevoking([...isRevoking, invitation.id]);
                                },
                                onSuccess: () => {
                                  toast.message(
                                    'Invitation revoked successfully',
                                  );
                                  setIsRevoking(
                                    isRevoking.filter(
                                      (id) => id !== invitation.id,
                                    ),
                                  );
                                },
                                onError: (ctx) => {
                                  toast.error(ctx.error.message);
                                  setIsRevoking(
                                    isRevoking.filter(
                                      (id) => id !== invitation.id,
                                    ),
                                  );
                                },
                              },
                            );
                          }}
                        >
                          {isRevoking.includes(invitation.id) ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            t('REVOKE')
                          )}
                        </Button>
                        <div>
                          <CopyButton
                            textToCopy={`${window.location.origin}/accept-invitation/${invitation.id}`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
              {optimisticOrg?.invitations.length === 0 && (
                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {t('NO_ACTIVE_INVITATIONS')}
                </motion.p>
              )}
              {!optimisticOrg?.id && (
                <Label className="text-xs text-muted-foreground">
                  {t('CANT_INVITE_PERSONAL')}
                </Label>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full mt-4">
          <div>
            <div>{optimisticOrg?.id && <InviteMemberDialog />}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CreateOrganizationDialog() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    if (!isSlugEdited) {
      const generatedSlug = name.trim().toLowerCase().replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  }, [name, isSlugEdited]);

  useEffect(() => {
    if (open) {
      setName('');
      setSlug('');
      setIsSlugEdited(false);
      setLogo(null);
    }
  }, [open]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full gap-2" variant="default">
          <PlusIcon />
          <p>{t('NEW_ORGANIZATION')}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-11/12">
        <DialogHeader>
          <DialogTitle>{t('NEW_ORGANIZATION')}</DialogTitle>
          <DialogDescription>{t('CREATE_ORGANIZATION')}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>{t('ORGANIZATION_NAME')}</Label>
            <Input
              placeholder={t('NAME')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>{t('ORGANIZATION_SLUG')}</Label>
            <Input
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setIsSlugEdited(true);
              }}
              placeholder="Slug"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>{t('LOGO')}</Label>
            <Input type="file" accept="image/*" onChange={handleLogoChange} />
            {logo && (
              <div className="mt-2">
                <img
                  src={logo}
                  alt="Logo preview"
                  className="w-16 h-16 object-cover"
                  width={16}
                  height={16}
                />
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await authClient.organization.create(
                {
                  name: name,
                  slug: slug,
                  logo: logo || undefined,
                },
                {
                  onResponse: () => {
                    setLoading(false);
                  },
                  onSuccess: () => {
                    toast.success('Organization created successfully');
                    setOpen(false);
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                    setLoading(false);
                  },
                },
              );
            }}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              t('CREATE')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InviteMemberDialog() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full gap-2" variant="secondary">
          <MailPlus size={16} />
          <p>{t('INVITE_MEMBER')}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-11/12">
        <DialogHeader>
          <DialogTitle>{t('INVITE_MEMBER')}</DialogTitle>
          <DialogDescription>{t('INVITE_MEMBER_DESC')}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label>{t('EMAIL')}</Label>
          <Input
            placeholder={t('EMAIL')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>{t('ROLE')}</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder={`${t('SELECT_USER')}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">{t('ADMIN')}</SelectItem>
              <SelectItem value="member">{t('MEMBER')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              disabled={loading}
              onClick={async () => {
                const invite = authClient.organization.inviteMember({
                  email: email,
                  role: role as 'member',
                  fetchOptions: {
                    throw: true,
                    onSuccess: () => {
                      // TODO: Update optimistic org
                    },
                  },
                });
                toast.promise(invite, {
                  loading: 'Inviting member...',
                  success: 'Member invited successfully',
                  error: (error) => error.error.message,
                });
              }}
            >
              {t('INVITE')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
