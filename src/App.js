import React, { Component, createRef } from "react";
import './index.css';
import Home from './components/Home/Home';
import Header from './components/Header';
import Details from './components/Details';
import Maps from './components/Maps';
import ErrorBoundary from './components/ErrorBoundary';
import { Routes, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        latitude: null,
        longitude: null
    }
    this.map = createRef(null)
  }

  componentDidMount() {
      navigator.geolocation.getCurrentPosition(
          (success) => this.setState({ latitude: success.coords.latitude, longitude: success.coords.longitude }),
          (error) => { error.PERMISSION_DENIED ? alert('Please allow us to access your location.') : alert(error.message)}
      );
  }

  render() {
    return (
      <div className="bg-ekonavHomeBg/50 h-full">
        <ErrorBoundary>
          <Header />
          <Routes>
            <Route index path="/" element={<Home coordinates={this.state} />} />
            <Route path="details" element={<Details coordinates={this.state} />} />
            <Route path="blocks/:slug" element={<Details coordinates={this.state} />} />

            <Route path="yandex" element={<Maps />} />
          </Routes>
        </ErrorBoundary>
      </div>
    )
  }

}

export default App