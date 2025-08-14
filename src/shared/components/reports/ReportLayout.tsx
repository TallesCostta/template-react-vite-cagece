import { VITE_NOME_EXIBICAO_SISTEMA } from "../../constants";
import logo from "../assets/cagece_branco.png";

interface ReportLayoutProps<T> {
  title: string;
  columns: { key: string; header: string }[];
  data: T[];
}

const ReportLayout = <T extends Record<string, any>>({
  title,
  columns,
  data,
}: ReportLayoutProps<T>) => {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div>
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <img src={logo} alt="Logo CAGECE" className="h-12" />
          <div className="text-right">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Relatório de {title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gerado em: {currentDate}
            </p>
          </div>
        </div>
        <hr className="my-4" />
      </header>
      <main>
        <table className="w-full text-sm border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200 dark:bg-slate-700">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="border border-gray-300 dark:border-slate-600 p-2 text-left font-bold text-slate-800 dark:text-slate-100"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="even:bg-gray-50 dark:even:bg-slate-800/50"
              >
                {columns.map((col) => (
                  <td
                    key={`${index}-${col.key}`}
                    className="border border-gray-300 dark:border-slate-600 p-2 text-slate-700 dark:text-slate-300"
                  >
                    {item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>{VITE_NOME_EXIBICAO_SISTEMA} - © {new Date().getFullYear()} CAGECE</p>
      </footer>
    </div>
  );
};

export default ReportLayout;
