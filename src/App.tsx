import { useWeather } from "./hooks/useWeather";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const { data, isLoading, isError } = useWeather();

  if (isLoading) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">🌤️ Weather Dashboard</h1>

        {/* Skeleton for Current Weather */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Skeleton className="h-6 w-48 mb-4" />
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-32" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skeleton for 7-Day Forecast */}
        <div className="mb-6">
          <Skeleton className="h-6 w-48 mb-2" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full mb-1" />
          ))}
        </div>

        {/* Skeleton for Hourly Forecast */}
        <div>
          <Skeleton className="h-6 w-48 mb-2" />
          <div className="flex gap-2 overflow-x-auto">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-20 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) return <div>Error fetching weather data</div>;

  if (!data) return <div>Loading weather...</div>;
  const current = data.current;
  const daily = data.daily;
  const hourly = data.hourly;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1 className="text-3xl font-bold mb-4">🌤️ Weather Dashboard</h1>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">Current Conditions</h2>
          <Separator className="my-2" />
          <div className="grid grid-cols-2 gap-2">
            <p>Time: {current.time}</p>
            <p>Temperature: {current.temperature_2m} °C</p>
            <p>Humidity: {current.relative_humidity_2m} %</p>
            <p>Wind Speed: {current.wind_speed_10m} km/h</p>
            <p>UV Index: {current.uv_index}</p>
          </div>
          <br></br>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2>7-Day Forecast</h2>
          <Separator className="my-2" />
          <ul>
            {daily.time.map((day: string, index: number) => (
              <li key={day}>
                {day}: {daily.temperature_2m_min[index]}°C –{" "}
                {daily.temperature_2m_max[index]}°C
              </li>
            ))}
          </ul>
          <br></br>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2>Hourly Forecast (Next 24h)</h2>
          <Separator className="my-2" />
          <ul>
            {hourly.time.slice(0, 24).map((time: string, index: number) => (
              <li key={time}>
                {time}: {hourly.temperature_2m[index]}°C
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
