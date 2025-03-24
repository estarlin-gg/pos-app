import { BsEye } from "react-icons/bs";
import { useOrderContext } from "../context/OrdersProvider";
import { Input } from "../components/form/Input";

export const HistoryPage = () => {
  const { invoices } = useOrderContext();

  const handleView = (pdfUrl: string) => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    } else {
      console.log("PDF not available for this invoice.");
      console.log(pdfUrl);
    }
  };

  return (
    <div className="container mx-auto py-4 px-4">
     <div className="flex justify-between items-center my-2">
     <h1 className="text-2xl font-bold mb-4">Invoice History</h1>
     <Input type="search" classes="border bg-gray-200" />
     </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border-b p-4 text-left font-semibold text-gray-600">
                Date
              </th>
              <th className="border-b p-4 text-left font-semibold text-gray-600">
                Invoice ID
              </th>
              <th className="border-b p-4 text-left font-semibold text-gray-600">
                Name
              </th>
              <th className="border-b p-4 text-right font-semibold text-gray-600">
                Amount
              </th>
              <th className="border-b p-4 text-right font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {invoices.length <= 0 ? (
              <tr>
                <td colSpan={5} className="text-xl font-bold text-center p-8">
                  Empty
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => {
                const formattedDate = invoice.createdAt
                  ? invoice.createdAt.toDate().toLocaleDateString()
                  : "N/A";

                return (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{formattedDate}</td>
                    <td className="p-4">{invoice.id}</td>
                    <td className="p-4">{invoice.customer}</td>
                    <td className="p-4 text-right">
                      ${invoice.totalPay.toFixed(2)}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleView(invoice.pdfUrl)}
                          className="p-1 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                          aria-label={`View invoice ${invoice.id}`}
                        >
                          <BsEye className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
