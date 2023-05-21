$Files = Get-ChildItem -Path "..\src\" -Filter *.cs -Recurse
foreach ($File in $Files) {
    (Get-Content $File.FullName) |
        ForEach-Object { $_ -replace '//.*$', '' } |
        Set-Content $File.FullName
}
