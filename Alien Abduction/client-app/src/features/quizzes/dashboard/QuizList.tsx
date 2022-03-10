import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import QuestionList from '../../questions/dashboard/QuestionList';
import QuestionForm from '../../questions/form/QuestionForm';

export default observer(function QuizList() {
    const {quizStore, questionStore} = useStore();
    const {deleteQuiz, quizzesByQuizName, loading} = quizStore;
    const {selectedQuestion} = questionStore;

    const [target, setTarget] = useState('');

    function handleQuizDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteQuiz(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {quizzesByQuizName.map(quiz => (
                    <Item key = {quiz.id}>
                        <Item.Content>
                            <Item.Header as='a'>{quiz.quizName}</Item.Header>
                            <Item.Meta >{quiz.owner}</Item.Meta>
                            <Item.Description >
                                <div>{quiz.timer}</div>
                            </Item.Description>
                            <Item.Extra>
                            <Button onClick={() => quizStore.selectQuiz(quiz.id)} floated='right' content='View' color='blue' />
                            <Button 
                                    name={quiz.id}
                                    loading={loading && target === quiz.id} 
                                    onClick={(e) => handleQuizDelete(e, quiz.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}

            </Item.Group>
        </Segment>
    )
})