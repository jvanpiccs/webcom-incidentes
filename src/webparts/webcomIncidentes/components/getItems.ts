import { useState, useEffect } from 'react';
import { sp } from "@pnp/sp";
import { Web } from "@pnp/sp/webs";   
// import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


export default function useGetItems() {
  const [incidentes, setIncidentes] = useState<any[]>([]);
  const web = Web("https://testinglala.sharepoint.com/sites/Test/");

  useEffect(() => {
    async function fetchData() {
      // get all the items from a list
        const items: any[] = await Web("https://claroaup.sharepoint.com/sites/webcom/helpcomercial").lists.getByTitle("Incidentes").items.get();
        console.log(items);
        setIncidentes(items);
    }
    fetchData();
  }, []);

  return {
    incidentes
  };
}