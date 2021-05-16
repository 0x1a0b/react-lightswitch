import Typography from '@material-ui/core/Typography';
import React, {useEffect, useState} from "react";
import Diagram, { useSchema, createSchema } from 'beautiful-react-diagrams';
import 'beautiful-react-diagrams/styles.css';
import './diagram.css';
import { GetMockName, GetMockSchema, GetMockSchemaSize } from '../mock/goHost';

const initialSchema = createSchema(GetMockSchema());

export default function GoDiagram(props) {
    const [schema, { onChange }] = useSchema(initialSchema);
    const [styleRoot, setStyleRoot] = useState("light")
    const name = GetMockName()
    const size = GetMockSchemaSize()

    useEffect(() => {
        setStyleRoot(props.materialThemeName)
    }, [props.materialThemeName])
    return (
        <div>
            <Typography variant="h6">
                {name}
            </Typography>
            <div style={{ height: size }} className={styleRoot}>
                <Diagram schema={schema} onChange={onChange} />
            </div>
        </div>
    )
}
