import React from 'react';
import { Row, Container } from 'react-bootstrap';
import {
  SoundCard,
  NoResource,
  VisionNavBar,
  ErrorMessage,
} from './components';
import style from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';

/**
 * @description Landing page of VoiceMod app
 *
 * @returns {React.Component} React Component
 */
function App() {
  return (
    <Wrapper>
      <div className="App">
        <VisionNavBar>
          {({ loading, response, fetchData, errors, hasMore }) => (
            <>
              <br />
              <Container>
                {!response.length ? (
                  <NoResource action={fetchData} loading={loading} />
                ) : (
                  <InfiniteScroll
                    style={{ overflow: 'hidden' }}
                    dataLength={response.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                  >
                    <Row>
                      {response.map((sound) => (
                        <SoundCard key={sound._id} sound={sound} />
                      ))}
                    </Row>
                    {errors.length
                      ? errors.map((err) => (
                          <ErrorMessage key={err + Math.random()} error={err} />
                        ))
                      : ''}
                  </InfiniteScroll>
                )}
              </Container>
            </>
          )}
        </VisionNavBar>
      </div>
    </Wrapper>
  );
}

const Wrapper = style.div`
  .app-logo {
    height: 50px;
  }
`;

export default App;
