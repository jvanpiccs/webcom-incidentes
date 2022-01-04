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
  StackItem,
  Text,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { ListItemPanelIncidente } from './ListItemPanelIncidente';
import { ListItemIncidente } from './ListItemIncidente';

export interface IListIncidentesProps {
  items: any;
}

export const ListIncidentes: React.FunctionComponent<IListIncidentesProps> = (
  props: React.PropsWithChildren<IListIncidentesProps>
) => {
  const [viewItem, setViewItem] = React.useState<any>(null);
  const [isOpenViewItem, { toggle: toggleViewItemPanel }] = useBoolean(false);

  const openItem = (i) => {
    setViewItem(i);
    toggleViewItemPanel();
  };
  return (
    <>
      <Stack wrap horizontal tokens={{ childrenGap: 10 }}>
        {props.items.map((i) => (
          <ListItemIncidente item={i} openItem={openItem} />
        ))}
      </Stack>
      {viewItem != null && (
        <Panel
          isOpen={isOpenViewItem}
          isLightDismiss={true}
          onDismiss={toggleViewItemPanel}
          headerText={viewItem?.Title}
          closeButtonAriaLabel='Cerrar'
        >
          <ListItemPanelIncidente item={viewItem} />
        </Panel>
      )}
    </>
  );
};
