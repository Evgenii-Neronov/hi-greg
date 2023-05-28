namespace common.Models;

public class Pager<T>
{
    public Pager(int currentPage, int totalItems, int pageSize)
    {
        CurrentPage = currentPage;
        TotalItems = totalItems;
        PageSize = pageSize;
    }

    public int PageSize { get; }

    public int CurrentPage { get; }

    public int TotalItems { get; }

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