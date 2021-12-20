import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { css, StyleSheet } from 'aphrodite'
import cn from 'classnames'
import { useLoad } from '../hooks/request'
import { QUESTION } from '../urls'
import Button from '../components/common/Button'
import Questionnaire from '../components/Questionnaire'
import Loader from '../components/common/Loader'
import Progress from '../components/common/Progress'
import { useMessage } from '../hooks/message'

export default function QuestionPage() {
    const location = useLocation()
    const history = useHistory()
    const [showMessage] = useMessage()

    const names = location.state
    const question = useLoad({ url: QUESTION.replace('{id}', names.quizz) })
    const questionList = question.response ? question.response : []
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answeredQuestions, setAnsweredQuestions] = useState({})
    const answerButtonClick = () => {
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questionList.length) {
            if (questionList[currentQuestion]?.id in answeredQuestions) {
                setCurrentQuestion(nextQuestion)
            } else {
                showMessage('Please answer current question to go to next one!', 'is-danger')
            }
        } else {
            history.push(
             {
                pathname: 'ResultPage',
                state: {
                    'names': names,
                    'answeredQuestions': answeredQuestions,
                },
            },)
        }
    }
    return (
        <section className={cn('section is-medium', css(styles.section))}>
            <div className={cn("container has-text-centered box", css(styles.container))}>
                {!question.loading ? <Questionnaire
                    key={questionList[currentQuestion]?.id}
                    title={questionList[currentQuestion]?.title}
                    answerId={questionList[currentQuestion]?.id}
                    questionId={names.quizz}
                    setAnsweredQuestions={setAnsweredQuestions}
                    answeredQuestions={answeredQuestions}/> : <Loader large center />}
                <div className="columns is-centered">
                    <div className="column is-4">
                        <Progress value={currentQuestion}
                                  max={questionList.length}
                                  text={`${currentQuestion} / ${questionList?.length}`} />
                        <Button
                            className="mt-2 is-size-6-touch is-blue is-medium is-fullwidth"
                            text="Next"
                            onClick={answerButtonClick}
                        />
                    </div>
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
    },
    main: {
        '@media(max-width: 767px)': {
            flexDirection: 'column',
            display: 'flex',
        },
    },

})
