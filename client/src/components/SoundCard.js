import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { errorHandler, makeRequest } from '../helpers';
import { Details } from '.';

/**
 * @description Displays information about a sound
 *
 * @param {Object} { sound }
 * @returns {React.Component} React Component
 */
const SoundCard = ({ sound }) => {
  const [state, setState] = useState({
    loading: false,
    errors: [],
  });
  const location = useLocation();

  const handlePlay = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      await makeRequest({ path: `${location.pathname}/play`, method: 'put' });
      setState((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      errorHandler(error, setState);
    }
  };

  const { errors, loading } = state;

  return (
    <Wrapper id={sound?._id}>
      <Card>
        {errors.length ? (
          <Alert
            variant="danger"
            onClose={() => setState((prev) => ({ ...prev, errors: [] }))}
            dismissible
          >
            <b>{errors.toString()}</b>
          </Alert>
        ) : null}
        <div>
          <img src={sound?.icon} alt={sound?.name || 'voice'} />
        </div>
        <div className="text-center">
          <b>{sound?.name?.toUpperCase()}</b>
        </div>
        {Object.keys(sound).length > 3 && (
          <Details loading={loading} handlePlay={handlePlay} sound={sound} />
        )}
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const Card = styled.div`
  padding: 25px;
  background: #fff;
  padding: 25px;
  border-radius: 3px;
  flex-grow: 1;
  box-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    box-shadow: 0.15rem 1rem 1.7rem rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }
  img {
    clear: both;
    display: block;
    margin-bottom: 1.5rem !important;
    height: 170px;
    width: 250px;
    margin: auto;
    object-fit: contain;
  }
`;

export default SoundCard;
