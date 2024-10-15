import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { IOrder } from "../models";

const styles = StyleSheet.create({
  page: {
    padding: 5,
    width: 40,
    height: 40,
    fontSize: 9,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  section: {
    marginBottom: 3,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 1,
  },
  tableCell: {
    width: "60%",
    textAlign: "left",
    fontSize: 9,
  },
  tableCellRight: {
    width: "40%",
    textAlign: "right",
    fontSize: 9,
  },
  footer: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: 3,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  textBold: { fontWeight: "bold" },
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
    <Page style={styles.page}>
      <Text style={styles.title}>Factura #{invoiceID}</Text>{" "}
      <View style={styles.section}>
        <Text>Cliente: {customer || "No especificado"}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>Product x Cantidad</Text>
          <Text style={styles.tableCellRight}>Total</Text>
        </View>

        {orders.map((o) => (
          <View key={o.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>
              {o.name} x {o.quantity}
            </Text>
            <Text style={styles.tableCellRight}>
              ${(o.price * o.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <Text style={styles.textBold}>Subtotal:</Text>
          <Text>${totalPay.toFixed(2)}</Text>
        </View>
        <View style={styles.footerRow}>
          <Text style={styles.textBold}>Tax (10%):</Text>
          <Text>${tax.toFixed(2)}</Text>
        </View>
        <View style={styles.footerRow}>
          <Text style={styles.textBold}>Total:</Text>
          <Text>${payWithTax.toFixed(2)}</Text>
        </View>
      </View>
    </Page>
  </Document>
);
