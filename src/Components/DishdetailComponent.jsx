/*

Return a <div> from the render() function. This <div> should use the Bootstrap row class to position the content within the <div>. This div will display both the details of the dish in a Card and the list of comments side-by-side for medium to extra large screens, but will stack them for xs and sm screens.
The card should be enclosed inside a <div> appropriate Bootstrap column classes so that it occupies the entire 12 columns for the xs and sm screen sizes, and 5 columns for md screens and above. Also apply a class of m-1 to this div.




*/

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
              --{comment.author}, {comment.date}
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
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.selectedDish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.renderComments(this.props.selectedDish)}
        </div>
      </div>
    )
  }
}

export default DishDetail;