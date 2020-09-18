import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "../Booking/booking.css";

const SingleHotel = (props) => {
    const {name,body,img} = props.hotel;
    return (
        <div>
            <Container>
                <Row style={{padding: "10px"}}>
                    <Col xs={4}>
                        <div>
                            <img src={img} style={{width: "200px"}} alt="hotel"/>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <div>
                            <h3>{name}</h3>
                            <p>{body}</p>
                            <button className="bookingBtn">Book</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SingleHotel;