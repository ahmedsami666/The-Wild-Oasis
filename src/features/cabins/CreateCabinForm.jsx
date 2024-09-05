import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";


function CreateCabinForm() {
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, getValues, formState } = useForm()
  const { errors } = formState
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
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
  const onSubmit = (data) => {
    mutate({...data, image: data.image[0]})
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
          required: 'This field is required'
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
