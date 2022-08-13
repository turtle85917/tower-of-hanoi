import { Component } from "react";

import "../styles/quantity.component.css";

interface S {
  quantity: number;
}

export default class Quantity extends Component<{}, S> {
  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {
    const quantity = parseInt(localStorage.getItem("quantity") ?? "6");
    this.setState({ quantity });
  }

  render() {
    const quantity = parseInt(localStorage.getItem("quantity") ?? "6");

    return (
      <article className="set-quantity">
        <div className="title">원반 갯수</div>
        <input className="quantity" type="range" min={2} max={6} defaultValue={quantity.toString()} onChange={(event) => this.setState({ quantity: +event.target.value })} />
        <span className="current">{this.state?.quantity}</span>
        <button
          className="sumbit"
          onClick={() => {
            localStorage.setItem("quantity", this.state?.quantity.toString());
            window.location.href = "/";
          }}
          />
      </article>
    );
  };
};