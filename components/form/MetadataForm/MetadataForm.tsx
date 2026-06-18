import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Column } from '@/components/ui';
import type { TxKey } from '@/i18n/types';
import {
  createVideoMetadataSchema,
  DESCRIPTION_MAX,
  NAME_MAX,
  type VideoMetadata,
} from '@/lib/validation/videoSchema';
import { ControlledInput } from './ControlledInput';

export type MetadataFormValues = {
  name: string;
  description: string;
};

export type MetadataFormProps = {
  defaultValues?: Partial<MetadataFormValues>;
  submitTx: TxKey;
  onSubmit: (values: MetadataFormValues) => void;
  isSubmitting?: boolean;
};

export function MetadataForm({
  defaultValues,
  submitTx,
  onSubmit,
  isSubmitting = false,
}: MetadataFormProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createVideoMetadataSchema(t), [t]);

  const { control, handleSubmit, watch } = useForm<VideoMetadata>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
    },
  });

  const descriptionValue = watch('description') ?? '';

  const submit = handleSubmit((values) => {
    onSubmit({
      name: values.name.trim(),
      description: (values.description ?? '').trim(),
    });
  });

  return (
    <Column className="gap-4">
      <ControlledInput
        control={control}
        name="name"
        labelTx="form.nameLabel"
        placeholderTx="form.namePlaceholder"
        required
        maxLength={NAME_MAX}
        returnKeyType="next"
      />
      <ControlledInput
        control={control}
        name="description"
        labelTx="form.descriptionLabel"
        placeholderTx="form.descriptionPlaceholder"
        multiline
        maxLength={DESCRIPTION_MAX}
        helperText={`${descriptionValue.length}/${DESCRIPTION_MAX}`}
      />
      <Button
        tx={submitTx}
        onPress={submit}
        loading={isSubmitting}
        disabled={isSubmitting}
      />
    </Column>
  );
}
