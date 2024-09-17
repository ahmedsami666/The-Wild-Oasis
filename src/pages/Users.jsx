import Heading from "../ui/Heading";
import SignUp from '../features/authentication/SignupForm'

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignUp />
    </>
  )
}

export default NewUsers;
