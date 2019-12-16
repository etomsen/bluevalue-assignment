import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name() {
    return faker.lorem.sentence();
  },

  withSixVertices: trait({
    afterCreate(graph, server) {
      server.createList('vertex/node', 5, { graph });
      server.createList('vertex/circle', 1, { graph });
      server.createList('edge', 5, { graph });
      const { vertexIds, edgeIds } = graph;
      const vertexLinks = new Map();
      edgeIds.forEach(id => {
        const ids = [...vertexIds].filter(v => !vertexLinks.has(`${v.type}-${v.id}`) || vertexLinks.get(`${v.type}-${v.id}`) < 2);
        const [start, end] = ids.sort(() => 0.5 - Math.random()).slice(0, 2).map(i => `${i.type}-${i.id}`);
        const edge = server.schema.edges.find(id);
        edge.update({start, end});
        vertexLinks.set(start, vertexLinks.has(start) ? 2 : 1);
        vertexLinks.set(end, vertexLinks.has(end) ? 2 : 1);
      });
    }
  })
});
