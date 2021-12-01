import * as React from 'react';
import styles from './WebcomIncidentes.module.scss';
import { Stack, Text } from '@fluentui/react';
import useGetItems from './getItems';
import {Incidente} from './Incidente';


export interface IWebcomIncidentesProps {
  description:string;
}

export const WebcomIncidentes: React.FunctionComponent<IWebcomIncidentesProps> = (props: React.PropsWithChildren<IWebcomIncidentesProps>) => {
  const { incidentes } = useGetItems();

  return (
    <Stack>
        {incidentes.length > 0 ?
        incidentes.map((i)=> <Incidente item={i}/>)  
      : "No hay incidentes"}
      </Stack>
  );
};


