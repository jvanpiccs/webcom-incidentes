import * as React from 'react';
import { Callout, IconButton, Link, Stack, Text } from '@fluentui/react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { IncidenteDetails } from './IncidenteDetails';

import useGetItems from '../services/useGetItems';
import useCount from '../services/useCount';
import styles from './IncidentesApp.module.scss';

export interface IIncidentesAppProps {
  themeVariant: IReadonlyTheme | undefined;
}

export const IncidentesApp: React.FunctionComponent<IIncidentesAppProps> = (
  props: React.PropsWithChildren<IIncidentesAppProps>
) => {
  //!visibilidad del detalle
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);

  const { semanticColors }: IReadonlyTheme = props.themeVariant;
  //! items y counter
  const { items, isLoading } = useGetItems();
  const { count, increment, decrement } = useCount(items?.length - 1);
  const item = items?.[count];

  const buttonId = useId(`${item?.Id}`);
  const labelId = useId(`incidenteLabelId`);
  const descriptionId = useId('descriptionId');

  //incremento del counter cada 5 segundos
  React.useEffect(() => {
    let timer = setTimeout(() => {
      if (!isCalloutVisible) {
        increment();
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      {isLoading && `Cargando...`}
      {!isLoading && items.length != 0 && (
        <Stack className={styles.incidentes}>
          <Stack
            horizontal
            horizontalAlign='space-between'
            verticalAlign='center'
          >
            <Text>
              <Link
                className={styles.link}
                id={buttonId}
                onClick={() => {
                  toggleIsCalloutVisible();
                }}
              >
                {items[count]?.Detalle}
              </Link>
            </Text>
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
            {items.length > 1 && (
              <Stack horizontal verticalAlign='center' verticalFill>
                <IconButton
                  className={styles.icon}
                  iconProps={{ iconName: 'ChevronLeft' }}
                  onClick={() => decrement()}
                />
                <Stack
                  horizontal
                  verticalAlign='center'
                  className={styles.counter}
                  tokens={{ childrenGap: 5 }}
                >
                  <div>{count + 1}</div>
                  <div> / </div>
                  <div>{items.length}</div>
                </Stack>
                <IconButton
                  className={styles.icon}
                  iconProps={{
                    iconName: 'ChevronRight',
                  }}
                  onClick={() => increment()}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
};
