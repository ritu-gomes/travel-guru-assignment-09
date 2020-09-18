import { Container, Grid } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { destinationContext, placeContext } from '../../App';
import "./booking.css";

const Booking = () => {
    const history = useHistory();
    const {id} = useParams();
    const [detail,setDetail] = useContext(placeContext);
    const place = detail[id-1];
    const [destination,setDestination] = useState(place.name);
    const [typedPlace,setTypedPlace] = useContext(destinationContext);
    const getDestination = (e) => {
        const typedDestination = e.target.value;
        console.log(typedDestination);
        setDestination(typedDestination);
    }
    const handleSubmit = () => {
        history.push("/Hotel");
        setTypedPlace(destination);
    }
    return (
            <div className="booking" style={{backgroundImage: `linear-gradient(to bottom, rgba(15, 4, 5, 0.45), rgba(70, 62, 62, 0.96)),url('${place && place.img}')`}}>
                <Container maxWidth="lg">
                    <Grid container direction="row" justify="space-around" alignItems="center" spacing={4}>
                        <Grid item xs={5}>
                            <div style={{color: "white"}}>
                                <h2>{place && place.name}</h2>
                                <p>{place && place.body}</p>
                            </div>
                        </Grid>
                        <Grid item xs={7}>
                            <div>
                                <form onSubmit={() => handleSubmit()}>
                                    <small>Origin</small> <br/>                                    
                                    <input className="text" type="text" name="origin" id="origin" required/><br/>
                                    <small>Destination</small> <br/>
                                    <select onBlur={getDestination} className="text" id="destination" name="destination">
                                        {
                                            detail.map(pl => <option value={pl.name}>{pl.name}</option>)
                                        }
                                    </select><br/>
                                    <label htmlFor="from">From: </label><br/>
                                    <input className="date" type="date" name="from" id="from"/><br/>
                                    <label htmlFor="to">To: </label><br/>
                                    <input className="date" type="date" name="to" id="to"/><br/><br/>
                                    <input type="submit"  className="bookingBtn" value="Start Booking"/>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
    );
};

export default Booking;