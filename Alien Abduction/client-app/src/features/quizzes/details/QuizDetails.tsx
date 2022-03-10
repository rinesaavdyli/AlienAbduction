import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import questionStore from '../../../app/stores/questionStore';
import QuizStore from '../../../app/stores/quizStore';
import { store, useStore } from '../../../app/stores/store';
import QuestionDashboard from '../../questions/dashboard/QuestionDashboard';
import QuestionList from '../../questions/dashboard/QuestionList';
import QuestionForm from '../../questions/form/QuestionForm';


export default observer(function QuizDetails() {
    const {quizStore, questionStore} = useStore();
    const {selectedQuiz: quiz, openForm, cancelSelectedQuiz} = quizStore;
    const {loadQuestions} = questionStore;
    const [state, setState] = useState(false);
    

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{quiz?.quizName}</Card.Header>
                <Card.Meta>{quiz?.timer}</Card.Meta>
                <Card.Description>{quiz?.owner}</Card.Description>
            </Card.Content>

            <Card.Content extra >
                <Button.Group width='2' style={{marginLeft: '2px'}}>
                <Button onClick={() => openForm(quiz?.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedQuiz} basic color='grey' content='Cancel' />
                    <Button onClick={() => setState(!state)} content='Show Questions'/>
                    {state && <QuestionList quiz={quizStore.selectedQuiz}/>}
                    {/* <Button postion= "right" onClick= {() =><QuestionList quiz={quizStore.getQuiz(quizStore.quizId!)!}/>} basic color='grey' content='Show Questions' /> */}
                    {/* <Button postion= "right" onClick= {()=>console.log(quizStore.getQuiz(quizStore.quizId!)!)} basic color='grey' content='Show Questions' />  */}
                </Button.Group>    
            </Card.Content>
        </Card>
    )
})