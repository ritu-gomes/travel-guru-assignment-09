import React from 'react';
import "./destination.css";

const Destinaiton = (props) => {
    const {name,body,id,img} = props.places;
    const handleBooking = props.booking;
    return (
                <div onClick={() => handleBooking(id)} className="places">
                    <img className="placeImg" src={img} alt="destintion"/>               
                    <h3 className="placeName">{name}</h3> 
                </div>
    );
};

export default Destinaiton;