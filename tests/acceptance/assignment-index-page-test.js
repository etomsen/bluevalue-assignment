import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'assignment/tests/helpers/start-app';
import destroyApp from 'assignment/tests/helpers/destroy-app';
import { findAll, visit } from 'ember-native-dom-helpers';

describe('Acceptance | assignment index page', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('renders page with graph', async function() {
    server.create('graph');
    await visit('/');
    expect(findAll('div.graph')).to.have.lengthOf(1);
  });
});

