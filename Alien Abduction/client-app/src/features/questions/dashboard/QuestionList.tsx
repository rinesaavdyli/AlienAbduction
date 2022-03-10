import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Id } from 'react-toastify';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Quiz } from '../../../app/models/quiz';
import { useStore } from '../../../app/stores/store';

interface Props {
    quiz: Quiz | undefined;
}
export default observer(function QuestionList({quiz} : Props) {
    const {questionStore} = useStore();
    const {deleteQuestion, questionsByQuestionText, loading} = questionStore;

    const [target, setTarget] = useState('');

    function handleQuestionDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteQuestion(id);
    }
    return (
        < >
            <Item.Group divided>
                {questionsByQuestionText.map(question => {
                    {question.quiziId=== quiz?.id ? (
                    <Item key = {question.id}>
                        <Item.Content>
                            <Item.Header as='a'>{question.questionText}</Item.Header>
                            <Item.Description >
                                <div style={{color: 'green'}}>{question.answer}</div>
                            </Item.Description>
                            <Item.Description >
                                <div style={{color: 'red'}}>{question.option}</div>
                            </Item.Description>
                            <Item.Extra>
                            <Button onClick={() => questionStore.selectQuestion(question.id)} floated='right' content='Edit' color='blue' />
                            <Button 
                                    name={question.id}
                                    loading={loading && target === question.id} 
                                    onClick={(e) => handleQuestionDelete(e, question.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                            </Item.Extra>
                        </Item.Content>
                        </Item>
                    ) : (console.log(question.quiziId + " ---------------- "+quiz?.id))}
                    
                    // if(question.quiziId === quiz?.id){
                    //     console.log(question.id);
                    // <Item key = {(question.id)}>
                        
                    
                    })}

            </Item.Group>
        </>
    )
})