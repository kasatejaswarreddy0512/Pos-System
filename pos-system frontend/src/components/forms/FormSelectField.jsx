import {
    Checkbox,
    FormControl,
    FormHelperText,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
} from '@mui/material';

import { useField } from 'formik';

export default function FormSelectField({
    name,
    label,
    options = [],
    multiple = false,
    ...props
}) {
    const [field, meta, helpers] = useField(name);

    const err = Boolean(meta.touched && meta.error);

    return (
        <FormControl fullWidth error={err}>
            <InputLabel>{label}</InputLabel>

            <Select
                {...props}
                label={label}
                multiple={multiple}
                value={field.value || (multiple ? [] : '')}
                onChange={(e) => helpers.setValue(e.target.value)}
                onBlur={() => helpers.setTouched(true)}
                renderValue={
                    multiple
                        ? (selected) =>
                            options
                                .filter((o) => selected.includes(o.value))
                                .map((o) => o.label)
                                .join(', ')
                        : undefined
                }
            >
                {options.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                        {multiple ? (
                            <Checkbox checked={(field.value || []).includes(o.value)} />
                        ) : null}

                        <ListItemText primary={o.label} />
                    </MenuItem>
                ))}
            </Select>

            {err ? <FormHelperText>{meta.error}</FormHelperText> : null}
        </FormControl>
    );
}