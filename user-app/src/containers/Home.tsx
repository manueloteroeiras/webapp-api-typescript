import React from 'react';
import {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Avatar, Typography, AppBar, Toolbar } from '@material-ui/core';

const API_URL = 'http://localhost:8080/api/v0'

interface User {
  id: string;
	avatar: string;
	age: number;
	email: string;
	name: string;
	role: 'admin' | 'user'
  surname: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',    
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
    toolbar: { padding: 10},
    cardContent: {
        display: 'flex', 
        flexDirection: 'column',
    },
    actions: {
      flexDirection: 'column',
      display: 'flex',  
      marginBottom: 10, 
      padding: '0 10px' 
    }, 
    avatar: {
      marginBottom: 20,
    },
    button: {
      marginBottom: 10
    },
    spinner: {
      alignSelf: 'center', 
      marginBottom: 50
    }
}));

export default () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const {push} = useHistory()

  useEffect(() => {
    const token = window.localStorage.getItem('token') as string
    fetchUser(token)
  }, [])

  const fetchUser = async (token:string) => {
    setLoading(true)
    try {
      let {data} = await axios({
        url: `${API_URL}/users/me?token=${token}`,
        method: 'get',
      })
      setLoading(false)
      setUser(data)
    } catch (error) {
      setLoading(false)
      logout()
    }
  }

  const logout = async () => {
    window.localStorage.removeItem('token')
    push('/')
  }

  return (
    <Grid className={classes.root}>
      {loading && <CircularProgress className={classes.spinner} variant="indeterminate" />}
      <AppBar>
        <Toolbar className={classes.toolbar} variant="regular" disableGutters>
          <Typography> Bienvenido {user?.name}</Typography>
        </Toolbar>
      </AppBar>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Avatar className={classes.avatar} src={user?.avatar} />
          <Typography>{user?.email}</Typography>
          <Typography>Role: {user?.role}</Typography>
          <Typography>Age: {user?.age}</Typography>
          <Typography>surname: {user?.surname}</Typography>
        </CardContent>
        <Grid className={classes.actions}>          
          <Button
            className={classes.button} 
            variant="contained" 
            onClick={logout}
            color='primary'>
              Cerrar Session
          </Button>
        </Grid>
      </Card>
    </Grid>
);
}
