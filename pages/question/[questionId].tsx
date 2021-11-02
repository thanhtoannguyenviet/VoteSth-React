import {useRouter} from 'next/router'
import React, {useEffect, useState} from "react";
import QuestionApi from "../../service/api/questionApi";
import {Button, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import io from 'socket.io-client';
import {Bar} from "react-chartjs-2";
import skconfig from "../../service/skio/skconfig";
import BarChart from "../../components/barchart";
import {BarChartClass, DataBarChart, SetbBckgroundColor} from "../../models/databarchart";
import {Answer} from "../../models/answer";

export default function Index() {
    const [question, setQuestion] = useState(null)
    const [answers, setAnswer] = useState(null)
    const {asPath} = useRouter();
    const socket = io("http://127.0.0.1:8080/", {withCredentials: true})
    const slugKey = asPath.split("/")
    const key = slugKey[slugKey.length - 1]
    const [dataBarChart, setDataBarChart] = useState(null)
    const voteClick = (id:string) =>{
        console.log(id)
        console.log("Clicked")
        socket.emit("vote",id)
    }
    useEffect(() => {
            const serviceQuestion = async () => {
                const res = await QuestionApi.getQuestion(key)
                setQuestion(res)
            }
            const serviceLoadBarChart = (answers: Answer[])=>{
                const labels: string[]=[]
                answers.forEach( item => {
                    labels.push(item.answer)
                })
                console.log("Label:")
                console.log(labels)
                const votes: string[]=[]
                answers.forEach( item => {
                    votes.push(item.vote)
                })

                const data = {
                    labels: labels,
                    datasets: [{
                        label:"Vote",
                        backgroundColor:'#dddddd',
                        data:votes
                    }]}
                console.log("Data")
                console.log(data)
                setDataBarChart(data)
            }
            try {
                serviceQuestion()
                socket.on('connect', sk => {
                    console.log('Client connected')
                    socket.emit("getlistanswer", key)
                })
                console.log(key)
                socket.on('listanswer', (data) => {
                    setAnswer(data)
                    console.log(data)
                    serviceLoadBarChart(data)
                })
                socket.on("connect_error", (err) => {
                    console.log(err);
                });
                console.log("Data : 2")
                console.log(dataBarChart)
            } catch (err) {
                console.log("err:" + err)
            }
        }, [answers]
    )
    return (
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <Typography component="h1" variant="h5">
            {question?.data.question}
        </Typography>
        <Box component="form" noValidate sx={{mt: 1}}>
            {answers?.map((item) => (
                <Button key={item.id} variant="outlined" onClick={()=>voteClick(item.id)}>{item.answer}</Button>
            ))}
        </Box>
            {dataBarChart?(<Bar data={dataBarChart}/>):null}
    </Box>
    )
}