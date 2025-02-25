'use client';

import { MobileIcon } from '@radix-ui/react-icons';
import { Alert, AlertTitle, AlertDescription } from '@repo/ui/components/alert';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Checkbox } from '@repo/ui/components/checkbox';
import CopyButton from '@repo/ui/components/copy-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { PasswordInput } from '@repo/ui/components/password-input';
import { useTranslation } from '@repo/intl/react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import { useNavigate, useRouter } from '@tanstack/react-router';
import {
  Edit,
  Fingerprint,
  Laptop,
  Loader2,
  LogOut,
  Plus,
  QrCode,
  ShieldCheck,
  ShieldOff,
  Trash,
  X,
  Check,
} from 'lucide-react';

import { useState } from 'react';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import { UAParser } from 'ua-parser-js';
import type { AuthClient } from '@repo/auth/client';
import { authClient } from '@/clients/authClient';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { Globe } from 'lucide-react';
import { Badge } from '@repo/ui/components/badge';

export default function UserCard(props: {
  session: AuthClient['$Infer']['Session'] | null;
  activeSessions: AuthClient['$Infer']['Session']['session'][];
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = authClient.useSession();
  const session = data || props.session;
  const [isTerminating, setIsTerminating] = useState<string>();
  const [isPendingTwoFa, setIsPendingTwoFa] = useState<boolean>(false);
  const [twoFaPassword, setTwoFaPassword] = useState<string>('');
  const [twoFactorDialog, setTwoFactorDialog] = useState<boolean>(false);
  const [twoFactorVerifyURI, setTwoFactorVerifyURI] = useState<string>('');
  const [isSignOut, setIsSignOut] = useState<boolean>(false);
  const [emailVerificationPending, setEmailVerificationPending] =
    useState<boolean>(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('USER')}</CardTitle>
        <LanguageSwitch />
      </CardHeader>
      <CardContent className="grid gap-8 grid-cols-1">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex ">
              <AvatarImage
                src={session?.user.image || '#'}
                alt="Avatar"
                className="object-cover"
              />
              <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {session?.user.name}
              </p>
              <p className="text-sm">{session?.user.email}</p>
            </div>
          </div>
          <EditUserDialog />
        </div>

        {session?.user.emailVerified ? null : (
          <Alert>
            <AlertTitle>{t('VERIFY_EMAIL')}</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              {t('VERIFY_EMAIL_DESC')}
            </AlertDescription>
            <Button
              size="sm"
              variant="secondary"
              className="mt-2"
              onClick={async () => {
                await authClient.sendVerificationEmail(
                  {
                    email: session?.user.email || '',
                  },
                  {
                    onRequest(context) {
                      setEmailVerificationPending(true);
                    },
                    onError(context) {
                      toast.error(context.error.message);
                      setEmailVerificationPending(false);
                    },
                    onSuccess() {
                      toast.success('Verification email sent successfully');
                      setEmailVerificationPending(false);
                    },
                  },
                );
              }}
            >
              {emailVerificationPending ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                t('RESEND_VERIFICATION')
              )}
            </Button>
          </Alert>
        )}

        <div className="border-l-2 px-2 w-max gap-1 flex flex-col">
          <p className="text-xs font-medium ">{t('ACTIVE_SESSIONS')}</p>
          {props.activeSessions
            .filter((session) => session.userAgent)
            .map((session) => {
              return (
                <div key={session.id}>
                  <div className="flex items-center gap-2 text-sm  text-black font-medium dark:text-white">
                    {new UAParser(session.userAgent || '').getDevice().type ===
                    'mobile' ? (
                      <MobileIcon />
                    ) : (
                      <Laptop size={16} />
                    )}
                    {new UAParser(session.userAgent || '').getOS().name},{' '}
                    {new UAParser(session.userAgent || '').getBrowser().name}
                    <button
                      className="text-red-500 opacity-80  cursor-pointer text-xs border-muted-foreground border-red-600  underline "
                      onClick={async () => {
                        setIsTerminating(session.id);
                        const res = await authClient.revokeSession({
                          token: session.token,
                        });

                        if (res.error) {
                          toast.error(res.error.message);
                        } else {
                          toast.success('Session terminated successfully');
                        }
                        navigate({ to: '/settings' });
                        setIsTerminating(undefined);
                      }}
                    >
                      {isTerminating === session.id ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : session.id === props.session?.session.id ? (
                        t('SIGN_OUT')
                      ) : (
                        t('TERMINATE')
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="border-y py-4 flex items-center flex-wrap justify-between gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-sm">{t('PASSKEYS')}</p>
            <div className="flex gap-2 flex-wrap">
              <AddPasskey />
              <ListPasskeys />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">{t('TWO_FACTOR')}</p>
            <div className="flex gap-2">
              {!!session?.user.twoFactorEnabled && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <QrCode size={16} />
                      <span className="md:text-sm text-xs">
                        {t('SCAN_QR_CODE')}
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] w-11/12">
                    <DialogHeader>
                      <DialogTitle>{t('SCAN_QR_CODE')}</DialogTitle>
                      <DialogDescription>{t('SCAN_QR_DESC')}</DialogDescription>
                    </DialogHeader>

                    {twoFactorVerifyURI ? (
                      <>
                        <div className="flex items-center justify-center">
                          <QRCode value={twoFactorVerifyURI} />
                        </div>
                        <div className="flex gap-2 items-center justify-center">
                          <p className="text-sm text-muted-foreground">
                            {t('COPY_URI')}
                          </p>
                          <CopyButton textToCopy={twoFactorVerifyURI} />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <PasswordInput
                          value={twoFaPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setTwoFaPassword(e.target.value)
                          }
                          placeholder={t('ENTER_PASSWORD')}
                        />
                        <Button
                          onClick={async () => {
                            if (twoFaPassword.length < 8) {
                              toast.error(
                                'Password must be at least 8 characters',
                              );
                              return;
                            }
                            await authClient.twoFactor.getTotpUri(
                              {
                                password: twoFaPassword,
                              },
                              {
                                onSuccess(context) {
                                  setTwoFactorVerifyURI(context.data.totpURI);
                                },
                              },
                            );
                            setTwoFaPassword('');
                          }}
                        >
                          {t('SHOW_QR_CODE')}
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              )}
              <Dialog open={twoFactorDialog} onOpenChange={setTwoFactorDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant={
                      session?.user.twoFactorEnabled ? 'destructive' : 'outline'
                    }
                    className="gap-2"
                  >
                    {session?.user.twoFactorEnabled ? (
                      <ShieldOff size={16} />
                    ) : (
                      <ShieldCheck size={16} />
                    )}
                    <span className="md:text-sm text-xs">
                      {session?.user.twoFactorEnabled
                        ? t('DISABLE_2FA')
                        : t('ENABLE_2FA')}
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] w-11/12">
                  <DialogHeader>
                    <DialogTitle>
                      {session?.user.twoFactorEnabled
                        ? t('DISABLE_2FA')
                        : t('ENABLE_2FA')}
                    </DialogTitle>
                    <DialogDescription>
                      {session?.user.twoFactorEnabled
                        ? t('DISABLE_2FA_DESC')
                        : t('ENABLE_2FA_DESC')}
                    </DialogDescription>
                  </DialogHeader>

                  {twoFactorVerifyURI ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-center">
                        <QRCode value={twoFactorVerifyURI} />
                      </div>
                      <Label htmlFor="password">{t('SCAN_QR_DESC')}</Label>
                      <Input
                        value={twoFaPassword}
                        onChange={(e) => setTwoFaPassword(e.target.value)}
                        placeholder={t('ENTER_OTP')}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password">{t('PASSWORD')}</Label>
                      <PasswordInput
                        id="password"
                        placeholder={t('PASSWORD')}
                        value={twoFaPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTwoFaPassword(e.target.value)
                        }
                      />
                    </div>
                  )}
                  <DialogFooter>
                    <Button
                      disabled={isPendingTwoFa}
                      onClick={async () => {
                        if (twoFaPassword.length < 8 && !twoFactorVerifyURI) {
                          toast.error('Password must be at least 8 characters');
                          return;
                        }
                        setIsPendingTwoFa(true);
                        if (session?.user.twoFactorEnabled) {
                          const res = await authClient.twoFactor.disable({
                            //@ts-ignore
                            password: twoFaPassword,
                            fetchOptions: {
                              onError(context) {
                                toast.error(context.error.message);
                              },
                              onSuccess() {
                                toast('2FA disabled successfully');
                                setTwoFactorDialog(false);
                              },
                            },
                          });
                        } else {
                          if (twoFactorVerifyURI) {
                            await authClient.twoFactor.verifyTotp({
                              code: twoFaPassword,
                              fetchOptions: {
                                onError(context) {
                                  setIsPendingTwoFa(false);
                                  setTwoFaPassword('');
                                  toast.error(context.error.message);
                                },
                                onSuccess() {
                                  toast('2FA enabled successfully');
                                  setTwoFactorVerifyURI('');
                                  setIsPendingTwoFa(false);
                                  setTwoFaPassword('');
                                  setTwoFactorDialog(false);
                                },
                              },
                            });
                            return;
                          }
                          const res = await authClient.twoFactor.enable({
                            password: twoFaPassword,
                            fetchOptions: {
                              onError(context) {
                                toast.error(context.error.message);
                              },
                              onSuccess(ctx) {
                                setTwoFactorVerifyURI(ctx.data.totpURI);
                              },
                            },
                          });
                        }
                        setIsPendingTwoFa(false);
                        setTwoFaPassword('');
                      }}
                    >
                      {isPendingTwoFa ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : session?.user.twoFactorEnabled ? (
                        t('DISABLE_2FA')
                      ) : (
                        t('ENABLE_2FA')
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2 justify-between items-center">
        <ChangePassword />
        <Button
          className="gap-2 z-10"
          variant="secondary"
          onClick={async () => {
            setIsSignOut(true);
            await authClient.signOut({
              fetchOptions: {
                onSuccess() {
                  navigate({ to: '/' });
                },
              },
            });
            setIsSignOut(false);
          }}
          disabled={isSignOut}
        >
          <span className="text-sm">
            {isSignOut ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <LogOut size={16} />
                {t('SIGN_OUT')}
              </div>
            )}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ChangePassword() {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [signOutDevices, setSignOutDevices] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 z-10" variant="outline" size="sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M2.5 18.5v-1h19v1zm.535-5.973l-.762-.442l.965-1.693h-1.93v-.884h1.93l-.965-1.642l.762-.443L4 9.066l.966-1.643l.761.443l-.965 1.642h1.93v.884h-1.93l.965 1.693l-.762.442L4 10.835zm8 0l-.762-.442l.966-1.693H9.308v-.884h1.93l-.965-1.642l.762-.443L12 9.066l.966-1.643l.761.443l-.965 1.642h1.93v.884h-1.93l.965 1.693l-.762.442L12 10.835zm8 0l-.762-.442l.966-1.693h-1.931v-.884h1.93l-.965-1.642l.762-.443L20 9.066l.966-1.643l.761.443l-.965 1.642h1.93v.884h-1.93l.965 1.693l-.762.442L20 10.835z"
            ></path>
          </svg>
          <span className="text-sm text-muted-foreground">
            {t('CHANGE_PASSWORD')}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-11/12">
        <DialogHeader>
          <DialogTitle>{t('CHANGE_PASSWORD')}</DialogTitle>
          <DialogDescription>{t('CHANGE_PASSWORD_DESC')}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="current-password">{t('CURRENT_PASSWORD')}</Label>
          <PasswordInput
            id="current-password"
            value={currentPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCurrentPassword(e.target.value)
            }
            autoComplete="new-password"
            placeholder={t('PASSWORD')}
          />
          <Label htmlFor="new-password">{t('NEW_PASSWORD')}</Label>
          <PasswordInput
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
            autoComplete="new-password"
            placeholder={t('NEW_PASSWORD')}
          />
          <Label htmlFor="password">{t('CONFIRM_PASSWORD')}</Label>
          <PasswordInput
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            autoComplete="new-password"
            placeholder={t('CONFIRM_PASSWORD')}
          />
          <div className="flex gap-2 items-center">
            <Checkbox
              onCheckedChange={(checked) =>
                checked ? setSignOutDevices(true) : setSignOutDevices(false)
              }
            />
            <p className="text-sm">{t('SIGN_OUT_DEVICES')}</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              if (newPassword !== confirmPassword) {
                toast.error('Passwords do not match');
                return;
              }
              if (newPassword.length < 8) {
                toast.error('Password must be at least 8 characters');
                return;
              }
              setLoading(true);
              const res = await authClient.changePassword({
                newPassword: newPassword,
                currentPassword: currentPassword,
                revokeOtherSessions: signOutDevices,
              });
              setLoading(false);
              if (res.error) {
                toast.error(
                  res.error.message ||
                    "Couldn't change your password! Make sure it's correct",
                );
              } else {
                setOpen(false);
                toast.success('Password changed successfully');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              }
            }}
          >
            {loading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              t('CHANGE_PASSWORD')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditUserDialog() {
  const { t } = useTranslation();
  const { data, isPending, error } = authClient.useSession();
  const [name, setName] = useState<string>();
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2" variant="secondary">
          <Edit size={13} />
          {t('EDIT_USER')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-11/12">
        <DialogHeader>
          <DialogTitle>{t('EDIT_USER')}</DialogTitle>
          <DialogDescription>{t('EDIT_USER_DESC')}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="name">{t('FULL_NAME')}</Label>
          <Input
            id="name"
            type="name"
            placeholder={data?.user.name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="grid gap-2">
            <Label htmlFor="image">{t('PROFILE_IMAGE')}</Label>
            <div className="flex items-end gap-4">
              {imagePreview && (
                <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 w-full">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-muted-foreground"
                />
                {imagePreview && (
                  <X
                    className="cursor-pointer"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await authClient.updateUser({
                image: image ? await convertImageToBase64(image) : undefined,
                name: name ? name : undefined,
                fetchOptions: {
                  onSuccess: () => {
                    toast.success('User updated successfully');
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                  },
                },
              });
              setName('');
              router.invalidate();
              setImage(null);
              setImagePreview(null);
              setIsLoading(false);
              setOpen(false);
            }}
          >
            {isLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              t('UPDATE')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddPasskey() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [passkeyName, setPasskeyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPasskey = async () => {
    if (!passkeyName) {
      toast.error('Passkey name is required');
      return;
    }
    setIsLoading(true);
    const res = await authClient.passkey.addPasskey({
      name: passkeyName,
    });
    if (res?.error) {
      toast.error(res?.error.message);
    } else {
      setIsOpen(false);
      toast.success('Passkey added successfully. You can now use it to login.');
    }
    setIsLoading(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 text-xs md:text-sm">
          <Plus size={15} />
          {t('ADD_NEW_PASSKEY')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-11/12">
        <DialogHeader>
          <DialogTitle>{t('ADD_NEW_PASSKEY')}</DialogTitle>
          <DialogDescription>{t('ADD_PASSKEY_DESC')}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="passkey-name">{t('PASSKEY_NAME')}</Label>
          <Input
            id="passkey-name"
            value={passkeyName}
            onChange={(e) => setPasskeyName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            disabled={isLoading}
            type="submit"
            onClick={handleAddPasskey}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <>
                <Fingerprint className="mr-2 h-4 w-4" />
                {t('CREATE_PASSKEY')}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ListPasskeys() {
  const { t } = useTranslation();
  const { data } = authClient.useListPasskeys();
  const [isOpen, setIsOpen] = useState(false);
  const [passkeyName, setPasskeyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletePasskey, setIsDeletePasskey] = useState<boolean>(false);

  const handleAddPasskey = async () => {
    if (!passkeyName) {
      toast.error('Passkey name is required');
      return;
    }
    setIsLoading(true);
    const res = await authClient.passkey.addPasskey({
      name: passkeyName,
    });
    setIsLoading(false);
    if (res?.error) {
      toast.error(res?.error.message);
    } else {
      toast.success('Passkey added successfully. You can now use it to login.');
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-xs md:text-sm">
          <Fingerprint className="mr-2 h-4 w-4" />
          <span>
            {t('PASSKEYS')} {data?.length ? `[${data?.length}]` : ''}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-11/12">
        <DialogHeader>
          <DialogTitle>{t('PASSKEYS')}</DialogTitle>
          <DialogDescription>{t('LIST_PASSKEYS')}</DialogDescription>
        </DialogHeader>
        {data?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('NAME')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((passkey) => (
                <TableRow
                  key={passkey.id}
                  className="flex  justify-between items-center"
                >
                  <TableCell>{passkey.name || t('NEW_PASSKEY')}</TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={async () => {
                        const res = await authClient.passkey.deletePasskey({
                          id: passkey.id,
                          fetchOptions: {
                            onRequest: () => {
                              setIsDeletePasskey(true);
                            },
                            onSuccess: () => {
                              toast('Passkey deleted successfully');
                              setIsDeletePasskey(false);
                            },
                            onError: (error) => {
                              toast.error(error.error.message);
                              setIsDeletePasskey(false);
                            },
                          },
                        });
                      }}
                    >
                      {isDeletePasskey ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <Trash
                          size={15}
                          className="cursor-pointer text-red-600"
                        />
                      )}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">{t('NO_PASSKEYS')}</p>
        )}
        {!data?.length && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="passkey-name" className="text-sm">
                {t('NEW_PASSKEY')}
              </Label>
              <Input
                id="passkey-name"
                value={passkeyName}
                onChange={(e) => setPasskeyName(e.target.value)}
                placeholder={t('NEW_PASSKEY')}
              />
            </div>
            <Button type="submit" onClick={handleAddPasskey} className="w-full">
              {isLoading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <>
                  <Fingerprint className="mr-2 h-4 w-4" />
                  {t('CREATE_PASSKEY')}
                </>
              )}
            </Button>
          </div>
        )}
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>{t('CLOSE')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LanguageSwitch() {
  const { t, i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe size={16} />
          <span>{t('LANGUAGE')}</span>
          <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
            {i18n.language.toUpperCase()}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => i18n.changeLanguage('en')}
          className="flex justify-between"
        >
          {t('ENGLISH')}
          {i18n.language === 'en' && <Check size={16} />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => i18n.changeLanguage('de')}
          className="flex justify-between"
        >
          {t('GERMAN')}
          {i18n.language === 'de' && <Check size={16} />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
