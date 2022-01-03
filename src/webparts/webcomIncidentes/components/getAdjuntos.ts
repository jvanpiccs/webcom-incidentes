import { useState, useEffect } from 'react';
import { IItem } from '@pnp/sp/items';
import { Web } from '@pnp/sp/webs';
import '@pnp/sp/lists/web';
import '@pnp/sp/items';
import '@pnp/sp/attachments';
import { IAttachmentInfo } from '@pnp/sp/attachments';

export default function useGetAdjuntos(id:number) {
  const [adjuntos, setAdjuntos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const item: IItem = await Web(
        'https://claroaup.sharepoint.com/sites/webcom/helpcomercial'
      )
        .lists.getByTitle('Incidentes')
        .items.getById(id);
      const info: IAttachmentInfo[] = await item.attachmentFiles();
      setAdjuntos(info);
      setIsLoading(false);
    }

    fetchData();
  }, [id]);

  return {
    adjuntos,
    isLoading
  };
}
