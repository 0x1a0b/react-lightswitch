import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { data } from './g6data';
import G6 from '@antv/g6';
import Typography from "@material-ui/core/Typography";

export default function G6Test() {
    const ref = React.useRef(null);
    let graph = null;

    useEffect(() => {
        if (!graph) {
            graph = new G6.Graph({
                container: ReactDOM.findDOMNode(ref.current),
                width: 1200,
                height: 800,
                modes: {
                    default: ['drag-canvas'],
                },
                layout: {
                    type: 'dagre',
                    direction: 'LR',
                },
                defaultNode: {
                    type: 'node',
                    labelCfg: {
                        style: {
                            fill: '#000000A6',
                            fontSize: 10,
                        },
                    },
                    style: {
                        stroke: '#72CC4A',
                        width: 150,
                    },
                },
                defaultEdge: {
                    type: 'polyline',
                },
            });
        }
        graph.data(data);
        graph.render();
    }, []);

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                G6
            </Typography>
            <Typography variant="body1" gutterBottom>
                https://g6.antv.vision/en/docs/manual/advanced/g6InReact
                https://github.com/baizn/g6-in-react/blob/master/pages/tutorital.jsx
            </Typography>

            <div ref={ref}></div>
        </div>
    );
}