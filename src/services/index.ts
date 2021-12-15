import axios from "axios";
import {connectionData} from "../interfaces/dataInterface";

export const getAllData = async () =>{
    let result:any = ""
    await axios.get('http://localhost:3030/socials')
        .then((data) => {
            result = data.data
            return data.data
        })
        .catch(err => {
            console.error(`get data error : ${err}`)
            result = false
        })
    return result
}

export const editData = (id:string ,newData:connectionData) => {
    let result:boolean = false
    axios.patch(`http://localhost:3030/socials/${id}`,{social_id : newData.social_id , social_link : newData.social_link})
        .then(data => {
            console.log(data.data)
            result = true
        })
        .catch(err => {
            console.error(`edit data error : ${err}`)
            result = false
        })
    return result
}

export const addData = (data:connectionData)=> {
    let result:boolean = false
    axios.post('http://localhost:3030/socials',{social_id : data.social_id , social_link : data.social_link})
        .then(data => {
            console.log(data.data)
            result = true
        })
        .catch(err => {
            console.error(`add data error : ${err}`)
            result = false
        })
    return result
}

export const deleteData = (id:string) => {
    let result:boolean = false
    axios.delete(`http://localhost:3030/socials/${id}`)
        .then(data => {
            console.log(data.data)
            result=true
        })
        .catch(err => {
            console.error(`delete data error : ${err}`)
            result = false
        })
    return result
}