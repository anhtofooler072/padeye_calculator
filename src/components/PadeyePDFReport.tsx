import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1e3a8a', // A deep blue
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 2,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: "60%",
    fontSize: 10,
    color: '#555',
  },
  value: {
    width: "40%",
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 4,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 4,
  },
  col1: { width: '20%', fontSize: 10 },
  col2: { width: '40%', fontSize: 10 },
  col3: { width: '20%', fontSize: 10 },
  col4: { width: '20%', fontSize: 10, fontWeight: 'bold' },
  statusPass: { color: 'green' },
  statusFail: { color: 'red' },
  summaryBox: {
    borderWidth: 2,
    borderColor: '#1e3a8a',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  }
});

interface ReportProps {
  inputs: any;
  loads: any;
  clearances: any;
  unityChecks: any[];
  maxUC: number;
  governingUC: any;
  selectedMaterial: string;
}

export const PadeyePDFReport = ({ inputs, loads, clearances, unityChecks, maxUC, governingUC, selectedMaterial }: ReportProps) => {
  const isSafe = maxUC <= 1.0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Padeye Design Validation Report</Text>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>MAXIMUM UNITY RATIO</Text>
          <Text style={[styles.summaryValue, isSafe ? styles.statusPass : styles.statusFail]}>
            {maxUC.toFixed(3)}
          </Text>
          <Text style={[styles.summaryLabel, { marginTop: 5 }]}>
            {isSafe ? 'STRUCTURE IS SAFE' : 'STRUCTURE FAILS'}
          </Text>
          <Text style={{ fontSize: 10, color: '#666', marginTop: 3 }}>
            Governing: {governingUC?.id} - {governingUC?.label}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APPLIED LOADS</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Sling Static Load (SLp)</Text>
            <Text style={styles.value}>{inputs.SLp} kG</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dynamic Factor (n)</Text>
            <Text style={styles.value}>{inputs.n}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Design Load In-Plane (F1)</Text>
            <Text style={styles.value}>{loads.F1.toFixed(2)} kG</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Design Load Out-Of-Plane (F2)</Text>
            <Text style={styles.value}>{loads.F2.toFixed(2)} kG</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MATERIAL & GEOMETRY</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Material Grade</Text>
            <Text style={styles.value}>{selectedMaterial}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Yield Strength (Fy)</Text>
            <Text style={styles.value}>{inputs.Fy} MPa</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ultimate Strength (Fu)</Text>
            <Text style={styles.value}>{inputs.Fu} MPa</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Main Radius (R1)</Text>
            <Text style={styles.value}>{inputs.R1} mm</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cheek Radius (R2)</Text>
            <Text style={styles.value}>{inputs.R2} mm</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pin Hole Radius (R3)</Text>
            <Text style={styles.value}>{inputs.R3} mm</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Main Thk (t1) / Cheek Thk (t2)</Text>
            <Text style={styles.value}>{inputs.t1} mm / {inputs.t2} mm</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Height (H) / Base Length (L)</Text>
            <Text style={styles.value}>{inputs.H} mm / {inputs.L} mm</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SHACKLE & CLEARANCES</Text>
          <View style={styles.tableHeader}>
            <Text style={{ width: '40%', fontSize: 10, fontWeight: 'bold' }}>Check</Text>
            <Text style={{ width: '30%', fontSize: 10, fontWeight: 'bold' }}>Value</Text>
            <Text style={{ width: '30%', fontSize: 10, fontWeight: 'bold' }}>Status</Text>
          </View>
          
          <View style={styles.tableRow}>
            <Text style={{ width: '40%', fontSize: 10 }}>Pin Clearance (2R3 - B)</Text>
            <Text style={{ width: '30%', fontSize: 10 }}>{clearances.pinClearance.toFixed(2)} mm</Text>
            <Text style={[{ width: '30%', fontSize: 10 }, clearances.pinClearance > 0 ? styles.statusPass : styles.statusFail]}>
              {clearances.pinClearance > 0 ? "OK" : "NG"}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={{ width: '40%', fontSize: 10 }}>Side Clearance</Text>
            <Text style={{ width: '30%', fontSize: 10 }}>{clearances.sideClearance.toFixed(2)} mm</Text>
            <Text style={[{ width: '30%', fontSize: 10 }, clearances.sideClearance > 0 ? styles.statusPass : styles.statusFail]}>
              {clearances.sideClearance > 0 ? "OK" : "NG"}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={{ width: '40%', fontSize: 10 }}>Shackle Fit</Text>
            <Text style={{ width: '30%', fontSize: 10 }}>{clearances.shackleFit.toFixed(2)} mm</Text>
            <Text style={[{ width: '30%', fontSize: 10 }, clearances.shackleFit > 0 ? styles.statusPass : styles.statusFail]}>
              {clearances.shackleFit > 0 ? "OK" : "NG"}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={{ width: '40%', fontSize: 10 }}>Cheek Clearance</Text>
            <Text style={{ width: '30%', fontSize: 10 }}>{clearances.cheekClearance.toFixed(2)} mm</Text>
            <Text style={[{ width: '30%', fontSize: 10 }, clearances.cheekClearance > 0 ? styles.statusPass : styles.statusFail]}>
              {clearances.cheekClearance > 0 ? "OK" : "NG"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>STRENGTH UNITY CHECKS</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Clause</Text>
            <Text style={styles.col2}>Description</Text>
            <Text style={styles.col3}>Ratio</Text>
            <Text style={styles.col4}>Status</Text>
          </View>
          {unityChecks.map((uc) => (
            <View style={styles.tableRow} key={uc.id}>
              <Text style={styles.col1}>{uc.id}</Text>
              <Text style={styles.col2}>{uc.label}</Text>
              <Text style={styles.col3}>{uc.value.toFixed(3)}</Text>
              <Text style={[styles.col4, uc.value <= 1.0 ? styles.statusPass : styles.statusFail]}>
                {uc.value <= 1.0 ? "OK" : "NG"}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
