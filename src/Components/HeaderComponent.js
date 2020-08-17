import React from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';

export class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar dark >
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Jumbotron>
          <div class="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante Con Fusion</h1>
                <p>We take inspiration from the World's best cuisines, and create an unique fusion experience. Our lipsmacking creations will ticle your culinary senses!</p>
              </div>
            </div>
          </div>
        </Jumbotron>
      </>
    )
  }
}