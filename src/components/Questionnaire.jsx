import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import { useLoad } from '../hooks/request'
import { ANSWER } from '../urls'
import Loader from './common/Loader'

export default function Questionnaire({answeredQuestions, setAnsweredQuestions, title, questionId, answerId }) {
    const answer = useLoad({ url: ANSWER.replace('{id}', `${questionId}&questionId=${answerId}`) })
    const answerList = answer.response ? answer.response : []
    const [open, setOpen] = useState()

    const onClick = (data) => {
        setAnsweredQuestions({ ...answeredQuestions, [data[0]]: data[1] })
        setOpen(data[1])
    }
    return (
        !answer.loading ? <>
            <h1 className=" is-size-4-touch is-size-3">{title}</h1>
            <div className={cn('columns is-multiline custom-boxes-container '
                + 'is-centered  mt-5 pb-4',
            css(styles.main))}>
                {answerList.map((answers) => (
                    <div
              id={"id" + answers.id}
              key={answers.id}
              className={`column answer-box box mx-1 is-clickable is-5 ${open === answers.id ? "is-active": ""}`}
              onClick={() => onClick([answerId, answers.id])}>{answers.title}</div>
                ))}
            </div>
        </> : <><Loader center large /></>

    )
}

const styles = StyleSheet.create({
    main: {
        '@media(max-width: 767px)': {
            flexDirection: 'column',
            display: 'flex',
        },
    },

})
