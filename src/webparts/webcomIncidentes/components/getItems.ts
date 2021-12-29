import { useState, useEffect } from 'react';
import { Web } from '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

export default function useGetItems(estado) {
  const [incidentes, setIncidentes] = useState<any[]>([]);
  const web = Web('https://testinglala.sharepoint.com/sites/Test/');

  useEffect(() => {
    async function fetchData() {
      // get all the items from a list
      const items: any[] = await Web(
        'https://claroaup.sharepoint.com/sites/webcom/helpcomercial'
      )
        .lists.getByTitle('Incidentes')
        .items.filter(`Estado eq '${estado.key}'`)
        .getAll()
        .then((data) => {
          return data.map((i)=>{
            i.Creado = new Date(i.Created);
            return i;
          }).sort(
            (a, b) => b['Creado'] - a['Creado']
          );
        });
      console.log({ items });
      setIncidentes(items);
    }
    fetchData();
  }, [estado]);

  return {
    incidentes,
  };
}
