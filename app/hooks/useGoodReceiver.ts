import { useAuth } from "~/stores/useAuth";
import { useEffect, useState } from "react";
import { GoodReceiverService } from "~/services/goodReceiver.service";

export const useGoodReceiverAction = () => {
  const { token } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await GoodReceiverService.getAll(token ?? "");
      setData(response.data.result);
    } catch (error) {
      console.error("Error fetching good receivers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return { data, fetchData, loading };
};
