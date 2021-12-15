import axios from "axios";
import {connectionData} from "../interfaces/dataInterface";

export const getAllData = () =>{
    axios.get('http://localhost:3030/socials')
        .then((data) => {
            console.log(data.data)
            return true
        })
        .catch(err => {
            console.error(`get data error : ${err}`)
            return false
        })
}

export const editData = (id:string ,newData:connectionData) => {
    axios.patch(`http://localhost:3030/socials/${id}`,{social_id : newData.social_id , social_link : newData.social_link})
        .then(data => {
            console.log(data.data)
            return true
        })
        .catch(err => {
            console.error(`edit data error : ${err}`)
            return false
        })
}

export const addData = (data:connectionData)=> {
    axios.post('http://localhost:3030/socials',{social_id : data.social_id , social_link : data.social_link})
        .then(data => {
            console.log(data.data)
            return true
        })
        .catch(err => {
            console.error(`add data error : ${err}`)
            return false
        })
}

export const deleteData = (id:string) => {
    axios.delete(`http://localhost:3030/socials/${id}`)
        .then(data => {
            console.log(data.data)
            return true
        })
        .catch(err => {
            console.error(`delete data error : ${err}`)
            return false
        })
}