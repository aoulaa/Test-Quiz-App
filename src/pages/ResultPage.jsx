import React from 'react'

import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import { useLocation } from 'react-router-dom'
import { useLoad } from '../hooks/request'
import { RESULT } from '../urls'
import Loader from '../components/common/Loader'


export default function ResultPage() {
    const location = useLocation()
    const data = location.state
    const hey = Object.values(data.answeredQuestions).join('&answers[]=')

    const submitResult = useLoad({ url: RESULT.replace('{id}', `${data.names.quizz}&answers[]=${hey}`) })
    const submitResultList = submitResult.response ? submitResult.response : []
    console.log(submitResultList)

    return (
        <section className={cn('section has-background-danger-light  is-medium', css(styles.section))}>
            <div className={cn('container box', css(styles.container))}>
                <div className="is-centered  is-flex is-flex-direction-column
                is-align-items-center py-6 has-text-centered">
                    <h1 className=" is-size-4-touch is-size-2 mb-4">Thanks {data.names.name} !</h1>
                    {!submitResult.loading ?
                    <div>You responded correctly {submitResultList.correct} out of {submitResultList.total}</div> :
                    <Loader center/>}
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
