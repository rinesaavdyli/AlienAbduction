import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Question } from "../models/question";
import { v4 as uuid } from 'uuid';

export default class QuestionStore {
    questionRegistry = new Map<string, Question>();
    selectedQuestion: Question | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get questionsByQuestionText() {
        return Array.from(this.questionRegistry.values()).sort((a, b) => (a.questionText.localeCompare(b.questionText))
        )
    }

    loadQuestions = async () => {
        try {
            const questions = await agent.Questions.list();
            questions.forEach(question => {
                question.questionText = question.questionText;
                this.questionRegistry.set(question.id, question);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectQuestion = (id: string) => {
        this.selectedQuestion= this.questionRegistry.get(id);
    }

    cancelSelectedQuestion = () => {
        this.selectedQuestion = undefined;
    }

    openFormQuestion = (id?: string) => {
        id ? this.selectQuestion(id) : this.cancelSelectedQuestion();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createQuestion = async (question: Question) => {
        this.loading = true;
        question.id = uuid();
        try {
            await agent.Questions.create(question);
            runInAction(() => {
                this.questionRegistry.set(question.id, question);
                this.selectedQuestion = question;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateQuestion = async (question: Question) => {
        this.loading = true;
        try {
            await agent.Questions.update(question);
            runInAction(() => {
                this.questionRegistry.set(question.id, question);
                this.selectedQuestion = question;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteQuestion = async (id: string) => {
        this.loading = true;
        try {
            await agent.Questions.delete(id);
            runInAction(() => {
                this.questionRegistry.delete(id);
                if (this.selectedQuestion?.id === id) this.cancelSelectedQuestion();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}