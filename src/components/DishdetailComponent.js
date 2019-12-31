import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from 'react-router-dom'

function RenderDishDetails({dish, comments}) {
    if (dish != null) {

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div key={dish.id} className="col-12 col-md-5 m-2">
                        <RenderDish dish={dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-2">
                        <RenderComments comments={comments}/>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }
}

function RenderDish({dish}) {
    if (dish != null) {
        return (
            <Card>
                <CardImg src={dish.image}
                         alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    } else {
        return (
            <div></div>
        )
    }
}

function RenderComments({comments}) {
    if (comments != null) {
        const AllComments = comments.map((comment) => {
            return (
                <div key={comment.id}>
                    <ul className="list-unstyled">
                        <li>{comment.comment}</li>
                        <br/>
                        <li>-- {comment.author} , {new Intl.DateTimeFormat('en-US',
                            {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                            }).format(new Date(Date.parse(comment.date)))}</li>
                    </ul>
                </div>
            )
        });

        return (
            <Card>
                <CardBody>
                    <CardTitle><h4>Comments</h4></CardTitle>
                    <CardText>{AllComments}</CardText>
                </CardBody>
            </Card>
        )
    } else {
        return (
            <div></div>
        )
    }
}

function DishDetail(props) {
    return (
        <RenderDishDetails dish={props.dish} comments={props.comments}/>
    );
}

export default DishDetail;