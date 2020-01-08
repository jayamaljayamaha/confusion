import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {Loading} from "./LoadingComponent";

function Home(props) {
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish}
                                isLoading={props.dishesLoading}
                                dishesErrMsg={props.dishesErrMsg}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}/>
                </div>
            </div>
        </div>
    );
}

function RenderCard({item, isLoading, dishesErrMsg}) {
    if(isLoading){
        return (
            <Loading/>
        );
    }
    else if(dishesErrMsg){
        return(
            <h4>{dishesErrMsg}</h4>
        );
    }
    else {
        return (
            <Card>
                <CardImg src={item.image} alt={item.name}/>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }

}


export default Home;