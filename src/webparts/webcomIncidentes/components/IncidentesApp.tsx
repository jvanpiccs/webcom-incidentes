import * as React from 'react';
import {
  getTheme,
  IconButton,
  IStackStyles,
  Label,
  Link,
  Stack,
  Text,
  ThemeProvider,
} from '@fluentui/react';
import useGetItems from '../services/useGetItems';
import { MotionAnimations } from '@fluentui/react/node_modules/@fluentui/theme';
import useCount from '../services/useCount';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

const theme = getTheme();

const stackStyles: IStackStyles = {
  root: {
    backgroundColor: theme.palette.themePrimary,
    padding: '10px 20px',
    color: 'white',
  },
};

export interface IIncidentesAppProps {
  themeVariant: IReadonlyTheme | undefined;
}

export const IncidentesApp: React.FunctionComponent<IIncidentesAppProps> = (
  props: React.PropsWithChildren<IIncidentesAppProps>
) => {
  const { semanticColors }: IReadonlyTheme = props.themeVariant;

  const { items, isLoading } = useGetItems();
  const { count, increment, decrement, reset } = useCount(items?.length - 1);
  return (
    <>
      {isLoading && 'Cargando...'}

      {!isLoading && items.length != 0 && (
        <Stack
          style={{
            color: semanticColors.bodyText,
            padding: '10px 20px',
            backgroundColor: semanticColors.bodyBackground,
          }}
        >
          <Stack
            horizontal
            horizontalAlign='space-between'
            verticalAlign='center'
          >
            <div
              color={'#ffffff'}
              style={{ animation: MotionAnimations.fadeIn }}
            >
              {items[count]?.Detalle}
            </div>
            <Stack horizontal verticalAlign='center'>
              <IconButton
                iconProps={{ iconName: 'ChevronLeft' }}
                onClick={() => decrement()}
              />
              <div className={'counter'}>
                {count + 1} / {items.length}
              </div>
              <IconButton
                iconProps={{ iconName: 'ChevronRight' }}
                onClick={() => increment()}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};
