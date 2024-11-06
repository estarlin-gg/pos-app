import { FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { useOrderContext } from "../context/OrdersProvider";

export const DashboardPage = () => {
  const { invoices } = useOrderContext();

  const today = new Date().toISOString().slice(0, 10);

  const salesToday = invoices
    .filter((i) => i.createdAt.toDate().toISOString().slice(0, 10) === today)
    .reduce((total, invoice) => total + invoice.totalPay, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <FaDollarSign className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Sales Today
                      </dt>
                      <dd className="text-3xl font-semibold text-gray-900">
                        ${salesToday}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <FaShoppingCart className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Amount of Sales Today
                      </dt>
                      <dd className="text-3xl font-semibold text-gray-900">
                        {
                          invoices.filter((invoice) => {
                            const invoiceDate = invoice.createdAt
                              .toDate()
                              .toISOString()
                              .slice(0, 10);
                            return invoiceDate === today;
                          }).length
                        }
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Sales
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      customer
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices
                    .filter(
                      (invoice) =>
                        invoice.createdAt
                          .toDate()
                          .toISOString()
                          .slice(0, 10) === today
                    )
                    .sort(
                      (a, b) =>
                        b.createdAt.toDate().getTime() -
                        a.createdAt.toDate().getTime()
                    )
                    .map((invoice, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.createdAt.toDate().toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${invoice.totalPay.toFixed(2)}
                        </td>
                        <td className="px-6 capitalize py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.customer}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
