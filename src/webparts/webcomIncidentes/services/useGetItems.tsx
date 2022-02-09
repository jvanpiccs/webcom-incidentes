import { sp, Web } from '@pnp/sp/presets/all';
import { useState, useEffect } from 'react';
import { IIncidente } from '../components/IIncidente';

export default function useGetItems() {
  const [items, setItems] = useState<IIncidente[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      let newItems = await Web(
        'https://claroaup.sharepoint.com/sites/webcom/helpcomercial'
      )
        .lists.getById('d68085c2-24d1-4353-81ee-3f1201b62f17')
        .items.getAll();
      console.log(newItems);
      setItems(newItems);
      setIsLoading(false);
      // console.log(JSON.stringify(newItems[0]));
    }

    fetchData();
  }, []);
  return {
    items,
    isLoading,
  };
}
