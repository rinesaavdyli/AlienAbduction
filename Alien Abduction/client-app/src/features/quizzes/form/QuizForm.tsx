import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import questionStore from '../../../app/stores/questionStore';
import { useStore } from '../../../app/stores/store';
import QuestionForm from '../../questions/form/QuestionForm';

export default observer(function QuizForm() {
    const {quizStore, questionStore} = useStore();
    const {selectedQuiz, closeForm, createQuiz, updateQuiz, loading, } = quizStore;
    const {openFormQuestion} = questionStore;

    const initialState = selectedQuiz ?? {
        id:'',
        quizName:'',
        timer: 0,
        owner: ''
    }

    const [quiz, setQuiz] = useState(initialState);

    function handleSubmit() {
        quiz.id ? updateQuiz(quiz) : createQuiz(quiz);
       
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setQuiz({...quiz, [name]: value}
        )
    }

    return (
        <Segment clearing  >
            <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input placeholder='Quiz Name' value={quiz.quizName} name='quizName' onChange={handleInputChange} />
                <Form.Input placeholder='Timer' value={quiz.timer} name='timer' onChange={handleInputChange} />
                <Form.Input placeholder='Owner' value={quiz.owner} name='owner' onChange={handleInputChange} />
                <Button onClick={() => handleSubmit()} loading={loading} floated='right' positive type='button'  content='Save Quiz' />
                <Button onClick={() => openFormQuestion()}loading={loading} floated='right' positive type='button'  content='Add Questions' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})