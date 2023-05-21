Write-Host "Clean up containers..."
docker rm -f $(docker ps -aq)
Write-Host "Removing volumes..."
docker volume rm -f $(docker volume ls -q)
Write-Host "Done."
#docker rmi -f $(docker images -aq)
