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
import {Loading} from './LoadingComponent';
import {baseUrl} from "../shared/baseUrl";
import {postComment} from "../redux/ActionCreators";
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

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
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
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

function RenderDishDetails({dish, comments, postComment, isLoading, ErrMsg}) {
    if (isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    } else if (ErrMsg) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{ErrMsg}</h4>
                </div>
            </div>
        );
    }
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
                                        postComment={postComment}
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
            <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg src={baseUrl + dish.image}
                             alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        )
    } else {
        return (
            <div></div>
        )
    }
}

function RenderComments({comments, postComment, dishId}) {
    if (comments != null) {
        const AllComments = comments.map((comment) => {
            return (
                <Fade in>
                    <li>{comment.comment}</li>
                    <li>-- {comment.author} , {new Intl.DateTimeFormat('en-US',
                        {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}</li>
                    <br/>
                </Fade>
            )
        });

        return (
            <Card>
                <CardBody>
                    <CardTitle><h4>Comments</h4></CardTitle>
                    <CardText>
                        <ul className="list-unstyled">
                            <Stagger in>
                                {AllComments}
                            </Stagger>
                        </ul>
                    </CardText>
                    <CommentForm dishId={dishId} postComment={postComment}/>
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