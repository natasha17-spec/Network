import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/UsersReducer";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        debugger
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: '',friend:null}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Follow</option>
                            <option value="false">Unfollow</option>
                        </Field>

                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>

                    </Form>
                )}
            </Formik>
        </div>
    )
})