import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Quiz } from "../models/quiz";
import { v4 as uuid } from 'uuid';

export default class QuizStore {
    quizRegistry = new Map<string, Quiz>();
    selectedQuiz: Quiz | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }
    get quizId() {
        return this.selectedQuiz?.id;
    }

    public getQuiz = (id: string) => {
        return this.quizRegistry.get(id);
    }
    get quizzesByQuizName() {
        return Array.from(this.quizRegistry.values()).sort((a, b) => (a.quizName.localeCompare(b.quizName))
        )
    }

    loadQuizzes = async () => {
        try {
            const quizzes = await agent.Quizzes.list();
            quizzes.forEach(quiz => {
                quiz.quizName = quiz.quizName;
                this.quizRegistry.set(quiz.id, quiz);
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

    selectQuiz = (id: string) => {
        this.selectedQuiz= this.quizRegistry.get(id);
    }

    cancelSelectedQuiz = () => {
        this.selectedQuiz = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectQuiz(id) : this.cancelSelectedQuiz();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createQuiz = async (quiz: Quiz) => {
        this.loading = true;
        quiz.id = uuid();
        try {
            await agent.Quizzes.create(quiz);
            runInAction(() => {
                this.quizRegistry.set(quiz.id, quiz);
                this.selectedQuiz = quiz;
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

    updateQuiz = async (quiz: Quiz) => {
        this.loading = true;
        try {
            await agent.Quizzes.update(quiz);
            runInAction(() => {
                this.quizRegistry.set(quiz.id, quiz);
                this.selectedQuiz = quiz;
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

    deleteQuiz = async (id: string) => {
        this.loading = true;
        try {
            await agent.Quizzes.delete(id);
            runInAction(() => {
                this.quizRegistry.delete(id);
                if (this.selectedQuiz?.id === id) this.cancelSelectedQuiz();
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