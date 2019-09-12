import axios from 'axios';
import Constants from 'expo-constants';
const { manifest } = Constants;

// Set Address
const PORT = "8080";
const URL = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(":"+PORT)
    : `localhost`.concat(":"+PORT);

// Set base function to use below
const base = axios.create({
    baseURL: `http://${URL}`,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Functions to communicate with server
export const getAllCollections = () => {
    return base.get("/collection/all").then(r => r.data).catch(e => e);
};

export const getCollectionById = (collectionId) => {
    return base.get(`/collection/${collectionId}`).then(r => r.data).catch(e => e);
};

export const addCollection = (collection) => {
    return base.post(`/collection`, collection).then(r => r.data).catch(e => e);
};

export const deleteCollection = (collectionId) => {
    return base.delete(`/collection/${collectionId}`).then(r => r.data).catch(e => e);
};

export const getQuestionById = (questionId) => {
    return base.get(`/question/${questionId}`).then(r => r.data).catch(e => e);
};

export const addQuestion = (question) => {
    let q_url = null;
    if (question.choices.length !== 0){
        if (question.answer){
            q_url = "aq"
        } else {
            q_url = "sq"
        }
    } else {
        q_url = "cq"
    }
    return base.post(`/${q_url}`, question).then(r => r.data).catch(e => e);
};

export const addQuestionToCollection = (collectionId, questionId) => {
    return base.post(`/collection/addQuestion`, null, { params: {
            collectionId,
            questionId
        }}).then(r => r.data).catch(e => e);
};

export const deleteQuestion = (questionId) => {
    return base.delete(`/question/${questionId}`).then(r => r.data).catch(e => e);
};

export const incrementAnswer = (questionId, answer) => {
    return base.post(`/question/incrementAnswer`, null, { params: {
            questionId,
            answer
        }}).then(r => r.data).catch(e => e);
};

