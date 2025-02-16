import { Button, MenuItem, Select } from "@mui/material";
import { usePage } from "../context/PageProvider";

interface PaginationProps {
  totalPages: number;
  // page: number;
  // setPage: void;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination(props: PaginationProps) {
  const { totalPages, limit, setLimit } = props;
  const { page, setPage } = usePage();
  const productsPerPageOptions = [5, 10, 25];
  const pageNumberOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <Select
        value={limit}
        onChange={(event) => {
          setLimit(Number(event.target.value));
          setPage(1);
        }}
        className="w-32"
      >
        {productsPerPageOptions.map((size) => (
          <MenuItem key={size} value={size}>
            {size} par page
          </MenuItem>
        ))}
      </Select>

      <div className="flex space-x-2">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Précédent
        </Button>
        <span className="mt-1">
          Page {page} sur {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Suivant
        </Button>
      </div>
      <Select
        value={page}
        onChange={(event) => setPage(Number(event.target.value))}
        className="w-32"
      >
        {pageNumberOptions.map((page) => (
          <MenuItem key={page} value={page}>
            page {page}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default Pagination;
