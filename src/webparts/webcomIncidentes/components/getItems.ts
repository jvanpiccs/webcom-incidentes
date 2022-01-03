import { useState, useEffect } from 'react';
import { Web } from '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

export default function useGetItems(estado: any, pais: any, importancia:any) {
  const [incidentes, setIncidentes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // get all the items from a list
      setIsLoading(true);
      let filterPais = pais.key == 'All' ? `Pais eq 'Argentina' or Pais eq 'Paraguay' or Pais eq 'Uruguay'` : `Pais eq '${pais.key}'`;
      
      const items: any[] = await Web(
        'https://claroaup.sharepoint.com/sites/webcom/helpcomercial'
      )
        .lists.getByTitle('Incidentes')
        .items.filter(
          `${filterPais}`
        )
        .getAll()
        .then((data) => {
          return data
            .map((i) => {
              i.Creado = new Date(i.Created);
              return i;
            })
            .filter(item => estado.key == 'All' ? item : item.Estado == estado.key)
            .filter(item => importancia.key == 'All' ? item : item.Importancia == importancia.key)
            .sort((a, b) => b['Creado'] - a['Creado']);
        });
      console.log({ items });
      setIncidentes(items);
      setIsLoading(false);
    }
    fetchData();
  }, [estado, pais, importancia]);

  return {
    incidentes,
    isLoading,
  };
}
