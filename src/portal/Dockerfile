#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

ENV ASPNETCORE_ENVIRONMENT=Production
ENV NODE_ENV=production

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

WORKDIR /src
COPY ["src/portal/portal.csproj", "src/portal/"]
COPY ["src/back/auth/auth.csproj", "src/back/auth/"]
COPY ["src/lib/common/common.csproj", "src/lib/common/"]
COPY ["src/back/crm-api/crm-api.csproj", "src/back/crm-api/"]
COPY ["src/lib/chat-gpt/chat-gpt.csproj", "src/lib/chat-gpt/"]
RUN dotnet restore "src/portal/portal.csproj"
COPY . .
WORKDIR "/src/src/portal"
RUN dotnet build "portal.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "portal.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "portal.dll"]