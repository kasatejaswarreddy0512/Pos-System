import { TextField } from '@mui/material';
import { useField } from 'formik';

export default function FormTextField({
    name,
    label,
    type = 'text',
    multiline = false,
    rows = 3,
    ...props
}) {
    const [field, meta] = useField(name);

    const err = Boolean(meta.touched && meta.error);

    return (
        <TextField
            {...field}
            {...props}
            fullWidth
            type={type}
            label={label}
            multiline={multiline}
            rows={multiline ? rows : undefined}
            error={err}
            helperText={err ? meta.error : props.helperText}
        />
    );
}