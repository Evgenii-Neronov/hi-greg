# Define the path to your solution and the root directory of your projects
$SolutionPath = "..\"
$ProjectsRoot = "..\src"

# Get all the .csproj files in the root directory and its subdirectories
$ProjectFiles = Get-ChildItem -Path $ProjectsRoot -Filter *.csproj -Recurse

# Loop through all the .csproj files and add them to the solution
foreach ($ProjectFile in $ProjectFiles)
{
    dotnet sln $SolutionPath add $ProjectFile.FullName
}
