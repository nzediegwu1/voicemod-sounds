import React from 'react';
import styled from 'styled-components';
import { Toast } from 'react-bootstrap';

/**
 * @description Renders error message using a toast, upon server error
 *
 * @param {Object} { fetchData, loading }
 * @returns {React.Component} React Component
 */
const ErrorMessage = ({ error }) => {
  return (
    <Wrapper>
      <Toast>
        <Toast.Body>
          An error occured while loading voices from the server: {error}
        </Toast.Body>
      </Toast>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .toast {
    bottom: 0px;
    right: 3.5em;
    position: fixed;
  }
  .toast,
  .toast-header {
    background-color: #1d2124;
    color: white;
  }
`;

export default ErrorMessage;
