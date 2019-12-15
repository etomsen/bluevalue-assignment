import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default Model.extend({
  text: attr('string'),
  x: attr('number'),
  y: attr('number'),
  edges: hasMany('edge'),
  graph: belongsTo('graph')
});
