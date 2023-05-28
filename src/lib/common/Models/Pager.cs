namespace common.Models;
public class Pager<T>
{
    private int pageSize;
    private int currentPage;
    private int totalItems;

    public Pager(int currentPage, int totalItems, int pageSize)
    {
        this.currentPage = currentPage;
        this.totalItems = totalItems;
        this.pageSize = pageSize;
    }

    public int PageSize => pageSize;

    public int CurrentPage => currentPage;

    public int TotalItems => totalItems;

    public int TotalPages => (int)Math.Ceiling((double)TotalItems / PageSize);

    public bool HasPreviousPage => CurrentPage > 1;

    public bool HasNextPage => CurrentPage < TotalPages;

    public int PreviousPageNumber => HasPreviousPage ? CurrentPage - 1 : 1;

    public int NextPageNumber => HasNextPage ? CurrentPage + 1 : TotalPages;

    public IEnumerable<T> GetPagedItems(IEnumerable<T> items)
    {
        var offset = (CurrentPage - 1) * PageSize;
        return items.Skip(offset).Take(PageSize);
    }
}