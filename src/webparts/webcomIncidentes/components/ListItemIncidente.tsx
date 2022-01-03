import {
  Label,
  Link,
  NeutralColors,
  SharedColors,
  Stack,
  Text,
} from '@fluentui/react';
import * as React from 'react';
import useGetAdjuntos from './getAdjuntos';

export interface IListIncidenteItemProps {
  item: any;
}

export const ListIncidenteItem: React.FunctionComponent<IListIncidenteItemProps> =
  (props: React.PropsWithChildren<IListIncidenteItemProps>) => {
    let item = props.item;

    const { adjuntos, isLoading } = useGetAdjuntos(item.ID);

    return (
      <Stack tokens={{ childrenGap: 10 }}>
        <div>
          <Label>País</Label>
          <Text>{item.Pais}</Text>
        </div>
        <div>
          <Label>Creación del incidente</Label>
          <Text>{new Date(item.Created).toLocaleString('es-AR')}</Text>
        </div>
        <div>
          <Label>Última modificacion</Label>
          <Text>{new Date(item.Modified).toLocaleString('es-AR')}</Text>
        </div>
        <div>
          <Label>Estado</Label>
          <Text>{item.Estado}</Text>
        </div>
        <div>
          <Label>Importancia</Label>
          <Text>{item.Importancia}</Text>
        </div>
        <div>
          <Label>Negocio</Label>
          <Stack horizontal>
            {item.Negocio.map((i) => (
              <div
                style={{
                  padding: 5,
                  backgroundColor: NeutralColors.gray20,
                  marginRight: 10,
                  borderRadius: 2,
                }}
              >
                <Text>{i}</Text>
              </div>
            ))}
          </Stack>
        </div>
        <div>
          <Label>Áreas Afectadas</Label>
          <Stack horizontal>
            {item.AreasAfectada.map((i) => (
              <div
                style={{
                  padding: 5,
                  backgroundColor: NeutralColors.gray20,
                  marginRight: 10,
                  borderRadius: 2,
                }}
              >
                <Text>{i}</Text>
              </div>
            ))}
          </Stack>
        </div>
        <div>
          <Label>Área Responsables</Label>
          <Stack horizontal>
            {item.AreasResponsables.map((i) => (
              <div
                style={{
                  padding: 5,
                  backgroundColor: NeutralColors.gray20,
                  marginRight: 10,
                  borderRadius: 2,
                }}
              >
                <Text>{i}</Text>
              </div>
            ))}
          </Stack>
        </div>
        <div>
          <Label>Detalle</Label>
          <div>{item.Detalle}</div>
        </div>
        {item.Attachments && (
          <div>
            <Label>Imagenes/Adjuntos</Label>
            {isLoading && <div>Cargando...</div>}
            {!isLoading && adjuntos != null && (
              <Stack>
                {
                adjuntos.map((i) => 
                  <Link href={i.ServerRelativeUrl} target='_blank'>
                    {i.FileName}
                  </Link>
                )}
              </Stack>
            )}
          </div>
        )}
      </Stack>
    );
  };
