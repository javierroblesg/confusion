import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }
  render() {
    return (
      <>
        <Button onClick={this.toggleModal} >
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
          <ModalHeader toggle={this.toggleModal}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Col md={{size: 10, offset: 1}}>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size: 10, offset: 1}}>
                  <Label htmlFor="author">Author</Label>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your name"
                    className="form-control"
                    validators={{
                      minLength: minLength(3), maxLength: maxLength(15)
                    }} />
                  <Errors 
                    className="text-danger"
                    model=".author"
                    show="touched" 
                    messages={{ 
                      minLength: 'Must be greater than 3 characters',
                      maxLength: 'Must be 15 characters or less'
                    }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size: 10, offset: 1}}>
                  <Label htmlFor="comment">Your comment</Label>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size: 6, offset: 1}}>
                  <Button type="submit" color="primary">
                    Send Comment
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

function RenderDish({ dish }) {
  if ( dish != null ) {
    return (
      <Card>
        <CardImg width="100%" object src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle> {dish.name} </CardTitle>
          <CardText> {dish.description} </CardText>
        </CardBody>
      </Card>
    )
  } else {
    return (
      <div></div>
    )
  }
}

function RenderComments({comments, addComment, dishId}) {
  if ( comments != null ) {

    const dishComments = comments.map(
      comment => {
        return (
          <ul>
            {comment.comment}
            --{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format( new Date (Date.parse(comment.date))  )}
          </ul>
        )
      }
      );

    return (
      <Card>
        <CardBody>
          <CardTitle>
            <h4>Comments</h4>
          </CardTitle>
          <CardText>
            {dishComments}
            <CommentForm dishId={dishId} addComment={addComment} />
          </CardText>
        </CardBody>
      </Card>
    )

  } else {
    return (
      <div></div>
    )
  }
}

export const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem> 
            <Link to='/menu'>Menu</Link> 
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {props.dish.name}
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments 
            comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id} />
        </div>
      </div>
    </div>
  )
}