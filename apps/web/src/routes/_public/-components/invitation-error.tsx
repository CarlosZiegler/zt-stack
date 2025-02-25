import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { AlertCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from '@repo/intl/react';

export function InvitationError() {
  const { t } = useTranslation();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-6 h-6 text-destructive" />
          <CardTitle className="text-xl text-destructive">
            {t('INVITATION_ERROR')}
          </CardTitle>
        </div>
        <CardDescription>{t('INVITATION_ERROR_DESC')}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          {t('INVITATION_ERROR_MESSAGE')}
        </p>
      </CardContent>
      <CardFooter>
        <Link to="/" className="w-full">
          <Button variant="outline" className="w-full">
            {t('GO_HOME')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
