import { createContext, useContext } from "react";
import QuestionStore from "./questionStore";
import QuizStore from "./quizStore";

interface Store {
    quizStore: QuizStore,
    questionStore: QuestionStore
}

export const store: Store = {
    questionStore: new QuestionStore(),
    quizStore: new QuizStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}