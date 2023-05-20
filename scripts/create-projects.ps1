Set-Location ..
Remove-Item -Recurse -Force src
New-Item -ItemType Directory -Path src
dotnet new sln --name get-greg --force
Set-Location src

New-Item -ItemType Directory -Path lib
Set-Location lib
dotnet new classlib --framework net7.0
Set-Location ..\..\
Get-Location
dotnet sln add src/lib/lib.csproj
Set-Location src

$projects = "emailer", "assistance-bot", "feature", "fullfiller", "crm-api", "crm", "auth", "ai"

foreach ($i in $projects)
{
   New-Item -ItemType Directory -Path $i
   Set-Location $i
   dotnet new grpc
   dotnet add package Google.Protobuf
   dotnet add package Grpc.Tools
   dotnet add package Grpc.AspNetCore   
   dotnet add package Grpc.AspNetCore
   dotnet add package Newtonsoft.Json --version 13.0.3
   dotnet add package Swashbuckle.AspNetCore
   dotnet add package NLog
   dotnet add package NLog.Web.AspNetCore
   Set-Location ..\..
   dotnet sln add src/$i/$i.csproj
   Set-Location src\$i
   dotnet add reference ../lib/lib.csproj
   Set-Location ..
}
Set-Location ..
$latestSdkVersion = dotnet --list-sdks | Select-String '7.*' | Select-Object -Last 1
$latestSdkVersion = $latestSdkVersion -replace '\s',''
Write-Host "latestSdkVersion: $latestSdkVersion"
dotnet new globaljson --sdk-version 7.0.302 --force

Set-Content .gitignore '## .NET ##
*.dll
*.exe
*.pdb
/bin/
/obj/
/out/
*.userprefs
project.lock.json
.DS_Store
.vs/
.vscode/
*.suo
.cache/
.NETTools/
*.nuget.props
*.nuget.targets
*/bin/
*/obj/
*/out/
.nupkg
/TestResults/
.coverage
.vsconfig
.msbuild*
!**/Properties/PublishProfiles/'

Set-Location scripts