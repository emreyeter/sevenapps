import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { Input, type InputProps } from '@/components/ui';

type ControlledInputProps<T extends FieldValues> = Omit<
  InputProps,
  'value' | 'onChangeText' | 'error'
> & {
  control: Control<T>;
  name: Path<T>;
};

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <Input
          value={value as string}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
}
