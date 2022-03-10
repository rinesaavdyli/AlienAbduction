import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Quiz } from '../../../app/models/quiz';
import quizStore from '../../../app/stores/quizStore';
import { useStore } from '../../../app/stores/store';
import QuestionForm from '../form/QuestionForm';
import QuestionList from './QuestionList';



export default observer(function QuestionDashboard() {

    const {questionStore, quizStore} = useStore();
    const {selectedQuestion, editMode} = questionStore;
    const {getQuiz} = quizStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                {/* <QuestionList quiz={quizStore.selectedQuiz}/> */}
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedQuestion && !editMode }
                {editMode &&
                <QuestionForm />}
            </Grid.Column>
        </Grid>
    )
})