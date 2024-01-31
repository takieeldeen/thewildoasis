import { useQuery } from "@tanstack/react-query";
// import { getCabins } from "../../services/apiCabins";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    //A key that identify this query data
    queryKey: ["booking", bookingId],
    //The function that actually do the querying work
    queryFn: () => getBooking(bookingId),
  });
  return { isLoading, booking, error };
}
