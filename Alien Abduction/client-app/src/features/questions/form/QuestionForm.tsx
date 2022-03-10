import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import QuestionStore from '../../../app/stores/questionStore';
import quizStore from '../../../app/stores/quizStore';
import { useStore } from '../../../app/stores/store';

export default observer(function QuestionForm() {
    const {questionStore, quizStore} = useStore();
    
    const {selectedQuestion, closeForm, createQuestion, updateQuestion, loading} = questionStore;

    const initialState = selectedQuestion ?? {
        id:'',
        questionText:'',
        answer: '',
        option: '',
        quiziId: ''
    }

    const [question, setQuestion] = useState(initialState);

    function handleSubmit() {
        question.id ? updateQuestion(question) : createQuestion(question);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setQuestion({...question, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input placeholder='Question' value={question.questionText} name='questionText' onChange={handleInputChange} />
                <Form.TextArea placeholder='Answer' value={question.answer} name='answer' onChange={handleInputChange} />
                <Form.Input placeholder='Option' value={question.option} name='option' onChange={handleInputChange} />
                <Form.Input placeholder='QuiziId' value={quizStore.quizId!} name='quiziId' defaultValue={quizStore.quizId!} type='hidden' />
                <Button loading={loading} floated='right' positive type='submit' onClick={()=>{question.quiziId = quizStore.quizId!}}  content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
