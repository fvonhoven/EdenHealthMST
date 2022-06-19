import { Clinician } from '../mst'

export const filterClinicians = (clinicians: Clinician[]) =>
  clinicians
    .filter((clinician: Clinician) => clinician.address.state === 'NY')
    .sort((a: Clinician, b: Clinician) => (a.firstName > b.firstName ? 1 : -1))

export const sortClinicians = (clinicians: Clinician[]) =>
  clinicians.sort((a: Clinician, b: Clinician) =>
    a.firstName > b.firstName ? 1 : -1,
  )
