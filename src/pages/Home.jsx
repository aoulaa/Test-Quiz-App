import React from 'react'
import { Form, Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import { required } from '../utils/validators'

import { useLoad } from '../hooks/request'
import { CATEGORY } from '../urls'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Select from '../components/common/Select'

export default function Home() {
    const quizzCategory = useLoad({ url: CATEGORY })
    const categoryList = quizzCategory.response ? quizzCategory.response : []
    const history = useHistory()
    async function onSubmit(data) {
        history.push(
            {
                pathname: 'QuestionPage',
                state: data,
            },
        )
    }

    return (
        <section className={cn('section is-medium', css(styles.section))}>
            <div className={cn('container box', css(styles.container))}>
                <div className="is-centered  is-flex is-flex-direction-column
                is-align-items-center py-6 has-text-centered">
                    <h1 className=" is-size-4-touch is-size-2 mb-4">Technical Test</h1>
                    <Formik onSubmit={onSubmit} initialValues={{ name: '', quizz: '' }}>
                        <Form>
                            <Input name="name"
                                validate={required}
                                placeholder="Enter your name" />
                            <Select name="quizz"
                                empty
                                loading={quizzCategory.loading}
                                emptyMessage="Choose test"
                                validate={required}
                                options={categoryList.map((item) => ({ id: item.id, name: item.title }))}
                            />
                            <div className="field">
                                <div className="control">
                                    <Button
                                        className="is-primary is-size-6-touch is-blue is-medium is-fullwidth"
                                        text="Start"
                                        type="submit" />
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </section>
    )
}

const styles = StyleSheet.create({
    section: {
        height: '100vh',
    },
    container: {
        maxWidth: 600,
    },
    header: {
        fontSize: 50,

    },
})
