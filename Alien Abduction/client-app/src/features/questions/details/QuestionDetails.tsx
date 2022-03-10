import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import QuestionList from '../dashboard/QuestionList';

export default observer( function QuestionDetails() {
    const {questionStore} = useStore();
    const {selectedQuestion: question, openFormQuestion, cancelSelectedQuestion} = questionStore;
    {}

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{question?.questionText}</Card.Header>
                <Card.Description>{question?.answer}</Card.Description>
                <Card.Description>{question?.option}</Card.Description>
            </Card.Content>

            <Card.Content extra >
                <Button.Group width='2' style={{marginLeft: '2px'}}>
                <Button onClick={() => openFormQuestion(question?.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedQuestion} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}) 