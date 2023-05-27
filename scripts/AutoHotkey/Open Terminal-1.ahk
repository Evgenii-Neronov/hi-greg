#IfWinActive, ahk_class CabinetWClass ; Only apply the hotkey in File Explorer

GetActiveExplorerPath()
{
	explorerHwnd := WinActive("ahk_class CabinetWClass")
	if (explorerHwnd)
	{
		for window in ComObjCreate("Shell.Application").Windows
		{
			if (window.hwnd==explorerHwnd)
			{
				return window.Document.Folder.Self.Path
			}
		}
	}
}

^+T::
{
    path := ""
    if WinActive("ahk_class CabinetWClass")
    {
        ControlGetText, path, Edit1
    }
	
    Path := GetActiveExplorerPath()
	
	Run, wt -d "%path%"
    return
}

#IfWinActive ; Reset context-sensitive window detection
