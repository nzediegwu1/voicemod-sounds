import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';
import style from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  SoundCard,
  NoResource,
  VisionNavBar,
  ErrorMessage,
} from '../components';

function SoundsPage() {
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
                        <div className="col-sm-6 col-lg-4">
                          <Link to={`/sounds/${sound._id}`}>
                            <SoundCard key={sound._id} sound={sound} />
                          </Link>
                        </div>
                      ))}
                    </Row>
                    {errors.length
                      ? errors.map((err) => (
                          <ErrorMessage key={err + Math.random()} error={err} />
                        ))
                      : null}
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

export default SoundsPage;
