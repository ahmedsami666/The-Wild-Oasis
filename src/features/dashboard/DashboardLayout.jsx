import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner"
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from '../cabins/useCabins'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
const DashboardLayout = () => {
  const { bookings, isPending } = useRecentBookings()
  const { stays, confirmedStays, isPending: isloading, numDays } = useRecentStays()
  const { cabins, isPending: isloading2 } = useCabins()
  if (isPending || isloading || isloading2) return <Spinner />
  console.log(bookings)
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinsCount={cabins.length} />
      <div>today's activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}
export default DashboardLayout