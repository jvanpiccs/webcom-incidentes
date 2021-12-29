import * as React from 'react';
import { DefaultButton, Dialog, DialogContent, DialogFooter, DialogType, IconButton, Label, Link, MessageBar, MessageBarType, NeutralColors, ResponsiveMode, Stack, Text } from "@fluentui/react";
import { useBoolean, useId } from '@uifabric/react-hooks';


export interface IIncidenteProps {
    item:any;
}

export const Incidente: React.FunctionComponent<IIncidenteProps> = (props: React.PropsWithChildren<IIncidenteProps>) => {
    const i = props.item;
    const typeMsg = i.Importancia == 'Alta' ? MessageBarType.error : i.Importancia == 'Media' ? MessageBarType.warning :i.Importancia == 'Baja' ? MessageBarType.info : i.Importancia == 'Ninguna' ? MessageBarType.success : null;


    const labelId: string = useId('dialogLabel');
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

    const dialogContentProps = {
        type: DialogType.normal,
        title: `${i?.Pais} - ${i?.Estado} - ${i?.Title}`,
        closeButtonAriaLabel: 'Cerrar'
      };
    const modalProps = React.useMemo(
        () => ({
          titleAriaId: labelId,
          isBlocking: false,
        }),
        [labelId],
      );

    return (
         <MessageBar
            messageBarType={typeMsg}>
                <img
                src={require(`../assets/Flag_of_${i?.Pais}.svg`)}
                width='20px'
                style={{marginRight:10, paddingTop:3}}
                />
                <Link onClick={toggleHideDialog} color={NeutralColors.black}>
                    {new Date(i?.Created).toLocaleDateString('es-AR')} - {i?.Estado} - {i?.Title}
                </Link>

                <Dialog
                    hidden={hideDialog}
                    onDismiss={toggleHideDialog}
                    dialogContentProps={dialogContentProps}
                    modalProps={modalProps}
                    responsiveMode={ResponsiveMode.medium}
                    maxWidth={600}
                >
                        <Stack>
                            <Label>Negocio</Label>
                            <Text>{i?.Negocio.join(', ')}</Text>
                            <Label>Área afectada</Label>
                            <Text>{i?.AreasAfectada.join(', ')}</Text>
                            <Label>Área responsable</Label>
                            <Text>{i?.AreasResponsables.join(', ')}</Text>
                            <Label>Detalle</Label>
                            <Text>{i?.Detalle}</Text>
                            <Label>Fecha</Label>
                            <Text>{new Date(i?.Created).toLocaleString('es-Ar')}</Text>
                            <Label>Importancia</Label>
                            <Text>{i?.Importancia}</Text>
                        </Stack>
                    <DialogFooter>
                        <DefaultButton onClick={toggleHideDialog} text="Cerrar" />
                    </DialogFooter>
                </Dialog>        
      </MessageBar>
      );
};