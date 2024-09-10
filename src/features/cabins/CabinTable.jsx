import styled from "styled-components";
import Spinner from './../../ui/Spinner'
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from '../../ui/Table'
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const { isPending, cabins } = useCabins()
  const [searchParams] = useSearchParams()
  if (isPending) return <Spinner />
  const filtervalue = searchParams.get('discount') || 'all'
  let filteredCabins
  if (filtervalue === 'all') filteredCabins = cabins
  if (filtervalue === 'no-discount') filteredCabins = cabins.filter((cabin) => cabin.discount === 0)
  if (filtervalue === 'with-discount') filteredCabins = cabins.filter((cabin) => cabin.discount > 0)
  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capcity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={filteredCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
      </Table>
    </Menus>
  )
}
export default CabinTable