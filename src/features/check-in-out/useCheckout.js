import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out.`);
      //We use options {active: true} instead of mentioning the query key so that any active query is updated
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error(`There was an error checking out.`),
  });
  return { checkout, isCheckingOut };
}
