var builder = WebApplication.CreateBuilder(args);

// Configure to use PORT environment variable
var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

var app = builder.Build();

// Your existing endpoint
app.MapGet("/u2004004_student_cuet_ac_bd", (HttpRequest request) =>
{
    string xStr = request.Query["x"];
    string yStr = request.Query["y"];

    // Check for missing or empty parameters
    if (string.IsNullOrWhiteSpace(xStr) || string.IsNullOrWhiteSpace(yStr))
        return Results.Text("NaN");

    // Try to parse as integers
    bool xValid = int.TryParse(xStr, out int x);
    bool yValid = int.TryParse(yStr, out int y);

    // Check if parsing failed or values are not natural numbers (must be > 0)
    if (!xValid || !yValid || x <= 0 || y <= 0)
        return Results.Text("NaN");

    try
    {
        long lcm = LCM(x, y);
        return Results.Text(lcm.ToString());
    }
    catch (OverflowException)
    {
        return Results.Text("NaN");
    }
});

long GCD(long a, long b)
{
    while (b != 0)
    {
        long temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

long LCM(long a, long b)
{
    checked
    {
        return a / GCD(a, b) * b;
    }
}

// Run the app
app.Run();
