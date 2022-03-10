import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import QuizDetails from '../details/QuizDetails';
import QuizForm from '../form/QuizForm';
import QuizList from './QuizList';

export default observer(function QuizDashboard() {

    const {quizStore} = useStore();
    const {selectedQuiz, editMode} = quizStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <QuizList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedQuiz && !editMode &&
                <QuizDetails />}
                {editMode &&
                <QuizForm />}
            </Grid.Column>
        </Grid>
    )
})