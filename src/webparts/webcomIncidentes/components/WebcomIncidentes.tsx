import * as React from 'react';
import {
  ActionButton,
  MessageBar,
  MessageBarType,
  Stack,
  Text,
  Shimmer,
  Link,
} from '@fluentui/react';
import useGetItems from './getItems';
import { useBoolean } from '@fluentui/react-hooks';
import { opcionesEstado } from './opcionesEstado';
import { ListIncidentes } from './ListIncidentes';
import { opcionesPais } from './opcionesPais';
import { opcionesImportancia } from './opcionesImportancia';
import { MotionAnimations } from '@fluentui/react/node_modules/@fluentui/theme';
import { FilterPanel } from './FilterPanel';

export interface IWebcomIncidentesProps {
  description: string;
}

export const WebcomIncidentes: React.FunctionComponent<IWebcomIncidentesProps> =
  (props: React.PropsWithChildren<IWebcomIncidentesProps>) => {
    //Filtros
    const [isOpenFilter, { setTrue: openFilter, toggle: toggleFilter }] =
      useBoolean(false);
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
      <Stack style={{ animation: MotionAnimations.fadeIn }}>
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
        <Stack horizontal wrap tokens={{ childrenGap: 5 }} style={{marginBottom:10}}>
          <Text>Filtros {'>'}</Text>
          <Link onClick={(ev) => openFilter()}>País {pais.text}</Link>
          <Text>{'>'}</Text>
          <Link onClick={(ev) => openFilter()}>{estado.text}</Link>
          <Text>{'>'}</Text>
          <Link onClick={(ev) => openFilter()}>
            Importancia {importancia.text}
          </Link>
        </Stack>
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
        <FilterPanel
          {...{
            isOpenFilter,
            toggleFilter,
            pais,
            estado,
            importancia,
            setPais,
            setEstado,
            setImportancia,
          }}
        />
      </Stack>
    );
  };
