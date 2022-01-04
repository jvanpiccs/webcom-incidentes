import * as React from 'react';
import {
  DefaultPalette,
  Icon,
  Link,
  NeutralColors,
  SemanticColorSlots,
  SharedColors,
  Stack,
  Text,
  ThemeProvider,
  DefaultButton,
  IStackStyles,
} from '@fluentui/react';
import { MotionAnimations } from '@fluentui/react/node_modules/@fluentui/theme';

export interface IListItemIncidenteProps {
  item: any;
  openItem: any;
}
const stackStyles: IStackStyles = {
  root: {
    animation:MotionAnimations.fadeIn,
    backgroundColor:NeutralColors.gray10,
    minWidth:250,
    maxWidth:300,
    borderRadius:4,
    ':hover':{
        backgroundColor:NeutralColors.gray20,   
        cursor:'pointer',    
    }
  }
};
export const ListItemIncidente: React.FunctionComponent<IListItemIncidenteProps> =
  (props: React.PropsWithChildren<IListItemIncidenteProps>) => {
    const i = props.item;
    let colorImportancia =
      i.Importancia == 'Alta'
        ? SharedColors.red10
        : i.Importancia == 'Media'
        ? SharedColors.orange10
        : i.Importancia == 'Baja'
        ? SharedColors.green10
        : SharedColors.gray40;
    let iconStatus =
      i.Estado == 'Abierto'
        ? 'AlertSolid'
        : i.Estado == 'Solucionado'
        ? 'CompletedSolid'
        : i.Estado == 'Reportado'
        ? 'DRM'
        : 'VerifiedBrandSolid';
    let colorStatus =
      i.Estado == 'Abierto'
        ? SharedColors.orange10
        : i.Estado == 'Solucionado'
        ? SharedColors.green10
        : i.Estado == 'Reportado'
        ? SharedColors.red10
        : SharedColors.green20;

    return (
      <>
        <Stack
          onClick={() => props.openItem(i)}
          horizontal
          tokens={{ childrenGap: 5, padding: 10 }}

          styles={stackStyles}
        >
          <Icon
            iconName={iconStatus}
            style={{ color: colorStatus, paddingTop: 2 }}
          />
          <Stack>
            <Text style={{ fontWeight: 600 }}>{i.Title}</Text>
            <Text variant='small'>
              Importancia {i.Importancia} - Estado {i.Estado}
            </Text>
            <Text variant='tiny' style={{ color: NeutralColors.gray200 }}>
              <img
                src={require(`../assets/Flag_of_${i?.Pais}.svg`)}
                height='10px'
                style={{ marginRight: 10, paddingTop: 3 }}
              />
              Creado {new Date(i?.Created).toLocaleDateString('es-AR')} -
              Modificacion {new Date(i?.Modified).toLocaleDateString('es-AR')}
            </Text>
          </Stack>
        </Stack>
      </>
    );
  };
