import { Sun, Cloud, Wind, CloudRain, Snowflake, CloudLightning, MapPin } from "lucide-react";

export default function WeatherWidget({ weather }) {
  const getWeatherInfo = (code) => {
    if (code === 0) return { icon: <Sun className="w-8 h-8 text-yellow-300" />, label: "Cerah", bg: "from-blue-400 to-blue-600" };
    if (code >= 1 && code <= 3) return { icon: <Cloud className="w-8 h-8 text-gray-200" />, label: "Berawan", bg: "from-slate-500 to-slate-700" };
    if (code >= 45 && code <= 48) return { icon: <Wind className="w-8 h-8 text-slate-300" />, label: "Berkabut", bg: "from-gray-500 to-gray-700" };
    if (code >= 51 && code <= 67) return { icon: <CloudRain className="w-8 h-8 text-blue-200" />, label: "Hujan", bg: "from-indigo-600 to-blue-800" };
    if (code >= 71 && code <= 77) return { icon: <Snowflake className="w-8 h-8 text-white" />, label: "Salju", bg: "from-cyan-600 to-blue-800" };
    if (code >= 80 && code <= 82) return { icon: <CloudRain className="w-8 h-8 text-blue-200" />, label: "Hujan Deras", bg: "from-blue-700 to-indigo-900" };
    if (code >= 95) return { icon: <CloudLightning className="w-8 h-8 text-yellow-400" />, label: "Badai Petir", bg: "from-slate-700 to-slate-900" };
    return { icon: <Cloud className="w-8 h-8" />, label: "Mendung", bg: "from-indigo-600 to-purple-700" };
  };

  const info = getWeatherInfo(weather.code);

  return (
    <div className={`bg-linear-to-br ${info.bg} rounded-3xl p-6 shadow-xl text-white flex flex-col justify-between relative overflow-hidden transition-colors duration-700`}>
      <div className="absolute -right-6 -bottom-6 opacity-20 transform scale-150 text-white mix-blend-overlay">
        {info.icon}
      </div>
      <div className="flex justify-between items-start z-10">
        <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl shadow-lg">
          {weather.loading ? (
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-t-transparent border-white"></div>
          ) : (
            info.icon
          )}
        </div>
        <span className="bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {weather.isJakarta ? "Jakarta" : "Lokasi Anda"}
        </span>
      </div>
      <div className="z-10 mt-4">
        <span className="text-5xl font-bold tracking-tight">{weather.temp}°</span>
        <p className="text-indigo-100 mt-1 font-medium">{info.label}</p>
      </div>
    </div>
  );
}