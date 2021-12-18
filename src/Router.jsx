import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import BaseContextWrapper from './components/common/BaseContext'
import Home from './pages/Home'
import QuestionPage from './pages/QuestionPage'
import ResultPage from './pages/ResultPage'

export default function App() {
    return (
        <BrowserRouter>
            <BaseContextWrapper>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/QuestionPage" component={QuestionPage} exact />
                    <Route path="/ResultPage" component={ResultPage} exact />
                </Switch>
            </BaseContextWrapper>
        </BrowserRouter>
    )
}
