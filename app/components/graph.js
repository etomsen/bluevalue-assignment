import Component from '@ember/component';
import { computed } from '@ember/object';
import go from 'gojs';

function mapEdgeToGo(e) {
  return {
    model: e,
    font: `${e.fontSize}px serif`,
    text: e.text,
    to: e.end,
    from: e.start
  };
}

function mapVertexToGo(v) {
  const result = {
    model: v,
    key: `${v.modelName}-${v.id}`,
    text: v.text,
    font: `${v.fontSize}px serif`,
    fill: v.fill || 'white'
  };
  if (v.modelName === 'vertex/node') {
    result.fig = 'RoundedRectangle'
  }
  if (v.modelName === 'vertex/circle') {
    result.fig = 'Circle'
    result.radius = v.radius;
  }
  return result;
}

export default Component.extend({
  actions: {
    incFontSize() {
      const obj = this.contextMenuObject;
      const newFontSize = obj.part.data.model.fontSize *= 2;
      this.updateNodeFontSize(obj, newFontSize);
      this.notifyPropertyChange('contextMenuObject')
    },
    decFontSize() {
      const obj = this.contextMenuObject;
      const newFontSize = obj.part.data.model.fontSize /= 2;
      this.updateNodeFontSize(obj, newFontSize);
      this.notifyPropertyChange('contextMenuObject')
    }
  },

  contextMenuFontSize: computed('contextMenuObject', function() {
    const obj = this.get('contextMenuObject');
    if (!obj) {
      return 0;
    }
    return obj.part.data.model.fontSize;
  }),

  contextMenuEntity: computed('contextMenuObject', function() {
    const obj = this.get('contextMenuObject');
    if (!obj) {
      return '';
    }
    return obj.part.data.model.modelName;
  }),

  willDestroyElement() {
    this.graph.destroy();
    this._super(...arguments);
  },
  
  didInsertElement() {
    const contextMenuElement = this.createContextMenu();
    this.set('contextMenuElement', contextMenuElement);

    const graph = this.createGraph();
    this.set('graph', graph);
  },

  updateNodeFontSize(node, fontSize) {
    this.graph.model.commit(function(m) {
      m.set(node.data, 'font', `${fontSize}px serif`);
    }, 'update font size');
  },

  createGraph() {
    const Graph = go.GraphObject.make;
    const graphElement = this.element.querySelector('.blue-value-graph__diagram');
    const graph = Graph(go.Diagram, graphElement);
    const nodeData = this.vertices.map(mapVertexToGo);
    const linkData = this.edges.map(mapEdgeToGo);
    const contextMenu = Graph(go.HTMLInfo, {
      show: this.showContextMenu.bind(this),
      hide: this.hideContextMenu.bind(this),
    });

    const node = Graph(
      go.Shape,
      {
        portId: '',
        fromLinkable: true,
        toLinkable: true
      },
      new go.Binding('figure', 'fig'),
      new go.Binding('fill', 'fill'),
      new go.Binding('radius', 'radius'),
    );

    graph.toolManager.linkingTool.temporaryLink = Graph(
      go.Link,
      { layerName: 'Tool' },
      Graph(
        go.Shape,
        { stroke: 'red', strokeWidth: 2, strokeDashArray: [4, 2]}
      )
    );

    const nodeText = Graph(
      go.TextBlock,
      {
        margin: 5
      },
      new go.Binding('text', 'text'),
      new go.Binding('font', 'font'),
    );

    graph.nodeTemplate = Graph(
      go.Node,
      'Auto',
      { contextMenu },
      node,
      nodeText
    );

    graph.linkTemplate = Graph(
      go.Link,
      {
        relinkableFrom: true,
        relinkableTo: true,
        contextMenu
      },
      Graph(go.Shape),
      Graph(
        go.Shape,
        { toArrow: 'Standard' }
      ),
      Graph(
        go.TextBlock,
        new go.Binding('text', 'text'),
        new go.Binding('font', 'font')
      )
    );
    graph.model = new go.GraphLinksModel(nodeData, linkData);
    graph.addModelChangedListener(this.onModelChanged.bind(this));
    return graph;
  },

  showContextMenu(obj, diagram) {
    this.contextMenuElement.classList.add('blue-value-graph__menu--active');
    const {x, y} = diagram.lastInput.viewPoint;
    this.contextMenuElement.style.left = `${x}px`;
    this.contextMenuElement.style.top = `${y}px`;
    window.addEventListener('click', this.onWindowClick.bind(this), true);
    this.set('contextMenuObject', obj);
  },

  hideContextMenu() {
    this.contextMenuElement.classList.remove('blue-value-graph__menu--active');
    window.removeEventListener('click', this.onWindowClick.bind(this), true);
  },

  onWindowClick() {
    if (this.graph.currentTool instanceof go.ContextMenuTool) {
      this.graph.currentTool.doCancel();
    }
  },

  createContextMenu() {
    const contextMenuElement = this.element.querySelector('.dropdown-menu');
    contextMenuElement.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    }, false);
    return contextMenuElement;
  },


  onModelChanged(event) {
    if (!event.isTransactionFinished) {
      return;
    }
    if (event.oldValue === 'Initial Layout') {
      // skip first change
      return;
    }
    this.onChange && this.onChange(event.model);
  }
});
