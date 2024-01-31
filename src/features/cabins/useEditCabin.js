import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditting } = useMutation({
    //React query allow only one parameter in the mutation function
    mutationFn: ({ newCabinData, id }) => {
      createEditCabin(newCabinData, id);
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      console.log(newCabinData);
    },
    onSuccess: () => {
      toast.success("Cabin was successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditting, editCabin };
}
