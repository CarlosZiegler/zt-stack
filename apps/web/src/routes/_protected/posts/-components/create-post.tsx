import { trpc } from '@/router';
import FormFieldInfo from '@/routes/-components/common/form-field-info';
import { PlusIcon } from '@radix-ui/react-icons';
import { useTranslation } from '@repo/intl/react';
import { Button } from '@repo/ui/components/button';
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
import { Textarea } from '@repo/ui/components/textarea';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';
import { useState } from 'react';
import { toast } from 'sonner';

import * as z from 'zod';

const FormSchema = z.object({
  title: z.string().min(3, 'Please enter at least 3 characters'),
  content: z.string().min(5, 'Please enter at least 5 characters'),
});

const generateTimestamp = () => +new Date();

export default function CreatePostButton() {
  const { t } = useTranslation();
  const getAllPostsQuery = useQuery(trpc.posts.all.queryOptions());
  const createPostMutation = useMutation(trpc.posts.create.mutationOptions());
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm({
    defaultValues: {
      title: `Post ${generateTimestamp()}`,
      content: `\
The year was 2081, and everybody was finally equal.  
They weren't only equal before God and the law.  
They were equal every which way.  
Nobody was smarter than anybody else.  
Nobody was better looking than anybody else.  
Nobody was stronger or quicker than anybody else.  
All this equality was due to the 211th, 212th, and 213th Amendments to the Constitution,  
and to the unceasing vigilance of agents of the United States Handicapper General.
  `,
    },
    validators: {
      onChange: FormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await createPostMutation.mutateAsync({
          title: value.title,
          content: value.content,
        });
        setOpenDialog(false);
        await getAllPostsQuery.refetch();
        formApi.reset();
        toast.success(t('POST_CREATED_SUCCESS'));
      } catch (error) {
        if (error instanceof TRPCClientError) {
          toast.error(error.message);
        } else {
          toast.error(t('POST_CREATION_ERROR'));
        }
      }
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          {t('CREATE')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] xl:max-w-screen-lg data-[state=open]:slide-in-from-right-1/3 data-[state=closed]:slide-out-to-right-1/3">
        <DialogHeader>
          <DialogTitle>{t('CREATE_POST')}</DialogTitle>
          <DialogDescription>{t('CREATE_POST_DESC')}</DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="title"
              children={(field) => {
                return (
                  <>
                    <Label htmlFor={field.name}>{t('TITLE')}</Label>
                    <Input
                      className="mt-2"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FormFieldInfo field={field} />
                  </>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="content"
              children={(field) => {
                return (
                  <>
                    <Label htmlFor={field.name}>{t('CONTENT')}</Label>
                    <Textarea
                      className="mt-2"
                      rows={8}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FormFieldInfo field={field} />
                  </>
                );
              }}
            />
          </div>
          <DialogFooter>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="mt-3 h-10 w-24"
                >
                  {isSubmitting ? '...' : t('CREATE')}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
