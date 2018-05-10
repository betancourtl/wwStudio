import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, fromJS } from 'immutable';
import Image from './Image';
import Video from './Video';

class MediaComponent extends Component {
  render() {
    const { block, contentState } = this.props;
    const entityKey = block.getEntityAt(0);
    if (!entityKey) {
      return null;
    }
    const data = contentState.getEntity(entityKey).getData();
    const checkedData = Map.isMap(data) ? data : fromJS(data);
    const type = checkedData.has('type') ? checkedData.get('type') : '';

    switch (type) {
      case 'image': {
        return (
          <Image {...this.props} data={checkedData}/>
        );
      }
      case 'video': {
        return <Video {...this.props} data={checkedData}/>;
      }
      default: {
        console.log('no matches');
        return null;
      }
    }
  }
}

MediaComponent.propTypes = {
  block: PropTypes.object.isRequired,
  contentState: PropTypes.object.isRequired,
};

export default MediaComponent;
