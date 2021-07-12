import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import Typography from "@material-ui/core/Typography";
import data1 from './g6static-data1.json';



export default function G6Static2() {
    const ref = React.useRef(null);
    let graph = null;
    const [initial, setInitial] = React.useState(false);
    //const [width, setWidth] = React.useState(container.scrollWidth);
    //const [height, setHeight] = React.useState()container.scrollHeight || 500);

    useEffect(() => {
        const container = ReactDOM.findDOMNode(ref.current);
        let width = container.scrollWidth;
        let height = container.scrollHeight || 500 ;
        if (initial === false) {
          //  container.innerHTML = "";
        }
        if (!graph) {
            graph = new G6.TreeGraph({
                container: container,
                width,
                height,
                linkCenter: true,
                fitViewPadding: [ 50, 50, 50, 50 ],
                modes: {
                    default: [
                        {
                            type: 'collapse-expand',
                            onChange: function onChange(item, collapsed) {
                                const data = item.get('model');
                                data.collapsed = collapsed;
                                return true;
                            },
                        },
                        'drag-canvas',
                        'zoom-canvas',
                    ],
                },
                defaultNode: {
                    size: 26,
                },
                layout: {
                    type: 'dendrogram',
                    direction: 'LR',
                    nodeSep: 20,
                    rankSep: 100,
                    radial: true,
                },
            });

            graph.node(function (node) {
                return {
                    label: node.id,
                };
            });
        }
        graph.data(data1);
        graph.render();
        graph.fitView();
        setInitial(false);
        const handleResize = () => {
            if (!graph || graph.get('destroyed')) return;
            if (!container || !container.scrollWidth || !container.scrollHeight) return;
            //graph.changeSize(container.scrollWidth, container.scrollHeight);
            graph.fitCenter();
            //graph.refresh();
            //graph.fitView();
            console.log("changed size")
        };
        window.addEventListener('resize', handleResize)

        console.log(graph)
    }, []);

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                G6 Radial Tree
            </Typography>
            <Typography variant="body1" gutterBottom>
                https://g6.antv.vision/en/examples/tree/radialtree#radialDendrogram
            </Typography>

            <div ref={ref}></div>
        </div>
    );
}