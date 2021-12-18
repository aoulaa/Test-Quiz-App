import { getEnv } from './utils/environment'
export const CATEGORY = '/test-quiz.php?action=quizzes'
export const QUESTION = '/test-quiz.php?action=questions&quizId={id}'
export const ANSWER = '/test-quiz.php?action=answers&quizId={id}'
export const RESULT = '/test-quiz.php?action=submit&quizId={id}'

const backendUrl = process.env.REACT_APP_BASE_URL || `${window.location.protocol}//${window.location.hostname}`
export const domain = backendUrl.endsWith('/') ? backendUrl.substr(0, backendUrl.length - 1) : backendUrl

// eslint-disable-next-line no-nested-ternary
const frontUrl = getEnv() === 'production'
    ? (
        ''
    ) : getEnv() === 'staging' ? (
        ''
    ) : 'http://localhost:3000'

export const frontDomain = frontUrl.endsWith('/') ? frontUrl.substr(0, frontUrl.length - 1) : frontUrl
