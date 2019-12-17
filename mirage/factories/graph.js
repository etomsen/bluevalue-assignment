import { Factory, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  text() {
    const numberWords = faker.random.number({min: 50, max: 300});
    return faker.lorem.words(numberWords);
  },

  withSixVertices: trait({
    afterCreate(graph, server) {
      server.createList('vertex/node', 5, { graph });
      server.createList('vertex/circle', 1, { graph });
      server.createList('edge', 5, { graph });
      const { vertexIds, edgeIds } = graph;
      const ids = vertexIds.sort(() => 0.5 - Math.random()).map(i => `${i.type}-${i.id}`);
      edgeIds.forEach((id, i) => {
        const edge = server.schema.edges.find(id);
        if (i < ids.length-1) {
          const start = ids[i];
          const end = ids[i+1];
          edge.update({start, end});
        }
      });
    }
  })
});
