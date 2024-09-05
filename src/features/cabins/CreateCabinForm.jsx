import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";


function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, getValues, formState } = useForm({ defaultValues: isEditSession ? editValues : {}})
  const { errors } = formState
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New Cabin is created')
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
      reset()
    },
    onError: (err) => {
      toast.error(err)
    }
  })
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('New Cabin is edited')
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
      reset()
    },
    onError: (err) => {
      toast.error(err)
    }
  })
  const isWorking = isCreating || isEditing
  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (isEditSession) editCabin({ newCabinData: {...data, image: image}, id: editId })
    else createCabin({...data, image: image})
  }
  const onError = (errors) => {
    console.log(errors)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}> 
        <Input type="text" id="name" {...register('name', {required: 'This Field is required'})} />
      </FormRow>

      <FormRow label='Maximum Capacity' error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register('maxCapacity', {
          required: 'This Field is required',
          min: {
            value: 1,
            message: 'capacity should be at least 1'
          }
        })}/>
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register('regularPrice', {
          required: 'This Field is required',
          min: {
            value: 1,
            message: 'price should be at least 1'
          }
        })} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register('discount', {
          required: 'This Field is required',
          validate: (value) => value < getValues().regularPrice || 'discount should be less than price'
        })} />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description', {
          required: 'This Field is required'
        })} />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput id="image" accept="image/*" {...register('image', {
          required: isEditSession ? false : 'This field is required'
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
