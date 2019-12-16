import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  vertices: hasMany('vertex', { polymorphic: true, inverse: 'graph' }),
  edges: hasMany('edge')
});
