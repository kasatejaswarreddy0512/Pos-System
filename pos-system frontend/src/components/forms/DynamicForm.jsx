import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
} from '@mui/material';

import { Form, Formik } from 'formik';
import FormSelectField from './FormSelectField.jsx';
import FormTextField from './FormTextField.jsx';

export default function DynamicForm({
    open,
    title,
    fields,
    initialValues,
    validationSchema,
    onClose,
    onSubmit,
    submitLabel = 'Save',
    loading,
}) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <DialogTitle>{title}</DialogTitle>

                        <DialogContent dividers>
                            <Grid container spacing={2} sx={{ pt: 1 }}>
                                {fields.map((f) => (
                                    <Grid
                                        item
                                        xs={12}
                                        md={f.fullWidth ? 12 : 6}
                                        key={f.name}
                                    >
                                        {f.type === 'select' ||
                                            f.type === 'multi-select' ? (
                                            <FormSelectField
                                                name={f.name}
                                                label={f.label}
                                                options={f.options || []}
                                                multiple={f.type === 'multi-select'}
                                            />
                                        ) : (
                                            <FormTextField
                                                name={f.name}
                                                label={f.label}
                                                type={f.type || 'text'}
                                                multiline={f.multiline}
                                                rows={f.rows}
                                            />
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        </DialogContent>

                        <DialogActions sx={{ px: 3, py: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={onClose}
                                disabled={loading || isSubmitting}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading || isSubmitting}
                            >
                                {loading || isSubmitting ? 'Saving...' : submitLabel}
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}