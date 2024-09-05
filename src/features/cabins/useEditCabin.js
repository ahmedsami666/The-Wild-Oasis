import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { createEditCabin } from "../../services/apiCabins"

export function useEditCabin() {
    const queryClient = useQueryClient()
    const { mutate: editCabin, isPending: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success('New Cabin is edited')
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        onError: (err) => {
            toast.error(err)
        }
    })
    return { isEditing, editCabin }
}
