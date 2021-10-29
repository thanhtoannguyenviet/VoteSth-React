import ApiService from "./apiService";
import {Answer} from "../../models/answer";

export default class AnswerApi {
    public static async listAnswer(): Promise<Answer[]>{
        const apiService = new ApiService()
        const res = await apiService.service.get<Answer[]>("answer/")
        return res.data
    }
    public static async getAnswer(id): Promise<Answer>{
        const apiService = new ApiService()
        const res = await apiService.service.get<Answer>("answer/"+id)
        return res.data
    }
    public static async postAnswer(answer: Answer): Promise<string>{
        const apiService = new ApiService()
        const res = await  apiService.service.post<string>("answer/")
        return res.data
    }
    public static async voteAnswer(id): Promise<string>{
        const apiService = new ApiService()
        const res = await  apiService.service.patch<string>("answer/"+id)
        return res.data
    }
    public static async deleteAnswer(id): Promise<string>{
        const apiService = new ApiService()
        const res = await  apiService.service.delete<string>("answer/"+id)
        return res.data
    }
}