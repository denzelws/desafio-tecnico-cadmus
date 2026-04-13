FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["src/Contacts.Domain/Contacts.Domain.csproj", "Contacts.Domain/"]
COPY ["src/Contacts.Application/Contacts.Application.csproj", "Contacts.Application/"]
COPY ["src/Contacts.Infrastructure/Contacts.Infrastructure.csproj", "Contacts.Infrastructure/"]
COPY ["src/Contacts.Api/Contacts.Api.csproj", "Contacts.Api/"]

RUN dotnet restore "Contacts.Api/Contacts.Api.csproj"

COPY . .
WORKDIR "/src/src/Contacts.Api"
RUN dotnet build "Contacts.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Contacts.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "Contacts.Api.dll"]
