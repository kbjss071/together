import React, {useEffect, useState} from 'react'
import {Form, Button, Alert} from 'react-bootstrap'

import {useMutation} from '@apollo/client'
import {LOGIN_USER} from '../../utils/mutations'

import Auth from '../../utils/auth';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({username: '', password: ''});
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [login, {error}] = useMutation(LOGIN_USER);

    useEffect(()=>{
        if(error){
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [error])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({...userFormData, [name]: value})
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if(form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const {data} = await login({
                variables: {...userFormData}
            })

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        setUserFormData({
            username: '',
            password: ''
        })
    }

    return (
        <>
        <Form noValidate validated={validated} onsubmit={handleFormSubmit}>
            <Alert
                dismissible
                onClose={()=>setShowAlert(false)}
                show={showAlert}
                variant="danger"
            >
                Incorrect login credentials. Please check your username and password
            </Alert>
            <Form.Group>
                <Form.Label htmlFor="usename">
                    Username
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Username'
                    name="username"
                    onChange={handleInputChange}
                    value={userFormData.username}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Username is required.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Your password"
                    name="password"
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Password is required!
                </Form.Control.Feedback>
            </Form.Group>
            <Button
                disabled={!(userFormData.username && userFormData.password)}
                type="submit"
                variant="success"
            >
                Submit
            </Button>
        </Form>
        </>
    )
}

export default LoginForm;