import  axios from '../utils/CustomizeAxios';

const createUserService = (email, username, password, role, image ) =>{
    const FormData = require('form-data');
    const form = new FormData();
    form.append('email', email);
    form.append('username', username);
    form.append('password', password);
    form.append('role', role);
    form.append('userImage', image);
    return axios.post('api/v1/register', form)

}
const GetAllUser = () =>{
    return axios.get('api/v1/participant/all')
}
const GetAllUserPaginate = (page, limit) =>{
    console.log('limit', limit)
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
const putUpdatedate = (id, username, password) =>{
    const FormData = require('form-data');
    const form = new FormData();
    form.append('username', username);
    form.append('id', id);
    form.append('password', password);
    return axios.put('api/v1/participant', form)
}
const deleteUser = (userID) =>{
    return axios.delete('api/v1/participant', {data:{id:userID}})
}


const loginUser = (email, password) =>{
    const FormData = require('form-data');
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    return axios.post('/api/v1/login', form)
}


const GetQuizByUser = () => {
    return axios.get('api/v1/quiz/all');
}


const GetQuestionByIdQuiz = (id) => {
    console.log("tr", id)
    // console.log("is", id)
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
    
} 
const postSubmitQuiz = (data) => {
     return axios.post('/api/v1/quiz-submit', {...data});
    
} 
const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
    console.log("imagegfvvb", quizImage)
    const FormData = require('form-data');
    const form = new FormData();
    form.append('description', description);
    form.append('name', name);
    form.append('difficulty', difficulty);
    form.append('quizImage', quizImage);
    return axios.post('/api/v1/quiz', form);
    
} 
export {createUserService, GetAllUser, putUpdatedate, deleteUser,GetAllUserPaginate, loginUser, GetQuizByUser, GetQuestionByIdQuiz,postSubmitQuiz,postCreateNewQuiz};