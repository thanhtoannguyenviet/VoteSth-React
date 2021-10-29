import {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import QuestionApi from "../../service/api/questionApi";
import {Button, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import io from 'socket.io-client';
import { Bar } from "react-chartjs-2";
import skconfig from "../../service/skio/skconfig";

export default function Index() {
    const [question, setQuestion] = useState(null)
    const [answers,setAnswer] = useState(null)
    const {asPath} = useRouter();
    const socket = io("http://127.0.0.1:8080/",{withCredentials:true})
    const slugKey = asPath.split("/")
    const key = slugKey[slugKey.length - 1]
    useEffect(() => {
            const serviceQuestion = async () => {
                const res = await QuestionApi.getQuestion(key)
                 setQuestion(res)
            }
            try {
                serviceQuestion()
                socket.on('connect',sk=>{
                    console.log('Client connected')
                    socket.emit("getlistanswer","NTQwODAzMDcz")
                })
                console.log(key)
                socket.on('listanswer',(data)=>{
                    setAnswer(data)
                    console.log(data)})
                socket.on("connect_error", (err) => {
                    console.log(err);
                });

            } catch (err) {
                console.log("err:"+ err)
            }
        }, []
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
            <Box component="form" noValidate sx={{ mt: 1 }}>
                {answers?.map((item)=> (
                    <Button variant="outlined">{item.answer}</Button>
                ))}
            </Box>
            <Bar
                data={{}}
            />
        </Box>

    )
}