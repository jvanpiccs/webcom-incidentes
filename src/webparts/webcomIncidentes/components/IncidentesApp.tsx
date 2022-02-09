import * as React from 'react';
import {
  Text,
  Callout,
  IconButton,
  Link,
  mergeStyleSets,
  Stack,
} from '@fluentui/react';
import {
  FontWeights,
  MotionAnimations,
} from '@fluentui/react/node_modules/@fluentui/theme';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { useBoolean, useId } from '@fluentui/react-hooks';
import useGetItems from '../services/useGetItems';
import useCount from '../services/useCount';
import { IncidenteDetails } from './IncidenteDetails';
import { delay } from 'lodash';

export interface IIncidentesAppProps {
  themeVariant: IReadonlyTheme | undefined;
}

export const IncidentesApp: React.FunctionComponent<IIncidentesAppProps> = (
  props: React.PropsWithChildren<IIncidentesAppProps>
) => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);

  const { semanticColors }: IReadonlyTheme = props.themeVariant;
  const { items, isLoading } = useGetItems();
  const { count, increment, decrement, reset } = useCount(items?.length - 1);
  const item = items?.[count];

  const buttonId = useId(`incidenteId`);
  const labelId = useId(`incidenteLabelId`);
  const descriptionId = useId('descriptionId');

  React.useEffect(() => {});
  return (
    <>
      {isLoading && 'Cargando...'}

      {!isLoading && items.length != 0 && (
        <Stack
          style={{
            color: semanticColors.accentButtonText,
            padding: '10px 20px',
            backgroundColor: semanticColors.accentButtonBackground,
          }}
        >
          <Stack
            horizontal
            horizontalAlign='space-between'
            verticalAlign='center'
          >
            <Link
              id={buttonId}
              onClick={() => {
                toggleIsCalloutVisible();
              }}
              style={{
                animation: MotionAnimations.fadeIn,
                color: semanticColors.accentButtonText,
              }}
            >
              {items[count]?.Detalle}
            </Link>
            {isCalloutVisible && (
              <Callout
                style={{
                  width: 320,
                  maxWidth: '90%',
                  padding: '20px 24px',
                }}
                ariaLabelledBy={labelId}
                ariaDescribedBy={descriptionId}
                gapSpace={0}
                target={`#${buttonId}`}
                onDismiss={toggleIsCalloutVisible}
                setInitialFocus
              >
                <IncidenteDetails item={item} />
              </Callout>
            )}
            <Stack horizontal verticalAlign='center'>
              <IconButton
                style={{ color: semanticColors.accentButtonText }}
                iconProps={{ iconName: 'ChevronLeft' }}
                onClick={() => decrement()}
              />
              <div className={'counter'}>
                {count + 1} / {items.length}
              </div>
              <IconButton
                style={{ color: semanticColors.accentButtonText }}
                iconProps={{
                  iconName: 'ChevronRight',
                }}
                onClick={() => increment()}
              />
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};
