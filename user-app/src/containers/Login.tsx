import React, { useEffect } from 'react';
import {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from 'react-router';

const re = /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgb(10,44,72)',
      height: '100vh', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    card: {
      minHeight: 220,
      maxWidth: 450,
      width: '20%',
      minWidth: 400,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '4px 4px 10px 6px rgba(0,0,0,.2)', 
      justifyContent: 'space-between'
    },
    cardContent: {
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center'
    },
    actions: {
      flexDirection: 'column',
      display: 'flex',  
      alignItems: 'center',
      marginBottom: 10,  
    }, 
    input :{
      marginTop: 20,
      width: '80%'
    },
    button: {
      width: '60%',
      marginBottom: 10
    },
    spinner: {
      alignSelf: 'center', 
      margin: '20px 0'
    }
}));

export default () => {
  const classes = useStyles();
  const [emailValid, setEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {push} = useHistory()

  useEffect(() => {
    let token = window.localStorage.getItem('token');
    if(token) push('/home')
  }, [])

  const validateEmail = (email: string) => {
    if(re.test(email)) {
      setEmailValid(true);
      setErrorEmail('');
      setEmail(email) 
    }
    else {
      setErrorEmail("El email ingresado es incorrecto")
      setEmailValid(false);
    }
  }

  const cleanInputs = () => {setPassword("");setEmail("")}

  const doLogin = async () => {
    setLoading(true)
    try {
      let {data} = await axios({
        url: 'http://localhost:8080/api/v0/authenticate',
        method: 'post',
        data: { email, password }
      })
      window.localStorage.setItem('token', data.token)
      push('/home')
    } catch (error) {
      setLoading(false)
      cleanInputs()
    }
  }

  return (
    <Grid className={classes.root}>
      <img src="/logo.png"  />
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <TextField 
            className={classes.input}
            id="email"
            label="Email" 
            placeholder="email@dominio.com"
            variant="outlined" 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            error={errorEmail != ''}
            helperText={errorEmail}
            autoFocus
          />
          {emailValid &&
              <TextField 
                id="password" 
                label="Password"
                placeholder="******" 
                variant="outlined"
                type="password"
                className={classes.input}
                onChange={(e) => setPassword(e.target.value)}
              />
          }
        </CardContent>
        { loading ? <CircularProgress className={classes.spinner} variant="indeterminate" /> : (
          <Grid className={classes.actions}>          
            <Button
              className={classes.button} 
              variant="contained" 
              onClick={() => emailValid ? doLogin(): validateEmail(email)}
              color='primary'>
                {emailValid ? 'Ingresar' : 'Continuar'}
            </Button>
            <Button 
              className={classes.button}              
              variant="text">
                Olvide mi contraseña
            </Button>
          </Grid>
        )
        }
      </Card>
    </Grid>
);
}
