'use client';

import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { authClient } from '@/clients/authClient';
import { AlertCircle, CheckCircle2, Mail } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from '@repo/intl/react';

export default function Component() {
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  // In a real app, this email would come from your authentication context
  const userEmail = 'user@example.com';

  const requestOTP = async () => {
    const res = await authClient.twoFactor.sendOtp();
    // In a real app, this would call your backend API to send the OTP
    setMessage(t('OTP_SENT'));
    setIsError(false);
    setIsOtpSent(true);
  };
  const router = useRouter();

  const validateOTP = async () => {
    const res = await authClient.twoFactor.verifyOtp({
      code: otp,
    });
    if (res.data) {
      setMessage(t('OTP_VALIDATED'));
      setIsError(false);
      setIsValidated(true);
      router.navigate({ to: '/' });
    } else {
      setIsError(true);
      setMessage(t('INVALID_OTP'));
    }
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{t('TWO_FACTOR_AUTH')}</CardTitle>
          <CardDescription>{t('VERIFY_IDENTITY')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {!isOtpSent ? (
              <Button onClick={requestOTP} className="w-full">
                <Mail className="mr-2 h-4 w-4" /> {t('SEND_OTP_EMAIL')}
              </Button>
            ) : (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="otp">{t('ONE_TIME_PASSWORD')}</Label>
                  <Label className="py-2">
                    {t('CHECK_EMAIL_OTP')} {userEmail}
                  </Label>
                  <Input
                    id="otp"
                    placeholder={t('ENTER_6_DIGIT')}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <Button
                  onClick={validateOTP}
                  disabled={otp.length !== 6 || isValidated}
                >
                  {t('VALIDATE_OTP')}
                </Button>
              </>
            )}
          </div>
          {message && (
            <div
              className={`flex items-center gap-2 mt-4 ${
                isError ? 'text-red-500' : 'text-primary'
              }`}
            >
              {isError ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              <p className="text-sm">{message}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
