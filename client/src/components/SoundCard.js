import React from 'react';
import styled from 'styled-components';

/**
 * @description Displays information about a sound
 *
 * @param {Object} { sound }
 * @returns {React.Component} React Component
 */
const SoundCard = ({ sound }) => {
  return (
    <Wrapper id={sound._id} className="col-sm-6 col-lg-4">
      <Card className="text-center">
        <div>
          <img src={sound.icon} alt={sound.name} />
        </div>
        <b>{sound.name.toUpperCase()}</b>
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
