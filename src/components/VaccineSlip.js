import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

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
    paddingHorizontal: '150px',
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

export const VaccinationSlip = ({data}) => (
  <Document title='Vaccination-slip-cohelp-28-06-2021'>
    <Page style={styles.page}>
      <Text style={styles.heading}>
        COVID-19 Vaccination - {data?.vaccine_doze} Dose
      </Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient Details</Text>
        <View style={styles.propRow}>
          <Text>Name</Text>
          <Text>Indrajit Sarkar</Text>
        </View>
        <View style={styles.propRow}>
          <Text>Age</Text>
          <Text>69</Text>
        </View>
        <View style={styles.propRow}>
          <Text>Mobile no</Text>
          <Text>9856785489</Text>
        </View>
        <View style={styles.propRow}>
          <Text>Aadhaar no</Text>
          <Text>588745696584</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vaccination Details</Text>
        <View style={styles.propRow}>
          <Text>Vaccine name</Text>
          <Text>COVAXIN</Text>
        </View>
        <View style={styles.propRow}>
          <Text>Date of dose</Text>
          <Text>20 May 2021</Text>
        </View>
        <View style={styles.propRow}>
          <Text>Batch No</Text>
          <Text>85afaa5g8adga5asd</Text>
        </View>
        <View style={styles.propRow}>
          <Text>Vaccinated at</Text>
          <Text>Pro organization, Kalna, PB</Text>
        </View>
      </View>
    </Page>
  </Document>
);
