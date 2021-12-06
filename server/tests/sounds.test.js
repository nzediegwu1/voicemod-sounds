/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../src/app';
import { sound } from '../src/messages/success';
import { soundError } from '../src/messages/error';

import { sounds } from './mock.data';

describe('Test for POST: /sounds endpoint', () => {
  it('Should save my list of sounds', async () => {
    const response = await request(app).post('/sounds').send(sounds);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(sound.imported);
  });
});

let firstSound;
describe('Test for GET: /sounds endpoint', () => {
  it('Should get list of sounds', async () => {
    const response = await request(app).get('/sounds');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(sound.fetched);
    expect(response.body.data).toHaveProperty('hasMore');
    expect(response.body.data).toHaveProperty('data');
    expect(Array.isArray(response.body.data.data)).toBe(true);
    [firstSound] = response.body.data.data;
  });
});

let soundDetails;
describe('Test for GET: /sounds/:soundId endpoint', () => {
  it('Should get details about a voice', async () => {
    const response = await request(app).get(`/sounds/${firstSound._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(sound.retrieved);
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('name');
    expect(response.body.data).toHaveProperty('icon');
    expect(response.body.data).toHaveProperty('playbacks');
    soundDetails = response.body.data;
  });
  it('Should return error if sound does not exist', async () => {
    const response = await request(app).get('/sounds/61acd693c8cac36a2861c5eb');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0]).toBe(soundError[404]);
  });

  it('Should return error if sound id is invalid', async () => {
    const response = await request(app).get('/sounds/invalid-sound-id');

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0]).toBe(soundError.invalidSoundId);
  });
});

describe('Test for PUT: /sounds/:soundId/play endpoint', () => {
  it('Should return success response', async () => {
    const response = await request(app).put(`/sounds/${soundDetails._id}/play`);

    expect(response.statusCode).toBe(204);
  });

  it('Should increment playbacks after playing sound', async () => {
    const response = await request(app).get(`/sounds/${soundDetails._id}`);

    expect(response.body.data.playbacks - soundDetails.playbacks).toBe(1);
  });
});
