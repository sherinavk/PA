import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <Container>
        © {new Date().getFullYear()}{" "}
        <a href="http://www.creative-tim.com">ROADAPP</a>, made with
        love from Ling
      </Container>
    );
  }
}

export default Footer;
