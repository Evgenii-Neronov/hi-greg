namespace common.Models;

public class PagedResult<T>
{
    public PagedResult(IEnumerable<T> items, int totalItems)
    {
        Items = items;
        TotalItems = totalItems;
    }

    public IEnumerable<T> Items { get; set; }
    public int TotalItems { get; set; }
}