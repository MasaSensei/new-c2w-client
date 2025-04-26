import { useEffect, useState } from "react";
import { OutgoingRawMaterialService } from "~/services/outgoingRawMaterial.service";
import type { OutgoingRawMaterial } from "~/types/outgoingRawMaterial";

export const useOutgoingRawHistoryAction = () => {
  const [data, setData] = useState<OutgoingRawMaterial[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await OutgoingRawMaterialService.getAll();
      if (!response.data.data) {
        setIsLoading(false);
        setData([]);
      }
      setIsLoading(false);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, fetchData, isLoading, setIsLoading };
};
