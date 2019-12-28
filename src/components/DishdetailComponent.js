import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class DishDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        if (this.props.dish != null) {

            return (
                <div className="container">
                    <div className="row">
                        <div key={this.props.dish.id} className="col-12 col-md-5 m-2">
                            {this.renderDish(this.props.dish)}
                        </div>
                        <div className="col-12 col-md-5 m-2">
                            {this.renderComments(this.props.dish)}
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

    renderDish(dish){
        if(dish !=null){
            return(
                <Card>
                    <CardImg src={dish.image}
                             alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }else {
            return(
                <div></div>
            )
        }
    }

    renderComments(selectedDish) {
        if(selectedDish.comments != null){
            const comments = selectedDish.comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <ul className="list-unstyled">
                            <li>{comment.comment}</li>
                            <br/>
                            <li>-- {comment.author} , {new Intl.DateTimeFormat('en-US',
                                {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                        </ul>
                    </div>
                )
            });

            return(
                <Card>
                    <CardBody>
                        <CardTitle><h4>Comments</h4></CardTitle>
                        <CardText>{comments}</CardText>
                    </CardBody>
                </Card>
            )
        }else{
            return(
                <div></div>
            )
        }
    }

    getDate(date){
        return(new Date(date).toLocaleString())

    }
}

export default DishDetail;