import {Answer} from "./answer";

export interface DataBarChart{
    labels: string[]
    datasets: [{
        label:"Vote",
        backgroundColor:string[],
        data:string[]
    }],
}
export class BarChartClass{
    DataBarChart: DataBarChart
    constructor(answer:Answer[]){
        this.DataBarChart.labels = SetLabels(answer)
        this.DataBarChart.datasets[0].backgroundColor= SetBackgroundColor(answer)
        this.DataBarChart.datasets[0].data = SetData(answer)
    }

}
function SetLabels(answers:Answer[]):string[]{
    const labels: string[]=[]
    answers.forEach( item => {
        labels.push(item.answer)
    })
    return labels
}
export function SetBackgroundColor(answers:Answer[]):string[]{
    const colors: string[]=[]
    answers.forEach( item => {
        colors.push('rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')')
    })
    return colors
}
function SetData(answers:Answer[]):string[]{
    const votes: string[]=[]
    answers.forEach( item => {
        votes.push(item.vote)
    })
    return votes
}