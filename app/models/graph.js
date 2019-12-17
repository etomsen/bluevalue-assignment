import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  text: attr('string'),
  vertices: hasMany('vertex', { polymorphic: true }),
  edges: hasMany('edge')
});
