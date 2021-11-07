import Head from 'next/head'
import React, {useCallback} from "react"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from "../styles/Home.module.css";
import {Button, CssBaseline, TextField, Typography} from "@mui/material";
import {useRouter} from "next/router";
import FooterComponent from "../components/Footer";

export default function Home() {
    const router = useRouter();

    //Defined function should use with useCallback
    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        router.push('question/' + data.get('questionId'))
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Vote Something</title>
                <meta name="description" content="Create question and start vote"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Welcome to VoteSth
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="questionId"
                                label="Question PIN"
                                name="questionId"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 1, p: 1.5, borderRadius: 1, backgroundColor: "text.primary"}}
                            >
                                Enter
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </main>
            <FooterComponent/>
        </div>
    )
}
