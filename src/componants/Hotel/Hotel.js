import React, { useContext, useEffect, useState } from 'react';
import { Col, Container,Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { destinationContext, placeContext } from '../../App';
import SingleHotel from '../SingleHotel/SingleHotel';

const Hotel = () => {
    const [hotels,setHotels] = useState([]);
    const [detail,setDetail] = useContext(placeContext);
    const [typedPlace,setTypedPlace] = useContext(destinationContext);
    const category = detail.find(pl => pl.name === typedPlace);
    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/ritu-gomes/hotel-data/hotels?category=${category.id}`)
        .then(res => res.json())
        .then(data => {
            setHotels(data);
        })
    },[]);
    return (
        <div>
            <Container>
                <Row>
                    <Col xs={7}>
                        <h3>Stay In: {typedPlace}</h3>
                        {
                            hotels.map(ht => <SingleHotel hotel={ht} key={ht.id}></SingleHotel>)
                        }
                    </Col>
                    <Col xs={5}>
                        <div style={{width: "100%",height: "100%",border: "none"}}>
                            {category.id === 1 &&
                                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118830.24477493553!2d91.9328608802074!3d21.451043356313644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adc7ea2ab928c3%3A0x3b539e0a68970810!2sCox&#39;s%20Bazar!5e0!3m2!1sen!2sbd!4v1600442858557!5m2!1sen!2sbd" width="600" height="550" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                            }
                            {category.id === 2 &&
                                <iframe title="map2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29087.557862291727!2d91.70753463876736!3d24.31356280557819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37517a7a9ac91745%3A0x50f827893a88c955!2sSreemangal!5e0!3m2!1sen!2sbd!4v1600443349531!5m2!1sen!2sbd" width="600" height="550" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>

                            }
                            {category.id === 3 &&
                                <iframe title="map3" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d946889.9059687905!2d88.72646031728428!3d22.019405955649994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a004caac2c7b315%3A0x4716abcfbb16c93c!2sSundarbans!5e0!3m2!1sen!2sbd!4v1600443817428!5m2!1sen!2sbd" width="600" height="550" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>

                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Hotel;