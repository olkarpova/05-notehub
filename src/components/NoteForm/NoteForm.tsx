import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";
import css from "./NoteForm.module.css"
import { noteValidationSchema } from "./validationSchema";

interface NoteFormProps {
    onSubmit: (values: NoteFormValues) => void;
    onCancel: () => void;
}

export interface NoteFormValues {
    title: string,
    content: string,
    tag: string,
}
const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
}

export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
    
    const handleSubmit = (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
        onSubmit(values);
        actions.resetForm();
        actions.setSubmitting(false);
    }
    
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={noteValidationSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting, isValid, dirty }) => (
               <Form className={css.form}>
                {/* <fieldset className={css.fieldset}> */}
                    <div className={css.formGroup}>
                        <label htmlFor="title">Title</label>
                        <Field
                            id="title"
                            type="text"
                            name="title"
                            className={css.input}
                        />
                        <ErrorMessage name="title" component='span' className={css.error} />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="content">Content</label>
                        <Field
                            as='textarea'
                            id="content"
                            name="content"
                            rows={8}
                            className={css.textarea}
                        />
                        <ErrorMessage name="content" component="span" className={css.error} />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="tag">Tag</label>
                        <Field as="select" id="tag" name="tag" className={css.select}>
                            <option value="Todo">Todo</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                        </Field>
                        <ErrorMessage name="tag" component="span" className={css.error} />
                    </div>
                {/* </fieldset> */}
            
                <div className={css.actions}>
                    <button
                        type="button"
                        className={css.cancelButton}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        // disabled={false}
                        disabled={isSubmitting || !isValid || !dirty}
                    >
                        Create note
                    </button>
                </div>
            </Form> 
            )}
        </Formik>
    );
}