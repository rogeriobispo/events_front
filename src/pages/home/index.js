import React, { useState, useEffect } from 'react';

import EventsApi from '../../services/api'
import {
    Grid,
    Col,
    Row,
    FormGroup,
    ControlLabel,
    FormControl,
    Form,
    Jumbotron
} from 'react-bootstrap'


function Home() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            const response = await EventsApi.get('/v1/events.json')
            setEvents(response.data)
        })()
    }, [])


    async function filterEvents(genre) {
        const response = await EventsApi.get(`/v1/events.json?filter=${genre}`)
        console.log(genre)
        setEvents(response.data)
    }
    return (
        <div className="App container">
            <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Search
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            placeholder="Search Events"
                            onChange={(e) => filterEvents(e.target.value)} />
                    </Col>
                </FormGroup>
            </Form>
            <Grid>
                <Row className="show-grid">
                    {events.map(evt => (
                        <Col xs={6} md={4} key={evt.id} >
                            <Jumbotron >
                                <h1>{evt.kind}</h1>
                                <h3>Artists</h3>
                                <p>
                                    {evt.artists.map(artist => (artist.name + "  "))}
                                </p>
                                <h3>Genres</h3>
                                <p>
                                    {evt.genres.map(genre => (genre.name + "  "))}
                                </p>
                            </Jumbotron>
                        </Col>
                    ))}

                </Row>
            </Grid>

        </div>
    );
}

export default Home;