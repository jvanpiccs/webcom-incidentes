import * as React from 'react';
import {
  FontWeights,
  Label,
  SemanticColorSlots,
  Stack,
  Text,
} from '@fluentui/react';
import { IIncidente } from './IIncidente';

export interface IIncidenteDetailsProps {
  item: IIncidente;
}

export const IncidenteDetails: React.FunctionComponent<
  IIncidenteDetailsProps
> = (props: React.PropsWithChildren<IIncidenteDetailsProps>) => {
  let item = props.item;
  return (
    <>
      <Stack tokens={{ childrenGap: 10 }}>
        <Text
          block
          variant='xLarge'
          style={{
            marginBottom: 12,
            fontWeight: FontWeights.semilight,
          }}
        >
          {item.Title}
        </Text>
        <Text block>{item.Detalle}</Text>
        <Stack.Item>
          <Text block variant='small'>
            {item.Descripcion}
          </Text>
        </Stack.Item>
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <Stack.Item>
            <Label>Estado</Label>
            <Text>{item.Estado}</Text>
          </Stack.Item>
          <Stack.Item>
            <Label>Importancia</Label>
            <Text>{item.Importancia}</Text>
          </Stack.Item>
          <Stack.Item>
            <Label>País</Label>
            <Text>{item.Pais}</Text>
          </Stack.Item>
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <Stack.Item>
            <Label>Negocio</Label>
            {item.Negocio.map((i) => (
              <Text block>{i}</Text>
            ))}
          </Stack.Item>
          <Stack.Item>
            <Label>Areas afectadas</Label>
            {item.AreasAfectada.map((i) => (
              <Text block>{i}</Text>
            ))}
          </Stack.Item>
          <Stack.Item>
            <Label>Areas responsables</Label>
            {item.AreasResponsables.map((i) => (
              <Text block>{i}</Text>
            ))}
          </Stack.Item>
        </Stack>
      </Stack>
    </>
  );
};
