import React from 'react';
import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DiagramModel
} from '@projectstorm/react-diagrams';

import {
    CanvasWidget
} from '@projectstorm/react-canvas-core';

import './reactDiagrams.css';

export default function ReactDiagrams(props) {
    const engine = createEngine();

    const node1 = new DefaultNodeModel({
        name: 'Node 1',
        color: 'rgb(0,192,255)',
    });
    node1.setPosition(100, 100);
    node1.addOutPort('out');
    node1.addOutPort('in');

    const node2 = new DefaultNodeModel({
        name: 'Node 1',
        color: 'rgb(0,192,255)',
    });
    node2.setPosition(400, 100);
    node2.addOutPort('in');

    const link1 = new DefaultLinkModel();
    link1.setSourcePort(node1.getPort('out'));
    link1.setTargetPort(node2.getPort('in'));

    const model = new DiagramModel();
    model.addAll(node1, node2, link1);
    engine.setModel(model);

    return (
        <div style={{ height: '600px' }} >
            <CanvasWidget engine={engine} className="diagram-container"/>
        </div>
    )
}


