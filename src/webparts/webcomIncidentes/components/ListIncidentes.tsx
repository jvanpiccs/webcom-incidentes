import * as React from 'react';
import {
  ActionButton,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Icon,
  IDetailsColumnProps,
  Label,
  Link,
  List,
  NeutralColors,
  Panel,
  PanelType,
  SelectionMode,
  SharedColors,
  Stack,
  Text,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { ListIncidenteItem } from './ListItemIncidente';

export interface IListIncidentesProps {
  items: any;
}

export const ListIncidentes: React.FunctionComponent<IListIncidentesProps> = (
  props: React.PropsWithChildren<IListIncidentesProps>
) => {
  const [viewItem, setViewItem] = React.useState<any>(null);
  const [isOpenViewItem, { toggle: toggleViewItemPanel }] = useBoolean(false);

  const onRenderFlag = (i) => {
    return (
      <Stack>
        <img
          src={require(`../assets/Flag_of_${i?.Pais}.svg`)}
          width='20px'
          style={{ marginRight: 10, paddingTop: 3 }}
        />
      </Stack>
    );
  };
  const onRenderStatus = (i) => {
    return (
      <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 5 }}>
        <Icon
          iconName={
            i.Estado == 'Abierto'
              ? 'AlertSolid'
              : i.Estado == 'Solucionado'
              ? 'CompletedSolid'
              : i.Estado == 'Reportado'
              ? 'DRM'
              : 'VerifiedBrandSolid'
          }
          style={{
            fontSize: 14,
            color:
              i.Estado == 'Abierto'
                ? SharedColors.orange10
                : i.Estado == 'Solucionado'
                ? SharedColors.green10
                : i.Estado == 'Reportado'
                ? SharedColors.red10
                : SharedColors.green20,
          }}
        />
        <Text>{i.Estado} </Text>
      </Stack>
    );
  };
  const onRenderImportance = (i) => {
    let color =
      i.Importancia == 'Alta'
        ? SharedColors.red10
        : i.Importancia == 'Media'
        ? SharedColors.orange10
        : i.Importancia == 'Baja'
        ? SharedColors.green10
        : SharedColors.gray10;
    let icon =
      i.Importancia == 'Alta'
        ? 'CaretSolidUp'
        : i.Importancia == 'Media'
        ? 'CaretSolidRight'
        : i.Importancia == 'Baja'
        ? 'CaretSolidDown'
        : 'SkypeMinus';

    return (
      <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 5 }}>
        <Icon iconName={icon} style={{ color: color }} />
        <Text>Importancia {i.Importancia}</Text>
      </Stack>
    );
  };

  const onRenderItem = (i) => {
    return (
      <Stack>
        <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 5 }}>
          {onRenderFlag(i)}
          <Icon iconName='ChevronRight' />
          {onRenderStatus(i)}
          <Icon iconName='ChevronRight' />
          {onRenderImportance(i)}
          <Icon iconName='ChevronRight' />
          <Text style={{ fontWeight: 'bold' }}>{i.Title}</Text>
          <Stack horizontal horizontalAlign='end'>
            <Text>{new Date(i?.Created).toLocaleDateString('es-AR')}</Text>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  let columns: IColumn[] = [
    {
      key: 'item',
      name: 'Incidente',
      fieldName: 'Estado',
      minWidth: 200,
      onRender: (item) => onRenderItem(item),
    },
    // {
    //   key: 'date',
    //   name: 'Creado',
    //   fieldName: 'Created',
    //   minWidth: 100,
    //   onRender: (item) => (
    //     <Stack horizontalAlign='end' verticalAlign='center' verticalFill>
    //       <Text>{new Date(item?.Created).toLocaleDateString('es-AR')}</Text>
    //     </Stack>
    //   ),
    // },
  ];

  const openItem = (i) => {
    setViewItem(i);
    toggleViewItemPanel();
  };

  return (
    <>
      <DetailsList
        items={props.items}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
        onItemContextMenu={(item) => openItem(item)}
        onItemInvoked={(item) => openItem(item)}
        
      />
      {viewItem != null && (
        <Panel
          isOpen={isOpenViewItem}
          isLightDismiss={true}
          onDismiss={toggleViewItemPanel}
          headerText={viewItem?.Title}
          closeButtonAriaLabel='Cerrar'
        >
          <ListIncidenteItem item={viewItem} />
        </Panel>
      )}
    </>
  );
};
