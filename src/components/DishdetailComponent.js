import React, {Component} from 'react';
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ModalHeader, ModalBody, Row, Label, Input, Modal
} from "reactstrap";
import {Link} from 'react-router-dom'
import {Control, LocalForm, Errors} from "react-redux-form";

const required = (value) => value && value.length;
const maxLength = (len) => (value) => (!value) || (value.length <= len);
const minLength = (len) => (value) => (value) && (value.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComments(this.props.dishId, values.rating, values.author, values.comment)
    }
    render() {

        return (
            <div>
                <Button outline onClick={() => this.toggleModal()}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={() => this.toggleModal()}>
                    <ModalHeader toggle={() => this.toggleModal()}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                                           className="form-control"
                                           validators={{
                                               required, minLength: minLength(3), maxLength: maxLength(15)
                                           }}/>
                                    <Errors model={".yourName"}
                                            className="text-danger"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}/>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" className="form-control" id="comment"
                                                      name="comment" rows="12"/>
                                </Row>
                                <Row className="form-group">
                                    <Button type="submit" value="submit" color="primary">Submit</Button>
                                </Row>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderDishDetails({dish, comments, addComments}) {
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
                        <RenderComments comments={comments}
                                        addComments={addComments}
                                        dishId={dish.id}/>
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

function RenderComments({comments, addComments, dishId}) {
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
                    <CommentForm dishId={dishId} addComments={addComments}/>
                </CardBody>
            </Card>
        )
    } else {
        return (
            <div></div>
        )
    }
}



export default RenderDishDetails;