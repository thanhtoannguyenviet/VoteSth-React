import {useRouter} from 'next/router'
import React, {useCallback, useEffect, useState} from "react";
import QuestionApi from "../../service/api/questionApi";
import {Button, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import io from 'socket.io-client';
import {Bar} from "react-chartjs-2";
import {Answer} from "../../models/answer";

export default function QuestionPage() {
    const [question, setQuestion] = useState(null)
    const [answers, setAnswer] = useState(null)
    const socket = io("http://127.0.0.1:8080/", {withCredentials: true})

    // const {asPath} = useRouter();
    // const slugKey = asPath.split("/")
    // const key = slugKey[slugKey.length - 1]
    const router = useRouter()
    const questionId = router.query.questionId.toString() as string

    const [dataBarChart, setDataBarChart] = useState(null)
    const voteClick = useCallback((id: string) => {
        socket.emit("vote", id)
    }, [])

    useEffect(() => {
            if (!questionId) return
            const serviceQuestion = async () => {
                const res = await QuestionApi.getQuestion(questionId)
                setQuestion(res)
            }
            const serviceLoadBarChart = (answers: Answer[]) => {
                const labels: string[] = []
                answers.forEach(item => {
                    labels.push(item.answer)
                })
                const votes: string[] = []
                answers.forEach(item => {
                    votes.push(item.vote)
                })

                const data = {
                    labels: labels,
                    datasets: [{
                        label: "Vote",
                        backgroundColor: '#dddddd',
                        data: votes
                    }]
                }
                setDataBarChart(data)
            }
            try {
                serviceQuestion().then(() => {
                    socket.on('connect', sk => {
                        socket.emit("getlistanswer", questionId)
                    })
                    socket.on('listanswer', (data) => {
                        setAnswer(data)
                        serviceLoadBarChart(data)
                    })
                    socket.on("connect_error", (err) => {
                        console.log(err);
                    });
                })
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
                    <Button key={item.id} variant="outlined" onClick={() => voteClick(item.id)}>{item.answer}</Button>
                ))}
            </Box>
            {dataBarChart ? (<Bar data={dataBarChart}/>) : null}
        </Box>
    )
}