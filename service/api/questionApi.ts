import {Question} from "../../models/question";
import ApiService from "./apiService";

export default class QuestionApi{
    public static async listQuestion(): Promise<Question[]>{
        const apiService = new ApiService()
        const res = await apiService.service.get<Question[]>("question/")
        return res.data
    }
    public static async getQuestion(id): Promise<Question>{
        const apiService = new ApiService()
        const res = await apiService.service.get<Question>("question/"+id)
        console.log(res.data)
        return res.data
    }
    public static async postQuestion(question: Question): Promise<string>{
        const apiService = new ApiService()
        const res = await  apiService.service.post<string>("question/")
        return res.data
    }

    public static async deleteAnswer(id): Promise<string>{
        const apiService = new ApiService()
        const res = await  apiService.service.delete<string>("question/"+id)
        return res.data
    }
}