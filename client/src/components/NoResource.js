import React from 'react';
import style from 'styled-components';
import { Button } from 'react-bootstrap';

/**
 * @description Displays message when no data was fetched from the server
 *
 * @param {Object} { action, loading } Refresh action and loading props
 * @returns {React.Component} React Component
 */
const NoResource = ({ action, loading }) => (
  <Wrapper>
    <div className="no-resource">
      <h3>No voices found</h3>
      <Button
        onClick={action}
        disabled={loading}
        variant="info"
        className="p-h-lg m-t-sm"
      >
        {loading ? 'Loading...' : 'Refresh'}
      </Button>
    </div>
  </Wrapper>
);

const Wrapper = style.div`
.no-resource {
  text-align: center;
  margin-top: 20%;
}
`;

export default NoResource;
