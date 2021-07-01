import {Button} from '@chakra-ui/react';
import {PDFDownloadLink} from '@react-pdf/renderer';
import {TODAY} from '../utils';
import {VaccinationSlip} from './VaccineSlip';

export const PDFDownloadBtn = ({data}) => {
  return (
    <PDFDownloadLink
      document={<VaccinationSlip data={data} />}
      fileName={`vaccination-of-${data.patient_details.name}-cohelp-${TODAY}.pdf`}>
      {({loading}) => (
        <Button isLoading={loading} rounded='sm' size='sm' colorScheme='blue'>
          Print
        </Button>
      )}
    </PDFDownloadLink>
  );
};
