import React, { useState, useEffect } from 'react';

import RequiredSelect from '../../../container/requiredSelect'
import BaseSelect from 'react-select'
import DatePicker from 'react-datepicker'
import EventsApi from '../../../services/api'

import OptionsTimeZone from '../../../utils/times_zones'

import 'react-datepicker/dist/react-datepicker.css'

import {
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Button,
    Radio,
    Row,
    Col
} from 'react-bootstrap'


const Select = props => (
    <RequiredSelect
        {...props}
        SelectComponent={BaseSelect}
        options={props.options}
    />
)

function CreateEvents() {

    const [artists, setArtists] = useState([])
    const [kind, setKind] = useState('')
    const [location, setLocation] = useState('')
    const [timeZone, setTimeZone] = useState('')
    const [selectedArtist, setSelectedArtist] = useState([])
    const [eventsDate, setEventsDate] = useState(new Date())
    const [orderDate, setOrderDate] = useState(new Date())

    useEffect(() => {

        (async () => {
            const response = await EventsApi.get('/v1/artists')
            setArtists(response.data)
        })()
    }, [])

    function artistsOption() {
        return artists.map(artist => {
            return { value: artist.id, label: artist.name }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await EventsApi.post(`/v1/events.json`,
                {
                    "kind": kind,
                    "location": location,
                    "time_zone": timeZone.value,
                    "occurred_on": eventsDate,
                    "line_up_date": orderDate,
                    "artist_ids": selectedArtist.map(at => at.value)
                })
            window.flash(`Events created successfully`, 'success');
            setTimeout(() => {
                window.location.href = '/home';
            }, 2000);
        } catch (err) {
            console.dir(err)
            window.flash(
                `Erro: ${JSON.stringify(err.response.data.errors)}`,
                'error'
            )
        }
    }

    return (
        <>
            <Form horizontal onSubmit={handleSubmit}>
                <FormGroup controlId="formInlineName">
                    <Radio
                        value='festival'
                        name="kind"
                        inline
                        onChange={(e) => setKind(e.target.value)}
                        required
                    >
                        Festiva
                    </Radio>
                    <Radio
                        value='concert'
                        name="kind"
                        inline
                        onChange={(e) => setKind(e.target.value)}
                        required
                    >
                        Concert
                    </Radio>

                </FormGroup>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Location</ControlLabel>
                    <FormControl
                        value={location}
                        type="text"
                        placeholder="event's place"
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Time Zone</ControlLabel>
                    <Select
                        value={timeZone}
                        className="basic-single"
                        classNamePrefix="Select your Time Zone"
                        isSearchable={true}
                        name="timeZones"
                        options={OptionsTimeZone}
                        onChange={(e) => setTimeZone(e)}
                        required
                    />
                </FormGroup>
                <FormGroup controlId="formInlineName">
                    <Row className="show-grid">
                        <Col md={6} mdPull={6}>
                            <FormGroup controlId="formInlineName">
                                <ControlLabel>Event's date</ControlLabel><br />
                                <DatePicker
                                    selected={eventsDate}
                                    onChange={date => setEventsDate(date)}
                                    value={eventsDate}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6} mdPush={6}>
                            <FormGroup controlId="formInlineName">
                                <ControlLabel>Order Date</ControlLabel><br />
                                <DatePicker
                                    selected={orderDate}
                                    onChange={date => setOrderDate(date)}
                                    value={orderDate}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Artists</ControlLabel>
                    <Select
                        value={selectedArtist}
                        className="basic-single"
                        classNamePrefix="Select artist"
                        isMulti
                        isSearchable={true}
                        name="timeZones"
                        options={artistsOption()}
                        onChange={(e) => setSelectedArtist(e)}
                        required
                    />
                </FormGroup>
                <Button
                    type="submit"
                >Create</Button>
            </Form>

        </>
    );
}

export default CreateEvents;