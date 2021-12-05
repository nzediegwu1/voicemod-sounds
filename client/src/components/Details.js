import React from 'react';
import { Badge, Button, ListGroup } from 'react-bootstrap';
import { formatNumber } from '../helpers';

function Details({ sound, handlePlay, loading }) {
  return (
    <div>
      <ListGroup as="ol" numbered>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <b>Playbacks</b>
          </div>
          <Badge variant="primary" pill>
            {formatNumber(sound.playbacks)}
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <b>Price</b>
          </div>
          <Badge variant="primary" pill>
            ${formatNumber(sound.price)}
          </Badge>
        </ListGroup.Item>
      </ListGroup>
      <br />
      <div style={{ float: 'right' }}>
        {loading ? (
          'Loading...'
        ) : (
          <Button onClick={handlePlay} variant="primary">
            Play
          </Button>
        )}
      </div>
    </div>
  );
}

export default Details;
