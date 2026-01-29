# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /source

# Copy csproj and restore dependencies
COPY *.csproj .
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish -c Release -o /app

# Use the runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .

# Expose port (Render uses PORT environment variable)
EXPOSE 10000

# Set environment variable for ASP.NET Core
ENV ASPNETCORE_URLS=http://+:10000

# Run the application
ENTRYPOINT ["dotnet", "Task3Api.dll"]
