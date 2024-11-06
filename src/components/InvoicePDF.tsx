import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { IOrder } from "../models";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  column: {
    flexDirection: "column",
  },
  bold: {
    fontWeight: "bold",
  },
  itemName: {
    width: "60%",
  },
  itemQuantity: {
    width: "20%",
    textAlign: "center",
  },
  itemPrice: {
    width: "20%",
    textAlign: "right",
  },
  total: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

interface InvoiceProps {
  customer: string;
  orders: IOrder[];
  totalPay: number;
  tax: number;
  payWithTax: number;
  invoiceID: string;
}

export const InvoicePDF = ({
  customer,
  orders,
  totalPay,
  tax,
  payWithTax,
  invoiceID,
}: InvoiceProps) => (
  <Document>
    <Page size={{ width: 240, height: "auto" }} style={styles.page}>
      <Text style={styles.header}>Invoive #{invoiceID}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer:</Text>
        <Text>{customer}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items:</Text>
        {orders.map((o) => (
          <View key={o.id} style={styles.row}>
            <Text style={styles.itemName}>{o.name}</Text>
            <Text style={styles.itemQuantity}>{o.quantity}</Text>
            <Text style={styles.itemPrice}>
              ${(o.price * o.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.total}>
        <View style={styles.totalRow}>
          <Text style={styles.bold}>Subtotal:</Text>
          <Text>${totalPay.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.bold}>Tax (10%):</Text>
          <Text>${tax.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalText}>${payWithTax.toFixed(2)}</Text>
        </View>
      </View>
    </Page>
  </Document>
);
