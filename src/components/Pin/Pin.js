import React from 'react';
import PropTypes from 'prop-types';

import pinShape from '../../helpers/propz/pinShape';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
    deletePin: PropTypes.func.isRequired,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { pin, deletePin } = this.props;
    deletePin(pin.id);
  };

  render() {
    const { pin } = this.props;

    return (
      <div className="card bg-dark text-white border-0">
        <img className="card-img" src={pin.imgURL} alt={pin.pinTitle} />
        <div className="card-img-overlay">
          <button className="btn btn-danger" onClick={this.deletePinEvent}>delete pin</button>
          <h5 className="card-title">{pin.pinTitle}</h5>
        </div>
      </div>
    );
  }
}

export default Pin;

/*
      <div class="card border-0 rounded-0 bg-dark text-light" >
        <img class="card-img-top" src={pin.imgURL} alt={pin.pinTitle} />
        <div class="card-body">
          <h5 class="card-title">{pin.pinTitle}</h5>
          <button class="btn btn-danger"><i class="far fa-trash-alt" onClick={this.deletePinEvent}></i>  Delete Pin</button>
        </div>
      </div>
*/
