# Укажите путь к корневой директории ваших проектов
$RootPath = "..\src\"

# Получите все папки bin и obj в корневой директории и её поддиректориях
$BinAndObjFolders = Get-ChildItem -Path $RootPath -Include bin,obj -Recurse -Directory

# Удалите все найденные папки bin и obj
foreach ($Folder in $BinAndObjFolders)
{
    Remove-Item $Folder.FullName -Recurse -Force
}
