import { Label, Stack, Text } from '@fluentui/react';
import * as React from 'react';

export interface IListIncidenteItemProps {
  item: any;
}

export const ListIncidenteItem: React.FunctionComponent<IListIncidenteItemProps> =
  (props: React.PropsWithChildren<IListIncidenteItemProps>) => {
    let item = props.item;
    return (
      <Stack>
        <Label>País</Label>
        <Text>{item.Pais}</Text>
        <Label>Creación del incidente</Label>
        <Text>{new Date(item.Created).toLocaleString('es-AR')}</Text>
        <Label>Última modificacion</Label>
        <Text>{new Date(item.Modified).toLocaleString('es-AR')}</Text>
        <Label>Estado</Label>
        <Text>{item.Estado}</Text>
        <Label>Importancia</Label>
        <Text>{item.Importancia}</Text>
      </Stack>
    );
  };
