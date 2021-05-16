import Typography from '@material-ui/core/Typography';
import React, {useEffect, useState} from "react";
import Diagram, { useSchema, createSchema } from 'beautiful-react-diagrams';
import 'beautiful-react-diagrams/styles.css';
import './diagram.css';
import { GetMockName, GetMockSchemaSize } from '../mock/vhostMock';

const initialSchema = createSchema(
    {
        nodes: [
            { id: 'a-1', content: 'a1.xyz', coordinates: [220, 100], },
            { id: 'a-1_cname-1', content: 'cname1.a1.xyz', coordinates: [50, 50], },
            { id: 'a-1_cname-2', content: 'cname2.a1.xyz', coordinates: [35, 100], },
            { id: 'a-1_cname-3', content: 'cname3.a1.xyz', coordinates: [50, 150], },

            { id: 'a-2', content: 'a2.xyz', coordinates: [220, 250], },
            { id: 'a-2_cname-1', content: 'cname1.a2.xyz', coordinates: [50, 200], },
            { id: 'a-2_cname-2', content: 'cname2.a2.xyz', coordinates: [35, 250], },
            { id: 'a-2_cname-3', content: 'cname3.a2.xyz', coordinates: [50, 300], },

            { id: 'a-3', content: 'a3.xyz', coordinates: [220, 400], },
            { id: 'a-3_cname-1', content: 'cname1.a3.xyz', coordinates: [50, 350], },
            { id: 'a-3_cname-2', content: 'cname2.a3.xyz', coordinates: [35, 400], },
            { id: 'a-3_cname-3', content: 'cname3.a3.xyz', coordinates: [50, 450], },

            { id: 'ip-1', content: '127.0.0.1', coordinates: [400, 250], },

            { id: 'sg-1', content: 'svg-localhost', coordinates: [520, 250], },

            { id: 'ba-1', content: '10.1:300', coordinates: [640, 200], },
            { id: 'ba-2', content: '20.2:300', coordinates: [640, 300], },

            { id: 'inst-1', content: 'bla', coordinates: [740, 250], },

            { id: 'vhost-1', content: 'w', coordinates: [870, 100], },
            { id: 'vhost-2', content: 'x', coordinates: [870, 200], },
            { id: 'vhost-3', content: 'y', coordinates: [870, 300], },
            { id: 'vhost-4', content: 'z', coordinates: [870, 400], },
        ],
        links: [
            { input: 'a-1',  output: 'a-1_cname-1', readonly: true },
            { input: 'a-1',  output: 'a-1_cname-2', readonly: true },
            { input: 'a-1',  output: 'a-1_cname-3', readonly: true },

            { input: 'a-2',  output: 'a-2_cname-1', readonly: true },
            { input: 'a-2',  output: 'a-2_cname-2', readonly: true },
            { input: 'a-2',  output: 'a-2_cname-3', readonly: true },

            { input: 'a-3',  output: 'a-3_cname-1', readonly: true },
            { input: 'a-3',  output: 'a-3_cname-2', readonly: true },
            { input: 'a-3',  output: 'a-3_cname-3', readonly: true },

            { input: 'ip-1',  output: 'a-1', readonly: true },
            { input: 'ip-1',  output: 'a-2', readonly: true },
            { input: 'ip-1',  output: 'a-3', readonly: true },

            { input: 'sg-1',  output: 'ip-1', readonly: true },

            { input: 'ba-1',  output: 'sg-1', readonly: true },
            { input: 'ba-2',  output: 'sg-1', readonly: true },

            { input: 'inst-1',  output: 'ba-1', readonly: true },
            { input: 'inst-1',  output: 'ba-2', readonly: true },

            { input: 'vhost-1',  output: 'inst-1', readonly: true },
            { input: 'vhost-2',  output: 'inst-1', readonly: true },
            { input: 'vhost-3',  output: 'inst-1', readonly: true },
            { input: 'vhost-4',  output: 'inst-1', readonly: true },
        ]
    }
);

export default function VhostDiagram(props) {
    const [schema, { onChange }] = useSchema(initialSchema);
    const [styleRoot, setStyleRoot] = useState("light")
    const name = GetMockName()
    const size = GetMockSchemaSize()

    useEffect(() => {
        setStyleRoot(props.materialThemeName)
    }, [props.materialThemeName])
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Vhost {name}
            </Typography>
            <div style={{ height: size }} className={styleRoot}>
                <Diagram schema={schema} onChange={onChange} />
            </div>
        </div>
    )
}
