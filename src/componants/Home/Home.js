import { Container, Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { placeContext } from '../../App';
import Destinaiton from '../Destination/Destinaiton';
import "../Booking/booking.css";

const Home = () => {
    const [detail,setDetail] = useContext(placeContext);
    const history = useHistory();
    useEffect(() => {
        fetch("https://my-json-server.typicode.com/ritu-gomes/travel-data/db")
        .then(res => res.json())
        .then(data => {
            setDetail(data.data);
            console.log(data.data);
        })
    },[])
    const handleBooking = (id) => {
        const destination = detail.find(des => des.id === id);
        history.push(`/Booking/${id}`);
    }

    return (
        <div className="booking" style={{backgroundImage: `linear-gradient(to bottom, rgba(15, 4, 5, 0.45), rgba(70, 62, 62, 0.96)),url('${detail[0] && detail[0].img}')`}}>
            <Container maxWidth="lg">
                <Grid container direction="row" justify="space-around" alignItems="center" spacing={4}>
                    <Grid item xs={5}>
                        <div style={{color: "white"}}>
                            <h2>{detail[0] && detail[0].name}</h2>
                            <p>{detail[0] && detail[0].body}</p>
                            <Button onClick={() => handleBooking(1)} style={{backgroundColor: "#F9A51A",border: "none"}}>Booking</Button>
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <div>
                            {
                                detail.map(pl => <Destinaiton booking={handleBooking} places={pl} key={pl.id}></Destinaiton>)
                            }
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
        
    );
};

export default Home;