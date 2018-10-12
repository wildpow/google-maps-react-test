import React from 'react';
import Map, { Marker, GoogleApiWrapper, Polyline, InfoWindow } from 'google-maps-react';
import Markers from './Markers';

const style = {
  width: '100%',
  height: '800px',
  position: 'relative',
  display: 'flex',
  'marginLeft': 'auto',
  'marginRight': 'auto'
}

class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      markers: [],
      markerPosition: null,
      initialCenter: { lat: 46.9282, lng: -121.5045 },
      showInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }
  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  renderAutoComplete() {
    const { google, map } = this.props;

    if(!google || !map) return;

    const autoComplete = new google.maps.places.Autocomplete(this.autoComplete);
    autoComplete.bindTo('bounds', map);

    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace();

      if (!place.geometry) return;
      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      this.setState({ position: place.geometry.location })
    });
  }

  saveMarker = () => {
    let newWayPoint = {
      lat: this.state.markerPosition.lat,
      lng: this.state.markerPosition.lng
    };
    this.setState({ markers: [...this.state.markers, newWayPoint] });
  }

  deleteMarker = () => {
    this.setState({ markerPosition: null })
    let markerArr = this.state.markers;
    markerArr.pop()
    this.setState({ markers: markerArr })
  }

  onMapClicked = (props, map, e) => {
    if (this.state.showInfoWindow) {
      this.setState({
        activeMarker: null,
        showInfoWindow: false
      })
    }
    let location = {lat: 0, lng: 0}
    location.lat = e.latLng.lat();
    location.lng = e.latLng.lng();

    this.setState({ markerPosition: location });
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showInfoWindow: true
    });
  }

  onInfoWindowClose = () => {
    this.setState({
      activeMarker: null,
      showInfoWindow: false
    });
  }

  centerMoved = (mapProps, map) => {
    this.setState({ position: map.center });
  }

  render() {
    const { position, initialCenter } = this.state;
    const containerStyle = { position: 'relative' };
    return (
      <React.Fragment>
        <div className='wrapper'>
          <form onSubmit={this.onSubmit}>
            <input
              placeholder="Enter a location"
              ref={ref => (this.autoComplete = ref)}
              type='text'
            />
          </form>
          <button onClick={this.saveMarker}>Save Marker</button>
          <button onClick={this.deleteMarker}>Delete Marker</button>
          <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
          </div>
        </div>
        <Map
          {...this.props}
          onDragend={this.centerMoved}
          initialCenter={initialCenter}
          center={position}
          centerAroundCurrentLocation={false}
          containerStyle={containerStyle}
          style={style}
          google={this.props.google}
          onClick={this.onMapClicked}
        >
          {
            this.state.markerPosition ?
              <Marker
                position={{ 
                  lat: this.state.markerPosition.lat,
                  lng: this.state.markerPosition.lng
                }}
              />
              : null
          }
          <Polyline
            fillColor='#0000FF'
            fillOpacity={0.35}
            path={this.state.markers}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
          />
          <Markers
            onMarkerClick={this.onMarkerClick}
            markers={this.state.markers}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            visible={this.state.showInfoWindow}
          >
            <h1>hello from marker number {this.state.selectedPlace.name}</h1>
          </InfoWindow>
        </Map>
      </React.Fragment>
    )
  }
}

const MapWrapper = props => (
  <Map
    google={props.google}
    visible={false}
  >
    <MyMap {...props} />
  </Map>
);

export default GoogleApiWrapper({
  apiKey: ('!API KEY GOES HERE!')
})(MapWrapper)