import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from 'styled-components';
import { Alert, Container } from 'react-bootstrap';

import { SoundCard } from '../components';
import { errorHandler, makeRequest } from '../helpers';

function SoundDetails() {
  const [state, setState] = useState({
    sound: {},
    loading: true,
    errors: [],
  });

  const location = useLocation();

  const fetchDetails = () => {
    makeRequest({ path: location.pathname })
      .then((data) => {
        setState((prev) => ({ ...prev, sound: data, loading: false }));
      })
      .catch((error) => errorHandler(error, setState));
  };

  useEffect(fetchDetails, []);

  const { loading, sound, errors } = state;

  return (
    <Wrapper>
      <Container className="base">
        {errors.length ? (
          <Alert
            variant="danger"
            onClose={() => setState((prev) => ({ ...prev, errors: [] }))}
            dismissible
          >
            <b>{errors.toString()}</b>
          </Alert>
        ) : null}
        {loading ? (
          <div className="no-resource">
            <h3>Loading sound details...</h3>
          </div>
        ) : (
          <SoundCard sound={sound} />
        )}
      </Container>
    </Wrapper>
  );
}

const Wrapper = style.div`
.no-resource {
  text-align: center;
  margin-top: 20%;
}

.base {
  transform: translateY(50%);
}
@media screen and (min-width: 770px) {
  .base {
    padding-right: 15%;
    padding-left: 15%;
  }
}
`;

export default SoundDetails;
