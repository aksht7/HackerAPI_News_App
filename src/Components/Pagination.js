export default function Pagination({ postPerPage, totalPosts, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination">
      {pageNumbers.map((number) => (
        <a key={number} onClick={() => paginate(number)}>
          {number}
        </a>
      ))}
    </nav>
  );
}
