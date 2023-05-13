cd ..
mkdir -p src
cd src
dotnet new sln --name hi-greg
mkdir -p web
cd web
dotnet new web --framework net8.0
cd ..
dotnet sln add web\web.csproj
mkdir -p tool
cd tool
dotnet new console --framework net8.0
cd ..
dotnet sln add tool\tool.csproj
mkdir -p lib
dotnet new classlib --name lib
dotnet sln add lib\lib.csproj

cd web
dotnet add reference ..\lib\lib.csproj

cd ..\tool
dotnet add reference ..\lib\lib.csproj

cd ..

$latestSdkVersion = dotnet --list-sdks --version 8.* | Select-Object -Last 1
$latestSdkVersion = $latestSdkVersion.Split(" ")[0]
dotnet new globaljson --sdk-version $latestSdkVersion

'## .NET ##
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
!**/Properties/PublishProfiles/
``' | Set-Content -Path '.gitignore'

cd ..\scripts