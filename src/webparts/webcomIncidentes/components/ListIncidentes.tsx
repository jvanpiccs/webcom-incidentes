import * as React from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Icon,
  IDetailsColumnProps,
  Label,
  Link,
  List,
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
  console.log({ viewItem });

  let columns: IColumn[] = [
    {
      key: 'country',
      name: 'Pais',
      fieldName: 'Pais',
      minWidth: 20,
      maxWidth: 30,
      onRender: (item) => (
        <img
          src={require(`../assets/Flag_of_${item?.Pais}.svg`)}
          width='20px'
          style={{ marginRight: 10, paddingTop: 3 }}
        />
      ),
    },
    {
      key: 'date',
      name: 'Fecha',
      fieldName: 'Created',
      minWidth: 50,
      maxWidth: 80,
      onRender: (item) => (
        <Text>{new Date(item?.Created).toLocaleDateString('es-AR')}</Text>
      ),
    },
    {
      key: 'importance',
      name: 'Importancia',
      fieldName: 'Importancia',
      minWidth: 50,
      maxWidth: 80,
      onRender: (item) => (
        <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 5 }}>
          <Icon
            iconName={
              item.Importancia == 'Alta'
                ? 'CaretSolidUp'
                : item.Importancia == 'Media'
                ? 'CaretSolidRight'
                : item.Importancia == 'Baja'
                ? 'CaretSolidDown'
                : 'SkypeMinus'
            }
            style={{
              color:
                item.Importancia == 'Alta'
                  ? SharedColors.red10
                  : item.Importancia == 'Media'
                  ? SharedColors.orange10
                  : item.Importancia == 'Baja'
                  ? SharedColors.green10
                  : SharedColors.gray10,
            }}
          />
          <Text>{item.Importancia}</Text>
        </Stack>
      ),
    },
    {
      key: 'status',
      name: 'Estado',
      fieldName: 'Estado',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item) => (
        <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 5 }}>
          <Icon
            iconName={
              item.Estado == 'Abierto'
                ? 'AlertSolid'
                : item.Estado == 'Solucionado'
                ? 'CompletedSolid'
                : item.Estado == 'Reportado'
                ? 'DRM'
                : 'VerifiedBrandSolid'
            }
            style={{
              fontSize: 14,
              color:
                item.Estado == 'Abierto'
                  ? SharedColors.orange10
                  : item.Estado == 'Solucionado'
                  ? SharedColors.green10
                  : item.Estado == 'Reportado'
                  ? SharedColors.red10
                  : SharedColors.green20,
            }}
          />
          <Text>{item.Estado} </Text>
        </Stack>
      ),
    },
    {
      key: 'title',
      name: 'Incidente',
      fieldName: 'Title',
      minWidth: 100,
      onRender: (item) => (
        <Text
          onClick={(ev) => {
            setViewItem(item);
            toggleViewItemPanel();
          }}
        >
          <Link>{item.Title}</Link>
        </Text>
      ),
    },
  ];

  return (
    <>
      <DetailsList
        items={props.items}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
      />
      {viewItem != null && (
        <Panel
          isOpen={isOpenViewItem}
          isLightDismiss={true}
          onDismiss={toggleViewItemPanel}
          type={PanelType.medium}
          headerText={viewItem?.Title}
          closeButtonAriaLabel='Cerrar'
        >
          <ListIncidenteItem item={viewItem} />
        </Panel>
      )}
    </>
  );
};
