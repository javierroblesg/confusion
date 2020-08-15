import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends React.Component {

  renderDish(dish) {
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

  renderComments(dish) {
    if ( dish != null ) {

      const dishComments = dish.comments.map(
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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.props.dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.props.dish)}
          </div>
        </div>
      </div>
    )
  }
}

export default DishDetail;