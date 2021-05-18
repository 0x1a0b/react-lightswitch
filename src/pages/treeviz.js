import React from 'react';
import { TreevizReact } from 'treeviz-react';
import Typography from "@material-ui/core/Typography";

const data = [
    { id: 1, text_1: 'Chaos', text_2: 'Void', father: null, color: '#FF5722' },
    { id: 2, text_1: 'Tartarus', text_2: 'Abyss', father: 1, color: '#FFC107' },
    { id: 3, text_1: 'Gaia', text_2: 'Earth', father: 1, color: '#8BC34A' },
    { id: 4, text_1: 'Eros', text_2: 'Desire', father: 1, color: '#00BCD4' },
];

const Foo = () => {
    return (
        <TreevizReact
            data={data}
            idKey={'id'}
            relationnalField={'father'}
            nodeWidth={200}
            nodeHeight={100}
            mainAxisNodeSpacing={2}
            secondaryAxisNodeSpacing={1.3}
            renderNode={(node) =>
                `<div style="height:${node.settings.nodeHeight}px;display:flex;align-items:center;margin-left:12px">Node name: ${node.data.text_1}</div>`
            }
            onNodeClick={(node) => console.log('you clicked on node ' + node.id)}
            duration={500}
            linkWidth={(node) => 3}
        />
    );
};


export default function Treeviz() {
    return (
        <div className="App">
            <Typography variant="h2" gutterBottom>
                Treeviz
            </Typography>
            <Typography variant="body1" gutterBottom>
                https://github.com/PierreCapo/treeviz/tree/master/packages/treeviz-react
            </Typography>
            <Foo />
        </div>
    );
}