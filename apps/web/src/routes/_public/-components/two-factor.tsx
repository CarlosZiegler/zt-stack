'use client';

import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { authClient } from '@/clients/authClient';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from '@repo/intl/react';

export default function Component() {
  const { t } = useTranslation();
  const [totpCode, setTotpCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totpCode.length !== 6 || !/^\d+$/.test(totpCode)) {
      setError(t('TOTP_ERROR'));
      return;
    }
    authClient.twoFactor
      .verifyTotp({
        code: totpCode,
      })
      .then((res) => {
        if (res.data?.token) {
          setSuccess(true);
          setError('');
        } else {
          setError(t('INVALID_OTP'));
        }
      });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{t('TOTP_VERIFICATION')}</CardTitle>
          <CardDescription>{t('ENTER_TOTP')}</CardDescription>
        </CardHeader>
        <CardContent>
          {!success ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="totp">{t('TOTP_CODE')}</Label>
                <Input
                  id="totp"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  placeholder={t('ENTER_6_DIGIT_CODE')}
                  required
                />
              </div>
              {error && (
                <div className="flex items-center mt-2 text-red-500">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <Button type="submit" className="w-full mt-4">
                {t('VERIFY')}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <p className="text-lg font-semibold">
                {t('VERIFICATION_SUCCESSFUL')}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground gap-2">
          <Link to="/two-factor/otp">
            <Button variant="link" size="sm">
              {t('SWITCH_EMAIL_VERIFICATION')}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
