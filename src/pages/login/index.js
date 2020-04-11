import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import EventsApi from '../../services/api'
import { login } from '../../services/auth'

import PublicLayout from "../../container/layout/publicLayout"
import "./login.css"

export default function Login(props) {
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")

    function validateForm() {
        return email.length > 5 && password.length > 5;
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const response = await EventsApi.post('/v1/authenticate', { "email": email, "password": password })

            login(response.data.auth_token)
            props.history.push('/Home')
        } catch (e) {
            window.flash(`Usuário ou senha Inválida`, 'error')
        }
    }

    return (

        <PublicLayout>
            <div className="Login">
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel className="label">Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={email}
                            onChange={e => setemail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel className="label">Senha</ControlLabel>
                        <FormControl
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </FormGroup>
                    <Button block bsSize="large" disabled={!validateForm()} type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </PublicLayout>

    )
}