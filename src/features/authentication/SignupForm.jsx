import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm()
  const { errors } = formState
  const { signup, isPending } = useSignup()
  const onSubmit = ({ fullName, email, password }) => {
    signup({ fullName, email, password }, {
      onSettled: () => reset()
    })
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} >
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register('fullName', {
          required: 'this field is required'
        })}
        disabled={isPending}/>
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" {...register('email', {
          required: 'this field is required',
          pattern: {value: /\S+@\S+\.\S+/, message: 'provide a valid email'}
        })}
        disabled={isPending}/>
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" {...register('password', {
          required: 'this field is required',
          minLength: {value: 8, message: 'password needs a min of 8 characters'}

        })}
        disabled={isPending}/>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register('passwordConfirm', {
          required: 'this field is required',
          validate: (value) => value === getValues().password || 'password needs to match'
        })}
        disabled={isPending}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
