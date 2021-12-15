import axios from "axios";
import {connectionData} from "../interfaces/dataInterface";

export const serverAddress = 'localhost:3030'

export const _getAllData = async () =>{
    let result:any = ""
    await axios.get(`http://${serverAddress}/socials`)
        .then((data) => {
            result = data.data
            return data.data
        })
        .catch(err => {
            console.error(`get data error : ${err}`)
            throw err
            result = false
        })
    return result
}

export const _editData = (id:string ,newData:connectionData) => {
    let result:boolean = false
    axios.patch(`http://${serverAddress}/socials/${id}`,{social_id : newData.social_id , social_link : newData.social_link})
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

export const _addData = (data:connectionData)=> {
    let result:boolean = false
    axios.post(`http://${serverAddress}/socials`,{social_id : data.social_id , social_link : data.social_link})
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

export const _deleteData = (id:string) => {
    let result:boolean = false
    axios.delete(`http://${serverAddress}/socials/${id}`)
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