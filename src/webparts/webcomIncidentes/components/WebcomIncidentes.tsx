import * as React from 'react';
import {
  ActionButton,
  Dropdown,
  IconButton,
  Panel,
  Separator,
  Stack,
  Text,
} from '@fluentui/react';
import useGetItems from './getItems';
import { Incidente } from './Incidente';
import { useBoolean } from '@fluentui/react-hooks';
import { opcionesEstado } from './opcionesEstado';
import { PrimaryButton } from '@microsoft/office-ui-fabric-react-bundle';

export interface IWebcomIncidentesProps {
  description: string;
}

export const WebcomIncidentes: React.FunctionComponent<IWebcomIncidentesProps> =
  (props: React.PropsWithChildren<IWebcomIncidentesProps>) => {
    const [isOpenFilter, {setTrue:openFilter, setFalse: dissmissFilter, toggle: toggleFilter }] =
      useBoolean(true);

    const [estado, setEstado] = React.useState(opcionesEstado[0]);

    const { incidentes } = useGetItems(estado);

    return (
      <Stack>
        <Stack horizontal horizontalAlign='space-between' verticalAlign='center'>
          <Text variant='large'>Incidentes</Text>
          <ActionButton
            text='Filtros'
            iconProps={{ iconName: 'Filter' }}
            onClick={() => toggleFilter()}
          />
        </Stack>
        <Panel
          isLightDismiss
          isBlocking={false}
          isOpen={isOpenFilter}
          onDismiss={dissmissFilter}
          closeButtonAriaLabel='Cerrar'
          headerText='Filtros de Incidentes'
        >
          <Dropdown
            placeholder='Estado'
            label='Estado'
            options={opcionesEstado}
            style={{ minWidth: '150px' }}
            defaultSelectedKey={estado.key}
            multiSelect={false}
            onChange={(ev, item) => setEstado(item)}
          />
          <PrimaryButton text='Cerrar' onClick={() => dissmissFilter()} />
        </Panel>
        {incidentes.length > 0 && incidentes.map((i) => <Incidente item={i} />)}
        {incidentes.length = 0 && `No hay incidentes en estado ${estado.text}`}
      </Stack>
    );
  };
