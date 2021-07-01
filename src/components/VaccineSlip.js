import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import {TODAY} from '../utils';

Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf',
});

const styles = StyleSheet.create({
  logo: {
    borderRadius: '100px',
    height: '120px',
    width: '120px',
  },
  page: {
    fontFamily: 'Roboto',
    paddingHorizontal: '100px',
    paddingVertical: '50px',
  },
  heading: {
    fontWeight: 'bold',
    color: '#3182cf',
    textAlign: 'center',
    marginBottom: '15px',
  },
  section: {
    marginBottom: '15px',
  },
  sectionTitle: {
    marginBottom: '5px',
    fontSize: '12px',
    color: '#3182cf',
    textDecoration: 'underline',
  },
  propRow: {
    marginVertical: '2px',
    justifyContent: 'space-between',
    // width: '50%',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px',
  },
});

export const VaccinationSlip = ({
  data: {
    patient_details,
    vaccine_doze,
    vaccine_date,
    batch_code,
    org,
    vaccine_name,
  },
}) => (
  <Document title={`vaccination-of-${patient_details.name}-cohelp-${TODAY}`}>
    <Page style={styles.page}>
      <Text style={styles.heading}>
        COVID-19 Vaccination - {vaccine_doze} Dose
      </Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient Details</Text>
        <View style={styles.propRow}>
          <Text>Name</Text>
          <Text>{patient_details.name}</Text>
        </View>
        <View style={styles.propRow}>
          <Text>Age</Text>
          <Text>{patient_details.age}</Text>
        </View>
        <View style={styles.propRow}>
          <Text>Mobile no</Text>
          <Text>{patient_details.mobile_no}</Text>
        </View>
        <View style={styles.propRow}>
          <Text>Aadhaar no</Text>
          <Text>{patient_details.aadhar}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vaccination Details</Text>
        <View style={styles.propRow}>
          <Text>Vaccine name</Text>
          <Text>{vaccine_name.toLocaleUpperCase()}</Text>
        </View>
        <View style={styles.propRow}>
          <Text>Date of dose</Text>
          <Text>{new Date(vaccine_date).toDateString().slice(4)}</Text>
        </View>
        <View style={styles.propRow}>
          <Text>Batch No</Text>
          <Text>{batch_code}</Text>
        </View>
        <View style={styles.propRow}>
          <Text>Vaccinated at</Text>
          <Text>
            {org.name}, {org.address.city}, {org.address.district}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);
