import { Dropdown, Panel, PrimaryButton, Stack } from '@fluentui/react';
import * as React from 'react';
import { opcionesEstado } from './opcionesEstado';
import { opcionesImportancia } from './opcionesImportancia';
import { opcionesPais } from './opcionesPais';

export interface IFilterPanelProps {
  isOpenFilter: boolean;
  toggleFilter: any;
  pais: any;
  estado: any;
  importancia: any;
  setPais: any;
  setEstado: any;
  setImportancia: any;
}

export const FilterPanel: React.FunctionComponent<IFilterPanelProps> = (
  props: React.PropsWithChildren<IFilterPanelProps>
) => {
  return (
    <>
      <Panel
        isLightDismiss
        isOpen={props.isOpenFilter}
        onDismiss={props.toggleFilter}
        closeButtonAriaLabel='Cerrar'
        headerText='Filtrar'
      >
        <Stack tokens={{ childrenGap: 10 }}>
          <Dropdown
            label='País'
            placeholder='País'
            options={opcionesPais}
            style={{ minWidth: '150px' }}
            defaultSelectedKey={props.pais.key}
            multiSelect={false}
            onChange={(ev, item) => props.setPais(item)}
          />
          <Dropdown
            placeholder='Estado'
            label='Estado'
            options={opcionesEstado}
            style={{ minWidth: '150px' }}
            defaultSelectedKey={props.estado.key}
            multiSelect={false}
            onChange={(ev, item) => props.setEstado(item)}
          />
          <Dropdown
            placeholder='Importancia'
            label='Importancia'
            options={opcionesImportancia}
            style={{ minWidth: '150px' }}
            defaultSelectedKey={props.importancia.key}
            multiSelect={false}
            onChange={(ev, item) => props.setImportancia(item)}
          />
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <PrimaryButton text='Cerrar' onClick={() => props.toggleFilter()} />
          </Stack>
        </Stack>
      </Panel>
    </>
  );
};
