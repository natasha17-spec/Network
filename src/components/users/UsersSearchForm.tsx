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
type FormType = {
    term: string
    friend: "true" | "false" | "null"
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true"
                ? true : false
        }
        debugger
        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: '', friend: "null"}}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Friends</option>
                            <option value="false">Not friends</option>
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