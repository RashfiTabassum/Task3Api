var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Use Railway's PORT if available
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
app.Urls.Add($"http://*:{port}");

// Your existing endpoint
app.MapGet("/rashfi_example_com", (HttpRequest request) =>
{
    string xStr = request.Query["x"];
    string yStr = request.Query["y"];

    bool xValid = int.TryParse(xStr, out int x);
    bool yValid = int.TryParse(yStr, out int y);

    if (!xValid || !yValid || x <= 0 || y <= 0)
        return Results.Text("NaN");

    int lcm = LCM(x, y);
    return Results.Text(lcm.ToString());
});

int GCD(int a, int b)
{
    while (b != 0)
    {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int LCM(int a, int b)
{
    return a / GCD(a, b) * b;
}

// Run the app
app.Run();
