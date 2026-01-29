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
