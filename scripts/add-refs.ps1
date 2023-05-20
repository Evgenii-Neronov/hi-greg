# Укажите путь к референсу проекта, который необходимо добавить
$ProjectReferencePath = "..\src\lib\common\common.csproj"

# Укажите корневую директорию ваших проектов
$ProjectsRoot = "..\src"

# Получите все файлы .csproj в корневой директории и её поддиректориях
$ProjectFiles = Get-ChildItem -Path $ProjectsRoot -Filter *.csproj -Recurse

# Для каждого файла .csproj добавьте в него референс
foreach ($ProjectFile in $ProjectFiles)
{
    dotnet add $ProjectFile.FullName reference $ProjectReferencePath
}
