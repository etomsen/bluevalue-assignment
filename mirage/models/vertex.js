import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  graph: belongsTo('graph', { polymorphic: true, inverse: 'vertices' }),
});
