FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 5000/TCP
ENV ASPNETCORE_URLS=https://*:5000
ENV ASPNETCORE_ENVIRONMENT=production
ENV ASPNETCORE_Kestrel__Certificates__Default__Password=L^cy8EU4xo84
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=./production.pfx

FROM node:10.15-alpine AS client 
WORKDIR /src
COPY ./ClientApp ./ClientApp
WORKDIR /src/ClientApp
RUN npm install 
RUN npm run build

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ./CardPlayer.csproj .
RUN dotnet restore "CardPlayer.csproj"
COPY . .
RUN dotnet build "CardPlayer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CardPlayer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY nginx/production.pfx .
COPY --from=publish /app/publish ./
COPY --from=client /src/ClientApp/build ./ClientApp/build
ENTRYPOINT ["dotnet", "CardPlayer.dll"]