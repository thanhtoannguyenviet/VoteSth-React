import Head from 'next/head'
import Image from 'next/image'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from '../styles/Home.module.css'
import {Button, CssBaseline, TextField, Typography} from "@mui/material";
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        router.push('question/'+data.get('questionId'))
        // eslint-disable-next-line no-console

    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Vote Something</title>
                <meta name="description" content="Create question and start vote" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
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
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                                sx={{ mt: 1, p: 1.5 , borderRadius: 1, backgroundColor:"text.primary"}}
                            >
                                Enter
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
                </a>
            </footer>
        </div>
    )
}
