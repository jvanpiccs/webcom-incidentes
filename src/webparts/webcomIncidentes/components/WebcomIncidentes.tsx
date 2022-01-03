import * as React from 'react';
import {
  ActionButton,
  Dropdown,
  MessageBar,
  MessageBarType,
  Panel,
  Stack,
  Text,
  PrimaryButton,
  Shimmer,
} from '@fluentui/react';
import useGetItems from './getItems';
import { useBoolean } from '@fluentui/react-hooks';
import { opcionesEstado } from './opcionesEstado';
import { ListIncidentes } from './ListIncidentes';
import { opcionesPais } from './opcionesPais';
import { opcionesImportancia } from './opcionesImportancia';

export interface IWebcomIncidentesProps {
  description: string;
}

export const WebcomIncidentes: React.FunctionComponent<IWebcomIncidentesProps> =
  (props: React.PropsWithChildren<IWebcomIncidentesProps>) => {
    //Filtros
    const [isOpenFilter, { toggle: toggleFilter }] = useBoolean(false);
    const [estado, setEstado] = React.useState(opcionesEstado[0]);
    const [pais, setPais] = React.useState(opcionesPais[0]);
    const [importancia, setImportancia] = React.useState(
      opcionesImportancia[0]
    );

    const resetFilters = () => {
      setEstado(opcionesEstado[0]);
      setPais(opcionesPais[0]);
      setImportancia(opcionesImportancia[0]);
    };

    //resultados
    const { incidentes, isLoading } = useGetItems(estado, pais, importancia);

    return (
      <Stack>
        <Stack
          horizontal
          horizontalAlign='space-between'
          verticalAlign='center'
        >
          <Text variant='large'>Incidentes</Text>
          <ActionButton
            text='Filtrar'
            iconProps={{ iconName: 'Filter' }}
            onClick={() => toggleFilter()}
          />
        </Stack>
        <Panel
          isLightDismiss
          isBlocking={false}
          isOpen={isOpenFilter}
          onDismiss={toggleFilter}
          closeButtonAriaLabel='Cerrar'
          headerText='Filtrar'
        >
          <Stack tokens={{ childrenGap: 10 }}>
            <Dropdown
              label='País'
              placeholder='País'
              options={opcionesPais}
              style={{ minWidth: '150px' }}
              defaultSelectedKey={pais.key}
              multiSelect={false}
              onChange={(ev, item) => setPais(item)}
            />
            <Dropdown
              placeholder='Estado'
              label='Estado'
              options={opcionesEstado}
              style={{ minWidth: '150px' }}
              defaultSelectedKey={estado.key}
              multiSelect={false}
              onChange={(ev, item) => setEstado(item)}
            />
            <Dropdown
              placeholder='Importancia'
              label='Importancia'
              options={opcionesImportancia}
              style={{ minWidth: importancia.key }}
              defaultSelectedKey={importancia.key}
              multiSelect={false}
              onChange={(ev, item) => setImportancia(item)}
            />
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              {/* <PrimaryButton
                text='Resetear'
                onClick={() => resetFilters()}
              /> */}
              <PrimaryButton text='Cerrar' onClick={() => toggleFilter()} />
            </Stack>
          </Stack>
        </Panel>
        {isLoading && (
          <Stack tokens={{ childrenGap: 10 }}>
            <Shimmer />
            <Shimmer width={'75%'} />
            <Shimmer width={'50%'} />
          </Stack>
        )}
        {!isLoading && incidentes.length == 0 && (
          <MessageBar messageBarType={MessageBarType.info}>
            No se encontraron incidentes bajo los filtros seleccionados.
          </MessageBar>
        )}
        {!isLoading && incidentes.length > 0 && (
          <ListIncidentes items={incidentes} />
        )}
      </Stack>
    );
  };
