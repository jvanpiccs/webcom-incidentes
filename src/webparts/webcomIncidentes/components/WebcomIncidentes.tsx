import * as React from 'react';
import styles from './WebcomIncidentes.module.scss';
import { Dropdown, IconButton, Separator, Stack, Text } from '@fluentui/react';
import useGetItems from './getItems';
import { Incidente } from './Incidente';
import { useBoolean } from '@fluentui/react-hooks';
import { opcionesEstado } from './opcionesEstado';

export interface IWebcomIncidentesProps {
  description: string;
}

export const WebcomIncidentes: React.FunctionComponent<IWebcomIncidentesProps> =
  (props: React.PropsWithChildren<IWebcomIncidentesProps>) => {
    const [filter, { toggle: toggleFilter }] = useBoolean(true);

    const [estado, setEstado] = React.useState(opcionesEstado[0]);

    const { incidentes } = useGetItems(estado);

    return (
      <Stack>
        <Stack horizontal>
          <Text variant='large'>Incidentes</Text>
          <IconButton
            iconProps={{ iconName: 'Filter' }}
            onClick={() => toggleFilter()}
          />
        </Stack>
        <div style={{ display: !filter && 'none' }}>
          <Text>Filtros</Text>
          <Stack horizontal>
            <Dropdown
              placeholder='Estado'
              label='Estado'
              options={opcionesEstado}
              style={{minWidth:'150px'}}
              defaultSelectedKey={estado.key}
              multiSelect={false}
              onChange={(ev,item)=>setEstado(item)}
            />
          </Stack>
        </div>
        <Separator />
        {incidentes.length > 0
          ? incidentes.map((i) => <Incidente item={i} />)
          : 'No hay incidentes'}
      </Stack>
    );
  };
