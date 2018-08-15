import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const slides = ["slide1", "slide2", "slide3", "slide4"];

function ArrowLeft({ onClick }) {
  return (
    <div className="arrow" onClick={onClick}>
      prev
    </div>
  );
}

function ArrowRight({ onClick }) {
  return (
    <div className="arrow" onClick={onClick}>
      next
    </div>
  );
}
function Slide({ slide }) {
  return <div className="slide">{slide}</div>;
}

function Button({ label, onClick }) {
  return (
    <div className="button" onClick={onClick}>
      {label}
    </div>
  );
}

function Buttons({ onReset, onStop, onStart }) {
  return (
    <div className="slide">
      <Button onClick={onReset} label="reset" />
      <Button onClick={onStop} label="stop" />
      <Button onClick={onStart} label="start" />
    </div>
  );
}

class App extends React.Component {
  state = {
    currentIndex: 0,
    interval: null
  };
  componentDidMount() {
    this.setState({
      interval: setInterval(this.handlerNextSlide, 2000)
    });
  }
  handlerPrevSlide = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1
    }));
  };
  handlerNextSlide = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
  };

  handlerOnReset = () => {
    this.setState({
      currentIndex: 0
    });
  };
  handlerOnStop = () => {
    clearInterval(this.state.interval);
  };
  handlerOnPlay = () => {
    this.setState({
      interval: setInterval(this.handlerNextSlide, 2000)
    });
  };

  render() {
    return (
      <div className="App">
        <ArrowLeft onClick={this.handlerPrevSlide} />
        <Slide slide={slides[this.state.currentIndex]} />
        <ArrowRight onClick={this.handlerNextSlide} />
        <Buttons
          onReset={this.handlerOnReset}
          onStop={this.handlerOnStop}
          onStart={this.handlerOnPlay}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
